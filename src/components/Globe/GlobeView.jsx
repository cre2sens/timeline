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
  const { selectedItem, setSelectedItem, locale, theme } = useStore()

  // 컨트롤 상태
  const [showLabels, setShowLabels] = useState(false)
  const [autoRotate, setAutoRotate] = useState(false)

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

        viewerRef.current = viewer

        // 마커 추가
        addMarkers(Cesium, viewer, items)

        // 클릭 이벤트
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        handler.setInputAction((click) => {
          const picked = viewer.scene.pick(click.position)
          if (Cesium.defined(picked) && picked.id && picked.id._itemData) {
            setSelectedItem(picked.id._itemData)
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
    if (!viewerRef.current) return

    const updateMarkers = async () => {
      const Cesium = await import('cesium')
      viewerRef.current.entities.removeAll()
      entitiesRef.current = {}
      addMarkers(Cesium, viewerRef.current, items)
    }

    updateMarkers()
  }, [items, locale])

  // 선택 아이템 변경 시 카메라 이동
  useEffect(() => {
    if (!selectedItem || !viewerRef.current) return

    const flyToItem = async () => {
      const Cesium = await import('cesium')
      const coords = selectedItem.location?.coordinates || selectedItem.birthPlace?.coordinates
      if (!coords) return

      viewerRef.current.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(coords.lng, coords.lat, 3000000),
        duration: 1.5,
      })

      // 선택 마커 하이라이트
      const entity = entitiesRef.current[selectedItem.id]
      if (entity) {
        viewerRef.current.selectedEntity = entity
      }
    }

    flyToItem()
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
          // Google Maps 투명 라벨/도로 타일 (hl 파라미터로 언어 설정 가능)
          const provider = new Cesium.UrlTemplateImageryProvider({
            url: `https://mt1.google.com/vt/lyrs=h&hl=${locale}&x={x}&y={y}&z={z}`,
            maximumLevel: 19
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

  function addMarkers(Cesium, viewer, itemsToAdd) {
    itemsToAdd.forEach((item) => {
      const coords = item.location?.coordinates || item.birthPlace?.coordinates
      if (!coords) return

      const eraColor = getEraColor(item.era)
      const title = item.title[locale] || item.title.ko
      const icon = item.icon || '📌'

      const entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(coords.lng, coords.lat),
        point: {
          pixelSize: 10,
          color: Cesium.Color.fromCssColorString(eraColor),
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
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
        },
      })

      entity._itemData = item
      entitiesRef.current[item.id] = entity
    })
  }

  return (
    <div className="globe-container">
      <div ref={containerRef} className="globe-viewer" />
      
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
