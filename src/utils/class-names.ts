/**
 * Tiny class-name composer (clsx-style, dependency-free).
 * Accepts strings, numbers, arrays and `{ class: condition }` records.
 */
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | null | undefined>

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = []
  append(out, inputs)
  return out.join(' ')
}

function append(out: string[], inputs: ClassValue[]): void {
  for (const input of inputs) {
    if (!input && input !== 0) continue
    if (typeof input === 'string' || typeof input === 'number') {
      out.push(String(input))
    } else if (Array.isArray(input)) {
      append(out, input)
    } else {
      for (const [key, value] of Object.entries(input)) {
        if (value) out.push(key)
      }
    }
  }
}
