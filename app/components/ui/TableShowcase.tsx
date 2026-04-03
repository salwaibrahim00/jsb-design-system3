"use client";
import { useState, useMemo } from "react";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Download, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Database, TrendingUp, Users, DollarSign, Zap } from "lucide-react";

/* ── Data ───────────────────────────────────────────────────────────── */
const STATUS_MAP = {
  active:   { label: "Active",    color: "#16a34a", bg: "#dcfce7", dot: "#22c55e", pulse: true  },
  pending:  { label: "Pending",   color: "#d97706", bg: "#fef3c7", dot: "#f59e0b", pulse: true  },
  review:   { label: "In Review", color: "#3b82f6", bg: "#dbeafe", dot: "#60a5fa", pulse: false },
  closed:   { label: "Closed",    color: "#6b7280", bg: "#f3f4f6", dot: "#9ca3af", pulse: false },
};

type StatusKey = keyof typeof STATUS_MAP;

const AVATAR_COLORS = [
  { bg: "#0A1A33", fg: "#F2C94C" },
  { bg: "#1e3a5f", fg: "#93c5fd" },
  { bg: "#14532d", fg: "#86efac" },
  { bg: "#7c2d12", fg: "#fdba74" },
  { bg: "#4a1d96", fg: "#c4b5fd" },
  { bg: "#164e63", fg: "#67e8f9" },
  { bg: "#78350f", fg: "#fcd34d" },
];

const CLIENTS = [
  { id: 1, name: "Marcus T.",   role: "CEO",         company: "Detroit Manufacturing Co.",  service: "Financial Readiness",   status: "active"  as StatusKey, value: 12400, engagement: 87, date: "Mar 28, 2025", trend: +12 },
  { id: 2, name: "Denise R.",   role: "Founder",     company: "Midwest Retail Group",       service: "Growth Strategy",       status: "pending" as StatusKey, value:  8200, engagement: 61, date: "Apr 2, 2025",  trend:  +5 },
  { id: 3, name: "James O.",    role: "Partner",     company: "Founders Capital LLC",       service: "Operations Consulting", status: "review"  as StatusKey, value: 19750, engagement: 74, date: "Mar 15, 2025", trend:  -3 },
  { id: 4, name: "Priya S.",    role: "VP HR",       company: "Elevation HR Solutions",     service: "HR Consulting",         status: "active"  as StatusKey, value:  6800, engagement: 92, date: "Apr 5, 2025",  trend: +18 },
  { id: 5, name: "Tariq W.",    role: "MD",          company: "Northside Ventures",         service: "Business Advisory",     status: "closed"  as StatusKey, value: 22000, engagement: 45, date: "Feb 20, 2025", trend:   0 },
  { id: 6, name: "Asha L.",     role: "CFO",         company: "Great Lakes Capital",        service: "Financial Readiness",   status: "active"  as StatusKey, value: 15300, engagement: 79, date: "Apr 8, 2025",  trend:  +9 },
  { id: 7, name: "Devon K.",    role: "Director",    company: "Motor City Builders",        service: "Growth Strategy",       status: "pending" as StatusKey, value:  9500, engagement: 55, date: "Apr 10, 2025", trend:  +2 },
];

const PAGE_SIZE = 5;

type SortKey = "name" | "service" | "value" | "engagement" | "date";

/* ── Sub-components ─────────────────────────────────────────────────── */
function Avatar({ name, idx }: { name: string; idx: number }) {
  const c = AVATAR_COLORS[idx % AVATAR_COLORS.length];
  const initials = name.split(" ").map((n) => n[0]).join("");
  return (
    <div style={{
      width: "36px", height: "36px", borderRadius: "10px",
      background: c.bg, color: c.fg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "11px", fontWeight: 800, flexShrink: 0,
      fontFamily: "var(--font-body)",
      boxShadow: `0 0 0 2px ${c.fg}33`,
    }}>
      {initials}
    </div>
  );
}

