import React, { useState, useRef, useEffect } from "react";

/* ---------------------------------------------------------
   Purchase Orders — implemented 1:1 from Figma
   File: Update ERP  •  Node 1220:5455
   Colors, spacing, type sizes match the design tokens exactly.
--------------------------------------------------------- */

const C = {
  primary6: "#4f5dff",
  primary5: "#6f7bff",
  primary4: "#8f99ff",
  primary2: "rgba(79,93,255,0.2)",
  bg1: "#ffffff",
  bg4: "#f3f4f6",
  bg6: "#f0f1f3",
  bg7: "#e8eaed",
  bg8: "#e0e3e7",
  text2: "#a4abb3",
  text4: "#6b7280",
  text5: "#777777",
  text6: "#4a4a4a",
  text7: "#0d0d0d",
  line3: "rgba(203,213,225,0.4)",
  line4: "#cbd5e1",
  line5: "#d9d9d9",
  line6: "#cdcdcd",
  success6: "#16a34a",
  success1: "rgba(22,163,74,0.1)",
  warning6: "#f59e0b",
  warning1: "rgba(245,158,11,0.1)",
  danger6: "#dc2626",
  danger1: "rgba(220,38,38,0.1)",
  info6: "#0284c7",
  info1: "rgba(2,132,199,0.1)",
};

