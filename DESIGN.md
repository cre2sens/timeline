# Design System — 세계 역사 연대기 / World History Chronicle

## Product Context
- **What this is:** An interactive bilingual (KO/EN) historical atlas — events and figures spanning ancient to contemporary eras, with a 3D globe, accordion timeline, and wiki-style event detail panel.
- **Who it's for:** History enthusiasts, students, and researchers who want depth and authority. Primary audience: Korean speakers; secondary: English.
- **Space/industry:** Educational / historical reference / scholarly web app.
- **Project type:** Data-dense web app with editorial presentation layer.

## Aesthetic Direction
- **Direction:** Editorial / Archival — warm, precise, museum-catalog feel.
- **Decoration level:** Intentional — glassmorphism on floating panels, subtle warm shadows. No decorative patterns or gradients on surfaces.
- **Mood:** A well-curated museum exhibit at night. Authoritative without being cold. History as something worth spending time with.
- **Rationale:** The category splits between dry GIS-style apps (cool, functional, lifeless) and photo-driven editorial sites (beautiful, slow to navigate). The gap is scholarly AND browsable — data-dense panels with editorial typographic hierarchy.

## Typography

### Font Stack
- **Display / Era headers / Event titles (detail view):** `'Noto Serif KR', 'Noto Serif', Georgia, serif`
  — Handles both Korean and Latin scripts with historical gravitas. The serif voice gives era headers and detail-panel titles the weight of archival text.
- **Body / UI / Navigation / Labels:** `'Pretendard Variable', 'Pretendard', -apple-system, sans-serif`
  — The best Korean variable font available. Excellent Latin subset. Handles all data-dense UI at any weight.
- **Data / Timestamps:** Pretendard with `font-variant-numeric: tabular-nums` — already in use, keep it.
- **Code / IDs:** No separate code font needed; Pretendard handles it at mono weight if needed.

### Loading
```html
<!-- Noto Serif KR (display) -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
<!-- Pretendard Variable (body/UI) — already loaded via CDN -->
<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet">
```

### Type Scale
| Level | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| Hero | Noto Serif KR | clamp(2.2rem, 5vw, 3.6rem) | 700 | Landing / loading screen |
| H1 | Noto Serif KR | 1.6–2rem | 700 | Era headers in detail view |
| H2 | Noto Serif KR | 1.2–1.5rem | 700 | Event titles in detail panel |
| H3 | Noto Serif KR | 1rem | 600 | Section headers |
| Body | Pretendard | 0.88–1rem | 400 | Descriptions, wiki text |
| UI Label | Pretendard | 0.78–0.88rem | 500–600 | Panel labels, navigation |
| Caption | Pretendard | 0.68–0.72rem | 400–600 | Timestamps, counts, badges |
| Data | Pretendard | 0.78rem | 400 | tabular-nums — dates, stats |

### Korean Typography Notes
- Era headers (고대, 중세, etc.) use Noto Serif KR — this is the differentiating move. No current competitor in this space invests in Korean serif display.
- Body Korean text stays in Pretendard — optimal density and readability at small sizes.
- Korean line-height: 1.7–1.8 for body, 1.2–1.3 for display.

## Color

### Approach
Restrained — one accent color (cartographic gold), warm neutrals, semantic colors only where functional. Color is rare and meaningful.

