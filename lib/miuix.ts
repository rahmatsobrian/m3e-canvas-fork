import type { Item, KindSpec, Palette } from "./tokens";
import type { Lang } from "./i18n";

/* Miuix (compose-miuix-ui) design layer.
 *
 * Miuix is the Compose Multiplatform library that follows Xiaomi HyperOS design. This file holds
 * everything that makes the canvas speak Miuix instead of Material 3 Expressive:
 *   - the HyperOS colour scheme, light and dark, written into the Palette slots the parts read
 *   - the metrics Miuix components use (dp values taken from the library's own *Defaults objects)
 *   - the parts Miuix has that M3 does not (preference rows, popups, pickers, badge, ...)
 *   - their texts in the four languages and the sentences the prompt generator writes about them
 */

/* ---------- colour ---------- */

/** Miuix lightColorScheme(), mapped onto the palette slots the canvas parts read.
 *  Page = surface (#F7F7F7), cards = surfaceContainerLow (white), bars = surfaceContainer. */
export const MIUIX_LIGHT: Palette = {
  key: "miuix",
  label: "Miuix",
  seed: "#3482FF",
  primary: "#3482FF",
  onPrimary: "#FFFFFF",
  primaryContainer: "#EAF2FF",
  onPrimaryContainer: "#3482FF",
  inversePrimary: "#AECDFF",
  secondary: "#8C93B0",
  secondaryContainer: "#F0F0F0",
  onSecondaryContainer: "#303030",
  tertiaryContainer: "#EAF2FF",
  onTertiaryContainer: "#3482FF",
  surface: "#F7F7F7",
  surfaceContainerLow: "#FFFFFF",
  surfaceContainer: "#F7F7F7",
  surfaceContainerHigh: "#E8E8E8",
  surfaceContainerHighest: "#F0F0F0",
  onSurface: "#000000",
  onSurfaceVariant: "#666666",
  outline: "#D9D9D9",
  outlineVariant: "#E0E0E0",
  inverseSurface: "#3A3A3A",
  inverseOnSurface: "#F2F2F2",
  error: "#E94634",
  onError: "#FFFFFF",
  errorContainer: "#FDF6F4",
  onErrorContainer: "#410002",
};

/** Miuix darkColorScheme(): a black page with #242424 cards */
export const MIUIX_DARK: Palette = {
  key: "miuix",
  label: "Miuix",
  seed: "#277AF7",
  primary: "#277AF7",
  onPrimary: "#FFFFFF",
  primaryContainer: "#2B3B54",
  onPrimaryContainer: "#4788FF",
  inversePrimary: "#3482FF",
  secondary: "#787E96",
  secondaryContainer: "#434343",
  onSecondaryContainer: "#D9D9D9",
  tertiaryContainer: "#2B3B54",
  onTertiaryContainer: "#4788FF",
  surface: "#000000",
  surfaceContainerLow: "#242424",
  surfaceContainer: "#000000",
  surfaceContainerHigh: "#242424",
  surfaceContainerHighest: "#2D2D2D",
  onSurface: "#F2F2F2",
  onSurfaceVariant: "#929292",
  outline: "#404040",
  outlineVariant: "#393939",
  inverseSurface: "#E9E9E9",
  inverseOnSurface: "#1A1A1A",
  error: "#F12522",
  onError: "#FFFFFF",
  errorContainer: "#2E0603",
  onErrorContainer: "#FFDAD6",
};

/** the scheme the canvas renders for the Miuix palette: it has its own dark scheme, so it is not
 *  generated from a seed the way the other palettes are */
export const miuixScheme = (dark: boolean): Palette => ({ ...(dark ? MIUIX_DARK : MIUIX_LIGHT) });

/* ---------- metrics (dp), from the *Defaults objects of miuix-ui ---------- */
export const MX = {
  /** Button: MinHeight 40, CornerRadius 16, InsideMargin 16 x 13 */
  buttonH: 40,
  buttonR: 16,
  /** Card / TextField / Snackbar corner radius */
  cardR: 16,
  /** IconButton 40 x 40, CornerRadius 40 */
  iconButton: 40,
  /** FloatingActionButton 60 x 60, circle, 4dp shadow */
  fab: 60,
  /** FloatingToolbar: CornerRadius 50 */
  toolbarR: 50,
  /** Switch 49 x 28 with a 20dp thumb; Checkbox / RadioButton 26dp circles */
  switchW: 49,
  switchH: 28,
  switchThumb: 20,
  choice: 26,
  /** NavigationBar: ItemHeight 64, IconSize 26, LabelFontSize 12 */
  navH: 64,
  navIcon: 26,
  /** NavigationRail: MinWidth 80, IconSize 28 */
  railW: 80,
  /** TopAppBar: collapsed 52, small centre 50 */
  topBarH: 52,
  /** TabRow 42 (45 with contour), corner 12 (8 with contour) */
  tabH: 42,
  tabContourH: 45,
  /** SearchBar input min height 45, font 17 */
  searchH: 45,
  /** Slider min height 28 */
  sliderH: 28,
  /** Linear progress 6dp, circular stroke 4dp */
  linear: 6,
  /** BasicComponent inside margin 16 */
  rowPad: 16,
  /** NumberPicker ItemHeight 45 */
  pickerItem: 45,
  /** Badge dot 6, large 16 */
  badgeDot: 6,
  badgeLarge: 16,
  /** BreadcrumbBar ItemHeight 32 */
  crumbH: 32,
  /** Tooltip plain corner 12, rich 16 */
  tipR: 12,
  /** ListPopup item height */
  popupItemH: 50,
  popupPad: 8,
  popupR: 20,
} as const;

/* ---------- parts Miuix has and M3 does not ---------- */

export const MIUIX_KIND_LIST = [
  "smallTitle",
  "badge",
  "breadcrumbBar",
  "tooltip",
  "numberPicker",
  "pullToRefresh",
  "colorPalette",
  "colorPicker",
  "arrowPreference",
  "switchPreference",
  "checkboxPreference",
  "radioPreference",
  "sliderPreference",
  "rangeSliderPreference",
  "dropdownPreference",
  "spinnerPreference",
  "dropdownMenu",
  "cascadingMenu",
] as const;
export type MiuixKind = (typeof MIUIX_KIND_LIST)[number];
export const isMiuixKind = (k: string): k is MiuixKind => (MIUIX_KIND_LIST as readonly string[]).includes(k);

/** the preference rows: one line of title, optional summary, and a control at the trailing end */
export const PREFERENCE_KINDS: MiuixKind[] = ["arrowPreference", "switchPreference", "checkboxPreference", "radioPreference", "sliderPreference", "rangeSliderPreference", "dropdownPreference", "spinnerPreference"];
export const isPreference = (k: string) => (PREFERENCE_KINDS as string[]).includes(k);
/** the parts that carry a list of entries */
export const MIUIX_LIST_KINDS: MiuixKind[] = ["breadcrumbBar", "dropdownPreference", "spinnerPreference", "dropdownMenu", "cascadingMenu"];

const W = 412;
const CW = 380; // a phone screen minus its two 16dp margins
const HALF = 182;
const WIDTHS = [HALF, CW, W];
const wide = (min: number) => ({ min, max: W, step: 4, icon: "width", presets: WIDTHS });

const base = (over: Partial<KindSpec> & Pick<KindSpec, "label" | "noun" | "category" | "paletteIcon" | "w" | "h" | "defLabel">): KindSpec => ({
  radius: 16,
  hasVariant: false,
  hasLabel: true,
  hasSupporting: false,
  hasIcon: false,
  defIcon: null,
  ...over,
});