const Icon = {
  Plus: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  ChevronDown: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  MoreDots: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <circle cx="3" cy="7" r="1.3" fill="currentColor" />
      <circle cx="7" cy="7" r="1.3" fill="currentColor" />
      <circle cx="11" cy="7" r="1.3" fill="currentColor" />
    </svg>
  ),
  Filter: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <path d="M1 2h12l-4.5 5.5V12L6.5 13V7.5z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    </svg>
  ),
  Sort: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <path d="M3 3v8M3 3L1 5M3 3l2 2M11 11V3M11 11l2-2M11 11l-2-2" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Columns: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <rect x="1" y="1" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M5 1v12M9 1v12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 18 18" width="18" height="18" {...p}>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M12.5 12.5L17 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  Bell: (p) => (
    <svg viewBox="0 0 20 20" width="20" height="20" {...p}>
      <path
        d="M10 2a5 5 0 00-5 5v2.5c0 .8-.3 1.6-.9 2.2L3 13h14l-1.1-1.3a3 3 0 01-.9-2.2V7a5 5 0 00-5-5z"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.3" fill="none" />
    </svg>
  ),
  Settings: (p) => (
    <svg viewBox="0 0 20 20" width="20" height="20" {...p}>
      <path
        d="M8.2 2.5h3.6l.4 1.9c.4.15.77.34 1.12.57l1.83-.63 1.8 3.12-1.46 1.28c.03.2.05.4.05.61s-.02.41-.05.61l1.46 1.28-1.8 3.12-1.83-.63c-.35.23-.72.42-1.12.57l-.4 1.9H8.2l-.4-1.9a5.9 5.9 0 01-1.12-.57l-1.83.63-1.8-3.12 1.46-1.28A4.9 4.9 0 014.46 10c0-.21.02-.41.05-.61L3.05 8.11l1.8-3.12 1.83.63c.35-.23.72-.42 1.12-.57z"
        stroke="currentColor"
        strokeWidth="1.15"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.15" fill="none" />
    </svg>
  ),
  User: (p) => (
    <svg viewBox="0 0 20 20" width="20" height="20" {...p}>
      <circle cx="10" cy="7" r="3.2" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M3.5 17c1-3 4-4.5 6.5-4.5s5.5 1.5 6.5 4.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  ),
  Home: (p) => (
    <svg viewBox="0 0 16 16" width="16" height="16" {...p}>
      <path d="M2 8l6-5 6 5v6a1 1 0 01-1 1H3a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    </svg>
  ),
  Report: (p) => (
    <svg viewBox="0 0 16 16" width="16" height="16" {...p}>
      <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M5 10V7M8 10V5M11 10V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Procurement: (p) => (
    <svg viewBox="0 0 16 16" width="16" height="16" {...p}>
      <path d="M2 4h12M4 4v9a1 1 0 001 1h6a1 1 0 001-1V4M6 4V2h4v2" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    </svg>
  ),
  Sales: (p) => (
    <svg viewBox="0 0 16 16" width="16" height="16" {...p}>
      <path d="M2 13l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Receivable: (p) => (
    <svg viewBox="0 0 16 16" width="16" height="16" {...p}>
      <rect x="2" y="3" width="12" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M4 7h8M4 10h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Payable: (p) => (
    <svg viewBox="0 0 16 16" width="16" height="16" {...p}>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M8 5v6M6 10c0 1 .9 1.5 2 1.5s2-.5 2-1.4c0-.9-.7-1.2-2-1.5S6 8 6 7c0-.9.9-1.4 2-1.4s1.8.4 2 1.2" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  ),
  Accounting: (p) => (
    <svg viewBox="0 0 16 16" width="16" height="16" {...p}>
      <path d="M8 1v2M8 13v2M2 8h2M12 8h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="8" r="4.2" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  ),
  Tax: (p) => (
    <svg viewBox="0 0 16 16" width="16" height="16" {...p}>
      <path d="M3 3h10v10H3z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      <path d="M5 11L11 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Star: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <path d="M7 1l1.8 3.7L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.6z" stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round" />
    </svg>
  ),
  Grid: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
    </svg>
  ),
  ChevronLeft: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ChevronRight: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  CollapseArrow: (p) => (
    <svg viewBox="0 0 22 22" width="22" height="22" {...p}>
      <path d="M13.5 6l-5.5 5 5.5 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ChartPie: (p) => (
    <svg viewBox="0 0 18 18" width="18" height="18" {...p}>
      <path d="M9 2a7 7 0 107 7H9z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      <path d="M9 2v7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  Journal: (p) => (
    <svg viewBox="0 0 18 18" width="18" height="18" {...p}>
      <rect x="3" y="2" width="12" height="14" rx="1.2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
  Info: (p) => (
    <svg viewBox="0 0 18 18" width="18" height="18" {...p}>
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M9 8v5M9 5.5v.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  Grip: (p) => (
    <svg viewBox="0 0 18 18" width="18" height="18" {...p}>
      <circle cx="6" cy="4" r="1.2" fill="currentColor" />
      <circle cx="12" cy="4" r="1.2" fill="currentColor" />
      <circle cx="6" cy="9" r="1.2" fill="currentColor" />
      <circle cx="12" cy="9" r="1.2" fill="currentColor" />
      <circle cx="6" cy="14" r="1.2" fill="currentColor" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" />
    </svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 16 16" width="16" height="16" {...p}>
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Sliders: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <path d="M2 3h10M2 7h10M2 11h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="5" cy="3" r="1.4" fill="currentColor" />
      <circle cx="9" cy="7" r="1.4" fill="currentColor" />
      <circle cx="5" cy="11" r="1.4" fill="currentColor" />
    </svg>
  ),
  StarFilled: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <path d="M7 1l1.8 3.7L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.6z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  ),
  Grid: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
    </svg>
  ),
  ChevronLeft: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ChevronRight: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" {...p}>
      <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  CollapseArrow: (p) => (
    <svg viewBox="0 0 22 22" width="22" height="22" {...p}>
      <path d="M13.5 6l-5.5 5 5.5 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ChartPie: (p) => (
    <svg viewBox="0 0 18 18" width="18" height="18" {...p}>
      <path d="M9 2a7 7 0 107 7H9z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      <path d="M9 2v7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  Journal: (p) => (
    <svg viewBox="0 0 18 18" width="18" height="18" {...p}>
      <rect x="3" y="2" width="12" height="14" rx="1.2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
};

const HoverStyles = () => (
  <style>{`
    html, body { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; }
    *, *::before, *::after { box-sizing: border-box; }
    button { border: none; background: none; font: inherit; }
    .hov-soft:hover { background-color: ${C.bg6} !important; }
    .hov-soft-alt:hover { background-color: ${C.bg8} !important; }
    .hov-border-primary:hover { border-color: ${C.primary6} !important; }
    .hov-primary-dark:hover { background-color: #3f4be0 !important; border-color: #3f4be0 !important; }
    .hov-outline:hover { border-color: ${C.primary6} !important; background-color: ${C.bg6} !important; }
    .hov-outline-fill:hover { background-color: ${C.primary2} !important; }
    .hov-row:hover { background-color: ${C.bg6} !important; }
    .clickable { cursor: pointer; transition: background-color 180ms ease, border-color 180ms ease, opacity 180ms ease, color 180ms ease, transform 180ms ease; }
    .nav-toggle .chevron-arrow { opacity: 0; }
    .nav-toggle:hover .chevron-arrow { opacity: 1 !important; }
    .sidebar-scroll { scrollbar-width: none; -ms-overflow-style: none; }
    .sidebar-scroll::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
    .aggregate-row .add-aggregate-btn { opacity: 0; }
    .aggregate-row:hover .add-aggregate-btn { opacity: 1 !important; }
    .add-aggregate-btn:hover { background-color: ${C.primary6} !important; }
    .add-aggregate-btn:hover svg { color: #ffffff !important; }
    .aggregate-row:hover { background-color: ${C.bg6} !important; }
    .aggregate-row.is-active:hover { background-color: rgba(79,93,255,0.32) !important; }
    .collapsed-flyout { opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 180ms ease; }
    .collapsed-nav-item:hover .collapsed-flyout { opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; }
    @keyframes sidenavFadeIn { from { opacity: 0; } to { opacity: 1; } }
    .sidenav-fade { animation: sidenavFadeIn 280ms ease; }
  `}</style>
);

function PrimaryButton({ children }) {
  return (
    <button
      className="clickable hov-primary-dark flex items-center gap-1 rounded px-2 py-2 text-sm font-bold text-white"
      style={{ backgroundColor: C.primary6, border: `1px solid ${C.primary6}` }}
    >
      <Icon.Plus className="p-1" />
      <span className="px-1">{children}</span>
      <Icon.ChevronDown className="p-1" />
    </button>
  );
}

function OutlineIconButton({ icon }) {
  return (
    <button
      className="clickable hov-outline flex items-center justify-center rounded p-2"
      style={{ border: `1px solid ${C.line6}` }}
    >
      {icon}
    </button>
  );
}

/* ---------------- smooth eased scroll helper ---------------- */

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollElementIntoView(container, element, duration = 650) {
  if (!container || !element) return;
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const relativeTop = elementRect.top - containerRect.top;
  const maxScroll = container.scrollHeight - container.clientHeight;
  const start = container.scrollTop;

  // Center the opened app within the visible list so that, whenever there's
  // room, both the previous and the next app peek into view around it.
  const desiredRelativeTop = Math.max(0, (containerRect.height - elementRect.height) / 2);
  const target = Math.max(0, Math.min(start + relativeTop - desiredRelativeTop, maxScroll));
  const change = target - start;
  if (Math.abs(change) < 1) return;

  let startTime = null;
  function step(timestamp) {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    container.scrollTop = start + change * easeInOutCubic(progress);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const STATUS_STYLES = {
  Pending: { bg: C.warning1, fg: C.warning6 },
  Paid: { bg: C.success1, fg: C.success6 },
  Delivered: { bg: C.info1, fg: C.info6 },
  Processing: { bg: C.warning1, fg: C.warning6 },
  Overdue: { bg: C.danger1, fg: C.danger6 },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.Pending;
  return (
    <span
      className="inline-flex items-center gap-1 rounded pr-2 text-xs font-medium"
      style={{ backgroundColor: s.bg, color: s.fg, tracking: "0.24px" }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" className="ml-2">
        <circle cx="5" cy="5" r="3.5" fill={s.fg} />
      </svg>
      {status}
    </span>
  );
}

const ROWS = [
  { supplier: "Amazon", order: "PO 0019", orderDate: "July 16, 2026", dueDate: "July 26, 2026", location: "Mirpur", category: "Glass", tax: "$40", status: "Pending" },
  { supplier: "eBay", order: "PO 0020", orderDate: "July 17, 2026", dueDate: "July 27, 2026", location: "Banani", category: "Plastic", tax: "$25", status: "Paid" },
  { supplier: "Walmart", order: "PO 0021", orderDate: "July 18, 2026", dueDate: "July 28, 2026", location: "Uttara", category: "Wood", tax: "$55", status: "Paid" },
  { supplier: "Target", order: "PO 0022", orderDate: "July 19, 2026", dueDate: "July 29, 2026", location: "Gulshan", category: "Metal", tax: "$60", status: "Overdue" },
  { supplier: "Flipkart", order: "PO 0024", orderDate: "July 21, 2026", dueDate: "July 31, 2026", location: "Motijheel", category: "Paper", tax: "$15", status: "Processing" },
  { supplier: "Best Buy", order: "PO 0025", orderDate: "July 22, 2026", dueDate: "August 1, 2026", location: "Banani", category: "Plastic", tax: "$45", status: "Paid" },
  { supplier: "Costco", order: "PO 0026", orderDate: "July 23, 2026", dueDate: "August 2, 2026", location: "Mirpur", category: "Metal", tax: "$50", status: "Pending" },
  { supplier: "Shopify", order: "PO 0027", orderDate: "July 24, 2026", dueDate: "August 3, 2026", location: "Uttara", category: "Glass", tax: "$38", status: "Delivered" },
  { supplier: "Rakuten", order: "PO 0028", orderDate: "July 25, 2026", dueDate: "August 4, 2026", location: "Gulshan", category: "Ceramic", tax: "$42", status: "Overdue" },
];

const STATUS_CARDS = [
  { label: "Purchase order", count: "#12", amount: "$1335.00", color: C.info6 },
  { label: "Paid", count: "#5", amount: "$500.00", color: C.success6 },
  { label: "Pending", count: "#5", amount: "$550.00", color: C.warning6 },
  { label: "Overdue", count: "#2", amount: "$280.00", color: C.danger6 },
];

function TopBar() {
  return (
    <div className="flex h-[56px] items-center justify-between px-2" style={{ backgroundColor: C.bg1 }}>
      <div className="flex items-center">
        <p className="w-[220px] text-[16px] font-semibold" style={{ color: C.text6, letterSpacing: "0.16px" }}>
          Mukut
        </p>
        <div className="flex items-center gap-2 border-l border-r px-3 whitespace-nowrap" style={{ borderColor: C.line5 }}>
          <span className="text-[15px] font-medium" style={{ color: C.text7 }}>
            XYZ Builders
          </span>
          <span className="text-[13px]" style={{ color: C.text5, letterSpacing: "0.13px" }}>
            AB Branch
          </span>
        </div>
      </div>

      <div className="w-[520px]">
        <div className="clickable hov-soft-alt flex items-center gap-3 rounded p-2" style={{ backgroundColor: C.bg6 }}>
          <Icon.Search style={{ color: C.text4 }} />
          <span className="text-[15px]" style={{ color: C.text4, letterSpacing: "0.15px" }}>
            Search, Navigate, Find
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 w-[403px]">
        <button className="clickable hov-soft rounded p-2">
          <Icon.Bell style={{ color: C.text6 }} />
        </button>
        <button className="clickable hov-soft rounded p-2">
          <Icon.Settings style={{ color: C.text6 }} />
        </button>
        <button className="clickable hov-soft flex items-center gap-2 rounded px-1 py-0.5">
          <Icon.User style={{ color: C.text6 }} />
          <span className="flex flex-col text-left">
            <span className="text-[14px]" style={{ color: C.text6, letterSpacing: "0.28px" }}>
              Mr. Henry
            </span>
            <span className="text-[12px]" style={{ color: C.text4, letterSpacing: "0.12px" }}>
              Account Manager
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

const FAVORITE_ITEMS = [
  { label: "Home", icon: Icon.Home, children: ["Dashboard", "My Portal", "My Approvals"] },
  { label: "Report", icon: Icon.Report, children: ["Sales Report", "Inventory Report", "Financial Report"] },
  {
    label: "Procurement",
    icon: Icon.Procurement,
    children: ["RFQ", "Purchase Orders", "Purchase Receives", "Bills"],
    defaultOpen: true,
  },
];

const ALL_APPS_ITEMS = [
  { label: "Sales", icon: Icon.Sales, children: ["Quotes", "Sales Orders", "Invoices"] },
  { label: "Receivable", icon: Icon.Receivable, children: ["Customer Invoices", "Payments Received", "Credit Notes"] },
  { label: "Payable", icon: Icon.Payable, children: ["Vendor Bills", "Payments Made", "Debit Notes"] },
  {
    label: "Accounting",
    icon: Icon.Accounting,
    children: [
      "Journal Entries",
      "Chart of Accounts",
      "Bank Reconciliation",
      "Ledger Reports",
      "Trial Balance",
      "Fixed Assets",
      "Depreciation Schedule",
      "Cost Centers",
      "Year-End Closing",
    ],
  },
  { label: "Tax", icon: Icon.Tax, children: ["Tax Returns", "Tax Settings", "Tax Reports"] },
];

function NavItem({ label, Ico, active, open, activeChild, onToggleApp, onSelectChild, hasChildren, children }) {
  const showChevron = open || active;
  const highlighted = open || active;
  const itemRef = useRef(null);

  useEffect(() => {
    if (open && itemRef.current) {
      const t = setTimeout(() => {
        const container = itemRef.current.closest(".sidebar-scroll");
        smoothScrollElementIntoView(container, itemRef.current, 650);
      }, 460);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <div ref={itemRef} className="flex w-full flex-col gap-[2px]">
      <button
        type="button"
        onClick={() => onToggleApp(label)}
        className="nav-toggle clickable hov-soft flex w-full items-center rounded px-4 py-3"
        style={{ backgroundColor: highlighted ? C.bg6 : "transparent", transition: "background-color 400ms ease" }}
      >
        <span
          className="flex items-center justify-center overflow-hidden"
          style={{
            width: highlighted ? 0 : 16,
            marginRight: highlighted ? 0 : 12,
            opacity: highlighted ? 0 : 1,
            transition: "width 450ms ease, margin-right 450ms ease, opacity 350ms ease",
          }}
        >
          <Ico style={{ color: C.primary6, flexShrink: 0 }} />
        </span>
        <span
          className="flex-1 text-left text-[15px]"
          style={{ color: highlighted ? C.text7 : C.text6, letterSpacing: "0.15px", transition: "color 400ms ease" }}
        >
          {label}
        </span>
        {hasChildren && (
          <Icon.ChevronDown
            className="chevron-arrow"
            style={{
              color: C.text6,
              opacity: showChevron ? 1 : 0,
              transition: "transform 400ms ease, opacity 350ms ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        )}
      </button>

      {hasChildren && (
        <div
          className="flex flex-col gap-[2px] pl-6"
          style={{
            maxHeight: open ? children.length * 44 + 8 : 0,
            opacity: open ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 450ms ease, opacity 400ms ease",
          }}
        >
          {children.map((child) => {
            const isChildActive = child === activeChild;
            return (
              <div
                key={child}
                className={`aggregate-row flex items-center rounded-r${isChildActive ? " is-active" : ""}`}
                style={{
                  borderLeft: `4px solid ${isChildActive ? C.primary4 : "transparent"}`,
                  backgroundColor: isChildActive ? C.primary2 : "transparent",
                  transition: "border-color 400ms ease, background-color 400ms ease",
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelectChild(label, child)}
                  className="clickable flex-1 bg-transparent py-2 text-left text-[13px]"
                  style={{
                    color: isChildActive ? C.text7 : C.text6,
                    fontWeight: isChildActive ? 500 : 400,
                    paddingLeft: isChildActive ? 8 : 0,
                    transition: "padding-left 400ms ease, color 400ms ease",
                  }}
                >
                  {child}
                </button>
                <button
                  type="button"
                  aria-label={`Add ${child}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectChild(label, child);
                  }}
                  className="add-aggregate-btn clickable flex flex-shrink-0 items-center justify-center rounded bg-transparent p-2"
                  style={{ opacity: isChildActive ? 1 : undefined }}
                >
                  <Icon.Plus style={{ color: isChildActive ? C.primary6 : C.text6, transition: "color 400ms ease" }} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------- Collapsed Side Nav item (icon + hover flyout) ---------------- */

function CollapsedNavItem({ label, Ico, children, activeChild, onSelectChild }) {
  const hasChildren = Array.isArray(children) && children.length > 0;
  const isActiveApp = !!activeChild;
  const btnRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState(null);

  const handleEnter = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.top - 4, left: rect.left + 46 });
    }
    setHovered(true);
  };
  const handleLeave = () => setHovered(false);

  return (
    <div className="collapsed-nav-item relative flex w-full items-center justify-center" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        className="clickable hov-soft flex items-center justify-center rounded p-3"
        style={{ backgroundColor: isActiveApp || hovered ? C.bg6 : "transparent" }}
      >
        <Ico style={{ color: C.primary6, width: 18, height: 18 }} />
      </button>

      {hasChildren && pos && (
        <div
          className="collapsed-flyout w-[220px] rounded p-1"
          style={{
            position: "fixed",
            top: pos.top,
            left: 44,
            paddingLeft: 8,
            paddingRight: 8,
            zIndex: 9999,
            opacity: hovered ? 1 : 0,
            visibility: hovered ? "visible" : "hidden",
            pointerEvents: hovered ? "auto" : "none",
            transition: "opacity 180ms ease",
          }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div className="rounded" style={{ backgroundColor: C.bg1, boxShadow: "16px 0px 40px rgba(0,0,0,0.16)" }}>
            <div className="rounded p-1">
              <div className="rounded p-2" style={{ backgroundColor: C.bg6 }}>
                <span className="text-[15px]" style={{ color: C.text5, letterSpacing: "0.15px" }}>
                  {label}
                </span>
              </div>
              <div className="flex flex-col gap-[2px] pt-1" style={{ paddingLeft: 16 }}>
                {children.map((child) => {
                  const isChildActive = child === activeChild;
                  return (
                    <div
                      key={child}
                      className={`aggregate-row flex items-center rounded-r${isChildActive ? " is-active" : ""}`}
                      style={{
                        borderLeft: `4px solid ${isChildActive ? C.primary4 : "transparent"}`,
                        backgroundColor: isChildActive ? C.primary2 : "transparent",
                        transition: "border-color 400ms ease, background-color 400ms ease",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectChild(label, child)}
                        className="clickable flex-1 bg-transparent py-2 text-left text-[13px]"
                        style={{
                          color: isChildActive ? C.text7 : C.text6,
                          fontWeight: isChildActive ? 500 : 400,
                          paddingLeft: isChildActive ? 8 : 0,
                          transition: "padding-left 400ms ease, color 400ms ease",
                        }}
                      >
                        {child}
                      </button>
                      <button
                        type="button"
                        aria-label={`Add ${child}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectChild(label, child);
                        }}
                        className="add-aggregate-btn clickable flex flex-shrink-0 items-center justify-center rounded bg-transparent p-2"
                        style={{ opacity: isChildActive ? 1 : undefined }}
                      >
                        <Icon.Plus style={{ color: isChildActive ? C.primary6 : C.text6, transition: "color 400ms ease" }} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Personalization modal ---------------- */

function DraggableAppRow({ label, Ico, isFavorite, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="clickable hov-soft flex w-full items-center gap-2 rounded px-4 py-3"
      style={{ cursor: "pointer", backgroundColor: isSelected ? C.bg6 : "transparent" }}
    >
      {isFavorite ? (
        <Icon.Grip style={{ color: C.text2, width: 14, height: 14, flexShrink: 0, cursor: "grab" }} />
      ) : (
        <span style={{ width: 14, flexShrink: 0 }} />
      )}
      <Ico style={{ color: isSelected ? C.text7 : C.text6, width: 16, height: 16, flexShrink: 0 }} />
      <span
        className="flex-1 text-[15px]"
        style={{ color: isSelected ? C.text7 : C.text6, fontWeight: isSelected ? 500 : 400, letterSpacing: "0.15px" }}
      >
        {label}
      </span>
      {isFavorite ? (
        <Icon.StarFilled style={{ color: C.primary6, width: 14, height: 14, flexShrink: 0 }} />
      ) : (
        <Icon.Star style={{ color: C.text4, width: 14, height: 14, flexShrink: 0 }} />
      )}
    </div>
  );
}

function DefaultRow({ label, isDefault, onSetDefault }) {
  return (
    <div className="flex items-center justify-between border-b p-3" style={{ borderColor: C.line4 }}>
      <span className="text-[13px] font-medium" style={{ color: C.text6 }}>
        {label}
      </span>
      {isDefault ? (
        <div className="rounded px-[10px] py-1" style={{ backgroundColor: C.bg6 }}>
          <span className="text-[12px] font-medium" style={{ color: C.text6, letterSpacing: "0.12px" }}>
            Default
          </span>
        </div>
      ) : (
        <button
          type="button"
          onClick={onSetDefault}
          className="clickable hov-soft rounded px-[10px] py-1"
          style={{ border: `1px solid ${C.line5}` }}
        >
          <span className="text-[12px] font-medium" style={{ color: C.text6, letterSpacing: "0.12px" }}>
            Set as Default
          </span>
        </button>
      )}
    </div>
  );
}

function PersonalizationModal({ onClose }) {
  const [defaultPage, setDefaultPage] = useState("Dashboard");
  const defaultOptions = ["Dashboard", "My Portal", "My Approvals"];
  const [selectedApp, setSelectedApp] = useState("Home");

  return (
    <div
      className="absolute inset-0 flex items-start justify-start"
      style={{ backgroundColor: "rgba(0,0,0,0.16)", zIndex: 500 }}
      onClick={onClose}
    >
      <div
        className="flex flex-col overflow-hidden rounded"
        style={{
          width: 780,
          maxWidth: "100%",
          height: "calc(100% - 4px)",
          backgroundColor: C.bg1,
          marginLeft: 8,
          marginTop: 4,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <div className="flex flex-shrink-0 items-center justify-between border-b p-4" style={{ borderColor: C.line5 }}>
          <p className="text-[18px] font-semibold" style={{ color: C.text7 }}>
            Left Navigation Personalization
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="clickable hov-soft flex items-center justify-center rounded p-2"
              style={{ border: `1px solid ${C.line6}` }}
            >
              <span className="px-1 text-[14px] font-bold" style={{ color: C.text7 }}>
                Cancel
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="clickable hov-primary-dark flex items-center justify-center rounded p-2"
              style={{ backgroundColor: C.primary6, border: `1px solid ${C.primary6}` }}
            >
              <span className="px-1 text-[14px] font-bold text-white">Save Changes</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 items-start" style={{ minHeight: 0 }}>
          {/* Left: reorder Favorites / All Apps */}
          <div
            className="sidebar-scroll flex h-full w-[280px] flex-col gap-1 overflow-y-auto border-r p-2"
            style={{ borderColor: C.line5 }}
          >
            <div className="flex flex-col gap-2 px-2 pb-2 pt-4">
              <div className="flex items-center gap-2 px-4 py-1 opacity-80">
                <Icon.Star style={{ color: C.text4 }} />
                <span className="text-[11px] font-semibold uppercase" style={{ color: C.text4, letterSpacing: "0.44px" }}>
                  Favorites
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {FAVORITE_ITEMS.map((it) => (
                  <DraggableAppRow
                    key={it.label}
                    label={it.label}
                    Ico={it.icon}
                    isFavorite
                    isSelected={selectedApp === it.label}
                    onSelect={() => setSelectedApp(it.label)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 px-2 pb-2 pt-4">
              <div className="flex items-center gap-2 px-4 py-1 opacity-80">
                <Icon.Grid style={{ color: C.text4 }} />
                <span className="text-[11px] font-semibold uppercase" style={{ color: C.text4, letterSpacing: "0.44px" }}>
                  All Apps
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {ALL_APPS_ITEMS.map((it) => (
                  <DraggableAppRow
                    key={it.label}
                    label={it.label}
                    Ico={it.icon}
                    isSelected={selectedApp === it.label}
                    onSelect={() => setSelectedApp(it.label)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: defaults + tip */}
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="overflow-hidden rounded border" style={{ borderColor: C.line4 }}>
              <div className="p-3" style={{ backgroundColor: C.bg4 }}>
                <span className="text-[11px] font-semibold uppercase" style={{ color: C.text4, letterSpacing: "0.44px" }}>
                  Set Defaults
                </span>
              </div>
              {defaultOptions.map((opt) => (
                <DefaultRow key={opt} label={opt} isDefault={defaultPage === opt} onSetDefault={() => setDefaultPage(opt)} />
              ))}
            </div>

            <div className="flex flex-col gap-2 rounded p-3" style={{ backgroundColor: C.bg4 }}>
              <span className="text-[11px] font-semibold uppercase" style={{ color: C.primary6, letterSpacing: "0.44px" }}>
                Tip
              </span>
              <p className="text-[14px] leading-[22px]" style={{ color: C.text6 }}>
                Drag and drop apps to reorder your navigation bar. Apps marked as favorites will appear in your top-level sidebar view.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SideNav({ onOpenPersonalization }) {
  const [openApps, setOpenApps] = useState({ Procurement: true });
  const [activeApp, setActiveApp] = useState("Procurement");
  const [activeChild, setActiveChild] = useState("Purchase Orders");
  const [collapsed, setCollapsed] = useState(false);

  // Clicking an app header expands/collapses that app's own list.
  // Non-active apps behave as a single-open accordion (opening one closes any
  // other open non-active app); the active app's own open state is
  // independent and is never touched by toggling a different, non-active app.
  const handleToggleApp = (label) => {
    setOpenApps((prev) => {
      const willOpen = !prev[label];
      if (label === activeApp) {
        return { ...prev, [label]: willOpen };
      }
      return { [activeApp]: prev[activeApp], [label]: willOpen };
    });
  };

  // Selecting an Aggregate makes its app the active one (hides its icon) and
  // is the only action that closes whichever app was active before.
  const handleSelectChild = (app, child) => {
    setOpenApps((prev) => {
      const next = { ...prev, [app]: true };
      if (activeApp && activeApp !== app) {
        next[activeApp] = false;
      }
      return next;
    });
    setActiveApp(app);
    setActiveChild(child);
  };

  return (
    <div
      className={`flex flex-shrink-0 flex-col self-stretch overflow-hidden rounded-tr-[4px] ${collapsed ? "w-[56px]" : "w-[220px]"}`}
      style={{ backgroundColor: C.bg1, transition: "width 320ms ease" }}
    >
      {collapsed ? (
        <div key="collapsed" className="sidebar-scroll sidenav-fade flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
          <div className="flex flex-col items-center gap-2 p-2">
            <div className="flex items-center justify-center px-[2px] py-2 opacity-80">
              <Icon.Star style={{ color: C.text4 }} />
            </div>
            <div className="flex w-full flex-col gap-1">
              {FAVORITE_ITEMS.map((it) => (
                <CollapsedNavItem
                  key={it.label}
                  label={it.label}
                  Ico={it.icon}
                  children={it.children}
                  activeChild={activeApp === it.label ? activeChild : null}
                  onSelectChild={handleSelectChild}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 p-2">
            <div className="flex items-center justify-center px-[2px] py-2 opacity-80">
              <Icon.Grid style={{ color: C.text4 }} />
            </div>
            <div className="flex w-full flex-col gap-1">
              {ALL_APPS_ITEMS.map((it) => (
                <CollapsedNavItem
                  key={it.label}
                  label={it.label}
                  Ico={it.icon}
                  children={it.children}
                  activeChild={activeApp === it.label ? activeChild : null}
                  onSelectChild={handleSelectChild}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div key="expanded" className="sidebar-scroll sidenav-fade flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
          <div className="flex flex-col gap-2 p-2">
            <div className="flex items-center gap-2 px-[2px] py-2 opacity-80">
              <Icon.Star style={{ color: C.text4 }} />
              <span className="text-[11px] font-semibold uppercase" style={{ color: C.text4, letterSpacing: "0.44px" }}>
                Favorites
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {FAVORITE_ITEMS.map((it) => (
                <NavItem
                  key={it.label}
                  label={it.label}
                  Ico={it.icon}
                  active={activeApp === it.label}
                  open={!!openApps[it.label]}
                  hasChildren={Array.isArray(it.children) && it.children.length > 0}
                  children={it.children}
                  activeChild={activeApp === it.label ? activeChild : null}
                  onToggleApp={handleToggleApp}
                  onSelectChild={handleSelectChild}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 p-2">
            <div className="flex items-center gap-2 px-[2px] py-2 opacity-80">
              <Icon.Grid style={{ color: C.text4 }} />
              <span className="text-[11px] font-semibold uppercase" style={{ color: C.text4, letterSpacing: "0.44px" }}>
                All Apps
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {ALL_APPS_ITEMS.map((it) => (
                <NavItem
                  key={it.label}
                  label={it.label}
                  Ico={it.icon}
                  active={activeApp === it.label}
                  open={!!openApps[it.label]}
                  hasChildren={Array.isArray(it.children) && it.children.length > 0}
                  children={it.children}
                  activeChild={activeApp === it.label ? activeChild : null}
                  onToggleApp={handleToggleApp}
                  onSelectChild={handleSelectChild}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex-shrink-0 p-2">
        {collapsed ? (
          <div key="collapsed-footer" className="sidenav-fade flex items-center justify-center">
            <button
              type="button"
              aria-label="Expand sidebar"
              onClick={() => setCollapsed(false)}
              className="clickable hov-border-primary flex items-center rounded border p-[6px]"
              style={{ backgroundColor: C.bg7, borderColor: C.line4 }}
            >
              <Icon.CollapseArrow style={{ color: C.text6, transform: "rotate(180deg)" }} />
            </button>
          </div>
        ) : (
          <div key="expanded-footer" className="sidenav-fade flex items-center gap-1 rounded py-2 pl-3 pr-2" style={{ backgroundColor: C.bg6 }}>
            <button
              type="button"
              onClick={onOpenPersonalization}
              className="clickable hov-soft-alt flex flex-1 items-center gap-1 rounded p-2"
            >
              <svg viewBox="0 0 14 14" width="14" height="14" style={{ color: C.text5 }}>
                <path d="M2 3h10M2 7h10M2 11h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="text-[12px]" style={{ color: C.text5, letterSpacing: "0.12px" }}>
                Personalization
              </span>
            </button>
            <button
              type="button"
              aria-label="Collapse sidebar"
              onClick={() => setCollapsed(true)}
              className="clickable hov-border-primary flex items-center rounded border p-[6px]"
              style={{ backgroundColor: C.bg1, borderColor: C.line4 }}
            >
              <Icon.CollapseArrow style={{ color: C.text6 }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Assistant rail ---------------- */

function Assistant() {
  return (
    <div className="flex w-[56px] flex-shrink-0 flex-col items-center self-stretch" style={{ backgroundColor: C.bg1 }}>
      <div className="p-2">
        <button
          className="clickable hov-border-primary flex items-center rounded border p-[6px]"
          style={{ backgroundColor: C.bg7, borderColor: C.line4 }}
        >
          <Icon.CollapseArrow style={{ color: C.text6, transform: "rotate(180deg)" }} />
        </button>
      </div>
      <div className="flex flex-col gap-1 p-2">
        <button className="clickable hov-soft flex items-center rounded p-2">
          <Icon.ChartPie style={{ color: C.text6 }} />
        </button>
        <button className="clickable hov-soft flex items-center rounded p-2">
          <Icon.Journal style={{ color: C.text6 }} />
        </button>
        <button className="clickable hov-soft flex items-center rounded p-2">
          <Icon.Info style={{ color: C.text6 }} />
        </button>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="flex items-center justify-between rounded px-2 py-3">
      <p className="text-[18px] font-semibold" style={{ color: C.text7 }}>
        Purchase Orders
      </p>
      <div className="flex items-center gap-3">
        <button
          className="clickable hov-soft flex items-center gap-1 rounded p-2"
          style={{ border: `1px solid ${C.primary5}` }}
        >
          <Icon.MoreDots style={{ color: C.primary6 }} />
          <span className="px-1 text-[14px] font-bold" style={{ color: C.primary6 }}>
            More
          </span>
        </button>
        <PrimaryButton>Purchase Order</PrimaryButton>
      </div>
    </div>
  );
}

function StatusStrip() {
  return (
    <div className="flex items-center gap-2">
      {STATUS_CARDS.map((s) => (
        <div key={s.label} className="w-[260px] overflow-hidden rounded px-4 py-3" style={{ backgroundColor: C.bg1 }}>
          <div className="flex items-center justify-between text-[11px] font-normal" style={{ color: C.text5, letterSpacing: "0.22px" }}>
            <span>{s.label}</span>
            <span>{s.count}</span>
          </div>
          <p className="mt-1 text-[18px] font-semibold" style={{ color: s.color }}>
            {s.amount}
          </p>
        </div>
      ))}
      <div className="flex-1" />
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center justify-between border-b px-2 py-3" style={{ borderColor: C.line4 }}>
      <div className="clickable hov-soft flex items-center gap-1 rounded px-2 py-1">
        <span className="text-[16px]" style={{ color: C.text7 }}>
          All Purchase Orders{" "}
        </span>
        <Icon.ChevronDown style={{ color: C.text7 }} />
      </div>
      <div className="flex items-center gap-4 px-2">
        <OutlineIconButton icon={<Icon.Filter style={{ color: C.text6 }} />} />
        <OutlineIconButton icon={<Icon.Sort style={{ color: C.text6 }} />} />
        <OutlineIconButton icon={<Icon.Columns style={{ color: C.text6 }} />} />
      </div>
    </div>
  );
}

const COLS = [
  { key: "supplier", label: "Supplier", width: 156 },
  { key: "order", label: "Order No.", width: 156 },
  { key: "orderDate", label: "Order Date", width: 220 },
  { key: "dueDate", label: "Due Date", width: 220 },
  { key: "location", label: "Location", width: 156 },
  { key: "category", label: "Category", width: 156 },
  { key: "tax", label: "Tax", width: 96 },
  { key: "status", label: "Status", width: 156 },
  { key: "action", label: "Action", width: 156 },
];

function Checkbox() {
  return (
    <div className="flex items-start px-[6px] py-[2px]">
      <div className="h-4 w-4 rounded" style={{ border: `1px solid ${C.primary2}` }} />
    </div>
  );
}

function TableHeaderRow() {
  return (
    <div className="flex items-center justify-between border-b" style={{ borderColor: C.line4 }}>
      <Checkbox />
      {COLS.map((c) => (
        <div key={c.key} className="flex items-center gap-1 px-2 py-3" style={{ width: c.width }}>
          <span className="text-[14px] font-bold whitespace-nowrap" style={{ color: C.text2 }}>
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function DataCell({ children, width }) {
  return (
    <div className="flex items-center gap-1 px-2 pt-1" style={{ width }}>
      <span className="text-[14px] whitespace-nowrap" style={{ color: C.text6 }}>
        {children}
      </span>
    </div>
  );
}

function TableDataRow({ row, isLast }) {
  return (
    <div
      className="hov-row flex items-center justify-between py-3"
      style={!isLast ? { borderBottom: `1px solid ${C.line3}` } : undefined}
    >
      <Checkbox />
      <div className="flex items-center gap-1 px-2 pt-1" style={{ width: 156 }}>
        <span className="text-[14px] whitespace-nowrap font-normal" style={{ color: C.primary6 }}>
          {row.supplier}
        </span>
      </div>
      <DataCell width={156}>{row.order}</DataCell>
      <DataCell width={220}>{row.orderDate}</DataCell>
      <DataCell width={220}>{row.dueDate}</DataCell>
      <DataCell width={156}>{row.location}</DataCell>
      <DataCell width={156}>{row.category}</DataCell>
      <DataCell width={96}>{row.tax}</DataCell>
      <div className="flex items-center gap-1 px-2" style={{ width: 156 }}>
        <StatusBadge status={row.status} />
      </div>
      <div className="flex items-center gap-1 px-2" style={{ width: 156 }}>
        <div className="clickable hov-soft-alt flex items-center justify-center rounded-full px-3 py-1" style={{ backgroundColor: C.bg6 }}>
          <span className="text-[14px]" style={{ color: C.primary6 }}>
            View
          </span>
        </div>
        <div className="clickable hov-soft-alt flex items-center justify-center rounded-full p-2" style={{ backgroundColor: C.bg6 }}>
          <Icon.MoreDots style={{ color: C.primary6 }} />
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="px-2">
      <TableHeaderRow />
      {ROWS.map((r, i) => (
        <TableDataRow key={r.order} row={r} isLast={i === ROWS.length - 1} />
      ))}
    </div>
  );
}

function PageChip({ label, active }) {
  return (
    <div
      className="clickable hov-soft flex w-[30px] items-center justify-center rounded px-3 py-1"
      style={{
        backgroundColor: active ? C.bg8 : "transparent",
        border: "1px solid #ffffff",
      }}
    >
      <span className="text-[14px]" style={{ color: C.text6 }}>
        {label}
      </span>
    </div>
  );
}

function Pagination() {
  return (
    <div className="flex items-center justify-between border-t px-4 py-3" style={{ borderColor: C.line4 }}>
      <div className="flex items-center gap-4">
        <span className="text-[14px]" style={{ color: C.text4 }}>
          Showing 10 of 1,000 Rows
        </span>
        <div className="clickable hov-outline flex items-center gap-1 rounded px-3 py-1" style={{ border: `1px solid ${C.line5}` }}>
          <span className="text-[14px]" style={{ color: C.text6 }}>
            Rows per page 10{" "}
          </span>
          <Icon.ChevronDown style={{ color: C.text6 }} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="clickable hov-outline flex items-center justify-center rounded p-1" style={{ border: `1px solid ${C.line6}` }}>
          <Icon.ChevronLeft style={{ color: C.text6 }} />
        </button>
        <PageChip label="1" active />
        <PageChip label="2" />
        <PageChip label="3" />
        <PageChip label="4" />
        <PageChip label="5" />
        <span className="w-[30px] text-center text-[16px] font-bold" style={{ color: C.text4 }}>
          ...
        </span>
        <PageChip label="9" />
        <button className="clickable hov-outline flex items-center justify-center rounded p-1" style={{ border: `1px solid ${C.line6}` }}>
          <Icon.ChevronRight style={{ color: C.text6 }} />
        </button>
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */

export default function PurchaseOrdersPage() {
  const [showPersonalization, setShowPersonalization] = useState(false);

  return (
    <div
      className="fixed inset-0 flex flex-col text-[#0d0d0d]"
      style={{ backgroundColor: C.bg6, fontFamily: "Inter, sans-serif", "--spacing": "0.25rem" }}
    >
      <HoverStyles />
      <TopBar />
      <div
        className="flex-shrink-0"
        style={{
          height: 4,
          backgroundColor: showPersonalization ? "rgba(0,0,0,0.16)" : "transparent",
          transition: "background-color 150ms ease",
        }}
      />
      <div className="flex flex-1 items-stretch overflow-hidden">
        <SideNav onOpenPersonalization={() => setShowPersonalization(true)} />
        <div className="relative flex flex-1 items-stretch gap-2 overflow-hidden pl-2">
          <div
            className="flex flex-1 flex-col gap-2 overflow-auto"
            style={{ backgroundColor: C.bg6 }}
          >
            <PageHeader />
            <StatusStrip />
            <div className="rounded" style={{ backgroundColor: C.bg1 }}>
              <SectionHeader />
              <Table />
              <Pagination />
            </div>
          </div>
          <Assistant />

          {showPersonalization && <PersonalizationModal onClose={() => setShowPersonalization(false)} />}
        </div>
      </div>
    </div>
  );
}
