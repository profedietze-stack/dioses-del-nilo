import React from 'react'
import { GLOSSARY_MAP } from '../data/glossary'

export function processGlossary(
  text: string,
  onWord: (word: string) => void,
): React.ReactNode {
  if (!text) return text

  const words = Object.keys(GLOSSARY_MAP)
  if (words.length === 0) return text

  // Build regex that matches any glossary word (longest first to avoid partial matches)
  const sorted = words.slice().sort((a, b) => b.length - a.length)
  const pattern = sorted.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const re = new RegExp(`(${pattern})`, 'gi')

  const parts = text.split(re)
  if (parts.length === 1) return text

  return (
    <>
      {parts.map((part, i) => {
        const entry = GLOSSARY_MAP[part.toLowerCase()]
        if (entry) {
          return (
            <span
              key={i}
              className="gloss-word"
              onClick={() => onWord(part)}
              title="Click para ver definición"
            >
              {part}
            </span>
          )
        }
        return part
      })}
    </>
  )
}
