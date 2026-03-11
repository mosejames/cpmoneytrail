# CP Money Trail — Denmark Ashby Exposé: Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build cpmoneytrail.com — a scrollable investigative exposé page revealing $847,293 in legal spending by the City of College Park to Denmark Ashby LLC, plus 15-20 shareable social media graphics, all dropped simultaneously.

**Architecture:** Single-page static HTML site with embedded CSS/JS (no build tools). Chart.js for data visualizations. Social graphics as standalone HTML files rendered to PNG via browser screenshot. All data hardcoded from invoice analysis — no backend needed.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Chart.js (CDN), Google Fonts

**Source Data:** `/Users/mosejames/Desktop/Claude on Desktop/Denmark_Invoice_Analysis.md`

---

## File Structure

```
CP Money Trail/
├── PLAN.md                    # This file
├── index.html                 # The anchor page (full scrollable exposé)
├── assets/
│   └── og-image.png           # Open Graph preview image for social sharing
├── social/
│   ├── card-01-total.html     # "$847,293 to ONE law firm"
│   ├── card-02-monthly.html   # "$136,000 in a single month"
│   ├── card-03-crisis-pr.html # "$24,140 for crisis PR"
│   ├── card-04-raise.html     # "52% raise, no vote"
│   ├── card-05-lobbying.html  # "$49,140 in non-legal consulting"
│   ├── card-06-redacted.html  # "They stopped describing charges"
│   ├── card-07-dumas.html     # "$10,146 on one personnel matter"
│   ├── card-08-rogers.html    # "$10,292 for code enforcement"
│   ├── card-09-po.html        # "$1.38M in purchase orders"
│   ├── card-10-meetings.html  # "$46K+ just for 'Meetings'"
│   ├── card-11-10hrs.html     # "10.3 hours billed in one day"
│   ├── card-12-lanier.html    # "$1,365 for a Lake Lanier retreat"
│   ├── card-13-internal.html  # "Your money funding internal fights"
│   ├── card-14-hold.html      # "Invoice marked HOLD in red"
│   ├── card-15-questions.html # "8 questions your council won't answer"
│   └── README.md              # Instructions for screenshotting cards to PNG
└── data.js                    # All invoice data as JS objects (shared by page + cards)
```

---

## Chunk 1: Data Layer + Page Skeleton

### Task 1: Create the data file

All invoice data extracted from the analysis, structured as JavaScript objects. This is the single source of truth for both the main page and social cards.

**Files:**
- Create: `data.js`

- [ ] **Step 1: Create data.js with all invoice and pattern data**