function StatusBadge({ statusKey }: { statusKey: StatusKey }) {
  const s = STATUS_MAP[statusKey];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      padding: "4px 12px", borderRadius: "999px",
      fontSize: "12px", fontWeight: 700,
      color: s.color, background: s.bg,
      fontFamily: "var(--font-body)", whiteSpace: "nowrap",
      border: `1px solid ${s.color}22`,
    }}>
      <span
        className={s.pulse ? "alert-ping" : ""}
        style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: s.dot, display: "inline-block", flexShrink: 0,
        }}
      />
      {s.label}
    </span>
  );
}

function EngagementBar({ pct }: { pct: number }) {
  const color = pct >= 80 ? "#16a34a" : pct >= 60 ? "#d97706" : "#dc2626";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "100px" }}>
      <div style={{ flex: 1, height: "6px", background: "#f3f4f6", borderRadius: "99px", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: "99px", transition: "width 0.4s ease" }} />
      </div>
      <span style={{ fontSize: "12px", fontWeight: 700, color, fontFamily: "var(--font-body)", minWidth: "32px" }}>{pct}%</span>
    </div>
  );
}

function TrendChip({ pct }: { pct: number }) {
  if (pct === 0) return <span style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "var(--font-body)" }}>—</span>;
  const up = pct > 0;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "3px",
      fontSize: "12px", fontWeight: 700,
      color: up ? "#16a34a" : "#dc2626",
      fontFamily: "var(--font-body)",
    }}>
      {up ? <TrendingUp size={12} /> : <TrendingUp size={12} style={{ transform: "scaleY(-1)" }} />}
      {up ? "+" : ""}{pct}%
    </span>
  );
}

function SortBtn({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: "asc" | "desc" }) {
  const active = sortKey === col;
  if (active) return sortDir === "asc"
    ? <ArrowUp  size={12} color="#0A1A33" strokeWidth={2.5} />
    : <ArrowDown size={12} color="#0A1A33" strokeWidth={2.5} />;
  return <ArrowUpDown size={12} color="#d1d5db" strokeWidth={2} />;
}

function SectionLabel({ label, intent }: { label: string; intent: string }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        background: "rgba(242,201,76,0.12)", border: "1px solid rgba(242,201,76,0.25)",
        borderRadius: "100px", padding: "4px 14px", marginBottom: "10px",
      }}>
        <Zap size={11} color="#F2C94C" fill="#F2C94C" />
        <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F2C94C", fontWeight: 700, fontFamily: "var(--font-body)" }}>
          {label}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: "14px", color: "#6b7280", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
        {intent}
      </p>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────────────── */
const COMPARISON_ROWS = [
  { name: "Financial Readiness",   vals: [true,  true,  false] },
  { name: "Operations Consulting", vals: [false, true,  true ] },
  { name: "Growth Strategy",       vals: [true,  true,  true ] },
  { name: "HR Consulting",         vals: [false, true,  true ] },
  { name: "Board Advisory",        vals: [false, false, true ] },
];

const TOKEN_ROWS = [
  { token: "--space-4",   value: "16px", usage: "Default component padding" },
  { token: "--space-6",   value: "24px", usage: "Card internal spacing"     },
  { token: "--space-8",   value: "32px", usage: "Section grouping"          },
  { token: "--space-16",  value: "64px", usage: "Major section separation"  },
];

