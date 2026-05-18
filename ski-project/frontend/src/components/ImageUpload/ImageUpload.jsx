import { useState, useRef, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ── Tiny sub-components ──────────────────────────────────────────────────────

function HealthBadge({ score, label, color }) {
  const theme = {
    green:  { ring: "#16a34a", bg: "#f0fdf4", text: "#15803d" },
    yellow: { ring: "#ca8a04", bg: "#fefce8", text: "#a16207" },
    red:    { ring: "#dc2626", bg: "#fef2f2", text: "#b91c1c" },
  }[color] || { ring: "#6b7280", bg: "#f9fafb", text: "#374151" };

  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ background: theme.bg, borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 20, border: `1px solid ${theme.ring}22` }}>
      {/* Circular progress */}
      <div style={{ position: "relative", width: 88, height: 88, flexShrink: 0 }}>
        <svg width="88" height="88" viewBox="0 0 88 88" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="44" cy="44" r="36" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="44" cy="44" r="36"
            fill="none"
            stroke={theme.ring}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)" }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: theme.text, lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: 10, color: theme.text, opacity: 0.7 }}>/100</span>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: theme.text, opacity: 0.7, marginBottom: 2 }}>Health Score</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: theme.text }}>{label}</div>
      </div>
    </div>
  );
}

function ReasonPill({ text, type }) {
  const colors = { good: "#16a34a", warn: "#ca8a04", bad: "#dc2626" };
  const bgs    = { good: "#f0fdf4", warn: "#fefce8", bad: "#fef2f2" };
  const c = colors[type] || colors.warn;
  const bg = bgs[type] || bgs.warn;
  return (
    <span style={{ display: "inline-block", background: bg, color: c, border: `1px solid ${c}22`, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 500, margin: "2px 3px" }}>
      {text}
    </span>
  );
}

