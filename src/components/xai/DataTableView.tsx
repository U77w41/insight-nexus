import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp, AlertTriangle, Shield } from "lucide-react";
import { dataRows, DataRow } from "@/lib/mockData";
import { WaterfallPlot } from "./WaterfallPlot";

export function DataTableView() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const pageSize = 10;

  const filtered = dataRows.filter(
    (r) =>
      r.id.toString().includes(search) ||
      r.label.toLowerCase().includes(search.toLowerCase())
  );

  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search by ID or label..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <span className="text-xs text-muted-foreground">{filtered.length} records</span>
      </div>

      <div className="xai-card overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                {["ID", "velocity", "acct_age", "risk", "amt", "countries", "PEP", "kyc", "pred", "label", ""].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <RowItem
                  key={row.id}
                  row={row}
                  expanded={expandedRow === row.id}
                  onToggle={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-3 py-1 text-xs rounded-md bg-secondary text-secondary-foreground disabled:opacity-30 hover:bg-secondary/80 transition-colors"
          >
            Previous
          </button>
          <span className="text-xs text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="px-3 py-1 text-xs rounded-md bg-secondary text-secondary-foreground disabled:opacity-30 hover:bg-secondary/80 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function RowItem({ row, expanded, onToggle }: { row: DataRow; expanded: boolean; onToggle: () => void }) {
  return (
    <>
      <tr
        className="border-b border-border/50 hover:bg-secondary/30 cursor-pointer transition-colors"
        onClick={onToggle}
      >
        <td className="px-3 py-2 font-mono text-foreground">{row.id}</td>
        <td className="px-3 py-2 font-mono">{row.transaction_velocity}</td>
        <td className="px-3 py-2 font-mono">{row.account_age}d</td>
        <td className="px-3 py-2 font-mono">{row.risk_score}</td>
        <td className="px-3 py-2 font-mono">${row.avg_transaction_amount.toLocaleString()}</td>
        <td className="px-3 py-2 font-mono">{row.num_countries}</td>
        <td className="px-3 py-2">{row.is_pep ? "✓" : "—"}</td>
        <td className="px-3 py-2 font-mono">{row.kyc_completeness}%</td>
        <td className="px-3 py-2 font-mono font-semibold">{row.prediction}</td>
        <td className="px-3 py-2">
          <span className={`xai-badge ${row.label === "Suspicious" ? "xai-badge-positive" : "xai-badge-negative"}`}>
            {row.label === "Suspicious" ? <AlertTriangle className="h-3 w-3 mr-1" /> : <Shield className="h-3 w-3 mr-1" />}
            {row.label}
          </span>
        </td>
        <td className="px-3 py-2">
          {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </td>
      </tr>
      <AnimatePresence>
        {expanded && (
          <tr>
            <td colSpan={11}>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-muted/30 p-4"
              >
                <WaterfallPlot rowId={row.id} />
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}