export default function TableShowcase() {
  const [search, setSearch]         = useState("");
  const [activeFilter, setFilter]   = useState<StatusKey | "all">("all");
  const [sortKey, setSortKey]       = useState<SortKey>("date");
  const [sortDir, setSortDir]       = useState<"asc" | "desc">("asc");
  const [selected, setSelected]     = useState<Set<number>>(new Set());
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [page, setPage]             = useState(0);

  const filtered = useMemo(() => {
    let rows = CLIENTS;
    if (activeFilter !== "all") rows = rows.filter((r) => r.status === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((r) =>
        r.name.toLowerCase().includes(q) ||
        r.company.toLowerCase().includes(q) ||
        r.service.toLowerCase().includes(q)
      );
    }
    return [...rows].sort((a, b) => {
      let av: string | number = a[sortKey as keyof typeof a] as string | number;
      let bv: string | number = b[sortKey as keyof typeof a] as string | number;
      if (typeof av === "number") return sortDir === "asc" ? (av - (bv as number)) : ((bv as number) - av);
      return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }, [search, activeFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageRows   = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setPage(0);
  };

  const toggleRow = (id: number) => setSelected((s) => {
    const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n;
  });

  const toggleAll = () => setSelected((s) =>
    s.size === pageRows.length ? new Set() : new Set(pageRows.map((r) => r.id))
  );

  const thStyle: React.CSSProperties = {
    textAlign: "left", padding: "13px 18px",
    fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase",
    fontWeight: 700, color: "#9ca3af", fontFamily: "var(--font-body)",
    borderBottom: "1px solid rgba(20,34,53,0.08)", background: "#fafafa",
    whiteSpace: "nowrap", cursor: "pointer", userSelect: "none",
  };
  const tdStyle: React.CSSProperties = {
    padding: "15px 18px", fontSize: "14px",
    fontFamily: "var(--font-body)", color: "#374151",
    borderBottom: "1px solid rgba(20,34,53,0.06)",
    verticalAlign: "middle",
  };

  const totalValue = filtered.reduce((s, r) => s + r.value, 0);
  const activeCount = filtered.filter((r) => r.status === "active").length;

  return (
    <section style={{ padding: "96px 24px", background: "#f8f9fb" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── Header Banner ── */}
        <div style={{
          borderRadius: "28px",
          background: "linear-gradient(135deg, #0A1A33 0%, #142240 60%, #0d2040 100%)",
          padding: "64px 56px",
          marginBottom: "64px",
          position: "relative",
          overflow: "hidden",
        }}>
          {[
            { color: "#F2C94C", size: 280, top: -60,  right: 40,  opacity: 0.1 },
            { color: "#3b82f6", size: 200, bottom: -50, right: 220, opacity: 0.12 },
            { color: "#16a34a", size: 160, top: 60,   right: -40, opacity: 0.08 },
          ].map((o, i) => (
            <div key={i} style={{
              position: "absolute", borderRadius: "50%",
              width: o.size, height: o.size,
              top: (o as any).top, bottom: (o as any).bottom, right: o.right,
              background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
              opacity: o.opacity, pointerEvents: "none",
              animation: `orbFloat${(i % 4) + 1} ${9 + i * 2}s ease-in-out infinite`,
            }} />
          ))}

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(242,201,76,0.15)", border: "1px solid rgba(242,201,76,0.3)",
              borderRadius: "100px", padding: "5px 16px", marginBottom: "24px",
            }}>
              <Database size={12} color="#F2C94C" />
              <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#F2C94C", fontWeight: 700, fontFamily: "var(--font-body)" }}>
                Data Display
              </span>
            </div>

            <h2 style={{
              fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.08, fontWeight: 800,
              margin: "0 0 20px 0", maxWidth: "700px",
              fontFamily: "var(--font-heading)", color: "white", letterSpacing: "-0.03em",
            }}>
              Tables make data scannable.{" "}
              <span style={{ color: "#F2C94C" }}>Every column earns its place.</span>
            </h2>

            <p style={{
              fontSize: "17px", lineHeight: 1.75, color: "rgba(255,255,255,0.6)",
              maxWidth: "580px", margin: "0 0 36px 0", fontFamily: "var(--font-body)",
            }}>
              A well-structured table is faster than a paragraph. Column order, row density,
              and status visibility all determine how quickly a user finds what they need.
            </p>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {[
                { icon: Users,       label: "7 Clients",     color: "#93c5fd" },
                { icon: DollarSign,  label: "$94K Pipeline",  color: "#86efac" },
                { icon: TrendingUp,  label: "79% Avg Engagement", color: "#F2C94C" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: `${color}18`, border: `1px solid ${color}33`,
                  borderRadius: "12px", padding: "8px 16px",
                }}>
                  <Icon size={14} color={color} />
                  <span style={{ fontSize: "13px", fontWeight: 700, color, fontFamily: "var(--font-body)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SaaS Data Table ── */}
        <div style={{ marginBottom: "64px" }}>
          <SectionLabel
            label="Sortable Data Table"
            intent="Search, filter by status, sort any column. Row actions appear on hover."
          />

          <div style={{
            background: "white", borderRadius: "24px",
            border: "1px solid rgba(20,34,53,0.08)",
            boxShadow: "0 4px 24px rgba(16,35,63,0.06)",
            overflow: "hidden",
          }}>
            {/* Toolbar */}
            <div style={{
              padding: "20px 24px", display: "flex", alignItems: "center",
              gap: "16px", flexWrap: "wrap",
              borderBottom: "1px solid rgba(20,34,53,0.07)",
            }}>
              {/* Search */}
              <div style={{ position: "relative", flex: "1 1 220px", minWidth: "180px" }}>
                <Search size={14} color="#9ca3af" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                  placeholder="Search clients…"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    paddingLeft: "36px", paddingRight: "12px",
                    height: "38px", borderRadius: "10px",
                    border: "1.5px solid rgba(20,34,53,0.1)",
                    fontSize: "14px", fontFamily: "var(--font-body)",
                    color: "#0A1A33", outline: "none",
                    background: "#fafafa",
                  }}
                />
              </div>

              {/* Status filter pills */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {(["all", "active", "pending", "review", "closed"] as const).map((f) => {
                  const isActive = activeFilter === f;
                  const s = f !== "all" ? STATUS_MAP[f] : null;
                  return (
                    <button
                      key={f}
                      onClick={() => { setFilter(f); setPage(0); }}
                      style={{
                        padding: "6px 14px", borderRadius: "999px",
                        border: isActive ? `1.5px solid ${s?.color ?? "#0A1A33"}` : "1.5px solid rgba(20,34,53,0.1)",
                        background: isActive ? (s?.bg ?? "#0A1A33") : "transparent",
                        color: isActive ? (s?.color ?? "white") : "#6b7280",
                        fontSize: "12px", fontWeight: 700, cursor: "pointer",
                        fontFamily: "var(--font-body)", transition: "all 0.15s",
                      }}
                    >
                      {f === "all" ? "All" : STATUS_MAP[f].label}
                    </button>
                  );
                })}
              </div>

              {/* Export button */}
              <button style={{
                marginLeft: "auto",
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 16px", borderRadius: "10px",
                background: "#0A1A33", border: "none", cursor: "pointer",
                color: "#F2C94C", fontWeight: 700, fontSize: "13px",
                fontFamily: "var(--font-body)",
              }}>
                <Download size={13} />
                Export
              </button>
            </div>

            {/* Bulk action bar */}
            {selected.size > 0 && (
              <div style={{
                padding: "12px 24px", background: "rgba(242,201,76,0.08)",
                borderBottom: "1px solid rgba(242,201,76,0.2)",
                display: "flex", alignItems: "center", gap: "12px",
              }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#0A1A33", fontFamily: "var(--font-body)" }}>
                  {selected.size} row{selected.size > 1 ? "s" : ""} selected
                </span>
                <button style={{ padding: "5px 12px", borderRadius: "7px", background: "#dc2626", border: "none", color: "white", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: "5px" }}>
                  <Trash2 size={11} /> Delete
                </button>
                <button onClick={() => setSelected(new Set())} style={{ marginLeft: "auto", background: "transparent", border: "none", cursor: "pointer", fontSize: "12px", color: "#9ca3af", fontFamily: "var(--font-body)" }}>
                  Clear
                </button>
              </div>
            )}

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "820px" }}>
                <thead>
                  <tr>
                    {/* Checkbox */}
                    <th style={{ ...thStyle, width: "48px", cursor: "default" }}>
                      <input type="checkbox" checked={selected.size === pageRows.length && pageRows.length > 0} onChange={toggleAll}
                        style={{ width: "14px", height: "14px", cursor: "pointer", accentColor: "#F2C94C" }} />
                    </th>
                    {([
                      { key: "name",        label: "Client"       },
                      { key: "service",     label: "Service"      },
                      { key: null,          label: "Status"       },
                      { key: "value",       label: "Value"        },
                      { key: "engagement",  label: "Engagement"   },
                      { key: null,          label: "Trend"        },
                      { key: "date",        label: "Date"         },
                      { key: null,          label: ""             },
                    ] as { key: SortKey | null; label: string }[]).map((col, i) => (
                      <th
                        key={i}
                        style={{ ...thStyle, cursor: col.key ? "pointer" : "default" }}
                        onClick={() => col.key && toggleSort(col.key)}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          {col.label}
                          {col.key && <SortBtn col={col.key} sortKey={sortKey} sortDir={sortDir} />}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ ...tdStyle, textAlign: "center", padding: "48px", color: "#9ca3af" }}>
                        No results for "{search}"
                      </td>
                    </tr>
                  ) : pageRows.map((row, idx) => {
                    const isHovered  = hoveredRow === row.id;
                    const isSelected = selected.has(row.id);
                    return (
                      <tr
                        key={row.id}
                        onMouseEnter={() => setHoveredRow(row.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        style={{
                          background: isSelected
                            ? "rgba(242,201,76,0.07)"
                            : isHovered ? "#f9fafb" : "white",
                          transition: "background 0.12s",
                          cursor: "pointer",
                        }}
                      >
                        {/* Checkbox */}
                        <td style={{ ...tdStyle, width: "48px" }}>
                          <input type="checkbox" checked={isSelected} onChange={() => toggleRow(row.id)}
                            style={{ width: "14px", height: "14px", cursor: "pointer", accentColor: "#F2C94C" }} />
                        </td>

                        {/* Client */}
                        <td style={tdStyle}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <Avatar name={row.name} idx={idx} />
                            <div>
                              <div style={{ fontWeight: 700, color: "#0A1A33", fontSize: "14px", fontFamily: "var(--font-body)" }}>{row.name}</div>
                              <div style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "var(--font-body)" }}>{row.role} · {row.company}</div>
                            </div>
                          </div>
                        </td>

                        {/* Service */}
                        <td style={{ ...tdStyle, color: "#374151", maxWidth: "180px" }}>
                          <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "6px", background: "rgba(242,201,76,0.1)", color: "#7a5c00", fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-body)", border: "1px solid rgba(242,201,76,0.25)" }}>
                            {row.service}
                          </span>
                        </td>

                        {/* Status */}
                        <td style={tdStyle}><StatusBadge statusKey={row.status} /></td>

                        {/* Value */}
                        <td style={{ ...tdStyle, fontWeight: 800, color: "#0A1A33", fontFamily: "var(--font-body)" }}>
                          ${row.value.toLocaleString()}
                        </td>

                        {/* Engagement bar */}
                        <td style={{ ...tdStyle, minWidth: "140px" }}>
                          <EngagementBar pct={row.engagement} />
                        </td>

                        {/* Trend */}
                        <td style={tdStyle}><TrendChip pct={row.trend} /></td>

                        {/* Date */}
                        <td style={{ ...tdStyle, color: "#9ca3af", fontSize: "13px" }}>{row.date}</td>

                        {/* Row actions */}
                        <td style={{ ...tdStyle, width: "80px" }}>
                          <div style={{
                            display: "flex", gap: "4px",
                            opacity: isHovered ? 1 : 0,
                            transition: "opacity 0.15s",
                          }}>
                            <button style={{ width: "28px", height: "28px", borderRadius: "7px", border: "1px solid rgba(20,34,53,0.1)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}>
                              <Eye size={13} />
                            </button>
                            <button style={{ width: "28px", height: "28px", borderRadius: "7px", border: "1px solid rgba(20,34,53,0.1)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}>
                              <Pencil size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer / Pagination */}
            <div style={{
              padding: "14px 24px",
              display: "flex", alignItems: "center", gap: "16px",
              borderTop: "1px solid rgba(20,34,53,0.07)",
              background: "#fafafa",
            }}>
              <span style={{ fontSize: "13px", color: "#9ca3af", fontFamily: "var(--font-body)" }}>
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} · ${totalValue.toLocaleString()} pipeline · {activeCount} active
              </span>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  style={{
                    width: "32px", height: "32px", borderRadius: "8px",
                    border: "1px solid rgba(20,34,53,0.1)", background: "white",
                    cursor: page === 0 ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: page === 0 ? "#d1d5db" : "#374151",
                    opacity: page === 0 ? 0.5 : 1,
                  }}
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    style={{
                      width: "32px", height: "32px", borderRadius: "8px",
                      border: i === page ? "1.5px solid #0A1A33" : "1px solid rgba(20,34,53,0.1)",
                      background: i === page ? "#0A1A33" : "white",
                      color: i === page ? "#F2C94C" : "#374151",
                      fontSize: "13px", fontWeight: 700,
                      cursor: "pointer", fontFamily: "var(--font-body)",
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                  style={{
                    width: "32px", height: "32px", borderRadius: "8px",
                    border: "1px solid rgba(20,34,53,0.1)", background: "white",
                    cursor: page >= totalPages - 1 ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: page >= totalPages - 1 ? "#d1d5db" : "#374151",
                    opacity: page >= totalPages - 1 ? 0.5 : 1,
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Comparison Table ── */}
        <div style={{ marginBottom: "64px" }}>
          <SectionLabel label="Comparison Table" intent="Used when users need to evaluate options side by side. Keep columns under 5 and rows under 8." />
          <div style={{ background: "white", borderRadius: "24px", border: "1px solid rgba(20,34,53,0.08)", boxShadow: "0 4px 24px rgba(16,35,63,0.06)", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, cursor: "default", width: "220px" }}>Service</th>
                    {[
                      { label: "Startups",    color: "#3b82f6", bg: "#dbeafe" },
                      { label: "SMBs",        color: "#d97706", bg: "#fef3c7" },
                      { label: "Enterprises", color: "#16a34a", bg: "#dcfce7" },
                    ].map((tier) => (
                      <th key={tier.label} style={{ ...thStyle, textAlign: "center", cursor: "default" }}>
                        <span style={{
                          display: "inline-block", padding: "3px 12px", borderRadius: "999px",
                          background: tier.bg, color: tier.color,
                          fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em",
                        }}>
                          {tier.label}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => {
                    const isLast = i === COMPARISON_ROWS.length - 1;
                    return (
                      <tr key={row.name} style={{ transition: "background 0.12s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                      >
                        <td style={{ ...tdStyle, fontWeight: 600, color: "#0A1A33", borderBottom: isLast ? "none" : tdStyle.borderBottom }}>
                          {row.name}
                        </td>
                        {row.vals.map((v, vi) => (
                          <td key={vi} style={{ ...tdStyle, textAlign: "center", borderBottom: isLast ? "none" : tdStyle.borderBottom }}>
                            {v ? (
                              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "#dcfce7" }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                              </span>
                            ) : (
                              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "#f3f4f6" }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Minimal / Token Table ── */}
        <div>
          <SectionLabel label="Minimal Table" intent="For low-density reference data. No borders, maximum whitespace — lets the content breathe." />
          <div style={{ background: "white", borderRadius: "24px", border: "1px solid rgba(20,34,53,0.08)", boxShadow: "0 4px 24px rgba(16,35,63,0.06)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Token", "Value", "Usage"].map((h) => (
                    <th key={h} style={{ ...thStyle, cursor: "default" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOKEN_ROWS.map((row, i) => {
                  const isLast = i === TOKEN_ROWS.length - 1;
                  return (
                    <tr key={row.token}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                      style={{ transition: "background 0.12s" }}
                    >
                      <td style={{ ...tdStyle, borderBottom: isLast ? "none" : tdStyle.borderBottom }}>
                        <code style={{ fontFamily: "monospace", fontSize: "13px", background: "#f3f4f6", padding: "3px 8px", borderRadius: "6px", color: "#0A1A33" }}>
                          {row.token}
                        </code>
                      </td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: "#0A1A33", borderBottom: isLast ? "none" : tdStyle.borderBottom }}>
                        {row.value}
                      </td>
                      <td style={{ ...tdStyle, color: "#6b7280", borderBottom: isLast ? "none" : tdStyle.borderBottom }}>
                        {row.usage}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
