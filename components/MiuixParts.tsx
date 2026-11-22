"use client";

import type { CSSProperties, ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { MX, cascadeChildren } from "@/lib/miuix";
import type { MiuixKind } from "@/lib/miuix";
import type { Item, Palette } from "@/lib/tokens";

/* The parts Miuix has and M3 does not, drawn the way miuix-ui draws them.
 * Every measure is the library's own (see MX in lib/miuix.ts); every colour is a palette role the
 * Miuix scheme fills in. The part's box (its background and corners) is painted by M3Node's boxStyle;
 * what is drawn here goes inside it. */

const ellipsis: CSSProperties = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

/** a Material Symbols glyph; kept local so this file does not import M3Node back */
function Sym({ name, size = 24, color, fill }: { name: string; size?: number; color?: string; fill?: boolean }) {
  return (
    <span className="msr" aria-hidden data-fill={fill ? "1" : "0"} style={{ fontSize: size, color }}>
      {name}
    </span>
  );
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ---------- small controls ---------- */

function SwitchBit({ on, p }: { on: boolean; p: Palette }) {
  return (
    <span style={{ position: "relative", width: MX.switchW, height: MX.switchH, borderRadius: MX.switchH / 2, background: on ? p.primary : p.secondaryContainer, flex: "0 0 auto" }}>
      <span style={{ position: "absolute", top: 4, left: on ? 25 : 4, width: MX.switchThumb, height: MX.switchThumb, borderRadius: MX.switchThumb / 2, background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </span>
  );
}

function CheckBit({ on, p }: { on: boolean; p: Palette }) {
  return (
    <span style={{ width: MX.choice, height: MX.choice, borderRadius: MX.choice / 2, boxSizing: "border-box", border: on ? "none" : `1.5px solid ${p.outline}`, background: on ? p.primary : "transparent", color: p.onPrimary, display: "grid", placeItems: "center", flex: "0 0 auto" }}>
      {on && <Sym name="check" size={18} />}
    </span>
  );
}

function RadioBit({ on, p }: { on: boolean; p: Palette }) {
  return <span style={{ width: MX.choice, height: MX.choice, borderRadius: MX.choice / 2, boxSizing: "border-box", border: `${on ? 6 : 1.5}px solid ${on ? p.primary : p.outline}`, background: on ? p.onPrimary : "transparent", flex: "0 0 auto" }} />;
}

/** a Miuix slider track: fully round, primary up to the value, a white round handle */
function SliderBit({ from, to, p }: { from: number; to: number; p: Palette }) {
  const th = MX.sliderH;
  const a = clamp(from, 0, 100) / 100;
  const b = clamp(to, 0, 100) / 100;
  const pct = (v: number) => `calc(${th / 2}px + (100% - ${th}px) * ${v})`;
  const handle = (v: number, key: string) => <span key={key} style={{ position: "absolute", top: 0, left: `calc(${pct(v)} - ${th / 2}px)`, width: th, height: th, borderRadius: th / 2, background: "#FFFFFF", boxShadow: "0 1px 4px rgba(0,0,0,0.28)" }} />;
  return (
    <span style={{ position: "relative", display: "block", width: "100%", height: th }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: th / 2, background: p.secondaryContainer, overflow: "hidden" }}>
        <span style={{ position: "absolute", top: 0, bottom: 0, left: from === to ? 0 : pct(a), width: from === to ? pct(b) : `calc(${pct(b)} - ${pct(a)})`, background: p.primary }} />
      </span>
      {from !== to && handle(a, "a")}
      {handle(b, "b")}
    </span>
  );
}

/* ---------- the row every preference is built on ---------- */

function PrefRow({ item, p, end }: { item: Item; p: Palette; end?: ReactNode }) {
  const sum = item.supporting?.trim();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: `0 ${MX.rowPad}px`, height: "100%", boxSizing: "border-box" }}>
      {item.icon && <Sym name={item.icon} size={24} color={p.primary} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 500, color: p.onSurface, ...ellipsis }}>{item.label}</div>
        {sum && <div style={{ fontSize: 14, color: p.onSurfaceVariant, ...ellipsis }}>{sum}</div>}
      </div>
      {end}
    </div>
  );
}

