export interface MaatCard {
  id: string
  label: string
  icon: string
  weight: number
  type: 'virtud' | 'pecado'
  hint: string
}

export const MAAT_CARD_POOL: MaatCard[] = [
  // Virtudes — peso negativo (alivian el corazón)
  { id: 'verdad',       label: 'Verdad',       icon: '𓏤', weight: -8, type: 'virtud', hint: 'La primera virtud de Maat. Hablar con verdad ante los dioses era el acto más puro.' },
  { id: 'justicia',     label: 'Justicia',      icon: '𓌀', weight: -7, type: 'virtud', hint: 'Maat personificaba la justicia cósmica. El faraón justo era amado por los dioses.' },
  { id: 'compasion',    label: 'Compasión',     icon: '𓇋', weight: -6, type: 'virtud', hint: 'Dar alimento al hambriento y agua al sediento: virtudes del corazón ligero.' },
  { id: 'generosidad',  label: 'Generosidad',   icon: '𓌺', weight: -5, type: 'virtud', hint: 'Compartir los frutos del Nilo era obligación sagrada de todo egipcio.' },
  { id: 'sabiduria',    label: 'Sabiduría',     icon: '𓏌', weight: -6, type: 'virtud', hint: 'Thot, dios del conocimiento, pesaba el corazón del sabio con benevolencia.' },
  { id: 'equilibrio',   label: 'Equilibrio',    icon: '𓋹', weight: -5, type: 'virtud', hint: 'Vivir en armonía con Maat era el ideal supremo del Egipto antiguo.' },
  { id: 'lealtad',      label: 'Lealtad',       icon: '𓅃', weight: -4, type: 'virtud', hint: 'La lealtad al faraón y a los dioses protegía el orden sagrado del Imperio.' },
  { id: 'piedad',       label: 'Piedad',        icon: '𓂀', weight: -7, type: 'virtud', hint: 'Honrar a los dioses con ofrendas y rituales era deber ineludible.' },
  { id: 'paciencia',    label: 'Paciencia',     icon: '𓆣', weight: -4, type: 'virtud', hint: 'Como el Nilo que espera su crecida, el paciente recibe la bendición de Ra.' },
  { id: 'obediencia',   label: 'Obediencia',    icon: '𓇳', weight: -5, type: 'virtud', hint: 'Obedecer las leyes sagradas del faraón era mantener el orden del cosmos.' },
  { id: 'pureza',       label: 'Pureza',        icon: '𓈖', weight: -6, type: 'virtud', hint: 'Los rituales de purificación preparaban el alma para su viaje al Duat.' },
  { id: 'gratitud',     label: 'Gratitud',      icon: '𓆑', weight: -4, type: 'virtud', hint: 'Agradecer los dones del Nilo y los dioses mantenía el ciclo sagrado de vida.' },
  // Pecados — peso positivo (cargan el corazón)
  { id: 'mentira',      label: 'Mentira',       icon: '𓂧', weight: +8, type: 'pecado', hint: 'Mentir ante los dioses era el peor de los crímenes. Ammit devoraba el corazón del mentiroso.' },
  { id: 'codicia',      label: 'Codicia',       icon: '𓌻', weight: +7, type: 'pecado', hint: 'Robar las ofrendas del templo o los bienes del vecino pesaba sobre el alma.' },
  { id: 'crueldad',     label: 'Crueldad',      icon: '𓂝', weight: +9, type: 'pecado', hint: 'Hacer sufrir al inocente manchaba el corazón con una mancha que Maat no perdonaba.' },
  { id: 'soberbia',     label: 'Soberbia',      icon: '𓀀', weight: +6, type: 'pecado', hint: 'Creerse superior a los dioses era una locura que llevaba al corazón a su condena.' },
  { id: 'traicion',     label: 'Traición',      icon: '𓃀', weight: +8, type: 'pecado', hint: 'Traicionar al faraón o a los dioses era considerado el crimen de la más baja condición.' },
  { id: 'envidia',      label: 'Envidia',       icon: '𓁹', weight: +5, type: 'pecado', hint: 'Desear el bien ajeno corrompía el espíritu y lo alejaba de la gracia de Osiris.' },
  { id: 'ira',          label: 'Ira',           icon: '𓆙', weight: +7, type: 'pecado', hint: 'La ira sin control era signo de un alma desequilibrada, contraria a Maat.' },
  { id: 'avaricia',     label: 'Avaricia',      icon: '𓏾', weight: +6, type: 'pecado', hint: 'Acumular sin compartir rompía el ciclo sagrado de abundancia del Nilo.' },
  { id: 'blasfemia',    label: 'Blasfemia',     icon: '𓃭', weight: +7, type: 'pecado', hint: 'Hablar mal de los dioses llenaba el corazón de plomo ante la balanza de Anubis.' },
  { id: 'violencia',    label: 'Violencia',     icon: '𓌀', weight: +9, type: 'pecado', hint: 'Derramar sangre inocente era una de las 42 confesiones negativas del Libro de los Muertos.' },
  { id: 'pereza',       label: 'Pereza',        icon: '𓇾', weight: +4, type: 'pecado', hint: 'No trabajar la tierra sagrada del Nilo era un desprecio al don de los dioses.' },
  { id: 'engano',       label: 'Engaño',        icon: '𓈗', weight: +6, type: 'pecado', hint: 'Engañar al prójimo era actuar contra la Maat, el orden que sostenía el universo.' },
]

export function dealMaatCards(count = 8): MaatCard[] {
  const shuffled = [...MAAT_CARD_POOL].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
