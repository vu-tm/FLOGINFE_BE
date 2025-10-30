export function isNotEmpty(s) { return s && s.trim().length > 0; }
export function isPositiveNumber(n) { return !isNaN(n) && Number(n) > 0; }