```javascript
// CP Money Trail — Invoice Data
// Source: Open Records Request, Denmark Ashby LLC invoices to City of College Park

const DATA = {
  summary: {
    totalSpent: 847293.93,
    legalFees: 771358.94,
    subcontractorPassthroughs: 75934.99,
    totalPurchaseOrders: 1463935,
    invoiceCount: 23,
    timespan: "August 2023 — December 2024",
    firmName: "Denmark Ashby LLC",
    principalAttorney: "Winston A. Denmark"
  },

  invoices: [
    { rank: 1, number: "2182", date: "2024-11-01", amount: 88350.46, type: "Legal", desc: "General/Litigation — nearly all descriptions redacted" },
    { rank: 2, number: "1825", date: "2024-02-01", amount: 78017.69, type: "Legal", desc: "40+ matters, 53.5 hrs of 'Meetings'" },
    { rank: 3, number: "1863", date: "2024-03-01", amount: 75770.00, type: "Legal", desc: "405.1 total hours — highest of any invoice" },
    { rank: 4, number: "2193", date: "2024-12-01", amount: 71532.00, type: "Legal", desc: "Format stripped attorney names/rates. $10,146 Dumas matter" },
    { rank: 5, number: "1808", date: "2024-01-02", amount: 63885.33, type: "Legal", desc: "General/Litigation" },
    { rank: 6, number: "1893", date: "2024-04-01", amount: 62339.00, type: "Legal", desc: "Broom litigation $7,775. Lake Lanier retreat. Yellow-highlighted ethics entry" },
    { rank: 7, number: "1948", date: "2024-05-01", amount: 58306.49, type: "Legal", desc: "April billing" },
    { rank: 8, number: "1789", date: "2023-12-01", amount: 56604.68, type: "Legal", desc: "46.3 hrs of 'Meetings' ($9,028)" },
    { rank: 9, number: "1770", date: "2023-11-03", amount: 52383.50, type: "Legal", desc: "WAD billed 10.3 hours in single day" },
    { rank: 10, number: "1765", date: "2023-10-02", amount: 27702.00, type: "Legal", desc: "Litigation" },
    { rank: 11, number: "1766", date: "2023-10-02", amount: 27000.00, type: "Legal", desc: "General/BIDA — $9,147 flat fee reconciliation" },
    { rank: 12, number: "1745", date: "2023-08-31", amount: 27000.00, type: "Legal", desc: "General" },
    { rank: 13, number: "1744", date: "2023-08-31", amount: 26928.85, type: "Legal", desc: "Litigation" },
    { rank: 14, number: "24-11-DEN.1", date: "2024-11-12", amount: 24140.00, type: "Subcontractor", desc: "CSI Crane — Crisis PR. 70 hrs at $280/hr" },
    { rank: 15, number: "2174", date: "2024-11-01", amount: 15887.94, type: "Legal", desc: "BIDA matters" },
    { rank: 16, number: "2205", date: "2024-12-01", amount: 15651.00, type: "Legal", desc: "BIDA matters" },
    { rank: 17, number: "24-11-DEN.3", date: "2024-11-19", amount: 9999.99, type: "Subcontractor", desc: "Capitol Strategies — Lobbying" },
    { rank: 18, number: "24-12-DEN.1", date: "2024-12-05", amount: 8795.00, type: "Subcontractor", desc: "Starkey Law Group — Internal investigation at $500/hr" },
    { rank: 19, number: "24-11-DEN.4", date: "2024-11-09", amount: 7500.00, type: "Subcontractor", desc: "Lexicon Strategies (NYC) — 'Strategy Development'" },
    { rank: 20, number: "24-12-DEN.9", date: "2024-12-09", amount: 7500.00, type: "Subcontractor", desc: "Lexicon Strategies (NYC) — 'Strategy Development'" },
    { rank: 21, number: "24-10-DEN.3", date: "2024-11-05", amount: 6000.00, type: "Subcontractor", desc: "A.R. Long Company — no description" },
    { rank: 22, number: "24-12-DEN.17", date: "2024-12-17", amount: 6000.00, type: "Subcontractor", desc: "A.R. Long Company — marked HOLD in red" },
    { rank: 23, number: "24-12-DEN.3", date: "2024-12-02", amount: 6000.00, type: "Subcontractor", desc: "A.R. Long Company — no description" }
  ],

  monthlySpending: [
    { month: "Aug 2023", amount: 53929, label: "$54K" },
    { month: "Oct 2023", amount: 54702, label: "$55K" },
    { month: "Nov 2023", amount: 52384, label: "$52K" },
    { month: "Dec 2023", amount: 56605, label: "$57K" },
    { month: "Jan 2024", amount: 63885, label: "$64K" },
    { month: "Feb 2024", amount: 78018, label: "$78K" },
    { month: "Mar 2024", amount: 75770, label: "$76K" },
    { month: "Apr 2024", amount: 62339, label: "$62K" },
    { month: "May 2024", amount: 58306, label: "$58K" },
    { month: "Nov 2024", amount: 135990, label: "$136K" },
    { month: "Dec 2024", amount: 115478, label: "$115K" }
  ],

  rateEscalation: [
    { period: "2023", rate: 165, label: "$165/hr" },
    { period: "Early 2024", rate: 195, label: "$195/hr" },
    { period: "Late 2024", rate: 250, label: "$250/hr" }
  ],

  meetingsCosts: [
    { invoice: "1789", date: "Dec 2023", cost: 9028.50, hours: 46.3 },
    { invoice: "1825", date: "Feb 2024", cost: 10432.50, hours: 53.5 },
    { invoice: "1863", date: "Mar 2024", cost: 5674.50, hours: 29.1 },
    { invoice: "1893", date: "Apr 2024", cost: 6454.50, hours: 33.1 },
    { invoice: "2182", date: "Nov 2024", cost: 7865.50, hours: 40.9 },
    { invoice: "2193", date: "Dec 2024", cost: 6088.50, hours: 0 }
  ],

  subcontractors: [
    { name: "CSI Crane", service: "Crisis Communications / PR", total: 24140.00 },
    { name: "A.R. Long Company", service: "Unknown — no description provided", total: 18000.00 },
    { name: "Lexicon Strategies (NYC)", service: "\"Strategy Development\" retainer", total: 15000.00 },
    { name: "Capitol Strategies", service: "Consulting / Lobbying", total: 9999.99 },
    { name: "Starkey Law Group", service: "Departmental Investigation", total: 8795.00 }
  ],

  internalConflicts: [
    { matter: "Personnel Tyrone Dumas", cost: 10146, note: "Fully redacted — single largest matter" },
    { matter: "Bianca M. Broom Litigation", cost: 7775, note: "42 hours in one month, TRO hearing" },
    { matter: "EEOC Fred Davis", cost: 4112.50, note: "Employment discrimination claim" },
    { matter: "Stanley Hawthorne Termination", cost: 3706.50, note: "19.7 hours" },
    { matter: "Stanley Muhammad Grievance", cost: 1924.50, note: "Internal grievance" },
    { matter: "Personnel Tracey O'Neal", cost: 1827, note: "Personnel matter" },
    { matter: "McKenzie Privacy Violation", cost: 1654.50, note: "Privacy complaint" },
    { matter: "Employment Contract David Block", cost: 1310.50, note: "Contract negotiation" },
    { matter: "Mayor/Council Mediating Disputes", cost: 969, note: "Global dispute mediation" },
    { matter: "Joe Carn v. Motley Broom Ethics", cost: 765, note: "Ethics complaint — highlighted in yellow on invoice" }
  ],

  keyQuestions: [
    "Why are crisis communications, lobbying, and strategy firms being billed through the city attorney's office?",
    "Why did billing descriptions become systematically redacted starting in 2024?",
    "What is the $10,146 Personnel Tyrone Dumas matter? It's the single largest matter charge, fully redacted.",
    "What triggered the September 2024 crisis that required 70 hours of crisis PR at $280/hr?",
    "Why was the A.R. Long Company invoice marked 'HOLD' in red? What do they even do?",
    "Is a 52% rate increase for the principal attorney in 18 months justified? Was it approved?",
    "Does the city have in-house legal counsel, or is it paying outside rates for everything?",
    "Who approved $1.38 million in Purchase Orders to one firm? Was council informed?"
  ]
};
```