export const MIUIX_SPECS: Record<MiuixKind, KindSpec> = {
  smallTitle: base({ label: "Small title", noun: "スモールタイトル", category: "content", paletteIcon: "title", w: CW, h: 32, radius: 0, size: wide(80), defLabel: "スモールタイトル", defSize: CW }),
  badge: base({ label: "Badge", noun: "バッジ", category: "content", paletteIcon: "counter_1", w: 16, h: 16, radius: 8, defLabel: "3" }),
  breadcrumbBar: base({ label: "Breadcrumb bar", noun: "パンくずバー", category: "navigation", paletteIcon: "chevron_right", w: CW, h: 48, radius: 0, hasLabel: false, hasTabs: true, size: wide(120), defLabel: "", defSize: CW }),
  tooltip: base({ label: "Tooltip", noun: "ツールチップ", category: "content", paletteIcon: "chat_bubble", w: 160, h: 56, radius: 12, hasSupporting: true, size: { min: 80, max: 320, step: 4, icon: "width", presets: [120, 200, 320] }, defLabel: "ヒント", defSupporting: "", defSize: 160 }),
  numberPicker: base({ label: "Number picker", noun: "ナンバーピッカー", category: "inputs", paletteIcon: "pin", w: 120, h: 135, radius: 16, size: { min: 80, max: W, step: 4, icon: "width", presets: [120, HALF, CW] }, defLabel: "", defSize: 120 }),
  pullToRefresh: base({ label: "Pull to refresh", noun: "プルトゥリフレッシュ", category: "progress", paletteIcon: "refresh", w: CW, h: 72, radius: 0, hasValue: true, size: wide(120), defLabel: "更新中", defSize: CW }),
  colorPalette: base({ label: "Color palette", noun: "カラーパレット", category: "inputs", paletteIcon: "palette", w: CW, h: 176, radius: 16, hasLabel: false, size: wide(200), defLabel: "", defSize: CW }),
  colorPicker: base({ label: "Color picker", noun: "カラーピッカー", category: "inputs", paletteIcon: "colorize", w: CW, h: 220, radius: 16, hasLabel: false, size: wide(200), defLabel: "", defSize: CW }),
  arrowPreference: base({ label: "Arrow preference", noun: "矢印項目", category: "inputs", paletteIcon: "keyboard_arrow_right", w: CW, h: 64, hasSupporting: true, hasIcon: true, size: wide(200), defLabel: "設定", defSupporting: "概要", defIcon: null, defSize: CW }),
  switchPreference: base({ label: "Switch preference", noun: "スイッチ項目", category: "inputs", paletteIcon: "toggle_on", w: CW, h: 64, hasSupporting: true, hasIcon: true, hasChecked: true, size: wide(200), defLabel: "通知", defSupporting: "概要", defIcon: null, defSize: CW }),
  checkboxPreference: base({ label: "Checkbox preference", noun: "チェックボックス項目", category: "inputs", paletteIcon: "check_circle", w: CW, h: 64, hasSupporting: true, hasIcon: true, hasChecked: true, size: wide(200), defLabel: "同期", defSupporting: "概要", defIcon: null, defSize: CW }),
  radioPreference: base({ label: "Radio preference", noun: "ラジオ項目", category: "inputs", paletteIcon: "radio_button_checked", w: CW, h: 64, hasSupporting: true, hasIcon: true, hasChecked: true, size: wide(200), defLabel: "オプション", defSupporting: "概要", defIcon: null, defSize: CW }),
  sliderPreference: base({ label: "Slider preference", noun: "スライダー項目", category: "inputs", paletteIcon: "tune", w: CW, h: 88, hasValue: true, size: wide(200), defLabel: "音量", defSize: CW }),
  rangeSliderPreference: base({ label: "Range slider preference", noun: "範囲スライダー項目", category: "inputs", paletteIcon: "linear_scale", w: CW, h: 88, hasValue: true, size: wide(200), defLabel: "価格", defSize: CW }),
  dropdownPreference: base({ label: "Dropdown preference", noun: "ドロップダウン項目", category: "inputs", paletteIcon: "unfold_more", w: CW, h: 64, hasSupporting: true, hasTabs: true, size: wide(200), defLabel: "選択", defSupporting: "", defSize: CW }),
  spinnerPreference: base({ label: "Spinner preference", noun: "スピナー項目", category: "inputs", paletteIcon: "arrow_drop_down_circle", w: CW, h: 64, hasSupporting: true, hasTabs: true, size: wide(200), defLabel: "選択", defSupporting: "", defSize: CW }),
  dropdownMenu: base({ label: "List popup", noun: "リストポップアップ", category: "containment", paletteIcon: "menu_open", w: 200, h: 160, radius: 20, hasTabs: true, hasLabel: false, size: { min: 120, max: 320, step: 4, icon: "width", presets: [160, 200, 280] }, defLabel: "", defSize: 200 }),
  cascadingMenu: base({ label: "Cascading popup", noun: "カスケードポップアップ", category: "containment", paletteIcon: "account_tree", w: 360, h: 160, radius: 20, hasTabs: true, hasLabel: false, size: { min: 240, max: W, step: 4, icon: "width", presets: [300, 360, W] }, defLabel: "", defSize: 360 }),
};

/** the width and height a Miuix part takes (sizeOf calls this for every part of these kinds) */
export function miuixSize(it: Item, widths: Record<string, number>): { w: number; h: number } {
  const k = it.kind as MiuixKind;
  const s = MIUIX_SPECS[k];
  const n = it.size ?? s.defSize ?? s.w;
  switch (k) {
    case "badge": {
      const text = it.label.trim();
      return text ? { w: Math.max(MX.badgeLarge, 10 + text.length * 7), h: MX.badgeLarge } : { w: MX.badgeDot, h: MX.badgeDot };
    }
    case "tooltip":
      return { w: n, h: it.supporting?.trim() ? 92 : 36 };
    case "numberPicker":
      return { w: n, h: it.size2 ?? MX.pickerItem * 3 };
    case "dropdownMenu":
      return { w: n, h: MX.popupPad * 2 + Math.max(1, it.tabs?.length ?? 3) * MX.popupItemH };
    case "cascadingMenu":
      return { w: n, h: MX.popupPad * 2 + Math.max(1, it.tabs?.length ?? 3) * MX.popupItemH };
    case "colorPalette":
    case "colorPicker":
      return { w: n, h: it.size2 ?? s.h };
    case "arrowPreference":
    case "switchPreference":
    case "checkboxPreference":
    case "radioPreference":
    case "dropdownPreference":
    case "spinnerPreference":
      return { w: n, h: it.supporting?.trim() ? 72 : 56 };
    default:
      void widths;
      return { w: n, h: s.h };
  }
}

/** the data a Miuix part starts with: its entries, value and state */
export function miuixInit(kind: MiuixKind, lang: Lang): Partial<Item> {
  const ent = ENTRIES[lang];
  switch (kind) {
    case "breadcrumbBar":
      return { tabs: ent.crumbs.map((label) => ({ icon: "", label })), selected: ent.crumbs.length - 1 };
    case "dropdownPreference":
    case "spinnerPreference":
      return { tabs: ent.options.map((label) => ({ icon: kind === "spinnerPreference" ? "circle" : "", label })), selected: 0 };
    case "dropdownMenu":
      return { tabs: ent.menu.map((label) => ({ icon: "", label })), selected: 0 };
    case "cascadingMenu":
      return { tabs: ent.cascade.map((label) => ({ icon: "", label })), selected: 0 };
    case "sliderPreference":
      return { value: 40 };
    case "rangeSliderPreference":
      return { value: 25, value2: 75 };
    case "pullToRefresh":
      return { value: 60 };
    case "numberPicker":
      return { value: 8, size2: MX.pickerItem * 3 };
    case "switchPreference":
    case "checkboxPreference":
      return { checked: true };
    case "radioPreference":
      return { checked: true };
    case "arrowPreference":
      return { icon2: "chevron_right", trailing: ent.trailing };
    case "tooltip":
      return { supporting: "" };
    default:
      return {};
  }
}

const ENTRIES: Record<Lang, { crumbs: string[]; options: string[]; menu: string[]; cascade: string[]; trailing: string }> = {
  en: { crumbs: ["Home", "Documents", "Photos"], options: ["Option 1", "Option 2", "Option 3"], menu: ["Copy", "Paste", "Delete"], cascade: ["Share", "Move to", "Delete"], trailing: "On" },
  ja: { crumbs: ["ホーム", "ドキュメント", "写真"], options: ["選択肢 1", "選択肢 2", "選択肢 3"], menu: ["コピー", "貼り付け", "削除"], cascade: ["共有", "移動先", "削除"], trailing: "オン" },
  zh: { crumbs: ["首页", "文档", "照片"], options: ["选项 1", "选项 2", "选项 3"], menu: ["复制", "粘贴", "删除"], cascade: ["分享", "移动到", "删除"], trailing: "开启" },
  ko: { crumbs: ["홈", "문서", "사진"], options: ["옵션 1", "옵션 2", "옵션 3"], menu: ["복사", "붙여넣기", "삭제"], cascade: ["공유", "이동", "삭제"], trailing: "켜짐" },
};

/** the second level a cascading popup opens from its first entry (the canvas shows it open) */
export const cascadeChildren = (lang: Lang) => ({ en: ["Link", "Image", "File"], ja: ["リンク", "画像", "ファイル"], zh: ["链接", "图片", "文件"], ko: ["링크", "이미지", "파일"] })[lang];

/* ---------- words ---------- */

type KindText = { noun: string; label?: string; supporting?: string };
export const MIUIX_KIND_TEXT: Record<Lang, Record<MiuixKind, KindText>> = {
  ja: {
    smallTitle: { noun: "スモールタイトル", label: "スモールタイトル" },
    badge: { noun: "バッジ", label: "3" },
    breadcrumbBar: { noun: "パンくずバー" },
    tooltip: { noun: "ツールチップ", label: "ヒント" },
    numberPicker: { noun: "ナンバーピッカー" },
    pullToRefresh: { noun: "プルトゥリフレッシュ", label: "更新中" },
    colorPalette: { noun: "カラーパレット" },
    colorPicker: { noun: "カラーピッカー" },
    arrowPreference: { noun: "矢印項目", label: "設定", supporting: "概要" },
    switchPreference: { noun: "スイッチ項目", label: "通知", supporting: "概要" },
    checkboxPreference: { noun: "チェックボックス項目", label: "同期", supporting: "概要" },
    radioPreference: { noun: "ラジオ項目", label: "オプション", supporting: "概要" },
    sliderPreference: { noun: "スライダー項目", label: "音量" },
    rangeSliderPreference: { noun: "範囲スライダー項目", label: "価格" },
    dropdownPreference: { noun: "ドロップダウン項目", label: "選択" },
    spinnerPreference: { noun: "スピナー項目", label: "選択" },
    dropdownMenu: { noun: "リストポップアップ" },
    cascadingMenu: { noun: "カスケードポップアップ" },
  },
  en: {
    smallTitle: { noun: "small title", label: "Small title" },
    badge: { noun: "badge", label: "3" },
    breadcrumbBar: { noun: "breadcrumb bar" },
    tooltip: { noun: "tooltip", label: "Hint" },
    numberPicker: { noun: "number picker" },
    pullToRefresh: { noun: "pull to refresh", label: "Refreshing" },
    colorPalette: { noun: "color palette" },
    colorPicker: { noun: "color picker" },
    arrowPreference: { noun: "arrow preference", label: "Setting", supporting: "Summary" },
    switchPreference: { noun: "switch preference", label: "Notifications", supporting: "Summary" },
    checkboxPreference: { noun: "checkbox preference", label: "Sync", supporting: "Summary" },
    radioPreference: { noun: "radio preference", label: "Option", supporting: "Summary" },
    sliderPreference: { noun: "slider preference", label: "Volume" },
    rangeSliderPreference: { noun: "range slider preference", label: "Price" },
    dropdownPreference: { noun: "dropdown preference", label: "Choose" },
    spinnerPreference: { noun: "spinner preference", label: "Choose" },
    dropdownMenu: { noun: "list popup" },
    cascadingMenu: { noun: "cascading popup" },
  },
  zh: {
    smallTitle: { noun: "小标题", label: "小标题" },
    badge: { noun: "徽标", label: "3" },
    breadcrumbBar: { noun: "面包屑栏" },
    tooltip: { noun: "提示气泡", label: "提示" },
    numberPicker: { noun: "数字选择器" },
    pullToRefresh: { noun: "下拉刷新", label: "正在刷新" },
    colorPalette: { noun: "调色板" },
    colorPicker: { noun: "取色器" },
    arrowPreference: { noun: "箭头设置项", label: "设置", supporting: "摘要" },
    switchPreference: { noun: "开关设置项", label: "通知", supporting: "摘要" },
    checkboxPreference: { noun: "复选框设置项", label: "同步", supporting: "摘要" },
    radioPreference: { noun: "单选设置项", label: "选项", supporting: "摘要" },
    sliderPreference: { noun: "滑块设置项", label: "音量" },
    rangeSliderPreference: { noun: "范围滑块设置项", label: "价格" },
    dropdownPreference: { noun: "下拉设置项", label: "选择" },
    spinnerPreference: { noun: "微调设置项", label: "选择" },
    dropdownMenu: { noun: "列表弹窗" },
    cascadingMenu: { noun: "级联弹窗" },
  },
  ko: {
    smallTitle: { noun: "작은 제목", label: "작은 제목" },
    badge: { noun: "배지", label: "3" },
    breadcrumbBar: { noun: "이동 경로 바" },
    tooltip: { noun: "툴팁", label: "힌트" },
    numberPicker: { noun: "숫자 선택기" },
    pullToRefresh: { noun: "당겨서 새로고침", label: "새로고침 중" },
    colorPalette: { noun: "색상 팔레트" },
    colorPicker: { noun: "색상 선택기" },
    arrowPreference: { noun: "화살표 설정 항목", label: "설정", supporting: "요약" },
    switchPreference: { noun: "스위치 설정 항목", label: "알림", supporting: "요약" },
    checkboxPreference: { noun: "체크박스 설정 항목", label: "동기화", supporting: "요약" },
    radioPreference: { noun: "라디오 설정 항목", label: "옵션", supporting: "요약" },
    sliderPreference: { noun: "슬라이더 설정 항목", label: "볼륨" },
    rangeSliderPreference: { noun: "범위 슬라이더 설정 항목", label: "가격" },
    dropdownPreference: { noun: "드롭다운 설정 항목", label: "선택" },
    spinnerPreference: { noun: "스피너 설정 항목", label: "선택" },
    dropdownMenu: { noun: "목록 팝업" },
    cascadingMenu: { noun: "계단식 팝업" },
  },
};