### Light Theme
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#F7F5F0` | Main app background (warm parchment, replaces cool #F5F5FA) |
| `--bg-secondary` | `#FEFCF8` | Cards, panels, sidebar (warm white) |
| `--bg-tertiary` | `#EEECE6` | Hover states, input backgrounds |
| `--bg-glass` | `rgba(254,252,248,0.82)` | Glassmorphism: topbar, floating panels |
| `--text-primary` | `#1C1917` | Main text (warm charcoal, replaces blue-black #1A1A2E) |
| `--text-secondary` | `#4A4540` | Secondary text, descriptions |
| `--text-tertiary` | `#8B8680` | Muted: dates, counts, placeholders |
| `--accent-primary` | `#B5860D` | Cartographic gold — active states, selection, links |
| `--accent-primary-hover` | `#9A7209` | Gold hover |
| `--accent-muted` | `rgba(181,134,13,0.12)` | Gold tint backgrounds |
| `--border` | `rgba(28,25,23,0.08)` | Default dividers |
| `--border-strong` | `rgba(28,25,23,0.15)` | Emphasized borders |
| `--shadow-sm` | `0 1px 4px rgba(28,25,23,0.06)` | |
| `--shadow-md` | `0 4px 16px rgba(28,25,23,0.08)` | |
| `--shadow-lg` | `0 8px 32px rgba(28,25,23,0.10)` | |

### Dark Theme
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#110F0C` | Museum-gallery warm black (replaces blue-black #0A0A1A) |
| `--bg-secondary` | `#1A1714` | Dark warm brown-black |
| `--bg-tertiary` | `#242018` | Slightly lighter surface |
| `--bg-glass` | `rgba(26,23,20,0.90)` | Glassmorphism dark |
| `--text-primary` | `#EDE9E0` | Warm off-white (replaces cold #E8E8F0) |
| `--text-secondary` | `#9A9080` | Warm medium |
| `--text-tertiary` | `#635C52` | Warm muted |
| `--accent-primary` | `#D4A017` | Brighter gold for dark mode contrast |
| `--accent-primary-hover` | `#E6B420` | |
| `--accent-muted` | `rgba(212,160,23,0.14)` | |
| `--border` | `rgba(237,233,224,0.07)` | |
| `--border-strong` | `rgba(237,233,224,0.13)` | |
| `--shadow-sm` | `0 1px 4px rgba(0,0,0,0.25)` | |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.35)` | |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.50)` | |

### Semantic Colors
| Role | Light | Dark |
|------|-------|------|
| Success | `#3D7A4A` | `#52A468` |
| Warning | `#B5700D` | `#D4A017` (same as accent) |
| Error | `#C0392B` | `#E05252` |
| Info | `#2C5F8A` | `#5B8DB8` |

### Era Colors
Unchanged from original — already warm-appropriate. One correction:

| Era | Color | Note |
|-----|-------|------|
| `--era-ancient` | `#C9A96E` | Warm amber |
| `--era-medieval` | `#8B5E3C` | Warm brown |
| `--era-early-modern` | `#4A7C59` | Forest green |
| `--era-modern` | `#4A6FA5` | Slate blue |
| `--era-contemporary` | `#5A72A0` | **Changed from #7B73FF** (violet AI slop → slate indigo) |

Dark mode era colors: increase lightness ~10% as before, use the same warm offset.

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable (between compact and spacious — data-dense app with readable breathing room)

| Token | Value |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-3xl` | 64px |

## Layout
- **Approach:** Grid-disciplined — strict panel columns, predictable alignment. App panels use `flex` layout (as implemented). No creative-editorial asymmetry inside panels.
- **Max content width:** 1440px (full-bleed app, panels fill viewport)
- **Breakpoint:** 768px mobile/desktop split (as implemented)

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `4px` | Badges, inputs, small chips |
| `--radius-md` | `8px` | Buttons, cards, event rows |
| `--radius-lg` | `12px` | Panel containers, modal frames |
| `--radius-xl` | `20px` | Bottom sheet, large modals |
| `--radius-pill` | `9999px` | Mode dock, era count badges |

## Motion
- **Approach:** Minimal-functional — transitions that aid comprehension. No choreography for its own sake.
- **Easing:** `ease` for enter, `ease` for exit, `ease-in-out` for move.
- **Duration:**
  - Micro (hover states): 150ms
  - Short (mode crossfade, panel open/close): 150ms — the existing `ws-fading` transition is correct, keep it.
  - Medium (bottom sheet slide): 250ms
  - Long: reserved for Cesium camera moves (controlled by CesiumJS)

## Design Risks Taken
These are deliberate departures from category conventions — what makes this product visually distinctive:

1. **Noto Serif KR for display** — Most Korean apps go all-sans. Serif era headers and detail-panel titles create editorial drama. Risk: slight font load overhead. Gain: genuine archival gravitas that no competitor has.

2. **Antique gold accent (#B5860D / #D4A017)** — Nobody in the history/atlas app category uses cartographic gold as the UI accent color. Every competitor uses blue or purple. Risk: could read as "treasure hunt" if overused — keep it to active states, selection highlights, and key labels. Gain: immediately distinctive, historically resonant, warm without being garish.

3. **Warm dark mode base (#110F0C)** — The previous dark was a blue-black (#0A0A1A). This warm near-black reads like a museum gallery at night — intimate and focused. Risk: requires careful calibration to avoid muddiness (maintain contrast ratios). Gain: entirely unique in the space; long reading sessions feel comfortable, not harsh.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-07 | Initial design system created via /design-consultation | Scholarly/archival direction, fresh color direction, research-informed |
| 2026-05-07 | Replaced #6C63FF violet accent with #B5860D cartographic gold | Violet is AI slop default; gold is historically resonant and category-distinctive |
| 2026-05-07 | Added Noto Serif KR as display font alongside existing Pretendard | Era headers and detail titles benefit from serif gravitas |
| 2026-05-07 | Shifted backgrounds warm (#F7F5F0 light, #110F0C dark) | Removes cool blue cast; warm parchment and museum-black are appropriate for archival content |
| 2026-05-07 | Changed --era-contemporary from #7B73FF to #5A72A0 | Violet was jarring and inconsistent with the era color gradient's warm-to-cool logic |
