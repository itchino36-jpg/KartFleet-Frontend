export function normalizeInitialCapital(value: string): string {
  const lowercaseValue = value.toLocaleLowerCase("es-BO");

  return lowercaseValue.replace(
    /^(\s*)(\p{L})/u,
    (_, spaces: string, firstLetter: string) =>
      `${spaces}${firstLetter.toLocaleUpperCase("es-BO")}`
  );
}