/* ---------- what the prompt says ---------- */

const q = (s: string) => `"${s.trim()}"`;
const list = (it: Item) => (it.tabs ?? []).map((t) => q(t.label || "-")).join(", ");
const pick = (it: Item) => {
  const i = Math.min(it.selected ?? 0, Math.max(0, (it.tabs?.length ?? 1) - 1));
  return it.tabs?.[i]?.label ?? "";
};

/** One sentence about a Miuix part, in the prompt's language. Kotlin composables are named in
 *  every language, since that is what the coding agent has to write. */
export function miuixDescribe(it: Item, lang: Lang): string | null {
  if (!isMiuixKind(it.kind)) return null;
  const k = it.kind;
  const label = q(it.label);
  const sum = it.supporting?.trim() ? it.supporting.trim() : "";
  const on = !!it.checked;
  const v = it.value ?? 40;
  const T: Record<Lang, Record<MiuixKind, string>> = {
    en: {
      smallTitle: `a SmallTitle ${label}`,
      badge: it.label.trim() ? `a Badge showing ${label}` : "a dot Badge",
      breadcrumbBar: `a BreadcrumbBar (${list(it)}; current: ${q(pick(it))})`,
      tooltip: `a Tooltip ${label}${sum ? ` (rich, with the body ${q(sum)})` : ""}`,
      numberPicker: `a NumberPicker (initial value ${it.value ?? 8})`,
      pullToRefresh: `a PullToRefresh indicator ${label} (${v}% pulled)`,
      colorPalette: "a ColorPalette (colour grid with an alpha slider)",
      colorPicker: "a ColorPicker (hue and saturation area with a hue slider)",
      arrowPreference: `an ArrowPreference ${label}${sum ? ` (summary ${q(sum)})` : ""}${it.trailing ? ` with the value ${q(it.trailing)}` : ""}`,
      switchPreference: `a SwitchPreference ${label}${sum ? ` (summary ${q(sum)})` : ""}, initially ${on ? "on" : "off"}`,
      checkboxPreference: `a CheckboxPreference ${label}${sum ? ` (summary ${q(sum)})` : ""}, initially ${on ? "checked" : "unchecked"}`,
      radioPreference: `a RadioButtonPreference ${label}${sum ? ` (summary ${q(sum)})` : ""}, initially ${on ? "selected" : "unselected"}`,
      sliderPreference: `a SliderPreference ${label} (initial value ${v}%)`,
      rangeSliderPreference: `a RangeSliderPreference ${label} (initial range ${it.value ?? 25}% to ${it.value2 ?? 75}%)`,
      dropdownPreference: `a DropdownPreference ${label} (items ${list(it)}; selected ${q(pick(it))})`,
      spinnerPreference: `a SpinnerPreference ${label} (items ${list(it)}; selected ${q(pick(it))})`,
      dropdownMenu: `a ListPopup with ${it.tabs?.length ?? 0} entries (${list(it)})`,
      cascadingMenu: `a CascadingListPopup with ${it.tabs?.length ?? 0} first-level entries (${list(it)}), the first one open to a second level`,
    },
    ja: {
      smallTitle: `SmallTitle ${label}`,
      badge: it.label.trim() ? `${label} を表示する Badge` : "ドット型の Badge",
      breadcrumbBar: `BreadcrumbBar（${list(it)}、現在地 ${q(pick(it))}）`,
      tooltip: `Tooltip ${label}${sum ? `（本文 ${q(sum)} のリッチ型）` : ""}`,
      numberPicker: `NumberPicker（初期値 ${it.value ?? 8}）`,
      pullToRefresh: `PullToRefresh のインジケーター ${label}（${v}% 引き下げた状態）`,
      colorPalette: "ColorPalette（色のグリッドとアルファスライダー）",
      colorPicker: "ColorPicker（色相・彩度の領域と色相スライダー）",
      arrowPreference: `ArrowPreference ${label}${sum ? `（概要 ${q(sum)}）` : ""}${it.trailing ? `、値 ${q(it.trailing)}` : ""}`,
      switchPreference: `SwitchPreference ${label}${sum ? `（概要 ${q(sum)}）` : ""}（初期状態 ${on ? "オン" : "オフ"}）`,
      checkboxPreference: `CheckboxPreference ${label}${sum ? `（概要 ${q(sum)}）` : ""}（初期状態 ${on ? "チェック済み" : "未チェック"}）`,
      radioPreference: `RadioButtonPreference ${label}${sum ? `（概要 ${q(sum)}）` : ""}（初期状態 ${on ? "選択済み" : "未選択"}）`,
      sliderPreference: `SliderPreference ${label}（初期値 ${v}%）`,
      rangeSliderPreference: `RangeSliderPreference ${label}（初期範囲 ${it.value ?? 25}%〜${it.value2 ?? 75}%）`,
      dropdownPreference: `DropdownPreference ${label}（項目 ${list(it)}、選択中 ${q(pick(it))}）`,
      spinnerPreference: `SpinnerPreference ${label}（項目 ${list(it)}、選択中 ${q(pick(it))}）`,
      dropdownMenu: `${it.tabs?.length ?? 0} 項目の ListPopup（${list(it)}）`,
      cascadingMenu: `${it.tabs?.length ?? 0} 項目の CascadingListPopup（${list(it)}、先頭項目が 2 階層目を開いた状態）`,
    },
    zh: {
      smallTitle: `SmallTitle ${label}`,
      badge: it.label.trim() ? `显示 ${label} 的 Badge` : "圆点 Badge",
      breadcrumbBar: `BreadcrumbBar（${list(it)}，当前 ${q(pick(it))}）`,
      tooltip: `Tooltip ${label}${sum ? `（带正文 ${q(sum)} 的富文本样式）` : ""}`,
      numberPicker: `NumberPicker（初始值 ${it.value ?? 8}）`,
      pullToRefresh: `PullToRefresh 指示器 ${label}（已下拉 ${v}%）`,
      colorPalette: "ColorPalette（颜色网格和透明度滑块）",
      colorPicker: "ColorPicker（色相饱和度区域和色相滑块）",
      arrowPreference: `ArrowPreference ${label}${sum ? `（摘要 ${q(sum)}）` : ""}${it.trailing ? `，数值 ${q(it.trailing)}` : ""}`,
      switchPreference: `SwitchPreference ${label}${sum ? `（摘要 ${q(sum)}）` : ""}（初始${on ? "开启" : "关闭"}）`,
      checkboxPreference: `CheckboxPreference ${label}${sum ? `（摘要 ${q(sum)}）` : ""}（初始${on ? "已勾选" : "未勾选"}）`,
      radioPreference: `RadioButtonPreference ${label}${sum ? `（摘要 ${q(sum)}）` : ""}（初始${on ? "已选中" : "未选中"}）`,
      sliderPreference: `SliderPreference ${label}（初始值 ${v}%）`,
      rangeSliderPreference: `RangeSliderPreference ${label}（初始范围 ${it.value ?? 25}% 至 ${it.value2 ?? 75}%）`,
      dropdownPreference: `DropdownPreference ${label}（选项 ${list(it)}，当前 ${q(pick(it))}）`,
      spinnerPreference: `SpinnerPreference ${label}（选项 ${list(it)}，当前 ${q(pick(it))}）`,
      dropdownMenu: `${it.tabs?.length ?? 0} 项的 ListPopup（${list(it)}）`,
      cascadingMenu: `${it.tabs?.length ?? 0} 个一级项的 CascadingListPopup（${list(it)}，第一项已展开二级）`,
    },
    ko: {
      smallTitle: `SmallTitle ${label}`,
      badge: it.label.trim() ? `${label}을(를) 표시하는 Badge` : "점 모양 Badge",
      breadcrumbBar: `BreadcrumbBar(${list(it)}, 현재 ${q(pick(it))})`,
      tooltip: `Tooltip ${label}${sum ? `(본문 ${q(sum)}이 있는 리치 형태)` : ""}`,
      numberPicker: `NumberPicker(초기값 ${it.value ?? 8})`,
      pullToRefresh: `PullToRefresh 표시기 ${label}(${v}% 당긴 상태)`,
      colorPalette: "ColorPalette(색상 그리드와 알파 슬라이더)",
      colorPicker: "ColorPicker(색조·채도 영역과 색조 슬라이더)",
      arrowPreference: `ArrowPreference ${label}${sum ? `(요약 ${q(sum)})` : ""}${it.trailing ? `, 값 ${q(it.trailing)}` : ""}`,
      switchPreference: `SwitchPreference ${label}${sum ? `(요약 ${q(sum)})` : ""}(초기 상태 ${on ? "켜짐" : "꺼짐"})`,
      checkboxPreference: `CheckboxPreference ${label}${sum ? `(요약 ${q(sum)})` : ""}(초기 상태 ${on ? "체크됨" : "체크 안 됨"})`,
      radioPreference: `RadioButtonPreference ${label}${sum ? `(요약 ${q(sum)})` : ""}(초기 상태 ${on ? "선택됨" : "선택 안 됨"})`,
      sliderPreference: `SliderPreference ${label}(초기값 ${v}%)`,
      rangeSliderPreference: `RangeSliderPreference ${label}(초기 범위 ${it.value ?? 25}%~${it.value2 ?? 75}%)`,
      dropdownPreference: `DropdownPreference ${label}(항목 ${list(it)}, 선택 ${q(pick(it))})`,
      spinnerPreference: `SpinnerPreference ${label}(항목 ${list(it)}, 선택 ${q(pick(it))})`,
      dropdownMenu: `${it.tabs?.length ?? 0}개 항목의 ListPopup(${list(it)})`,
      cascadingMenu: `${it.tabs?.length ?? 0}개 1단계 항목의 CascadingListPopup(${list(it)}, 첫 항목이 2단계를 연 상태)`,
    },
  };
  return T[lang][k];
}