- [ ] **Step 2: Commit**

```bash
git add data.js
git commit -m "feat: add invoice data layer for CP Money Trail"
```

---

### Task 2: Build the page skeleton with hero section

The main index.html with the dark investigative design, hero section with the big number, and the CSS foundation for the entire page.

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create index.html with full CSS design system and hero section**

The page uses:
- **Colors:** `#0a0a0a` (background), `#1a1a1a` (card backgrounds), `#e63946` (accent red for dollar amounts), `#f1f1f1` (body text), `#ffffff` (headlines)
- **Fonts:** Inter (sans-serif body/UI), Space Grotesk (headlines/numbers), JetBrains Mono (data labels)
- **Motif:** Redacted document texture — use CSS pseudo-elements with repeating black bars to simulate redaction marks as decorative elements
- **Layout:** Max-width 900px centered, full-bleed dark background, sections separated by thin red horizontal rules

Hero section content:
- Small mono label: "CP MONEY TRAIL // INVESTIGATION #1"
- Main headline: "Where Did $847,293 of Your Money Go?"
- Subtext: "The City of College Park paid one law firm $847,293.93 in 18 months. Crisis PR, lobbying, and strategy consulting were billed as 'legal services.' Descriptions were redacted. Rates jumped 52%. Here's what the invoices show."
- CTA: "Scroll to see the receipts."

