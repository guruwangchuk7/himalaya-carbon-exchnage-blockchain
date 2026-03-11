# Project Todo

Source documents:
- `src/docs/prd.pdf`
- `src/docs/design.pdf`
- `src/docs/techstack.pdf`

Implementation rule:
- Preserve the approved visual direction. Do not change the current design language unless a new design revision is approved.

## 1. Project Setup And Baseline
- [x] Confirm the scope and success criteria from PRD, design, and tech stack docs.
- [x] Freeze the current approved landing page as the visual baseline.
- [x] Clean the repository structure for app sections, shared UI, assets, and docs.
- [x] Replace placeholder README content with project-specific setup and run instructions.
- [x] Define environment variables, deployment assumptions, and build commands.

## 2. Design System Foundation
- [x] Finalize design tokens in code: color, spacing, radii, shadows, typography, motion.
- [x] Centralize reusable text styles and section spacing utilities.
- [x] Audit all hardcoded colors, spacing, and radius values against the token system.
- [x] Standardize interactive states for buttons, links, cards, and form controls.
- [x] Create a shared motion pattern set for reveal, hover lift, and scroll transform behavior.

## 3. Shared UI Components
- [x] Finalize reusable `Button` variants and semantic usage rules.
- [x] Normalize shared card primitives for feature cards, pricing cards, and footer panels.
- [x] Create a shared section header pattern for eyebrow, title, and supporting copy.
- [x] Extract shared list and icon-row patterns where repeated.
- [x] Ensure every shared component has responsive and accessible defaults.

## 4. Header And Hero
- [x] Finalize sticky navigation behavior and responsive layout.
- [x] Add a mobile navigation variant instead of hiding desktop links only.
- [x] Verify hero content hierarchy, CTA grouping, and dashboard mockup placement.
- [x] Tune hero scroll reveal/parallax behavior for performance and visual subtlety.
- [x] Validate hero spacing and readability across desktop, tablet, and mobile.

## 5. Social Proof And Logo Ticker
- [x] Finalize trusted-by messaging and brand/logo treatment.
- [x] Ensure ticker loop is seamless and does not clip on small screens.
- [x] Add reduced-motion handling for continuous logo animation.
- [x] Confirm gradient edge masking and contrast remain consistent across breakpoints.

## 6. Feature Story Sections
- [x] Finalize alternating feature section content and media assets.
- [x] Replace any placeholder copy or mock content with approved product messaging.
- [x] Verify two-column layout collapse behavior on tablet and mobile.
- [x] Standardize CTA usage and destination behavior inside feature sections.
- [x] Optimize media assets for performance and responsive loading.

## 7. Bento Feature Grid
- [x] Lock the Bento grid information architecture and final card count.
- [x] Validate desktop two-column composition and mobile single-column stacking.
- [x] Ensure each card supports tokenized icon, title, description, and hover states.
- [x] Add staggered appear animation using a shared motion preset.
- [x] Review card density, spacing, and scannability against the approved design.

## 8. Pricing Section
- [x] Finalize plan tiers, billing copy, and CTA language from the PRD.
- [x] Validate monthly/annual toggle behavior and pricing state transitions.
- [x] Confirm the featured middle plan treatment and savings badge logic.
- [x] Ensure pricing cards remain aligned and readable across all breakpoints.
- [x] Add reduced-motion-safe behavior for toggle and card hover interactions.

## 9. Footer And Conversion Layer
- [x] Finalize footer content, link groups, and newsletter capture behavior.
- [x] Replace placeholder links with real routes or mark them intentionally disabled.
- [x] Validate footer contrast, form accessibility, and keyboard navigation.
- [x] Confirm closing CTA and footer reinforce the same conversion path.

## 10. Content And Product Messaging
- [x] Reconcile all on-page copy with the PRD and approved marketing voice.
- [x] Remove placeholder product names, labels, or demo-only metrics.
- [x] Ensure headings, metadata, and CTA labels match the final positioning.
- [x] Review SEO-critical copy in metadata, hero, and section headings.

## 11. Accessibility And Semantics
- [x] Verify semantic landmarks: `main`, `nav`, `section`, `article`, `footer`.
- [x] Confirm heading order is valid across the full page.
- [x] Audit interactive elements for focus states, labels, and keyboard support.
- [x] Add `prefers-reduced-motion` handling for all non-essential animations.
- [x] Run a contrast audit on all text, badges, buttons, and muted UI states.

## 12. Performance And Frontend Quality
- [x] Optimize image sizes and delivery strategy for hero and feature media.
- [x] Review bundle impact of animation and icon usage.
- [x] Eliminate layout shift risks in navigation, hero media, and pricing cards.
- [x] Add loading and rendering checks for slower devices and narrow screens.
- [x] Confirm Lighthouse targets for performance, accessibility, and best practices.

## 13. Sovereign Registry & Article 6
- [x] High-integrity ERC1155 Smart Contract (HimalayaCarbonRegistry.sol).
- [x] Article 6.2 Compliance fields (ITMO ID, Corresponding Adjustment Status).
- [x] Institutional Participant Whitelist (Cross-border transfer guards).
- [x] On-chain Retirement with detailed Beneficiary and Purpose tracking.
- [x] Registry Dashboard with Live CAD Trust Bridge visualization.
- [x] Carbon Marketplace with Price Discovery and Volume indexing.
- [x] Sovereign Retirement Workflow generating verifiable impact certificates.

## 14. QA And Release
## 14. QA And Release
- [x] Test layout and interactions on desktop, tablet, and mobile breakpoints.
- [x] Verify behavior in current Chrome, Edge, Safari, and Firefox.
- [x] Run linting and any project test suite before release.
- [x] Prepare release notes and a short implementation summary mapped to the source docs.
- [x] Mark completed tasks and convert remaining open items into backlog tickets.

## 15. Backend Integration (Supabase)
- [x] **Phase 1: Foundation & Secure Environment** (Auth & APIs).
- [ ] **Phase 2: Compliance, Identity & Workflows** (Postgres DB Schema).
- [ ] **Phase 3: Web3 Indexing & Market Discovery** (Viem Sync).
- [ ] **Phase 4: Off-Chain Trading Engine** (RFQ Order Book).

## Recommended Execution Order
1. Design system foundation
2. Shared UI components
3. Header and hero
4. Feature sections and Bento grid
5. Pricing
6. Footer and conversion layer
7. Accessibility and performance
8. QA and release
9. Phase 1: Foundation & Secure Environment
10. Phase 2: Compliance, Identity & Workflows
11. Phase 3: Web3 Indexing & Market Discovery
12. Phase 4: Off-Chain Trading Engine