/** guidance per part, written into the prompt only for the parts a design uses.
 *  Every line names the Miuix composable and the numbers the library itself uses. */
export const MIUIX_STYLE_NOTES: Record<Lang, Record<MiuixKind, string>> = {
  en: {
    smallTitle: "SmallTitle: Miuix's small grey section label above a group of cards or preferences (fontSize 14sp, onBackgroundVariant colour, 16dp start padding).",
    badge: "Badge: Miuix Badge, a 6dp dot or a 16dp pill with a short count, error colour, placed over the top-end corner of its anchor.",
    breadcrumbBar: "BreadcrumbBar: Miuix BreadcrumbBar, items 32dp tall with 10dp horizontal padding, chevron separators, the last item is the current one in onSurface and the earlier ones are tappable.",
    tooltip: "Tooltip: Miuix Tooltip shown on long press or hover. Plain: 12dp corners, 12x8dp padding, 200dp max width. Rich (when it has a body): 16dp corners, 16dp padding, 320dp max width. A 16x8dp caret points at the anchor, 8dp away.",
    numberPicker: "NumberPicker: Miuix NumberPicker, a vertical wheel with 45dp rows; the centre row is large and primary-coloured, the rows above and below fade. It snaps to a value and reports it.",
    pullToRefresh: "PullToRefresh: Miuix PullToRefresh wrapping a scrolling list; the indicator is a 30dp circular progress with a 4dp stroke that grows with the pull and spins while refreshing.",
    colorPalette: "ColorPalette: Miuix ColorPalette, a grid of swatches with a selection ring and an alpha slider under it.",
    colorPicker: "ColorPicker: Miuix ColorPicker, a saturation/value area, a hue slider and an alpha slider, with the chosen colour previewed.",
    arrowPreference: "ArrowPreference: Miuix extended component, a BasicComponent row (16dp padding, title in onSurface 17sp, summary in onSurfaceVariantSummary 14sp) with an ArrowRight icon and an optional value at its end. Put several in one Card.",
    switchPreference: "SwitchPreference: Miuix extended component, a BasicComponent row with a Miuix Switch (49x28dp, 20dp thumb) at the end. Group rows in a Card with no divider between them.",
    checkboxPreference: "CheckboxPreference: Miuix extended component, a BasicComponent row with a Miuix Checkbox (26dp circle) at the start or end.",
    radioPreference: "RadioButtonPreference: Miuix extended component, a BasicComponent row with a Miuix RadioButton (26dp circle). Rows of one choice share a Card and only one is selected.",
    sliderPreference: "SliderPreference: Miuix extended component, a title and its current value on one line and a Miuix Slider (28dp min height, fully rounded track) under it.",
    rangeSliderPreference: "RangeSliderPreference: Miuix extended component, the same as SliderPreference with two handles for a range.",
    dropdownPreference: "DropdownPreference: Miuix extended component, a BasicComponent row whose end shows the chosen item and an up-down arrow. Tapping opens an OverlayListPopup of the items below it (it needs the Scaffold popup host); use WindowDropdownPreference where there is no Scaffold.",
    spinnerPreference: "SpinnerPreference: Miuix extended component, like DropdownPreference but each entry can carry an icon and a summary (SpinnerEntry). OverlaySpinnerPreference needs the Scaffold popup host.",
    dropdownMenu: "List popup: Miuix OverlayListPopup / OverlayDropdownMenu, a rounded 20dp surface with 50dp rows, the chosen row marked with a Check icon in primary. It opens from its anchor and needs the Scaffold popup host.",
    cascadingMenu: "Cascading popup: Miuix OverlayCascadingListPopup, a first-level list whose entry opens a second-level list beside it with a morph transition. It needs the Scaffold popup host.",
  },
  ja: {
    smallTitle: "SmallTitle: カードや設定項目のグループの上に置く、Miuix の小さなセクション見出し（14sp、onBackgroundVariant 色、開始側に 16dp の余白）。",
    badge: "Badge: Miuix の Badge。6dp のドット、または短い数字を入れた 16dp のピル。error 色で、対象の右上の角に重ねる。",
    breadcrumbBar: "BreadcrumbBar: Miuix の BreadcrumbBar。項目の高さは 32dp、左右の余白は 10dp、区切りはシェブロン。最後の項目が現在地（onSurface）で、手前の項目はタップで戻れる。",
    tooltip: "Tooltip: 長押しまたはホバーで出す Miuix の Tooltip。通常型は角丸 12dp・余白 12×8dp・最大幅 200dp。本文があるリッチ型は角丸 16dp・余白 16dp・最大幅 320dp。16×8dp のキャレットが対象を指し、対象から 8dp 離す。",
    numberPicker: "NumberPicker: Miuix の NumberPicker。行の高さ 45dp の縦ホイールで、中央の行は大きく primary 色、上下の行は薄くなる。値にスナップして通知する。",
    pullToRefresh: "PullToRefresh: スクロールするリストを包む Miuix の PullToRefresh。インジケーターは太さ 4dp・30dp の円形プログレスで、引くほど伸び、更新中は回転する。",
    colorPalette: "ColorPalette: Miuix の ColorPalette。色見本のグリッドに選択リングを付け、下にアルファスライダーを置く。",
    colorPicker: "ColorPicker: Miuix の ColorPicker。彩度・明度の領域、色相スライダー、アルファスライダーで構成し、選んだ色をプレビューする。",
    arrowPreference: "ArrowPreference: Miuix 拡張コンポーネント。BasicComponent の行（余白 16dp、タイトル 17sp の onSurface、概要 14sp の onSurfaceVariantSummary）の末尾に ArrowRight アイコンと任意の値を置く。複数を 1 枚の Card にまとめる。",
    switchPreference: "SwitchPreference: Miuix 拡張コンポーネント。BasicComponent の行の末尾に Miuix の Switch（49×28dp、つまみ 20dp）を置く。Card にまとめるときは項目間に区切り線を入れない。",
    checkboxPreference: "CheckboxPreference: Miuix 拡張コンポーネント。BasicComponent の行に Miuix の Checkbox（26dp の円）を置く。",
    radioPreference: "RadioButtonPreference: Miuix 拡張コンポーネント。BasicComponent の行に Miuix の RadioButton（26dp の円）を置く。1 つの選択肢の行は同じ Card に入れ、選べるのは 1 つだけ。",
    sliderPreference: "SliderPreference: Miuix 拡張コンポーネント。タイトルと現在値を 1 行に置き、その下に Miuix の Slider（最小高さ 28dp、完全に丸いトラック）を置く。",
    rangeSliderPreference: "RangeSliderPreference: Miuix 拡張コンポーネント。SliderPreference と同じで、範囲を選ぶ 2 つのつまみを持つ。",
    dropdownPreference: "DropdownPreference: Miuix 拡張コンポーネント。BasicComponent の行の末尾に選択中の項目と上下矢印を表示する。タップすると下に OverlayListPopup が開く（Scaffold のポップアップホストが必要）。Scaffold が無い場所では WindowDropdownPreference を使う。",
    spinnerPreference: "SpinnerPreference: Miuix 拡張コンポーネント。DropdownPreference と同じだが、各項目にアイコンと概要（SpinnerEntry）を付けられる。OverlaySpinnerPreference は Scaffold のポップアップホストが必要。",
    dropdownMenu: "リストポップアップ: Miuix の OverlayListPopup / OverlayDropdownMenu。角丸 20dp の面に高さ 50dp の行を並べ、選択中の行は primary の Check アイコンで示す。対象の位置から開き、Scaffold のポップアップホストが必要。",
    cascadingMenu: "カスケードポップアップ: Miuix の OverlayCascadingListPopup。1 階層目の項目をタップすると、隣に 2 階層目のリストがモーフィングで開く。Scaffold のポップアップホストが必要。",
  },
  zh: {
    smallTitle: "SmallTitle：Miuix 的小分组标题，放在一组卡片或设置项上方（14sp、onBackgroundVariant 颜色、起始侧 16dp 边距）。",
    badge: "Badge：Miuix 的 Badge，6dp 的圆点，或带短数字的 16dp 胶囊，error 颜色，盖在锚点的右上角。",
    breadcrumbBar: "BreadcrumbBar：Miuix 的 BreadcrumbBar，项高 32dp，左右内边距 10dp，用 chevron 分隔；最后一项是当前位置（onSurface），前面的项可点击返回。",
    tooltip: "Tooltip：长按或悬停时出现的 Miuix Tooltip。普通型圆角 12dp、内边距 12×8dp、最大宽度 200dp；带正文的富文本型圆角 16dp、内边距 16dp、最大宽度 320dp。16×8dp 的箭头指向锚点，与锚点相距 8dp。",
    numberPicker: "NumberPicker：Miuix 的 NumberPicker，行高 45dp 的竖向滚轮；中间行较大且为 primary 颜色，上下行渐淡。会吸附到某个值并回调。",
    pullToRefresh: "PullToRefresh：包住可滚动列表的 Miuix PullToRefresh；指示器是 30dp、4dp 线宽的圆形进度，随下拉变长，刷新时旋转。",
    colorPalette: "ColorPalette：Miuix 的 ColorPalette，色块网格带选中圈，下方是透明度滑块。",
    colorPicker: "ColorPicker：Miuix 的 ColorPicker，由饱和度/明度区域、色相滑块和透明度滑块组成，并预览所选颜色。",
    arrowPreference: "ArrowPreference：Miuix 扩展组件，BasicComponent 行（16dp 内边距，标题 17sp onSurface，摘要 14sp onSurfaceVariantSummary），末尾放 ArrowRight 图标和可选的值。多个放进同一张 Card。",
    switchPreference: "SwitchPreference：Miuix 扩展组件，BasicComponent 行的末尾放 Miuix Switch（49×28dp，滑块 20dp）。放进 Card 时各项之间不加分割线。",
    checkboxPreference: "CheckboxPreference：Miuix 扩展组件，BasicComponent 行里放 Miuix Checkbox（26dp 圆形）。",
    radioPreference: "RadioButtonPreference：Miuix 扩展组件，BasicComponent 行里放 Miuix RadioButton（26dp 圆形）。同一组单选项放进同一张 Card，只能选一项。",
    sliderPreference: "SliderPreference：Miuix 扩展组件，标题和当前值在同一行，下方是 Miuix Slider（最小高度 28dp，全圆角轨道）。",
    rangeSliderPreference: "RangeSliderPreference：Miuix 扩展组件，同 SliderPreference，但有两个滑块用于选择范围。",
    dropdownPreference: "DropdownPreference：Miuix 扩展组件，BasicComponent 行的末尾显示所选项和上下箭头。点击后在下方打开 OverlayListPopup（需要 Scaffold 的弹窗宿主）；没有 Scaffold 的地方用 WindowDropdownPreference。",
    spinnerPreference: "SpinnerPreference：Miuix 扩展组件，与 DropdownPreference 类似，但每个选项可带图标和摘要（SpinnerEntry）。OverlaySpinnerPreference 需要 Scaffold 的弹窗宿主。",
    dropdownMenu: "列表弹窗：Miuix 的 OverlayListPopup / OverlayDropdownMenu，20dp 圆角的面板，行高 50dp，选中行用 primary 的 Check 图标标记。从锚点处展开，需要 Scaffold 的弹窗宿主。",
    cascadingMenu: "级联弹窗：Miuix 的 OverlayCascadingListPopup，点击一级项后在旁边以形变动画展开二级列表。需要 Scaffold 的弹窗宿主。",
  },
  ko: {
    smallTitle: "SmallTitle: 카드나 설정 항목 묶음 위에 두는 Miuix의 작은 섹션 제목(14sp, onBackgroundVariant 색, 시작 쪽 16dp 여백).",
    badge: "Badge: Miuix의 Badge. 6dp 점 또는 짧은 숫자를 담은 16dp 알약 모양이며 error 색, 대상의 오른쪽 위 모서리에 겹친다.",
    breadcrumbBar: "BreadcrumbBar: Miuix의 BreadcrumbBar. 항목 높이 32dp, 좌우 여백 10dp, 구분은 chevron. 마지막 항목이 현재 위치(onSurface)이고 앞 항목은 탭하여 돌아갈 수 있다.",
    tooltip: "Tooltip: 길게 누르거나 호버할 때 나오는 Miuix Tooltip. 일반형은 모서리 12dp, 여백 12×8dp, 최대 너비 200dp. 본문이 있는 리치형은 모서리 16dp, 여백 16dp, 최대 너비 320dp. 16×8dp 꼬리가 대상을 가리키며 대상과 8dp 떨어진다.",
    numberPicker: "NumberPicker: Miuix의 NumberPicker. 행 높이 45dp의 세로 휠이며 가운데 행은 크고 primary 색, 위아래 행은 흐려진다. 값에 스냅하여 알려 준다.",
    pullToRefresh: "PullToRefresh: 스크롤 목록을 감싸는 Miuix PullToRefresh. 표시기는 30dp, 선 두께 4dp의 원형 진행 표시기로 당길수록 길어지고 새로고침 중에는 회전한다.",
    colorPalette: "ColorPalette: Miuix의 ColorPalette. 색상 견본 그리드에 선택 링을 두고 아래에 알파 슬라이더를 둔다.",
    colorPicker: "ColorPicker: Miuix의 ColorPicker. 채도/명도 영역, 색조 슬라이더, 알파 슬라이더로 구성되며 선택한 색을 미리 보여 준다.",
    arrowPreference: "ArrowPreference: Miuix 확장 컴포넌트. BasicComponent 행(여백 16dp, 제목 17sp onSurface, 요약 14sp onSurfaceVariantSummary) 끝에 ArrowRight 아이콘과 선택적 값을 둔다. 여러 개를 한 Card에 묶는다.",
    switchPreference: "SwitchPreference: Miuix 확장 컴포넌트. BasicComponent 행 끝에 Miuix Switch(49×28dp, 손잡이 20dp)를 둔다. Card로 묶을 때 항목 사이에 구분선을 넣지 않는다.",
    checkboxPreference: "CheckboxPreference: Miuix 확장 컴포넌트. BasicComponent 행에 Miuix Checkbox(26dp 원형)를 둔다.",
    radioPreference: "RadioButtonPreference: Miuix 확장 컴포넌트. BasicComponent 행에 Miuix RadioButton(26dp 원형)을 둔다. 한 선택 그룹의 행은 같은 Card에 넣고 하나만 선택할 수 있다.",
    sliderPreference: "SliderPreference: Miuix 확장 컴포넌트. 제목과 현재 값을 한 줄에 두고 그 아래에 Miuix Slider(최소 높이 28dp, 완전히 둥근 트랙)를 둔다.",
    rangeSliderPreference: "RangeSliderPreference: Miuix 확장 컴포넌트. SliderPreference와 같지만 범위를 고르는 손잡이가 두 개다.",
    dropdownPreference: "DropdownPreference: Miuix 확장 컴포넌트. BasicComponent 행 끝에 선택한 항목과 위아래 화살표를 표시한다. 탭하면 아래에 OverlayListPopup이 열린다(Scaffold의 팝업 호스트 필요). Scaffold가 없는 곳에서는 WindowDropdownPreference를 쓴다.",
    spinnerPreference: "SpinnerPreference: Miuix 확장 컴포넌트. DropdownPreference와 비슷하지만 각 항목에 아이콘과 요약(SpinnerEntry)을 붙일 수 있다. OverlaySpinnerPreference는 Scaffold의 팝업 호스트가 필요하다.",
    dropdownMenu: "목록 팝업: Miuix의 OverlayListPopup / OverlayDropdownMenu. 모서리 20dp 면에 높이 50dp 행을 늘어놓고 선택된 행은 primary Check 아이콘으로 표시한다. 대상 위치에서 열리며 Scaffold의 팝업 호스트가 필요하다.",
    cascadingMenu: "계단식 팝업: Miuix의 OverlayCascadingListPopup. 1단계 항목을 탭하면 옆에 2단계 목록이 모핑 전환으로 열린다. Scaffold의 팝업 호스트가 필요하다.",
  },
};

