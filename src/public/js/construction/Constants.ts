export const RESPONSIVE_SIZE_REGEX = [/col\-([0-9]+)/, /col\-sm\-([0-9]+)/, /col\-md\-([0-9]+)/, /col\-lg\-([0-9]+)/];
export const RESPONSIVE_OFFSET_REGEX = [/offset\-([0-9]+)/, /offset\-sm\-([0-9]+)/, /offset\-md\-([0-9]+)/, /offset\-lg\-([0-9]+)/];
export const SIZES_IN_DESCRIPTION = ["pixels", "points", "relative to font-size", "relative to font-size of root", "relative to viewport width", "relative to viewport height", "relative to parent"];
export const SIZES_IN_UNIT = ["px", "pt", "em", "rem", "vw", "vh", "%"];
export const BORDER_STYLES_IN_DESCRIPTION = ['default', 'none', '<div style="margin: 5px 0; padding: 3px; border: 4px dotted #999;" />', '<div style="margin: 5px 0; padding: 3px; border: 4px dashed #999;" />', '<div style="margin: 5px 0; padding: 3px; border: 4px solid #999;" />', '<div style="margin: 5px 0; padding: 3px; border: 4px double #999;" />', '<div style="margin: 5px 0; padding: 3px; border: 4px groove #999;" />', '<div style="margin: 5px 0; padding: 3px; border: 4px ridge #999;" />', '<div style="margin: 5px 0; padding: 3px; border: 4px inset #999;" />', '<div style="margin: 5px 0; padding: 3px; border: 4px outset #999;" />'];
export const BORDER_STYLES_IN_VALUE = [null, "none", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"];
export const OBJECT_FIT_OPTIONS = [null, "fill", "contain", "cover", "none", "scale-down"];
export const OBJECT_POSITION_OPTIONS = [null, "{SIZE}", "top", "right", "bottom", "left"];
export const OVERFLOW_OPTIONS = [null, "visible", "hidden", "scroll", "auto"];
export const POSITION_OPTIONS = [null, "static", "absolute", "fixed", "relative", "sticky"];
export const CLEAR_OPTIONS = [null, "left", "right", "both"];
export const FLOAT_OPTIONS = [null, "left", "right"];
export const CURSOR_OPTIONS = [null, "alias", "all-scroll", "auto", "cell", "context-menu", "col-resize", "copy", "crosshair", "default", "e-resize", "ew-resize", "grab", "grabbing", "help", "move", "n-resize", "ne-resize", "nesw-resize", "ns-resize", "nw-resize", "nwse-resize", "no-drop", "none", "not-allowed", "pointer", "progress", "row-resize", "s-resize", "se-resize", "sw-resize", "text", "vertical-text", "w-resize", "wait", "zoom-in", "zoom-out"];
export const DISPLAY_OPTIONS = [null, "inline", "block", "contents", "flex", "grid", "inline-block", "inline-flex", "inline-grid", "inline-table", "list-item", "run-in", "table", "table-caption", "table-column-group", "table-header-group", "table-footer-group", "table-row-group", "table-cell", "table-column", "table-row", "none"];
export const IMAGE_RENDERING_OPTIONS = [null, "auto", "smooth", "high-quality", "crisp-edges", "pixelated"];
export const POINTER_EVENTS_OPTIONS = [null, "auto", "none"];
export const Z_INDEX_OPTIONS = [null, "{NUMBER}"];