const selectedOf = (it: Item) => {
  const n = it.tabs?.length ?? 0;
  return n === 0 ? -1 : clamp(it.selected ?? 0, 0, n - 1);
};

/** a preference with a slider under its title: SliderPreference and RangeSliderPreference */
function SliderPref({ item, p, range }: { item: Item; p: Palette; range: boolean }) {
  const a = clamp(item.value ?? (range ? 25 : 40), 0, 100);
  const b = clamp(item.value2 ?? 75, 0, 100);
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 10, padding: `0 ${MX.rowPad}px`, height: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <span style={{ fontSize: 17, fontWeight: 500, color: p.onSurface, ...ellipsis }}>{item.label}</span>
        <span style={{ fontSize: 15, color: p.onSurfaceVariant, flex: "0 0 auto" }}>{range ? `${Math.min(a, b)} – ${Math.max(a, b)}` : `${a}%`}</span>
      </div>
      <SliderBit from={range ? Math.min(a, b) : 0} to={range ? Math.max(a, b) : a} p={p} />
    </div>
  );
}

/* ---------- popups ---------- */

function ListPopup({ item, p }: { item: Item; p: Palette }) {
  const tabs = item.tabs ?? [];
  const sel = selectedOf(item);
  return (
    <div style={{ padding: MX.popupPad, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      {tabs.map((t, i) => {
        const on = i === sel;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, height: MX.popupItemH, padding: "0 16px", borderRadius: 14, background: on ? p.primaryContainer : "transparent", color: on ? p.primary : p.onSurface, fontSize: 17, fontWeight: on ? 600 : 400, flex: "0 0 auto" }}>
            <span style={{ flex: 1, minWidth: 0, ...ellipsis }}>{t.label}</span>
            {on && <Sym name="check" size={20} color={p.primary} />}
          </div>
        );
      })}
    </div>
  );
}

function CascadingPopup({ item, p }: { item: Item; p: Palette }) {
  const lang = useLang();
  const tabs = item.tabs ?? [];
  const sel = selectedOf(item);
  const kids = cascadeChildren(lang);
  const col: CSSProperties = { flex: 1, minWidth: 0, padding: MX.popupPad, boxSizing: "border-box", display: "flex", flexDirection: "column" };
  const row = (label: string, on: boolean, arrow: boolean, key: number) => (
    <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, height: MX.popupItemH, padding: "0 14px", borderRadius: 14, background: on ? p.primaryContainer : "transparent", color: on ? p.primary : p.onSurface, fontSize: 17, fontWeight: on ? 600 : 400, flex: "0 0 auto" }}>
      <span style={{ flex: 1, minWidth: 0, ...ellipsis }}>{label}</span>
      {arrow && <Sym name="chevron_right" size={20} color={on ? p.primary : p.outline} />}
    </div>
  );
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={col}>{tabs.map((t, i) => row(t.label, i === sel, true, i))}</div>
      <div style={{ width: 0.75, background: p.outlineVariant, margin: "12px 0" }} />
      <div style={col}>{kids.map((label, i) => row(label, false, false, i))}</div>
    </div>
  );
}

/* ---------- pickers ---------- */

const SWATCHES = ["#F44336", "#FF7043", "#FF9800", "#FFC107", "#8BC34A", "#4CAF50", "#00BCD4", "#3482FF", "#5C6BC0", "#9C27B0", "#E91E63", "#795548", "#9E9E9E", "#212121"];
const CHECKER = "repeating-conic-gradient(#d9d9d9 0% 25%, #ffffff 0% 50%) 50% / 12px 12px";

