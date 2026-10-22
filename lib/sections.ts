export const sections = ['works', 'journal', 'shop', 'studio'] as const
export type Section = typeof sections[number]

export function isSection(value: string): value is Section {
  return sections.some(section => section === value)
}
