/**
 * Parses a standard CSV string into an array of objects.
 * Handles commas inside double-quoted fields.
 */
export function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/);
  if (lines.length === 0) return [];

  // Parse headers from the first line
  const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
  if (headers.length === 0 || (headers.length === 1 && headers[0] === '')) {
    return [];
  }

  const results: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const rowObj: Record<string, string> = {};

    headers.forEach((header, index) => {
      let val = values[index] || '';
      // Clean up surrounding quotes
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      rowObj[header] = val.trim();
    });

    results.push(rowObj);
  }

  return results;
}

/**
 * Splits a CSV line by commas, ignoring commas inside double quotes.
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}