Include `<script src="data.js"></script>` and `<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>` before closing body.

- [ ] **Step 2: Open in browser to verify hero renders correctly**

```bash
open index.html
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: page skeleton with hero section and design system"
```

---

## Chunk 2: Main Page Sections (Data Visualizations)

### Task 3: Monthly spending growth chart

Bar chart showing the near-tripling of monthly spending from $54K to $136K.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Section 1 — "The Growth" spending chart**

After the hero section, add a new `<section>` with:
- Section header: red rule + "THE GROWTH" label
- Subheadline: "Monthly legal spending nearly tripled in 18 months"
- A `<canvas>` element for Chart.js bar chart
- Chart config: dark background, red bars, white labels, month labels on x-axis, dollar amounts on y-axis
- Annotation callouts on the first bar ("$54K — where it started") and last bar ("$136K — where it ended")
- Below the chart: a single sentence — "That's $136,000 in a single month. For a city of 15,000 people."

- [ ] **Step 2: Verify chart renders**

```bash
open index.html
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add monthly spending growth bar chart"
```

---

### Task 4: Invoice breakdown ranked list

All 23 invoices displayed as a visual ranked list, not a plain table.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Section 2 — "The Invoices" ranked list**

- Section header: "THE INVOICES"
- Subheadline: "23 invoices. Exposed."
- Each invoice rendered as a horizontal bar/card:
  - Invoice number on the left
  - Red-filled bar proportional to amount (widest = $88K, narrowest = $6K)
  - Dollar amount in bold red
  - One-line description in gray
  - Subcontractor invoices get a distinct tag/badge: "NOT LEGAL WORK"
- Built dynamically from `DATA.invoices` using JavaScript
- Invoices are already sorted highest to lowest in data.js

- [ ] **Step 2: Verify list renders and scrolls properly**

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add ranked invoice breakdown section"
```

---

### Task 5: "Not Legal Work" subcontractor exposure section

The $49,140 in crisis PR, lobbying, and consulting routed through the law firm.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Section 3 — "Not Legal Work"**

- Section header: "NOT LEGAL WORK"
- Subheadline: "$49,140 in crisis PR, lobbying, and 'strategy development' — billed as legal services"
- Layout: Cards for each subcontractor from `DATA.subcontractors`
  - Company name, location, service description
  - Dollar amount in large red text
  - Pull quote or callout for the worst ones:
    - CSI Crane: "70 hours of crisis PR at $280/hr. What was the crisis?"
    - Lexicon Strategies: "A New York City firm on retainer for 'strategy development.' $15,000, zero detail."
    - Capitol Strategies: "$9,999.99 — one penny under $10,000. Coincidence?"
    - A.R. Long: "$18,000 across three invoices. No description of services. One marked 'HOLD' in red."
- Bottom callout box: "These firms were paid through the city attorney's office. Not through normal procurement. Not with normal oversight."

- [ ] **Step 2: Verify section renders**

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add subcontractor exposure section"
```

---

### Task 6: Rate escalation visualization

The 52% raise from $165/hr to $250/hr compared to inflation.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Section 4 — "The 52% Raise"**

- Section header: "THE 52% RAISE"
- Visual: Three large rate cards side by side showing the progression
  - 2023: $165/hr
  - Early 2024: $195/hr (+18%)
  - Late 2024: $250/hr (+52% total)
- Below: comparison bar — "Inflation over same period: ~7%. Denmark's rate increase: 52%."
- Closing line: "No public vote. No published justification. Just a bigger bill."

