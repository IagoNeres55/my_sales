export function removeFields<T>(obj: T, fields: (keyof T)[]): Partial<T> {
  const result = { ...obj };
  fields.forEach((field) => delete result[field]);
  return result;
}