/** Where a part this canvas draws corresponds to a Miuix composable, said once at the top of the
 *  prompt's component notes. M3 names the canvas still uses internally map to these. */
export const MIUIX_MAPPING: Record<Lang, string> = {
  en: "Build with Miuix (top.yukonga.miuix.kmp, Compose Multiplatform) and wrap the screen in its Scaffold: button = Button / TextButton, iconButton = IconButton, fab = FloatingActionButton, toolbar = FloatingToolbar, topAppBar = TopAppBar (large title collapses on scroll), bottomNav = NavigationBar, navRail = NavigationRail, tabs = TabRow, searchBar = SearchBar, card = Card, listItem = BasicComponent, box = Surface, dialog = OverlayDialog, bottomSheet = OverlayBottomSheet, snackbar = Snackbar with SnackbarHost, textField = TextField, select = DropdownPreference, switch = Switch, checkbox = Checkbox, radio = RadioButton, slider = Slider, divider = HorizontalDivider, progress = ProgressIndicator, text = Text with MiuixTheme.textStyles.",
  ja: "UI は Miuix（top.yukonga.miuix.kmp、Compose Multiplatform）で作り、画面全体を Miuix の Scaffold で包む。対応: button = Button / TextButton、iconButton = IconButton、fab = FloatingActionButton、toolbar = FloatingToolbar、topAppBar = TopAppBar（大きな見出しはスクロールで縮む）、bottomNav = NavigationBar、navRail = NavigationRail、tabs = TabRow、searchBar = SearchBar、card = Card、listItem = BasicComponent、box = Surface、dialog = OverlayDialog、bottomSheet = OverlayBottomSheet、snackbar = SnackbarHost 付きの Snackbar、textField = TextField、select = DropdownPreference、switch = Switch、checkbox = Checkbox、radio = RadioButton、slider = Slider、divider = HorizontalDivider、progress = ProgressIndicator、text = MiuixTheme.textStyles を使う Text。",
  zh: "使用 Miuix（top.yukonga.miuix.kmp，Compose Multiplatform）构建界面，并用 Miuix 的 Scaffold 包住整个页面。对应关系：button = Button / TextButton，iconButton = IconButton，fab = FloatingActionButton，toolbar = FloatingToolbar，topAppBar = TopAppBar（大标题随滚动折叠），bottomNav = NavigationBar，navRail = NavigationRail，tabs = TabRow，searchBar = SearchBar，card = Card，listItem = BasicComponent，box = Surface，dialog = OverlayDialog，bottomSheet = OverlayBottomSheet，snackbar = 配合 SnackbarHost 的 Snackbar，textField = TextField，select = DropdownPreference，switch = Switch，checkbox = Checkbox，radio = RadioButton，slider = Slider，divider = HorizontalDivider，progress = ProgressIndicator，text = 使用 MiuixTheme.textStyles 的 Text。",
  ko: "UI는 Miuix(top.yukonga.miuix.kmp, Compose Multiplatform)로 만들고 화면 전체를 Miuix의 Scaffold로 감싼다. 대응: button = Button / TextButton, iconButton = IconButton, fab = FloatingActionButton, toolbar = FloatingToolbar, topAppBar = TopAppBar(큰 제목은 스크롤하면 접힘), bottomNav = NavigationBar, navRail = NavigationRail, tabs = TabRow, searchBar = SearchBar, card = Card, listItem = BasicComponent, box = Surface, dialog = OverlayDialog, bottomSheet = OverlayBottomSheet, snackbar = SnackbarHost와 함께 쓰는 Snackbar, textField = TextField, select = DropdownPreference, switch = Switch, checkbox = Checkbox, radio = RadioButton, slider = Slider, divider = HorizontalDivider, progress = ProgressIndicator, text = MiuixTheme.textStyles를 쓰는 Text.",
};

