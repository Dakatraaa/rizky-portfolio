---
name: Kalcer Studio System
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#5c4037'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#907065'
  outline-variant: '#e5beb2'
  surface-tint: '#aa3600'
  primary: '#a63500'
  on-primary: '#ffffff'
  primary-container: '#d04400'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59c'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#6a5f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#bfac00'
  on-tertiary-container: '#484000'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59c'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#822700'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#fde400'
  tertiary-fixed-dim: '#dec800'
  on-tertiary-fixed: '#201c00'
  on-tertiary-fixed-variant: '#504700'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 46px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 46px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  code-badge:
    fontFamily: Space Mono
    fontSize: 13px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-stamp:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system expresses the multi-disciplinary creative identity of an informatics student, graphic designer, runner, and technologist. It synthesizes Indonesian street/youth culture ("kalcer") with editorial collage, neo-brutalist tactile primitives, and retro-computing pixel nostalgia.

### Core Tenets
- **Collage Energy:** Tactile paper layering, stamp marks, tape strips, and controlled asymmetry give the feeling of an active physical sketchbook and workspace.
- **Neo-Brutalist Tactility:** Heavy crisp borders, unblurred solid offset shadows, and deliberate physical click depression on interaction create clear visual affordance.
- **Pixel & Code Precision:** Strict monospace badges, terminal status indicators, and 8-bit accents ground the creative chaos in computing discipline and running performance telemetry.
- **Intentional Chaos within Structure:** Layouts allow deliberate rotation tilts (-1.5° to 2°) and overlapping fragments, while retaining a solid underlying responsive grid and readable content hierarchy.

## Colors

The palette draws inspiration from silkscreen printing, warm newsprint, and terminal screens. High-saturation accent inks sit atop tactile cream surfaces bounded by stark dark ink.

### Palette Architecture
- **Paper & Ground:**
  - Base Ground: `#FAF8F5` (Warm Newsprint Paper)
  - Secondary Canvas / Graph: `#F2EFE9` (Warm Technical Paper)
  - Card & Plate Surface: `#FFFFFF` (Clean Cutout White)
  - Inverted / Terminal Dark: `#141414` (Pitch Blackboard)
- **Ink & Boundaries:**
  - Heavy Ink / Borders: `#111111` (Carbon Black)
  - Muted Ink: `#666666` (Annotation Charcoal)
  - Hairline Guide: `#E2DDD5` (Graph Paper Grid lines)
- **Graphic Accent Inks:**
  - Primary Accent: `#FF5500` (Hyper Orange) – primary calls to action, urgent stamps.
  - Secondary Accent: `#2563EB` (Electric Cobalt) – technical highlights, code links, telemetry.
  - Tertiary Accent: `#FFE600` (Highlighter Yellow) – tape highlights, adhesive tags.
  - Support Acid: `#B4F51C` (Tennis Ball / Acid Lime) – runner milestones, status badges.
  - Support Punch: `#FF3E83` (Bubblegum Pink) – stickers, category badges.
  - Terminal Green: `#10B981` (Emerald Shell) – live status dots, git commit trackers.

### Usage Rules
- Use `#111111` for all structural borders (2px or 3px solid) and text copy. Avoid pure gray borders for interactive primitives.
- Never use soft alpha drop shadows; all shadows must be solid `#111111` with 100% opacity.
- Accent colors should be applied as flat, ungradated spot fills behind badges, stickers, and hover states.

## Typography

The typography engine is built on a clear functional triumvirate:
1. **Space Grotesk (Display & Headers):** Unapologetic geometric forms with idiosyncratic ink-traps that evoke raw print design and modern brutalist web aesthetics. Set tight with negative letter-spacing for headlines.
2. **Plus Jakarta Sans (Body & Context):** A clear, warm humanist-geometric workhorse providing fatigue-free legibility across reading blocks, case study copy, and captions.
3. **Space Mono (Telemetry, Badges & Labels):** Fixed-width mechanical rhythm reserved for metadata, running pace metrics, git commit hashes, code blocks, stamp badges, and UI status strings.

### Editorial Styling Directives
- **Stamps & Badges:** Must be transformed to uppercase with `letter-spacing: 0.06em` or wider.
- **Accents:** Key phrases can be paired with pseudo-marker underlays or highlighter yellow spans (`#FFE600`) with small rotation tilts.

## Layout & Spacing

Layouts use a structured 12-column grid container overlaying an optional 24px x 24px subtle background graph paper pattern (`#E2DDD5` grid lines on `#FAF8F5`).

### Grid & Breakpoints
- **Desktop (≥ 1024px):** 12 columns, 24px (`1.5rem`) gutter, 32px to 64px section margins. Max content width constrained to 1280px.
- **Tablet (768px - 1023px):** 8 columns, 20px gutter, 24px section margins.
- **Mobile (< 768px):** 4 columns, 16px (`1rem`) gutter, 16px section margins.

### Dynamic Offset & Collage Rules
- **Layer Offset Spacing:** Sticker badges and decorative masking tape strips break standard parent bounding boxes by negative margins (`-0.5rem` to `-1rem`) or absolute pin positions.
- **Asymmetric Offsets:** Content cards within gallery grids can alternate between regular placement and slight row-level offsets (`translateY(8px)` on even columns) on desktop viewports.