function NutritionRow({ label, value, unit, highlight }) {
  const colors = { high: "#fef2f2", low: "#f0fdf4", normal: "transparent" };
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: colors[highlight] || "transparent", borderRadius: 8 }}>
      <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)" }}>
        {value != null ? `${typeof value === "number" ? value.toFixed(1) : value}${unit}` : "—"}
      </span>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function ImageUpload({ token, onScanSuccess }) {
  const [dragOver, setDragOver]     = useState(false);
  const [preview, setPreview]       = useState(null);   // data URL
  const [file, setFile]             = useState(null);
  const [status, setStatus]         = useState("idle"); // idle | uploading | done | error
  const [result, setResult]         = useState(null);
  const [error, setError]           = useState(null);
  const [progress, setProgress]     = useState(0);
  const inputRef = useRef();

  const loadFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setResult(null);
    setError(null);
    setStatus("idle");
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    loadFile(e.dataTransfer.files[0]);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = () => setDragOver(false);

  const analyse = async () => {
    if (!file) return;
    setStatus("uploading");
    setProgress(0);
    setError(null);

    // Fake progress ticks while waiting for the API
    const ticker = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 12, 88));
    }, 400);

    try {
      const form = new FormData();
      form.append("file", file);

      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_URL}/api/image-scan/`, {
        method: "POST",
        headers: headers,
        body: form,
      });

      clearInterval(ticker);

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Server error" }));
        throw new Error(err.detail || "Upload failed");
      }

      setProgress(100);
      const data = await res.json();
      setResult(data);
      setStatus("done");
      if (onScanSuccess) {
        onScanSuccess(data);
      }
    } catch (err) {
      clearInterval(ticker);
      setError(err.message);
      setStatus("error");
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setStatus("idle");
    setProgress(0);
  };

  const p = result?.product;
  const hs = result?.health_score;
  const n = p?.nutrition;

  // Helper: highlight nutrition cell
  const sugarFlag = n?.sugars > 12 ? "high" : n?.sugars < 5 ? "low" : "normal";
  const sodiumFlag = n?.sodium != null ? (n.sodium * 1000 > 600 ? "high" : n.sodium * 1000 < 120 ? "low" : "normal") : "normal";
  const fatFlag = n?.saturated_fat > 5 ? "high" : "normal";

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "2rem 1rem", fontFamily: "var(--font-sans)" }}>

      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: "var(--color-text-primary)", margin: 0 }}>
          Label Scanner
        </h1>
        <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginTop: 4 }}>
          Upload a food label photo — AI extracts ingredients and scores it
        </p>
      </div>

      {/* Drop zone */}
      {!preview && (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          style={{
            border: `2px dashed ${dragOver ? "#16a34a" : "var(--color-border-secondary)"}`,
            borderRadius: 16,
            padding: "3rem 2rem",
            textAlign: "center",
            cursor: "pointer",
            background: dragOver ? "#f0fdf4" : "var(--color-background-secondary)",
            transition: "all .2s",
            marginBottom: "1rem",
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ margin: "0 auto" }}>
              <rect width="44" height="44" rx="12" fill={dragOver ? "#dcfce7" : "var(--color-background-primary)"} />
              <path d="M22 14v16M14 22l8-8 8 8" stroke={dragOver ? "#16a34a" : "var(--color-text-secondary)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 32h20" stroke={dragOver ? "#16a34a" : "var(--color-border-secondary)"} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <p style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 4px" }}>
            {dragOver ? "Drop it!" : "Drop your food label here"}
          </p>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>
            or click to browse · JPEG, PNG, WebP · max 10 MB
          </p>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => loadFile(e.target.files[0])} />
        </div>
      )}

      {/* Preview + action */}
      {preview && status !== "done" && (
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid var(--color-border-tertiary)", marginBottom: 12 }}>
            <img src={preview} alt="Food label preview" style={{ width: "100%", maxHeight: 320, objectFit: "contain", background: "var(--color-background-secondary)", display: "block" }} />
            {status === "uploading" && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>Analysing label…</div>
                <div style={{ width: 200, height: 4, background: "rgba(255,255,255,.3)", borderRadius: 2 }}>
                  <div style={{ width: `${progress}%`, height: "100%", background: "#4ade80", borderRadius: 2, transition: "width .4s" }} />
                </div>
                <div style={{ color: "rgba(255,255,255,.7)", fontSize: 12 }}>{Math.round(progress)}%</div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={analyse}
              disabled={status === "uploading"}
              style={{ flex: 1, padding: "11px 0", background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", opacity: status === "uploading" ? 0.6 : 1, transition: "opacity .15s" }}
            >
              {status === "uploading" ? "Analysing…" : "Analyse Label"}
            </button>
            <button
              onClick={reset}
              style={{ padding: "11px 16px", background: "transparent", color: "var(--color-text-secondary)", border: "1px solid var(--color-border-secondary)", borderRadius: 10, fontSize: 14, cursor: "pointer" }}
            >
              Remove
            </button>
          </div>

          {status === "error" && (
            <div style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginTop: 10 }}>
              {error}
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {status === "done" && result && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Image thumbnail + confidence */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <img src={preview} alt="uploaded" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 10, border: "1px solid var(--color-border-tertiary)", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 16, color: "var(--color-text-primary)" }}>{p?.name || "Unknown Product"}</div>
              {p?.brand && <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 1 }}>{p.brand}</div>}
              <div style={{ marginTop: 4 }}>
                <span style={{
                  fontSize: 11, fontWeight: 500,
                  padding: "2px 8px", borderRadius: 12,
                  background: result.extraction_confidence === "high" ? "#f0fdf4" : result.extraction_confidence === "low" ? "#fef2f2" : "#fefce8",
                  color: result.extraction_confidence === "high" ? "#15803d" : result.extraction_confidence === "low" ? "#b91c1c" : "#a16207",
                }}>
                  {result.extraction_confidence} confidence
                </span>
              </div>
            </div>
          </div>

          {/* Health score ring */}
          {hs && <HealthBadge score={hs.score} label={hs.label} color={hs.color} />}

          {/* Score reasons */}
          {hs?.reasons?.length > 0 && (
            <div style={{ background: "var(--color-background-secondary)", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginBottom: 8 }}>Why this score</div>
              <div>
                {hs.reasons.map((r, i) => {
                  const type = r.toLowerCase().includes("high") || r.toLowerCase().includes("ultra") ? "bad"
                    : r.toLowerCase().includes("low") || r.toLowerCase().includes("good") || r.toLowerCase().includes("minimal") ? "good"
                    : "warn";
                  return <ReasonPill key={i} text={r} type={type} />;
                })}
              </div>
            </div>
          )}

          {/* Nutrition table */}
          {n && (
            <div style={{ background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--color-border-tertiary)", fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--color-text-secondary)" }}>Nutrition per 100g</div>
              <NutritionRow label="Energy"        value={n.energy_kcal}    unit=" kcal" />
              <NutritionRow label="Fat"           value={n.fat}            unit="g" />
              <NutritionRow label="Saturated fat" value={n.saturated_fat}  unit="g" highlight={fatFlag} />
              <NutritionRow label="Sugars"        value={n.sugars}         unit="g" highlight={sugarFlag} />
              <NutritionRow label="Sodium"        value={n.sodium != null ? (n.sodium * 1000).toFixed(0) : null} unit="mg" highlight={sodiumFlag} />
              <NutritionRow label="Fibre"         value={n.fiber}          unit="g" />
              <NutritionRow label="Protein"       value={n.proteins}       unit="g" />
            </div>
          )}

          {/* Additives */}
          {result.additives_detected?.length > 0 && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: "#b91c1c", marginBottom: 8 }}>Additives Detected</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {result.additives_detected.map((a, i) => (
                  <span key={i} style={{ background: "#fff", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: 20, padding: "3px 10px", fontSize: 12 }}>{a}</span>
                ))}
              </div>
            </div>
          )}

          {/* Allergens */}
          {result.allergens?.length > 0 && (
            <div style={{ background: "#fefce8", border: "1px solid #fde68a", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: "#a16207", marginBottom: 8 }}>Allergens</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {result.allergens.map((a, i) => (
                  <span key={i} style={{ background: "#fff", color: "#a16207", border: "1px solid #fde68a", borderRadius: 20, padding: "3px 10px", fontSize: 12, textTransform: "capitalize" }}>{a}</span>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {p?.ingredients && (
            <div style={{ background: "var(--color-background-secondary)", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginBottom: 6 }}>Ingredients</div>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.7, margin: 0 }}>{p.ingredients}</p>
            </div>
          )}

          {/* Notes from Claude */}
          {result.notes && (
            <div style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "var(--color-text-secondary)", fontStyle: "italic", marginBottom: 12 }}>
              Note: {result.notes}
            </div>
          )}

          {/* Healthy alternatives */}
          {result.healthy_alternatives?.length > 0 && (
            <div style={{ background: "#f0fdf4", border: "1px solid #bcf0da", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: "#15803d", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                  <path d="M9 18h6"/>
                  <path d="M10 22h4"/>
                </svg>
                Healthy Alternatives Recommended
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {result.healthy_alternatives.map((alt, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}>
                    <div style={{ fontWeight: 600, color: "#1e293b", fontSize: 13, display: "flex", alignItems: "center" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", color: "var(--color-primary)", marginRight: 6 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      </span>
                      {alt.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, lineHeight: 1.5 }}>{alt.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scan again */}
          <button
            onClick={reset}
            style={{ width: "100%", padding: "11px 0", background: "transparent", color: "var(--color-text-primary)", border: "1px solid var(--color-border-secondary)", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", marginTop: 4 }}
          >
            Scan another label
          </button>
        </div>
      )}
    </div>
  );
}
