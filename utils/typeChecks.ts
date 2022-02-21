export const isNullish = (value: any): value is undefined | null => {
  return typeof value === "undefined" || value === null
}