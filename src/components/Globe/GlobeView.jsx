import { useEffect, useRef, useState } from 'react'
import { Map, RotateCw, Focus } from 'lucide-react'
import useStore from '../../store/useStore'
import { getEraColor } from '../../data/categories'
import './GlobeView.css'

export default function GlobeView({ items }) {
  const containerRef = useRef(null)
  const viewerRef = useRef(null)
  const entitiesRef = useRef({})
  const labelsLayerRef = useRef(null)
  const dataSourceRef = useRef(null)
  const pulseEntityRef = useRef(null)
  const { selectedItem, setSelectedItem, locale, theme } = useStore()

  // 컨트롤 상태
  const [showLabels, setShowLabels] = useState(false)
  const [autoRotate, setAutoRotate] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // CesiumJS 초기화
  useEffect(() => {
    let isMounted = true

    const initCesium = async () => {
      try {
        const Cesium = await import('cesium')
        await import('cesium/Build/Cesium/Widgets/widgets.css')

        if (!isMounted || !containerRef.current) return

        // Cesium Ion 토큰 설정
        const token = import.meta.env.VITE_CESIUM_ION_TOKEN
        if (token) {
          Cesium.Ion.defaultAccessToken = token
        }

        // Viewer 생성
        const viewer = new Cesium.Viewer(containerRef.current, {
          animation: false,
          baseLayerPicker: false,
          fullscreenButton: false,
          geocoder: false,
          homeButton: false,
          infoBox: false,
          sceneModePicker: false,
          selectionIndicator: false,
          timeline: false,
          navigationHelpButton: false,
          creditContainer: document.createElement('div'),
          // 토큰이 없으면 기본 텍스처 사용
          ...(!token && {
            imageryProvider: false,
            baseLayer: false,
          }),
        })

        // 토큰이 없을 때 기본 이미지리 추가
        if (!token) {
          try {
            viewer.imageryLayers.addImageryProvider(
              new Cesium.TileMapServiceImageryProvider({
                url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII'),
              })
            )
          } catch {
            // 기본 텍스처 로드 실패 시 무시
          }
        }

        // 대기 효과
        viewer.scene.globe.enableLighting = false

        // 초기 카메라 위치 (한반도 중심)
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(126.98, 36.0, 8000000),
        })

        // 데이터 소스 (클러스터링용) 설정
        const dataSource = new Cesium.CustomDataSource('markers')
        viewer.dataSources.add(dataSource)
        
        dataSource.clustering.enabled = true
        dataSource.clustering.pixelRange = 45
        dataSource.clustering.minimumClusterSize = 2
        
        dataSource.clustering.clusterEvent.addEventListener((clusteredEntities, cluster) => {
          cluster.label.show = true
          cluster.label.text = clusteredEntities.length.toString()
          cluster.label.font = 'bold 13px Pretendard Variable, Inter, sans-serif'
          cluster.label.fillColor = Cesium.Color.WHITE
          cluster.label.style = Cesium.LabelStyle.FILL_AND_OUTLINE
          cluster.label.outlineColor = Cesium.Color.fromCssColorString('#1A1A2E')
          cluster.label.outlineWidth = 3
          cluster.label.pixelOffset = new Cesium.Cartesian2(0, 0)
          cluster.label.disableDepthTestDistance = Number.POSITIVE_INFINITY

          cluster.billboard.show = false
          
          cluster.point.show = true
          cluster.point.pixelSize = 26
          cluster.point.color = Cesium.Color.fromCssColorString('#4A6FA5').withAlpha(0.85)
          cluster.point.outlineColor = Cesium.Color.fromCssColorString('#FFFFFF')
          cluster.point.outlineWidth = 2
          cluster.point.disableDepthTestDistance = Number.POSITIVE_INFINITY
        })

        dataSourceRef.current = dataSource

        viewerRef.current = viewer

        // 마커 추가
        addMarkers(Cesium, dataSourceRef.current, items)
        setIsLoading(false)

        // 클릭 이벤트 (마커 또는 클러스터 클릭 시)
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        handler.setInputAction((click) => {
          const picked = viewer.scene.pick(click.position)
          if (Cesium.defined(picked) && picked.id) {
            // 개별 항목 클릭 시
            if (picked.id._itemData) {
              setSelectedItem(picked.id._itemData)
            } else {
              // 클러스터 클릭 시: 클릭 지점 기준 현재 고도의 절반으로 확대
              const ellipsoid = viewer.scene.globe.ellipsoid
              const cartesian = viewer.camera.pickEllipsoid(click.position, ellipsoid)
              if (cartesian) {
                const carto = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian)
                viewer.camera.flyTo({
                  destination: Cesium.Cartesian3.fromRadians(
                    carto.longitude,
                    carto.latitude,
                    Math.max(viewer.camera.positionCartographic.height / 2, 100000)
                  ),
                  duration: 0.8,
                })
              }
            }
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      } catch (error) {
        console.error('CesiumJS 초기화 실패:', error)
      }
    }

    initCesium()

    return () => {
      isMounted = false
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [])

  // 아이템 변경 시 마커 업데이트
  useEffect(() => {
    if (!dataSourceRef.current) return

    const updateMarkers = async () => {
      const Cesium = await import('cesium')
      dataSourceRef.current.entities.removeAll()
      entitiesRef.current = {}
      
      // 기존 펄스 효과 제거
      if (pulseEntityRef.current && viewerRef.current) {
        viewerRef.current.entities.remove(pulseEntityRef.current)
        pulseEntityRef.current = null
      }
      
      addMarkers(Cesium, dataSourceRef.current, items)
    }

    updateMarkers()
  }, [items, locale])

  // 선택 아이템 변경 시 카메라 이동 및 펄스 효과
  useEffect(() => {
    if (!viewerRef.current) return

    const flyAndHighlight = async () => {
      const Cesium = await import('cesium')
      
      // 기존 펄스 효과 제거
      if (pulseEntityRef.current) {
        viewerRef.current.entities.remove(pulseEntityRef.current)
        pulseEntityRef.current = null
      }
      
      if (!selectedItem) {
        viewerRef.current.selectedEntity = undefined
        return
      }
      
      const coords = selectedItem.location?.coordinates || selectedItem.birthPlace?.coordinates
      if (!coords) return

      viewerRef.current.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(coords.lng, coords.lat, 3000000),
        duration: 1.5,
      })

      // 펄스 애니메이션 개체 추가
      pulseEntityRef.current = viewerRef.current.entities.add({
        position: Cesium.Cartesian3.fromDegrees(coords.lng, coords.lat),
        point: {
          pixelSize: new Cesium.CallbackProperty(() => {
            const t = (Date.now() % 1500) / 1500 // 0~1 반복
            return 10 + t * 40
          }, false),
          color: new Cesium.CallbackProperty(() => {
            const t = (Date.now() % 1500) / 1500
            const alpha = Math.max(0, 0.8 - t)
            return Cesium.Color.fromCssColorString('#EF4444').withAlpha(alpha)
          }, false),
          outlineColor: new Cesium.CallbackProperty(() => {
            const t = (Date.now() % 1500) / 1500
            const alpha = Math.max(0, 1.0 - t)
            return Cesium.Color.fromCssColorString('#EF4444').withAlpha(alpha)
          }, false),
          outlineWidth: 3,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY // 항상 마커 위에 표시되도록
        }
      })
      
      // 선택 마커 로직 유지 (안 보일 수 있지만 내부 선택 상태용)
      const entity = entitiesRef.current[selectedItem.id]
      if (entity) {
        viewerRef.current.selectedEntity = entity
      }
    }

    flyAndHighlight()
  }, [selectedItem])

  // 테마 변경 시 배경색 조정
  useEffect(() => {
    if (!viewerRef.current) return
    const updateBackground = async () => {
      const Cesium = await import('cesium')
      viewerRef.current.scene.backgroundColor = theme === 'dark'
        ? new Cesium.Color(0.04, 0.04, 0.1, 1.0)
        : new Cesium.Color(0.9, 0.9, 0.95, 1.0)
    }
    updateBackground()
  }, [theme])

  // 자동 회전
  useEffect(() => {
    if (!viewerRef.current) return
    
    let isAnimating = false
    const onTick = async () => {
      if (!autoRotate || isAnimating || !viewerRef.current) return
      const Cesium = await import('cesium')
      viewerRef.current.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.001)
    }
    
    // 약간의 지연 후 이벤트 등록 (viewer 초기화 대기)
    const timeoutId = setTimeout(() => {
      if (viewerRef.current?.clock) {
        viewerRef.current.clock.onTick.addEventListener(onTick)
      }
    }, 500)

    return () => {
      clearTimeout(timeoutId)
      if (viewerRef.current?.clock) {
        viewerRef.current.clock.onTick.removeEventListener(onTick)
      }
    }
  }, [autoRotate])

  // 지명 레이어 (Labels)
  useEffect(() => {
    if (!viewerRef.current) return
    
    const updateLabels = async () => {
      const Cesium = await import('cesium')
      
      // 언어가 변경되거나 설정이 변경될 때 기존 레이어를 제거
      if (labelsLayerRef.current) {
        viewerRef.current.imageryLayers.remove(labelsLayerRef.current)
        labelsLayerRef.current = null
      }

      if (showLabels) {
        try {
          // CARTO 지명 레이블 전용 타일 (라이선스: CC BY 3.0, 무료)
          const provider = new Cesium.UrlTemplateImageryProvider({
            url: 'https://a.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
            maximumLevel: 19,
            credit: '© CARTO © OpenStreetMap contributors',
          })
          labelsLayerRef.current = viewerRef.current.imageryLayers.addImageryProvider(provider)
        } catch (e) {
          console.error('Failed to load label layer:', e)
        }
      }
    }
    updateLabels()
  }, [showLabels, locale])

  // 시점 초기화 핸들러
  const handleResetView = async () => {
    if (!viewerRef.current) return
    const Cesium = await import('cesium')
    viewerRef.current.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(126.98, 36.0, 8000000),
      duration: 1.5,
    })
    setSelectedItem(null)
  }

  function addMarkers(Cesium, dataSource, itemsToAdd) {
    itemsToAdd.forEach((item) => {
      const coords = item.location?.coordinates || item.birthPlace?.coordinates
      if (!coords) return

      const eraColor = getEraColor(item.era)
      const title = item.title[locale] || item.title.ko
      const icon = item.icon || '📌'

      const entity = dataSource.entities.add({
        position: Cesium.Cartesian3.fromDegrees(coords.lng, coords.lat),
        point: {
          pixelSize: 10,
          color: Cesium.Color.fromCssColorString(eraColor),
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        label: {
          text: `${icon} ${title}`,
          font: '13px Pretendard Variable, Inter, sans-serif',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.fromCssColorString('#1A1A2E'),
          outlineWidth: 3,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          pixelOffset: new Cesium.Cartesian2(0, -18),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          scaleByDistance: new Cesium.NearFarScalar(1e6, 1.0, 8e6, 0.4),
          translucencyByDistance: new Cesium.NearFarScalar(1e6, 1.0, 1.2e7, 0.0),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      })

      entity._itemData = item
      entitiesRef.current[item.id] = entity
    })
  }

  return (
    <div className="globe-container">
      <div ref={containerRef} className="globe-viewer" />
      {isLoading && (
        <div className="globe-loading">
          <div className="globe-spinner" />
        </div>
      )}
      
      {/* 화면의 우측 하단 컨트롤 */}
      <div className="globe-controls">
        <button 
          className={`control-btn ${showLabels ? 'active' : ''}`}
          onClick={() => setShowLabels(!showLabels)}
          title={locale === 'ko' ? '지명 표시' : 'Toggle Labels'}
        >
          <Map size={20} />
        </button>
        <button 
          className={`control-btn ${autoRotate ? 'active' : ''}`}
          onClick={() => setAutoRotate(!autoRotate)}
          title={locale === 'ko' ? '자동 회전' : 'Auto Rotate'}
        >
          <RotateCw size={20} />
        </button>
        <button 
          className="control-btn"
          onClick={handleResetView}
          title={locale === 'ko' ? '시점 초기화' : 'Reset View'}
        >
          <Focus size={20} />
        </button>
      </div>
    </div>
  )
}