- [ ] **Step 2: Verify section renders**

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add rate escalation comparison section"
```

---

### Task 7: Redaction timeline section

Show how billing transparency disappeared over time.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Section 5 — "The Disappearing Descriptions"**

- Section header: "THE DISAPPEARING DESCRIPTIONS"
- Subheadline: "What happened when the public started asking questions?"
- Visual timeline showing three stages:
  - **2023**: Sample invoice line shown with full description visible (mock the format: "WAD — 2.50 hrs — Drafted motion to dismiss in Smith v. City")
  - **Early 2024**: Same format but descriptions replaced with black redaction bars and citation: "Privacy Information — O.C.G.A. 50-18-72(a)(20)(A)"
  - **Late 2024**: Format stripped entirely — no attorney initials, no rates, just matter names and totals
- Each stage uses CSS to simulate the look of actual invoice entries, progressively blacked out
- Callout: "The Georgia Open Records Act exemption they cited is for pending investigations. They used it on everything — including routine ordinance drafting and meetings."

- [ ] **Step 2: Verify the visual progression reads clearly**

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add redaction timeline section"
```

---

## Chunk 3: Main Page Sections (Narrative + CTA)

### Task 8: Meetings catch-all section

The recurring vague "Meetings" billing pattern.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Section 6 — "The 'Meetings' Problem"**

- Section header: "THE 'MEETINGS' PROBLEM"
- Subheadline: "Over $45,000 billed to a single category with almost no detail"
- Table or visual from `DATA.meetingsCosts` showing per-invoice Meetings charges
- Callout highlights:
  - "7 hours at a Lake Lanier retreat — $1,365"
  - "6.5 hours in a single day for 'meetings' — $1,267.50"
  - "53.5 hours of 'meetings' in one month — $10,432.50"
- Bottom line: "What meetings? With whom? About what? The invoices don't say."

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add meetings catch-all billing section"
```

---

### Task 9: Internal conflicts section

How much of the legal budget went to city officials fighting each other.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Section 7 — "Your Money, Their Fights"**

- Section header: "YOUR MONEY, THEIR FIGHTS"
- Subheadline: "A significant portion of the legal budget funded internal disputes between city officials and employees"
- Horizontal bar chart or styled list from `DATA.internalConflicts`
  - Each item: matter name, cost in red, one-line note
  - Total at bottom: sum of all internal conflict costs
- Callout: "Terminations. Grievances. Ethics complaints. Lawsuits between officials. The city attorney billed for all of it."

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add internal conflicts spending section"
```

---

### Task 10: Purchase orders section

The $1.38M in authorized spending.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Section 8 — "The Blank Checks"**

- Section header: "THE BLANK CHECKS"
- Subheadline: "$1.38 million in purchase orders to one law firm in under a year"
- Three large PO cards:
  - March 2024: $380,000
  - July 2024: $500,000.04
  - Late 2024: $500,000.04
- Running total counter visualization adding up to $1,380,000
- Callout: "Purchase orders this large require council awareness. Were they informed?"

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add purchase orders section"
```

---

### Task 11: Unanswered questions + CTA section

The closing section with the 8 key questions and calls to action.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Section 9 — "8 Questions Your Council Needs to Answer"**

- Section header: "8 QUESTIONS YOUR COUNCIL NEEDS TO ANSWER"
- Each question from `DATA.keyQuestions` rendered as a numbered card with large question text
- Red number, white question text, dark card background

- [ ] **Step 2: Add Section 10 — Source Documents footer**

- Section header: "THE RECEIPTS"
- Text: "Every number on this page comes from invoices obtained through an Open Records Request under Georgia law. Don't take our word for it."
- Note: "Source documents available upon request."
- CP Money Trail branding footer
- "Stay Informed. Stay United."

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add questions CTA and source documents footer"
```

---

### Task 12: Open Graph meta tags + sharing optimization

Make the page look right when shared on Facebook/social media.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add OG meta tags to `<head>`**