/* ---------- the parts that were M3 parts, as Miuix draws them ---------- */
type CoreKind = "button" | "iconButton" | "fab" | "extendedFab" | "chip" | "splitButton" | "fabMenu" | "topAppBar" | "bottomNav" | "navRail" | "toolbar" | "tabs" | "searchBar" | "card" | "listItem" | "box" | "bottomSheet" | "dialog" | "snackbar" | "textField" | "select" | "switch" | "checkbox" | "radio" | "slider" | "divider" | "linearProgress" | "circularProgress" | "loadingIndicator";

const CORE_NOTES: Record<Lang, Record<CoreKind, string>> = {
  en: {
    button: "Button: Miuix Button, a 16dp rounded rectangle (not a pill), at least 40dp tall and 58dp wide with 16x13dp padding. Filled uses primary with onPrimary text; the other variants use secondaryContainer with onSurface text. Use TextButton for a text-only button. Pressing dims the button; there is no ripple.",
    iconButton: "IconButton: Miuix IconButton, 40x40dp, fully round, no container unless a background colour is given. Pressing dims it.",
    fab: "FloatingActionButton: Miuix FloatingActionButton, a 60dp circle in primary with a white icon and a 4dp shadow, placed 16dp from the corner through Scaffold's floatingActionButton slot.",
    extendedFab: "Extended FAB: Miuix has no extended FAB; build it as a pill-shaped Button (primary, 50dp corners, icon and label, 4dp shadow) placed in Scaffold's floatingActionButton slot.",
    chip: "Chip: Miuix has no chip; build it as a small Button (secondaryContainer, 12dp corners, 32dp tall); the selected one takes primaryContainer with primary text.",
    splitButton: "Split button: build it from a Button and an IconButton side by side (a 2dp gap), the arrow one opening an OverlayListPopup.",
    fabMenu: "FAB menu: a FloatingActionButton that opens an OverlayListPopup of its entries above it.",
    topAppBar: "TopAppBar: Miuix TopAppBar with a MiuixScrollBehavior. The title is 32sp and large when the list is at the top and collapses to a centred 18sp title in a 52dp bar on scroll. The bar uses the page colour with no shadow or divider; the navigation icon sits 16dp from the start edge and the actions 16dp from the end. Use SmallTopAppBar for a bar that never collapses.",
    bottomNav: "NavigationBar: Miuix NavigationBar, items 64dp tall with a 26dp icon above a 12sp label. The selected item is drawn in primary and the others in onSurfaceVariantActions; there is no pill indicator. The bar uses the page colour with a hairline on top.",
    navRail: "NavigationRail: Miuix NavigationRail, 80dp wide with 28dp icons over 12sp labels and the selected item in primary. Expanded it is 240dp wide and the selected item gets a 16dp-cornered tertiaryContainer background.",
    toolbar: "FloatingToolbar: Miuix FloatingToolbar, a floating pill (50dp corners) of icon buttons with a 4dp shadow and a hairline border, 12x8dp from the screen edge.",
    tabs: "TabRow: Miuix TabRow, 42dp tall, all tabs the same width (76 to 98dp), the selected tab shown as a 12dp-cornered primaryContainer pill with primary text; the others are onSurfaceVariantSummary. With contour (the tonal variant) it is 45dp tall, sits in a secondaryContainer track and the selected tab is a white 8dp-cornered chip.",
    searchBar: "SearchBar: Miuix SearchBar, a fully round field at least 45dp tall (surfaceContainerHigh), search icon 16dp from the start, 17sp placeholder in onSurfaceVariantActions. Tapping expands it to a search overlay with a Cancel text button.",
    card: "Card: Miuix Card, a 16dp rounded rectangle in surfaceContainer (white in light mode, #242424 in dark) with no border or shadow, on the surface-coloured page. Cards are 12dp from the screen edge and 12dp apart. Pressing dims the card.",
    listItem: "BasicComponent: Miuix BasicComponent row, 16dp padding, title in 17sp onSurface, summary in 14sp onSurfaceVariantSummary, optional start and end content. Group rows inside one Card; they have no dividers between them.",
    box: "Surface: Miuix Surface, a plain container with a colour and a corner radius.",
    bottomSheet: "OverlayBottomSheet: Miuix OverlayBottomSheet, 28dp top corners, a 36x4dp drag handle, a dimmed scrim (windowDimming); it needs the Scaffold popup host. Use WindowBottomSheet outside a Scaffold.",
    dialog: "OverlayDialog: Miuix OverlayDialog, a centred 32dp-cornered surface 28dp from each side with a 20sp centred title, a 15sp onSurfaceVariantSummary summary and two full-width rounded Buttons side by side (cancel in secondaryContainer, confirm in primary). It needs the Scaffold popup host. Use WindowDialog outside a Scaffold.",
    snackbar: "Snackbar: Miuix Snackbar through a SnackbarHost in Scaffold. A 16dp-cornered surface with a 4dp shadow, 12dp padding, 15sp text and an optional action Button (50dp corners).",
    textField: "TextField: Miuix TextField, a 16dp rounded field filled with secondaryContainer (no underline), 16x16dp padding, a 17sp label that floats to 10sp when there is text, and a 2dp primary border when focused.",
    select: "Select: use DropdownPreference (a BasicComponent row with the chosen value and an up-down arrow at the end) or an OverlayDropdownPreference; tapping opens an OverlayListPopup.",
    switch: "Switch: Miuix Switch, a 49x28dp pill with a 20dp white thumb. On is primary; off is secondaryContainer. The thumb slides with a spring.",
    checkbox: "Checkbox: Miuix Checkbox, a 26dp circle. Checked is a primary circle with a white check; unchecked is a 1.5dp outline circle.",
    radio: "RadioButton: Miuix RadioButton, a 26dp circle. Selected is a primary ring with a primary dot; unselected is a 1.5dp outline circle.",
    slider: "Slider: Miuix Slider, 28dp tall with a fully rounded track filled in primary up to the value and sliderBackground after it; the handle is a 28dp white circle with a shadow.",
    divider: "HorizontalDivider: Miuix Divider, 0.75dp in dividerLine colour.",
    linearProgress: "LinearProgressIndicator: Miuix ProgressIndicator, 6dp tall with fully round ends; the track is secondaryContainer and the progress primary.",
    circularProgress: "CircularProgressIndicator: Miuix ProgressIndicator, a 30dp ring with a 4dp stroke in primary; indeterminate it spins.",
    loadingIndicator: "InfiniteProgressIndicator: Miuix's 20dp indicator of dots orbiting a centre, 2dp dots, in primary.",
  },
  ja: {
    button: "Button: Miuix の Button。角丸 16dp の長方形（ピルではない）で、高さ 40dp 以上・幅 58dp 以上、余白は 16×13dp。filled は primary の背景に onPrimary の文字、それ以外は secondaryContainer に onSurface の文字。文字だけなら TextButton。押すと暗くなり、リップルは付けない。",
    iconButton: "IconButton: Miuix の IconButton。40×40dp の円形で、背景色を指定しない限りコンテナは無い。押すと暗くなる。",
    fab: "FloatingActionButton: Miuix の FloatingActionButton。primary の 60dp の円に白いアイコン、影 4dp。Scaffold の floatingActionButton スロットで隅から 16dp に置く。",
    extendedFab: "拡張 FAB: Miuix に拡張 FAB は無いので、ピル型の Button（primary、角丸 50dp、アイコンとラベル、影 4dp）を Scaffold の floatingActionButton スロットに置いて作る。",
    chip: "チップ: Miuix にチップは無いので、小さな Button（secondaryContainer、角丸 12dp、高さ 32dp）で作る。選択中は primaryContainer の背景に primary の文字。",
    splitButton: "スプリットボタン: Button と IconButton を 2dp 空けて並べて作り、矢印側で OverlayListPopup を開く。",
    fabMenu: "FAB メニュー: FloatingActionButton を押すと、その上に項目の OverlayListPopup が開く。",
    topAppBar: "TopAppBar: MiuixScrollBehavior 付きの Miuix TopAppBar。リストが先頭のときは 32sp の大きな見出しで、スクロールすると 52dp のバーの中央に 18sp の見出しとして縮む。バーはページと同じ色で影も区切り線も無い。ナビアイコンは開始端から 16dp、アクションは終端から 16dp。縮まないバーには SmallTopAppBar を使う。",
    bottomNav: "NavigationBar: Miuix の NavigationBar。項目の高さ 64dp、26dp のアイコンの下に 12sp のラベル。選択中は primary、それ以外は onSurfaceVariantActions で、ピル型のインジケーターは無い。バーはページと同じ色で、上端に細い線を引く。",
    navRail: "NavigationRail: Miuix の NavigationRail。幅 80dp、28dp のアイコンの下に 12sp のラベルで、選択中は primary。展開すると幅 240dp になり、選択項目に角丸 16dp の tertiaryContainer の背景が付く。",
    toolbar: "FloatingToolbar: Miuix の FloatingToolbar。アイコンボタンを並べた浮かぶピル（角丸 50dp）で、影 4dp と細い枠線を持ち、画面の端から 12×8dp 離す。",
    tabs: "TabRow: Miuix の TabRow。高さ 42dp、タブはすべて同じ幅（76〜98dp）。選択中のタブは角丸 12dp の primaryContainer のピルに primary の文字、それ以外は onSurfaceVariantSummary。contour（tonal）では高さ 45dp で、secondaryContainer の溝の中に、選択中を白い角丸 8dp のチップとして置く。",
    searchBar: "SearchBar: Miuix の SearchBar。高さ 45dp 以上の完全に丸い欄（surfaceContainerHigh）で、検索アイコンは開始端から 16dp、プレースホルダーは 17sp の onSurfaceVariantActions。タップすると検索オーバーレイに広がり、「キャンセル」のテキストボタンが出る。",
    card: "Card: Miuix の Card。surface 色のページの上に置く、角丸 16dp の surfaceContainer（ライトは白、ダークは #242424）で、枠線も影も無い。画面の端から 12dp、カード同士は 12dp 空ける。押すと暗くなる。",
    listItem: "BasicComponent: Miuix の BasicComponent の行。余白 16dp、タイトルは 17sp の onSurface、概要は 14sp の onSurfaceVariantSummary、先頭と末尾に任意の内容。複数の行は 1 枚の Card にまとめ、行の間に区切り線は入れない。",
    box: "Surface: Miuix の Surface。色と角丸を持つだけのコンテナ。",
    bottomSheet: "OverlayBottomSheet: Miuix の OverlayBottomSheet。上の角丸 28dp、36×4dp のドラッグハンドル、暗いスクリム（windowDimming）。Scaffold のポップアップホストが必要。Scaffold の外では WindowBottomSheet を使う。",
    dialog: "OverlayDialog: Miuix の OverlayDialog。左右 28dp 空けた中央の角丸 32dp の面に、20sp の中央揃えのタイトル、15sp の onSurfaceVariantSummary の概要、横いっぱいの丸いボタン 2 つ（キャンセルは secondaryContainer、確定は primary）を並べる。Scaffold のポップアップホストが必要。Scaffold の外では WindowDialog を使う。",
    snackbar: "Snackbar: Scaffold の SnackbarHost 経由の Miuix の Snackbar。角丸 16dp の面に影 4dp、余白 12dp、15sp の文字と、任意のアクションボタン（角丸 50dp）。",
    textField: "TextField: Miuix の TextField。角丸 16dp で secondaryContainer を塗り、下線は無し。余白 16×16dp、ラベルは 17sp で、文字が入ると 10sp に縮んで上に浮く。フォーカス時は primary の 2dp の枠。",
    select: "セレクト: DropdownPreference（選択中の値と上下矢印を末尾に置いた BasicComponent の行）または OverlayDropdownPreference を使う。タップすると OverlayListPopup が開く。",
    switch: "Switch: Miuix の Switch。49×28dp のピルに 20dp の白いつまみ。オンは primary、オフは secondaryContainer。つまみはスプリングで動く。",
    checkbox: "Checkbox: Miuix の Checkbox。26dp の円。チェック時は primary の円に白いチェック、未チェックは 1.5dp の線の円。",
    radio: "RadioButton: Miuix の RadioButton。26dp の円。選択時は primary のリングに primary の点、未選択は 1.5dp の線の円。",
    slider: "Slider: Miuix の Slider。高さ 28dp、完全に丸いトラックを値の位置まで primary、その先を sliderBackground で塗る。つまみは影付きの 28dp の白い円。",
    divider: "HorizontalDivider: Miuix の Divider。0.75dp の dividerLine 色。",
    linearProgress: "LinearProgressIndicator: Miuix の ProgressIndicator。高さ 6dp で両端は完全な丸。トラックは secondaryContainer、進捗は primary。",
    circularProgress: "CircularProgressIndicator: Miuix の ProgressIndicator。30dp のリングで線の太さ 4dp、primary。不確定のときは回転する。",
    loadingIndicator: "InfiniteProgressIndicator: Miuix の 20dp の、点が中心を回るインジケーター。点は 2dp で primary。",
  },
  zh: {
    button: "Button：Miuix 的 Button，16dp 圆角矩形（不是胶囊），高度至少 40dp、宽度至少 58dp，内边距 16×13dp。filled 为 primary 底色配 onPrimary 文字，其他变体为 secondaryContainer 底色配 onSurface 文字。纯文字按钮用 TextButton。按下时变暗，不使用涟漪。",
    iconButton: "IconButton：Miuix 的 IconButton，40×40dp 圆形，除非指定背景色否则没有容器。按下时变暗。",
    fab: "FloatingActionButton：Miuix 的 FloatingActionButton，primary 色 60dp 圆形配白色图标，阴影 4dp，通过 Scaffold 的 floatingActionButton 槽位放在距角落 16dp 处。",
    extendedFab: "扩展 FAB：Miuix 没有扩展 FAB，用胶囊形 Button（primary，圆角 50dp，图标加文字，阴影 4dp）放进 Scaffold 的 floatingActionButton 槽位来实现。",
    chip: "Chip：Miuix 没有 Chip，用小号 Button（secondaryContainer，圆角 12dp，高 32dp）实现；选中时用 primaryContainer 底色配 primary 文字。",
    splitButton: "分体按钮：用一个 Button 和一个 IconButton 并排（间隔 2dp）实现，箭头一侧打开 OverlayListPopup。",
    fabMenu: "FAB 菜单：点击 FloatingActionButton 后，在其上方打开各项的 OverlayListPopup。",
    topAppBar: "TopAppBar：带 MiuixScrollBehavior 的 Miuix TopAppBar。列表在顶部时标题是 32sp 的大标题，滚动后折叠为 52dp 栏中居中的 18sp 标题。栏与页面同色，没有阴影和分割线；导航图标距起始边 16dp，操作图标距末端 16dp。不折叠的栏用 SmallTopAppBar。",
    bottomNav: "NavigationBar：Miuix 的 NavigationBar，每项高 64dp，26dp 图标在上、12sp 标签在下。选中项为 primary，其余为 onSurfaceVariantActions，没有胶囊指示器。栏与页面同色，顶部一条细线。",
    navRail: "NavigationRail：Miuix 的 NavigationRail，宽 80dp，28dp 图标配 12sp 标签，选中项为 primary。展开后宽 240dp，选中项带 16dp 圆角的 tertiaryContainer 背景。",
    toolbar: "FloatingToolbar：Miuix 的 FloatingToolbar，由图标按钮组成的悬浮胶囊（圆角 50dp），阴影 4dp 并带细边框，距屏幕边缘 12×8dp。",
    tabs: "TabRow：Miuix 的 TabRow，高 42dp，所有标签等宽（76 到 98dp）。选中标签是 12dp 圆角的 primaryContainer 胶囊配 primary 文字，其余为 onSurfaceVariantSummary。带 contour（tonal 变体）时高 45dp，放在 secondaryContainer 的凹槽里，选中项是白色的 8dp 圆角块。",
    searchBar: "SearchBar：Miuix 的 SearchBar，高度至少 45dp 的全圆角输入框（surfaceContainerHigh），搜索图标距起始边 16dp，17sp 的占位文字用 onSurfaceVariantActions。点击后展开为搜索浮层，并出现“取消”文字按钮。",
    card: "Card：Miuix 的 Card，放在 surface 色页面上的 16dp 圆角 surfaceContainer（浅色为白色，深色为 #242424），没有边框和阴影。距屏幕边缘 12dp，卡片之间 12dp。按下时变暗。",
    listItem: "BasicComponent：Miuix 的 BasicComponent 行，内边距 16dp，标题 17sp onSurface，摘要 14sp onSurfaceVariantSummary，起始和末端可放内容。多行放进同一张 Card，行与行之间不加分割线。",
    box: "Surface：Miuix 的 Surface，只带颜色和圆角的普通容器。",
    bottomSheet: "OverlayBottomSheet：Miuix 的 OverlayBottomSheet，顶部圆角 28dp，36×4dp 的拖动条，半透明遮罩（windowDimming）。需要 Scaffold 的弹窗宿主；不在 Scaffold 内时用 WindowBottomSheet。",
    dialog: "OverlayDialog：Miuix 的 OverlayDialog，距左右各 28dp 的居中面板，圆角 32dp，20sp 居中标题，15sp 的 onSurfaceVariantSummary 摘要，下方并排两个通栏圆角按钮（取消为 secondaryContainer，确认为 primary）。需要 Scaffold 的弹窗宿主；不在 Scaffold 内时用 WindowDialog。",
    snackbar: "Snackbar：通过 Scaffold 中 SnackbarHost 显示的 Miuix Snackbar，16dp 圆角面板，阴影 4dp，内边距 12dp，15sp 文字，可选操作按钮（圆角 50dp）。",
    textField: "TextField：Miuix 的 TextField，16dp 圆角，用 secondaryContainer 填充，无下划线，内边距 16×16dp，标签 17sp，输入后缩小为 10sp 浮到上方；聚焦时有 2dp 的 primary 边框。",
    select: "选择框：使用 DropdownPreference（末尾显示当前值和上下箭头的 BasicComponent 行）或 OverlayDropdownPreference；点击后打开 OverlayListPopup。",
    switch: "Switch：Miuix 的 Switch，49×28dp 的胶囊，带 20dp 白色滑块。开启为 primary，关闭为 secondaryContainer。滑块带弹簧动画。",
    checkbox: "Checkbox：Miuix 的 Checkbox，26dp 圆形。选中为 primary 圆配白色对勾，未选中为 1.5dp 描边圆。",
    radio: "RadioButton：Miuix 的 RadioButton，26dp 圆形。选中为 primary 圆环加 primary 圆点，未选中为 1.5dp 描边圆。",
    slider: "Slider：Miuix 的 Slider，高 28dp，全圆角轨道，到当前值为止用 primary，之后用 sliderBackground；滑块是带阴影的 28dp 白色圆。",
    divider: "HorizontalDivider：Miuix 的 Divider，0.75dp，颜色为 dividerLine。",
    linearProgress: "LinearProgressIndicator：Miuix 的 ProgressIndicator，高 6dp，两端全圆角；轨道为 secondaryContainer，进度为 primary。",
    circularProgress: "CircularProgressIndicator：Miuix 的 ProgressIndicator，30dp 圆环，线宽 4dp，primary 色；不确定时旋转。",
    loadingIndicator: "InfiniteProgressIndicator：Miuix 的 20dp 圆点绕中心旋转的指示器，圆点 2dp，primary 色。",
  },
  ko: {
    button: "Button: Miuix의 Button. 모서리 16dp의 직사각형(알약 아님)이며 높이 40dp 이상, 너비 58dp 이상, 여백 16×13dp. filled는 primary 배경에 onPrimary 글자, 그 밖의 변형은 secondaryContainer 배경에 onSurface 글자. 글자만 있으면 TextButton. 누르면 어두워지고 리플은 쓰지 않는다.",
    iconButton: "IconButton: Miuix의 IconButton. 40×40dp 원형이며 배경색을 지정하지 않으면 컨테이너가 없다. 누르면 어두워진다.",
    fab: "FloatingActionButton: Miuix의 FloatingActionButton. primary 색 60dp 원에 흰 아이콘, 그림자 4dp. Scaffold의 floatingActionButton 슬롯으로 모서리에서 16dp에 둔다.",
    extendedFab: "확장 FAB: Miuix에는 확장 FAB가 없으므로 알약 모양 Button(primary, 모서리 50dp, 아이콘과 레이블, 그림자 4dp)을 Scaffold의 floatingActionButton 슬롯에 두어 만든다.",
    chip: "칩: Miuix에는 칩이 없으므로 작은 Button(secondaryContainer, 모서리 12dp, 높이 32dp)으로 만든다. 선택되면 primaryContainer 배경에 primary 글자.",
    splitButton: "분할 버튼: Button과 IconButton을 2dp 간격으로 나란히 두어 만들고, 화살표 쪽이 OverlayListPopup을 연다.",
    fabMenu: "FAB 메뉴: FloatingActionButton을 누르면 그 위에 항목들의 OverlayListPopup이 열린다.",
    topAppBar: "TopAppBar: MiuixScrollBehavior를 쓰는 Miuix TopAppBar. 목록이 맨 위일 때는 32sp 큰 제목이고, 스크롤하면 52dp 바 가운데의 18sp 제목으로 접힌다. 바는 페이지와 같은 색이며 그림자와 구분선이 없다. 탐색 아이콘은 시작 가장자리에서 16dp, 액션은 끝에서 16dp. 접히지 않는 바에는 SmallTopAppBar를 쓴다.",
    bottomNav: "NavigationBar: Miuix의 NavigationBar. 항목 높이 64dp, 26dp 아이콘 아래 12sp 레이블. 선택된 항목은 primary, 나머지는 onSurfaceVariantActions이며 알약 모양 인디케이터는 없다. 바는 페이지와 같은 색이고 위쪽에 가는 선이 있다.",
    navRail: "NavigationRail: Miuix의 NavigationRail. 너비 80dp, 28dp 아이콘과 12sp 레이블이며 선택 항목은 primary. 확장하면 너비 240dp가 되고 선택 항목에 모서리 16dp의 tertiaryContainer 배경이 생긴다.",
    toolbar: "FloatingToolbar: Miuix의 FloatingToolbar. 아이콘 버튼으로 이루어진 떠 있는 알약(모서리 50dp)이며 그림자 4dp와 가는 테두리가 있고 화면 가장자리에서 12×8dp 떨어진다.",
    tabs: "TabRow: Miuix의 TabRow. 높이 42dp, 모든 탭의 너비가 같다(76~98dp). 선택된 탭은 모서리 12dp의 primaryContainer 알약에 primary 글자, 나머지는 onSurfaceVariantSummary. contour(tonal)에서는 높이 45dp이며 secondaryContainer 홈 안에 선택 항목이 흰색 모서리 8dp 칩으로 놓인다.",
    searchBar: "SearchBar: Miuix의 SearchBar. 높이 45dp 이상의 완전히 둥근 입력창(surfaceContainerHigh)이며 검색 아이콘은 시작 가장자리에서 16dp, 17sp 자리표시자는 onSurfaceVariantActions. 탭하면 검색 오버레이로 확장되고 '취소' 텍스트 버튼이 나타난다.",
    card: "Card: Miuix의 Card. surface 색 페이지 위에 놓는 모서리 16dp의 surfaceContainer(라이트는 흰색, 다크는 #242424)이며 테두리와 그림자가 없다. 화면 가장자리에서 12dp, 카드 사이는 12dp. 누르면 어두워진다.",
    listItem: "BasicComponent: Miuix의 BasicComponent 행. 여백 16dp, 제목 17sp onSurface, 요약 14sp onSurfaceVariantSummary, 시작과 끝에 선택적 내용. 여러 행은 한 Card에 묶고 행 사이에 구분선을 넣지 않는다.",
    box: "Surface: Miuix의 Surface. 색과 모서리만 가진 단순한 컨테이너.",
    bottomSheet: "OverlayBottomSheet: Miuix의 OverlayBottomSheet. 위쪽 모서리 28dp, 36×4dp 드래그 핸들, 어두운 스크림(windowDimming). Scaffold의 팝업 호스트가 필요하다. Scaffold 밖에서는 WindowBottomSheet를 쓴다.",
    dialog: "OverlayDialog: Miuix의 OverlayDialog. 좌우 28dp씩 띄운 가운데 모서리 32dp 면에 20sp 가운데 정렬 제목, 15sp onSurfaceVariantSummary 요약, 가로로 꽉 찬 둥근 버튼 두 개(취소는 secondaryContainer, 확인은 primary)를 둔다. Scaffold의 팝업 호스트가 필요하다. Scaffold 밖에서는 WindowDialog를 쓴다.",
    snackbar: "Snackbar: Scaffold의 SnackbarHost를 통해 띄우는 Miuix Snackbar. 모서리 16dp 면, 그림자 4dp, 여백 12dp, 15sp 글자와 선택적 액션 버튼(모서리 50dp).",
    textField: "TextField: Miuix의 TextField. 모서리 16dp, secondaryContainer로 채우고 밑줄 없음. 여백 16×16dp, 17sp 레이블은 글자가 들어가면 10sp로 줄어 위로 뜬다. 포커스되면 primary 2dp 테두리.",
    select: "선택 상자: DropdownPreference(끝에 선택값과 위아래 화살표를 둔 BasicComponent 행) 또는 OverlayDropdownPreference를 쓴다. 탭하면 OverlayListPopup이 열린다.",
    switch: "Switch: Miuix의 Switch. 49×28dp 알약에 20dp 흰 손잡이. 켜짐은 primary, 꺼짐은 secondaryContainer. 손잡이는 스프링으로 움직인다.",
    checkbox: "Checkbox: Miuix의 Checkbox. 26dp 원. 체크되면 primary 원에 흰 체크, 아니면 1.5dp 선 원.",
    radio: "RadioButton: Miuix의 RadioButton. 26dp 원. 선택되면 primary 링에 primary 점, 아니면 1.5dp 선 원.",
    slider: "Slider: Miuix의 Slider. 높이 28dp, 완전히 둥근 트랙을 값까지 primary, 그 뒤는 sliderBackground로 칠한다. 손잡이는 그림자가 있는 28dp 흰 원.",
    divider: "HorizontalDivider: Miuix의 Divider. 0.75dp, dividerLine 색.",
    linearProgress: "LinearProgressIndicator: Miuix의 ProgressIndicator. 높이 6dp, 양 끝은 완전히 둥글다. 트랙은 secondaryContainer, 진행은 primary.",
    circularProgress: "CircularProgressIndicator: Miuix의 ProgressIndicator. 30dp 링, 선 두께 4dp, primary. 불확정이면 회전한다.",
    loadingIndicator: "InfiniteProgressIndicator: Miuix의 20dp 점이 중심을 도는 표시기. 점은 2dp, primary 색.",
  },
};

/** the note the prompt writes for a part: Miuix's own description of it */
export function miuixNote(lang: Lang, kind: string): string | undefined {
  return (MIUIX_STYLE_NOTES[lang] as Record<string, string>)[kind] ?? (CORE_NOTES[lang] as Record<string, string>)[kind];
}