function ColorPalette({ p }: { p: Palette }) {
  return (
    <div style={{ padding: 16, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", overflow: "hidden", flex: 1, alignContent: "flex-start" }}>
        {SWATCHES.map((c, i) => (
          <span key={c} style={{ width: 36, height: 36, borderRadius: 18, background: c, boxSizing: "border-box", border: i === 7 ? `3px solid ${p.surfaceContainerLow}` : "none", boxShadow: i === 7 ? `0 0 0 2px ${c}` : "none" }} />
        ))}
      </div>
      <span style={{ position: "relative", height: MX.sliderH, borderRadius: MX.sliderH / 2, background: `linear-gradient(90deg, transparent, #3482FF), ${CHECKER}`, flex: "0 0 auto" }}>
        <span style={{ position: "absolute", top: 0, right: 0, width: MX.sliderH, height: MX.sliderH, borderRadius: MX.sliderH / 2, background: "#FFFFFF", boxShadow: "0 1px 4px rgba(0,0,0,0.28)" }} />
      </span>
    </div>
  );
}

function ColorPicker({ p }: { p: Palette }) {
  const hue = 215;
  const bar = (bg: string, at: number, color: string) => (
    <span style={{ position: "relative", height: 24, borderRadius: 12, background: bg, flex: "0 0 auto" }}>
      <span style={{ position: "absolute", top: 0, left: `calc(12px + (100% - 24px) * ${at})`, marginLeft: -12, width: 24, height: 24, borderRadius: 12, background: color, boxSizing: "border-box", border: "3px solid #FFFFFF", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
    </span>
  );
  return (
    <div style={{ padding: 16, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 14 }}>
      <span style={{ position: "relative", flex: 1, minHeight: 60, borderRadius: 12, background: `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${hue} 100% 50%))`, overflow: "hidden" }}>
        <span style={{ position: "absolute", left: "78%", top: "24%", width: 20, height: 20, marginLeft: -10, marginTop: -10, borderRadius: 10, boxSizing: "border-box", border: "3px solid #FFFFFF", boxShadow: "0 0 0 1px rgba(0,0,0,0.25)", background: p.primary }} />
      </span>
      {bar("linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)", hue / 360, `hsl(${hue} 100% 50%)`)}
      {bar(`linear-gradient(90deg, transparent, ${p.primary}), ${CHECKER}`, 1, p.primary)}
    </div>
  );
}

function NumberPicker({ item, p }: { item: Item; p: Palette }) {
  const v = Math.round(item.value ?? 8);
  const unit = item.label.trim();
  const row = (n: number, size: number, color: string, weight: number, opacity: number) => (
    <div style={{ height: MX.pickerItem, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: size, fontWeight: weight, color, opacity }}>
      {n}
    </div>
  );
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <span style={{ position: "absolute", left: 8, right: 8, top: MX.pickerItem, height: MX.pickerItem, borderRadius: 14, background: p.secondaryContainer }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
        {row(v - 1, 22, p.onSurfaceVariant, 400, 0.5)}
        <div style={{ height: MX.pickerItem, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: p.primary }}>
          <span style={{ fontSize: 30, fontWeight: 600 }}>{v}</span>
          {unit && <span style={{ fontSize: 15, color: p.onSurfaceVariant }}>{unit}</span>}
        </div>
        {row(v + 1, 22, p.onSurfaceVariant, 400, 0.5)}
      </div>
    </div>
  );
}

function PullIndicator({ item, p }: { item: Item; p: Palette }) {
  const v = clamp(item.value ?? 60, 0, 100) / 100;
  const r = 13;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, height: "100%" }}>
      <svg width={30} height={30} viewBox="0 0 30 30" aria-hidden>
        <circle cx={15} cy={15} r={r} fill="none" stroke={p.secondaryContainer} strokeWidth={4} />
        <circle cx={15} cy={15} r={r} fill="none" stroke={p.primary} strokeWidth={4} strokeLinecap="round" strokeDasharray={`${c * v} ${c}`} transform="rotate(-90 15 15)" />
      </svg>
      {item.label.trim() && <span style={{ fontSize: 13, color: p.onSurfaceVariant }}>{item.label}</span>}
    </div>
  );
}

/* ---------- the part switch ---------- */

export function MiuixBody({ item, p }: { item: Item; p: Palette }) {
  const k = item.kind as MiuixKind;
  const on = !!item.checked;
  const tabs = item.tabs ?? [];
  const sel = selectedOf(item);
  switch (k) {
    case "smallTitle":
      return <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 16px", fontSize: 14, fontWeight: 500, color: p.secondary, ...ellipsis }}>{item.label}</div>;

    case "badge":
      return <div style={{ display: "grid", placeItems: "center", height: "100%", fontSize: 11, fontWeight: 700, lineHeight: 1, color: p.onError }}>{item.label.trim()}</div>;

    case "breadcrumbBar":
      return (
        <div style={{ display: "flex", alignItems: "center", height: "100%", padding: `0 ${MX.rowPad - 4}px`, gap: 0, overflow: "hidden" }}>
          {tabs.map((t, i) => {
            const last = i === tabs.length - 1;
            return (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", flex: "0 1 auto", minWidth: 0 }}>
                <span style={{ height: MX.crumbH, padding: "0 10px", borderRadius: MX.crumbH / 2, display: "inline-flex", alignItems: "center", fontSize: 15, fontWeight: last ? 600 : 400, color: last ? p.onSurface : p.onSurfaceVariant, background: last ? p.secondaryContainer : "transparent", maxWidth: 160, ...ellipsis }}>{t.label}</span>
                {!last && <Sym name="chevron_right" size={18} color={p.outline} />}
              </span>
            );
          })}
        </div>
      );

    case "tooltip": {
      const rich = !!item.supporting?.trim();
      return rich ? (
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 4, height: "100%", boxSizing: "border-box" }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: p.onSurface, ...ellipsis }}>{item.label}</div>
          <div style={{ fontSize: 13, lineHeight: 1.4, color: p.onSurfaceVariant, overflow: "hidden" }}>{item.supporting}</div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 12px", fontSize: 14, color: p.onSurface, ...ellipsis }}>{item.label}</div>
      );
    }

    case "numberPicker":
      return <NumberPicker item={item} p={p} />;
    case "pullToRefresh":
      return <PullIndicator item={item} p={p} />;
    case "colorPalette":
      return <ColorPalette p={p} />;
    case "colorPicker":
      return <ColorPicker p={p} />;

    case "arrowPreference":
      return (
        <PrefRow
          item={item}
          p={p}
          end={
            <>
              {item.trailing && <span style={{ fontSize: 17, color: p.onSurfaceVariant, flex: "0 0 auto" }}>{item.trailing}</span>}
              <Sym name={item.icon2 || "chevron_right"} size={20} color={p.outline} />
            </>
          }
        />
      );
    case "switchPreference":
      return <PrefRow item={item} p={p} end={<SwitchBit on={on} p={p} />} />;
    case "checkboxPreference":
      return <PrefRow item={item} p={p} end={<CheckBit on={on} p={p} />} />;
    case "radioPreference":
      return <PrefRow item={item} p={p} end={<RadioBit on={on} p={p} />} />;
    case "sliderPreference":
      return <SliderPref item={item} p={p} range={false} />;
    case "rangeSliderPreference":
      return <SliderPref item={item} p={p} range />;
    case "dropdownPreference":
    case "spinnerPreference":
      return (
        <PrefRow
          item={item}
          p={p}
          end={
            <>
              <span style={{ fontSize: 17, color: p.onSurfaceVariant, maxWidth: 140, flex: "0 1 auto", ...ellipsis }}>{sel >= 0 ? tabs[sel].label : ""}</span>
              <Sym name="unfold_more" size={20} color={p.outline} />
            </>
          }
        />
      );

    case "dropdownMenu":
      return <ListPopup item={item} p={p} />;
    case "cascadingMenu":
      return <CascadingPopup item={item} p={p} />;
  }
  return null;
}