```html
<meta property="og:title" content="CP Money Trail — Where Did $847,293 Go?">
<meta property="og:description" content="The City of College Park paid one law firm $847,293 in 18 months. Crisis PR, lobbying, and consulting hidden in legal invoices. See the receipts.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://cpmoneytrail.com">
<meta property="og:image" content="https://cpmoneytrail.com/assets/og-image.png">
<meta name="twitter:card" content="summary_large_image">
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add Open Graph meta tags for social sharing"
```

---

## Chunk 4: Social Media Graphics

### Task 13: Social card template + first 5 cards

Reusable HTML template for social cards, then the first batch.

**Files:**
- Create: `social/card-01-total.html`
- Create: `social/card-02-monthly.html`
- Create: `social/card-03-crisis-pr.html`
- Create: `social/card-04-raise.html`
- Create: `social/card-05-lobbying.html`

- [ ] **Step 1: Create the social card template pattern**

Each card is a standalone HTML file sized for social sharing (1200x630px for Facebook/Twitter, also works cropped for Instagram). Design:
- Fixed dimensions via CSS: 1200x630px
- Black background, same font stack as main page
- CP Money Trail logo/wordmark top-left
- "cpmoneytrail.com" bottom-right
- Large red dollar amount or stat as the centerpiece
- One-line context below in white
- Subtle redacted-document texture in background

- [ ] **Step 2: Create cards 1-5**

**Card 01 — Total:** "$847,293" huge, "That's what College Park paid ONE law firm. In 18 months." below.

**Card 02 — Monthly:** "$136,000" huge, "Billed in a single month. For a city of 15,000." below.

**Card 03 — Crisis PR:** "$24,140" huge, "For crisis PR. Billed as 'legal services.' 70 hours at $280/hr." below.

**Card 04 — Raise:** "52%" huge, "Rate increase for the city attorney. In 18 months. Inflation was 7%." below.

**Card 05 — Lobbying:** "$49,140" huge, "In non-legal consulting — PR, lobbying, 'strategy' — routed through the law firm." below.

- [ ] **Step 3: Commit**

```bash
git add social/
git commit -m "feat: add social card template and first 5 cards"
```

---

### Task 14: Social cards 6-10

**Files:**
- Create: `social/card-06-redacted.html`
- Create: `social/card-07-dumas.html`
- Create: `social/card-08-rogers.html`
- Create: `social/card-09-po.html`
- Create: `social/card-10-meetings.html`

- [ ] **Step 1: Create cards 6-10**

**Card 06 — Redacted:** Visual showing three stages of redaction. "They stopped describing what they were billing for. Why?" below.

**Card 07 — Dumas:** "$10,146" huge, "One personnel matter. One month. Fully redacted." below.

**Card 08 — Rogers:** "$10,292" huge, "For code enforcement on one auto shop. 54.7 hours of legal work." below.

**Card 09 — POs:** "$1.38 MILLION" huge, "In purchase orders to one law firm. In under a year." below.

**Card 10 — Meetings:** "$45,544+" huge, "Billed for 'Meetings' with almost no detail about what, who, or why." below.

- [ ] **Step 2: Commit**

```bash
git add social/
git commit -m "feat: add social cards 6-10"
```

---

### Task 15: Social cards 11-15 + README

**Files:**
- Create: `social/card-11-10hrs.html`
- Create: `social/card-12-lanier.html`
- Create: `social/card-13-internal.html`
- Create: `social/card-14-hold.html`
- Create: `social/card-15-questions.html`
- Create: `social/README.md`

- [ ] **Step 1: Create cards 11-15**

**Card 11 — 10 Hours:** "10.3 HOURS" huge, "Billed by one attorney to one client in a single day. $2,008.50." below.

**Card 12 — Lanier:** "$1,365" huge, "For 7 hours at a Lake Lanier retreat. Billed under 'Meetings.'" below.

**Card 13 — Internal:** "Your money is funding their fights." as headline. List: "Terminations. Grievances. Ethics complaints. Lawsuits between officials." below.

