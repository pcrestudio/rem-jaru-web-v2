export const autocompleteStyle = {
  ".MuiInputBase-root": {
    background: "transparent",
    fontSize: "14px",
    border: "none",
  },
  "& .MuiInputBase-root:hover": {
    background: "transparent",
  },
  ".MuiFormLabel-root": {
    color: "text-foreground-500",
    fontSize: "15px",
  },
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
  ".Mui-focused": {
    color: "var(--heroui-default-foreground)",
  },
  "& .Mui-disabled": {
    background: "transparent !important",
  },
  "& .Mui-disabled:before": {
    borderBottom: "none !important",
  },
  "& .MuiFilledInput-underline:before": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-underline:hover:before": {
    borderBottom: "none !important",
  },
};