## Elevation & Depth

This design system rejects ambient blurred shadows in favor of **hard-edge neo-brutalist offset block shadows** and physical print layers.

### Elevation Scale
- **Level 0 (Flat Ground):** Graph paper canvas background, flush panels, non-interactive cutouts. Border: none or 1px dashed `#666666`.
- **Level 1 (Card & Container):** Solid 2.5px border `#111111` with a hard offset block shadow: `4px 4px 0px #111111`.
- **Level 2 (Floating Module / Sticker Pill):** Solid 2.5px border `#111111` with an elevated block shadow: `6px 6px 0px #111111`.
- **Level 3 (Modal / Mascot Dialog / Pinned Sheet):** Solid 3px border `#111111` with high-impact block shadow: `8px 8px 0px #111111`.

### Interactive Motion & Press Dynamics
- On hover, interactive primitives shift outward (`transform: translate(-2px, -2px)`) while extending the block shadow from `4px 4px 0px #111111` to `6px 6px 0px #111111`.
- On active click/press, primitives push fully inward: `transform: translate(3px, 3px)` with the shadow collapsing to `1px 1px 0px #111111`. This produces an immediate tactile physical button snap.

## Shapes

The primary shape philosophy is tight, architectural, and slightly softened (`roundedness: 1`). Edges maintain a crisp graphic cutoff rather than bulbous rounds, reserving full pill shapes exclusively for sticker tags and status pills.

### Geometry Details
- **Cards, Frames, Input Boxes:** Base radius of `4px` (`0.25rem`) with 2px to 3px solid `#111111` borders.
- **Buttons:** Radius of `4px` (`0.25rem`) for compact punchiness.
- **Status Pills, Sticker Tags, Tape Cutouts:** Full pill radius (`9999px`) or sheer 0px chamfered edge for tape strips.
- **Tape Strip Elements:** Rectangles with irregular jagged left/right masked edges or semi-translucent adhesive look (`rgba(255, 230, 0, 0.85)`).
- **Collage Tilts:** Elements may employ controlled static CSS rotations:
  - Slight Counter-Clockwise: `rotate(-1.5deg)`
  - Slight Clockwise: `rotate(1deg)`
  - Accent Badge Punch: `rotate(-3deg)`

## Components

### 1. Chunky Neo-Brutalist Buttons
- **Primary:** Background `#FF5500` (or `#FFE600`), text `#111111`, border 2.5px solid `#111111`, radius 4px, font Space Grotesk Bold. Shadow `4px 4px 0px #111111`.
- **Secondary:** Background `#FFFFFF`, text `#111111`, border 2.5px solid `#111111`, radius 4px. Shadow `4px 4px 0px #111111`.
- **Terminal / Dark:** Background `#111111`, text `#FFFFFF`, border 2px solid `#FFFFFF`, shadow `4px 4px 0px #2563EB`.
- **Interaction:** Smooth active transform to `translate(3px, 3px)` with shadow reducing to `1px 1px 0px #111111`.

### 2. Project & Showcase Cards
- Surface `#FFFFFF` with 2.5px solid `#111111` border, 4px corner radius, and `5px 5px 0px #111111` hard shadow.
- Header contains an attached "Masking Tape" strip (e.g., `#FFE600` badge centered or pinned at -1° tilt on top border edge).
- Card footer displays project stack tags in Space Mono and status markers.

### 3. Masking Tape & Digital Collage Stickers
- Rectangular ribbons overlapping borders with `0.85` opacity, containing bold uppercase metadata (e.g. `// WIP`, `RELEASE 2.4`, `PARK RUN 5KM`).
- Rotation locked to `-2deg` or `1.5deg`.
- Stamp overlays: circular SVG borders with rubber-stamp text (`"APPROVED"`, `"VERIFIED BY MASCOT"`), rendered in `#FF5500` or `#2563EB` with slight opacity texture.

### 4. Runner & Tech Metric Chips
- Pill-shaped (`rounded-full`) or crisp box with 1.5px `#111111` border.
- Space Mono bold font, size 12px.
- Background variations: `#B4F51C` (running metrics: `PACE 4'30" / 10KM`), `#D9F99D` (commits), `#FF3E83` (design drafts).

### 5. Form Inputs & Text Fields
- Background `#FFFFFF` with 2px solid `#111111` border, 4px corner radius.
- Inset label or floating mono label above input: `label-stamp` style.
- Focus State: Outline none, border 2.5px solid `#2563EB`, and hard offset shadow `3px 3px 0px #2563EB`.

### 6. Mascot Landing Pedestal & Dialogue Bubbles
- **8-Bit Pedestal Anchor:** Positioned at corner intersections; uses a 2px stepped pixel border or checkerboard platform (`#111111` and `#FFFFFF` 4px squares).
- **Pixel Speech Bubble:** Surface `#FFFFFF` with 2px `#111111` border, directional triangle tail, containing Space Mono copy and an animated live green pulse dot (`#10B981`).