**Card 14 — Hold:** "HOLD" in red stamp style, "One invoice was marked 'HOLD' in red. $6,000 to a company with no description of services." below.

**Card 15 — Questions:** "8 Questions" huge, "Your council needs to answer. cpmoneytrail.com" below.

- [ ] **Step 2: Create README.md with screenshot instructions**

```markdown
# Social Cards — Screenshot Instructions

Each HTML file is a standalone social media graphic sized at 1200x630px.

## To convert to PNG:

1. Open any card HTML file in Chrome/Safari
2. The card renders at exact social media dimensions
3. Take a screenshot of the card area, or use browser dev tools:
   - Chrome: Cmd+Shift+P → "Capture screenshot" → set device to 1200x630
   - Or use a screenshot tool to capture the card

## Posting order (suggested):
Post all on launch day. Lead with card-01 (total), then rotate through the rest.
Each post should link to cpmoneytrail.com.

## Suggested captions:
Each card is designed to be self-explanatory. Add "See the full breakdown: cpmoneytrail.com" to every post.
```

- [ ] **Step 3: Commit**

```bash
git add social/
git commit -m "feat: add social cards 11-15 and screenshot README"
```

---

## Chunk 5: Polish + Launch Readiness

### Task 16: Mobile responsive design

Ensure the main page works on phones (most Facebook traffic is mobile).

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add responsive CSS media queries**

Key breakpoints:
- `@media (max-width: 768px)`: Stack side-by-side layouts, reduce font sizes, make charts scrollable horizontally if needed
- `@media (max-width: 480px)`: Further reduce hero headline size, single-column everything, ensure touch targets are large enough
- Charts: Set `responsive: true, maintainAspectRatio: false` in Chart.js config, wrap canvas in a container with min-height
- Rate cards: Stack vertically on mobile instead of side-by-side
- Invoice bars: Full width, amount above the bar instead of beside it

- [ ] **Step 2: Test in browser responsive mode**

```bash
open index.html
# Use Chrome DevTools → Toggle device toolbar → iPhone 14, Galaxy S21
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add mobile responsive design"
```

---

### Task 17: Smooth scroll + section reveal animations

Subtle animations as sections scroll into view. Nothing flashy — just enough to make the scroll feel intentional.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add IntersectionObserver-based reveal animations**

- Each section starts with `opacity: 0; transform: translateY(30px)`
- IntersectionObserver triggers fade-in + slide-up when section enters viewport
- Transition: `opacity 0.6s ease, transform 0.6s ease`
- Red dollar amounts get a brief count-up animation on reveal (using requestAnimationFrame)
- Smooth scroll CSS: `html { scroll-behavior: smooth; }`

- [ ] **Step 2: Verify animations work on scroll**

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add scroll reveal animations"
```

---

### Task 18: Final review and launch prep

**Files:**
- Modify: `index.html` (any final adjustments)

- [ ] **Step 1: Full page review**

- Scroll through entire page checking:
  - All data matches `Denmark_Invoice_Analysis.md` (no errors in numbers)
  - All charts render correctly
  - All sections have proper spacing
  - Mobile view works
  - No broken fonts or missing CDN resources
  - OG tags are correct

- [ ] **Step 2: Verify all social cards render at correct dimensions**

```bash
# Open each card and verify 1200x630 rendering
for f in social/card-*.html; do open "$f"; done
```

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: CP Money Trail launch-ready"
```

---

## Summary

| Chunk | Tasks | What it delivers |
|-------|-------|-----------------|
| 1 | Tasks 1-2 | Data layer + page skeleton with hero |
| 2 | Tasks 3-7 | All data visualization sections (charts, lists, timelines) |
| 3 | Tasks 8-12 | Narrative sections + CTA + social sharing |
| 4 | Tasks 13-15 | 15 social media graphics |
| 5 | Tasks 16-18 | Mobile responsive, animations, launch review |

**Total: 18 tasks across 5 chunks.**

After build: Deploy to cpmoneytrail.com (hosting TBD — Netlify, Vercel, or similar static host).
