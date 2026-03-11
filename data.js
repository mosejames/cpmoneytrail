// CP Money Trail — Single source of truth for all invoice and pattern data
// City of College Park legal spending analysis: Denmark Ashby LLC invoices Aug 2023 – Dec 2024

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
    { rank: 1,  number: "2182",          date: "2024-11-01", amount: 88350.46, type: "Legal",         desc: "General/Litigation — nearly all descriptions redacted" },
    { rank: 2,  number: "1825",          date: "2024-02-01", amount: 78017.69, type: "Legal",         desc: "40+ matters, 53.5 hrs of 'Meetings'" },
    { rank: 3,  number: "1863",          date: "2024-03-01", amount: 75770.00, type: "Legal",         desc: "405.1 total hours — highest of any invoice" },
    { rank: 4,  number: "2193",          date: "2024-12-01", amount: 71532.00, type: "Legal",         desc: "Format stripped attorney names/rates. $10,146 Dumas matter" },
    { rank: 5,  number: "1808",          date: "2024-01-02", amount: 63885.33, type: "Legal",         desc: "General/Litigation" },
    { rank: 6,  number: "1893",          date: "2024-04-01", amount: 62339.00, type: "Legal",         desc: "Broom litigation $7,775. Lake Lanier retreat. Yellow-highlighted ethics entry" },
    { rank: 7,  number: "1948",          date: "2024-05-01", amount: 58306.49, type: "Legal",         desc: "April billing" },
    { rank: 8,  number: "1789",          date: "2023-12-01", amount: 56604.68, type: "Legal",         desc: "46.3 hrs of 'Meetings' ($9,028)" },
    { rank: 9,  number: "1770",          date: "2023-11-03", amount: 52383.50, type: "Legal",         desc: "WAD billed 10.3 hours in single day" },
    { rank: 10, number: "1765",          date: "2023-10-02", amount: 27702.00, type: "Legal",         desc: "Litigation" },
    { rank: 11, number: "1766",          date: "2023-10-02", amount: 27000.00, type: "Legal",         desc: "General/BIDA — $9,147 flat fee reconciliation" },
    { rank: 12, number: "1745",          date: "2023-08-31", amount: 27000.00, type: "Legal",         desc: "General" },
    { rank: 13, number: "1744",          date: "2023-08-31", amount: 26928.85, type: "Legal",         desc: "Litigation" },
    { rank: 14, number: "24-11-DEN.1",  date: "2024-11-12", amount: 24140.00, type: "Subcontractor", desc: "CSI Crane — Crisis PR. 70 hrs at $280/hr" },
    { rank: 15, number: "2174",          date: "2024-11-01", amount: 15887.94, type: "Legal",         desc: "BIDA matters" },
    { rank: 16, number: "2205",          date: "2024-12-01", amount: 15651.00, type: "Legal",         desc: "BIDA matters" },
    { rank: 17, number: "24-11-DEN.3",  date: "2024-11-19", amount: 9999.99,  type: "Subcontractor", desc: "Capitol Strategies — Lobbying" },
    { rank: 18, number: "24-12-DEN.1",  date: "2024-12-05", amount: 8795.00,  type: "Subcontractor", desc: "Starkey Law Group — Internal investigation at $500/hr" },
    { rank: 19, number: "24-11-DEN.4",  date: "2024-11-09", amount: 7500.00,  type: "Subcontractor", desc: "Lexicon Strategies (NYC) — 'Strategy Development'" },
    { rank: 20, number: "24-12-DEN.9",  date: "2024-12-09", amount: 7500.00,  type: "Subcontractor", desc: "Lexicon Strategies (NYC) — 'Strategy Development'" },
    { rank: 21, number: "24-10-DEN.3",  date: "2024-11-05", amount: 6000.00,  type: "Subcontractor", desc: "A.R. Long Company — no description" },
    { rank: 22, number: "24-12-DEN.17", date: "2024-12-17", amount: 6000.00,  type: "Subcontractor", desc: "A.R. Long Company — marked HOLD in red" },
    { rank: 23, number: "24-12-DEN.3",  date: "2024-12-02", amount: 6000.00,  type: "Subcontractor", desc: "A.R. Long Company — no description" }
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
    { period: "2023",       rate: 165 },
    { period: "Early 2024", rate: 195 },
    { period: "Late 2024",  rate: 250 }
  ],

  meetingsCosts: [
    { invoice: 1789, date: "Dec 2023", cost: 9028.50,  hours: 46.3 },
    { invoice: 1825, date: "Feb 2024", cost: 10432.50, hours: 53.5 },
    { invoice: 1863, date: "Mar 2024", cost: 5674.50,  hours: 29.1 },
    { invoice: 1893, date: "Apr 2024", cost: 6454.50,  hours: 33.1 },
    { invoice: 2182, date: "Nov 2024", cost: 7865.50,  hours: 40.9 },
    { invoice: 2193, date: "Dec 2024", cost: 6088.50,  hours: 0 }
  ],

  subcontractors: [
    { name: "CSI Crane",          service: "Crisis Communications PR",    total: 24140 },
    { name: "A.R. Long",          service: "Unknown",                     total: 18000 },
    { name: "Lexicon Strategies NYC", service: "Strategy Development",    total: 15000 },
    { name: "Capitol Strategies",  service: "Consulting Lobbying",        total: 9999.99 },
    { name: "Starkey Law Group",   service: "Departmental Investigation", total: 8795 }
  ],

  internalConflicts: [
    { matter: "Personnel Tyrone Dumas",            cost: 10146,   note: "Fully redacted — single largest matter" },
    { matter: "Bianca M. Broom Litigation",        cost: 7775,    note: "42 hours in one month, TRO hearing" },
    { matter: "EEOC Fred Davis",                   cost: 4112.50, note: "Employment discrimination claim" },
    { matter: "Stanley Hawthorne Termination",     cost: 3706.50, note: "19.7 hours" },
    { matter: "Stanley Muhammad Grievance",        cost: 1924.50, note: "Internal grievance" },
    { matter: "Personnel Tracey O'Neal",           cost: 1827,    note: "Personnel matter" },
    { matter: "McKenzie Privacy Violation",        cost: 1654.50, note: "Privacy complaint" },
    { matter: "Employment Contract David Block",   cost: 1310.50, note: "Contract negotiation" },
    { matter: "Mayor/Council Mediating Disputes",  cost: 969,     note: "Global dispute mediation" },
    { matter: "Joe Carn v. Motley Broom Ethics",   cost: 765,     note: "Ethics complaint — highlighted in yellow on invoice" }
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
