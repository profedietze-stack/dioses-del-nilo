import { describe, it, expect } from 'vitest'
import { readdirSync, statSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const IMAGES = join(process.cwd(), 'public', 'images')

/* El service worker precachea todo lo de public/: el que abre el juego por
   primera vez en el wifi de la escuela baja todo eso antes de poder jugar sin
   internet. Eran 4,85 MB, 4 de ellos fotos de 400-540 kB cada una. */
describe('peso del precache', () => {
  const files = readdirSync(IMAGES).filter(f => f.endsWith('.jpg'))

  it('ninguna imagen pasa los 360 kB', () => {
    const grandes = files.filter(f => statSync(join(IMAGES, f)).size > 360 * 1024)
    expect(grandes).toEqual([])
  })

  it('las imágenes juntas no pasan de 2,4 MB', () => {
    const total = files.reduce((a, f) => a + statSync(join(IMAGES, f)).size, 0)
    expect(total).toBeLessThan(2.4 * 1024 * 1024)
  })

  it('no hay reglas de caché para fuentes de terceros', () => {
    const cfg = readFileSync(join(process.cwd(), 'vite.config.ts'), 'utf8')
    expect(cfg).not.toMatch(/fonts\.(googleapis|gstatic)\.com/)
  })
})
