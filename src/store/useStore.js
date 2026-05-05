import { create } from 'zustand'

const getInitialTheme = () => {
  const saved = localStorage.getItem('chronos-theme')
  if (saved) return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getInitialLocale = () => {
  const saved = localStorage.getItem('chronos-locale')
  if (saved) return saved
  return navigator.language.startsWith('ko') ? 'ko' : 'en'
}

const useStore = create((set, get) => ({
  // 선택된 아이템
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
  clearSelected: () => set({ selectedItem: null }),

  // 필터
  filters: {
    eras: [],
    regions: [],
    categories: [],
    itemType: 'all', // 'all' | 'event' | 'person'
    mediaTypes: [],  // 'movie' | 'novel' | 'music'
    importance: 1,
    search: '',
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () =>
    set({
      filters: {
        eras: [],
        regions: [],
        categories: [],
        itemType: 'all',
        mediaTypes: [],
        importance: 1,
        search: '',
      },
    }),

  // 테마
  theme: getInitialTheme(),
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('chronos-theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    set({ theme: newTheme })
  },

  // 언어
  locale: getInitialLocale(),
  toggleLocale: () => {
    const newLocale = get().locale === 'ko' ? 'en' : 'ko'
    localStorage.setItem('chronos-locale', newLocale)
    set({ locale: newLocale })
  },

  // 상세 패널 탭
  detailTab: 'wiki', // 'wiki' | 'media'
  setDetailTab: (tab) => set({ detailTab: tab }),

  // 뷰 모드: split-cg | split-cd | split-gd | chronicle | globe | detail
  viewMode: 'split-cg',
  setViewMode: (mode) => set({ viewMode: mode }),
}))

export default useStore
