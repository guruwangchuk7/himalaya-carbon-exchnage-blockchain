# Project Todo

Source documents:
- `src/docs/prd.pdf`
- `src/docs/design.pdf`
- `src/docs/techstack.pdf`

Implementation rule:
- Preserve the approved visual direction. Do not change the current design language unless a new design revision is approved.

## 1. Project Setup And Baseline
- [ ] Confirm the scope and success criteria from PRD, design, and tech stack docs.
- [ ] Freeze the current approved landing page as the visual baseline.
- [ ] Clean the repository structure for app sections, shared UI, assets, and docs.
- [ ] Replace placeholder README content with project-specific setup and run instructions.
- [ ] Define environment variables, deployment assumptions, and build commands.

## 2. Design System Foundation
- [ ] Finalize design tokens in code: color, spacing, radii, shadows, typography, motion.
- [ ] Centralize reusable text styles and section spacing utilities.
- [ ] Audit all hardcoded colors, spacing, and radius values against the token system.
- [ ] Standardize interactive states for buttons, links, cards, and form controls.
- [ ] Create a shared motion pattern set for reveal, hover lift, and scroll transform behavior.

## 3. Shared UI Components
- [ ] Finalize reusable `Button` variants and semantic usage rules.
- [ ] Normalize shared card primitives for feature cards, pricing cards, and footer panels.
- [ ] Create a shared section header pattern for eyebrow, title, and supporting copy.
- [ ] Extract shared list and icon-row patterns where repeated.
- [ ] Ensure every shared component has responsive and accessible defaults.

## 4. Header And Hero
- [ ] Finalize sticky navigation behavior and responsive layout.
- [ ] Add a mobile navigation variant instead of hiding desktop links only.
- [ ] Verify hero content hierarchy, CTA grouping, and dashboard mockup placement.
- [ ] Tune hero scroll reveal/parallax behavior for performance and visual subtlety.
- [ ] Validate hero spacing and readability across desktop, tablet, and mobile.

## 5. Social Proof And Logo Ticker
- [ ] Finalize trusted-by messaging and brand/logo treatment.
- [ ] Ensure ticker loop is seamless and does not clip on small screens.
- [ ] Add reduced-motion handling for continuous logo animation.
- [ ] Confirm gradient edge masking and contrast remain consistent across breakpoints.

## 6. Feature Story Sections
- [ ] Finalize alternating feature section content and media assets.
- [ ] Replace any placeholder copy or mock content with approved product messaging.
- [ ] Verify two-column layout collapse behavior on tablet and mobile.
- [ ] Standardize CTA usage and destination behavior inside feature sections.
- [ ] Optimize media assets for performance and responsive loading.

## 7. Bento Feature Grid
- [ ] Lock the Bento grid information architecture and final card count.
- [ ] Validate desktop two-column composition and mobile single-column stacking.
- [ ] Ensure each card supports tokenized icon, title, description, and hover states.
- [ ] Add staggered appear animation using a shared motion preset.
- [ ] Review card density, spacing, and scannability against the approved design.

## 8. Pricing Section
- [ ] Finalize plan tiers, billing copy, and CTA language from the PRD.
- [ ] Validate monthly/annual toggle behavior and pricing state transitions.
- [ ] Confirm the featured middle plan treatment and savings badge logic.
- [ ] Ensure pricing cards remain aligned and readable across all breakpoints.
- [ ] Add reduced-motion-safe behavior for toggle and card hover interactions.

## 9. Footer And Conversion Layer
- [ ] Finalize footer content, link groups, and newsletter capture behavior.
- [ ] Replace placeholder links with real routes or mark them intentionally disabled.
- [ ] Validate footer contrast, form accessibility, and keyboard navigation.
- [ ] Confirm closing CTA and footer reinforce the same conversion path.

## 10. Content And Product Messaging
- [ ] Reconcile all on-page copy with the PRD and approved marketing voice.
- [ ] Remove placeholder product names, labels, or demo-only metrics.
- [ ] Ensure headings, metadata, and CTA labels match the final positioning.
- [ ] Review SEO-critical copy in metadata, hero, and section headings.

## 11. Accessibility And Semantics
- [ ] Verify semantic landmarks: `main`, `nav`, `section`, `article`, `footer`.
- [ ] Confirm heading order is valid across the full page.
- [ ] Audit interactive elements for focus states, labels, and keyboard support.
- [ ] Add `prefers-reduced-motion` handling for all non-essential animations.
- [ ] Run a contrast audit on all text, badges, buttons, and muted UI states.

## 12. Performance And Frontend Quality
- [ ] Optimize image sizes and delivery strategy for hero and feature media.
- [ ] Review bundle impact of animation and icon usage.
- [ ] Eliminate layout shift risks in navigation, hero media, and pricing cards.
- [ ] Add loading and rendering checks for slower devices and narrow screens.
- [ ] Confirm Lighthouse targets for performance, accessibility, and best practices.

## 13. QA And Release
- [ ] Test layout and interactions on desktop, tablet, and mobile breakpoints.
- [ ] Verify behavior in current Chrome, Edge, Safari, and Firefox.
- [ ] Run linting and any project test suite before release.
- [ ] Prepare release notes and a short implementation summary mapped to the source docs.
- [ ] Mark completed tasks and convert remaining open items into backlog tickets.

## Recommended Execution Order
1. Design system foundation
2. Shared UI components
3. Header and hero
4. Feature sections and Bento grid
5. Pricing
6. Footer and conversion layer
7. Accessibility and performance
8. QA and release
