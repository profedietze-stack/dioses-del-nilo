export interface PharaohCard {
  id: string
  name: string
  yearBC: number
  icon: string
  fact: string
}

export const PHARAOHS_BY_PERIOD: Record<string, PharaohCard[]> = {
  antiguo: [
    { id: 'narmer',  name: 'Narmer',    yearBC: 3100, icon: '𓇳', fact: 'Unificó el Alto y el Bajo Egipto, fundando el primer Estado faraónico de la historia.' },
    { id: 'djoser',  name: 'Djoser',    yearBC: 2667, icon: '𓆣', fact: 'Encargó a Imhotep la primera pirámide escalonada de la historia, en Saqqara.' },
    { id: 'sneferu', name: 'Sneferu',   yearBC: 2613, icon: '𓅃', fact: 'Construyó tres pirámides, incluida la primera de lados lisos. Padre de Keops.' },
    { id: 'keops',   name: 'Keops',     yearBC: 2589, icon: '𓋹', fact: 'Ordenó construir la Gran Pirámide de Guiza, una de las Siete Maravillas del Mundo Antiguo.' },
    { id: 'kefren',  name: 'Kefrén',    yearBC: 2558, icon: '𓂀', fact: 'Construyó la segunda pirámide de Guiza y se cree que ordenó tallar la Gran Esfinge.' },
    { id: 'pepi2',   name: 'Pepi II',   yearBC: 2278, icon: '𓏌', fact: 'Gobernó durante unos 90 años, el reinado más largo conocido de la historia.' },
  ],
  medio: [
    { id: 'mentu2',  name: 'Mentuhotep II',  yearBC: 2055, icon: '𓇳', fact: 'Reunificó Egipto tras el Primer Período Intermedio, fundando el Imperio Medio.' },
    { id: 'amenem1', name: 'Amenemhat I',    yearBC: 1985, icon: '𓆣', fact: 'Fundó la Dinastía XII y trasladó la capital a Ichtauy, cerca de Menfis.' },
    { id: 'senus1',  name: 'Senusret I',     yearBC: 1956, icon: '𓅃', fact: 'Gran constructor: levantó el Templo Blanco en Karnak y expandió el comercio con Nubia.' },
    { id: 'senus3',  name: 'Senusret III',   yearBC: 1878, icon: '𓋹', fact: 'Conquistó Nubia hasta la Tercera Catarata y reformó la administración del Imperio.' },
    { id: 'amenem3', name: 'Amenemhat III',  yearBC: 1860, icon: '𓂀', fact: 'Alcanzó el apogeo económico del Imperio Medio. Su reinado fue de gran prosperidad.' },
    { id: 'sobek',   name: 'Sobekneferu',    yearBC: 1806, icon: '𓏌', fact: 'Primera faraona confirmada de la historia. Gobernó Egipto con plena autoridad real.' },
  ],
  nuevo: [
    { id: 'ahmose',  name: 'Ahmose I',      yearBC: 1550, icon: '𓇳', fact: 'Expulsó a los Hicsos y fundó el Imperio Nuevo, el período más glorioso de Egipto.' },
    { id: 'hatshep', name: 'Hatshepsut',    yearBC: 1473, icon: '𓆣', fact: 'Gobernó como faraona durante 20 años. Organizó expediciones comerciales a la tierra de Punt.' },
    { id: 'tutm3',   name: 'Tutmosis III',  yearBC: 1458, icon: '𓅃', fact: 'El gran conquistador: extendió el Imperio hasta el Éufrates. Su ejército ganó 17 campañas.' },
    { id: 'akhenat', name: 'Akenatón',      yearBC: 1353, icon: '𓋹', fact: 'Impuso el culto al disco solar Atón, la primera revolución religiosa monoteísta de la historia.' },
    { id: 'tutank',  name: 'Tutankamón',    yearBC: 1332, icon: '𓂀', fact: 'Restauró los antiguos dioses tras Akenatón. Su tumba intacta fue descubierta en 1922.' },
    { id: 'ramses2', name: 'Ramsés II',     yearBC: 1279, icon: '𓏌', fact: 'El Grande: gobernó 67 años, firmó el primer tratado de paz conocido y construyó Abu Simbel.' },
  ],
  tardio: [
    { id: 'sheshonq', name: 'Sheshonq I',   yearBC: 945, icon: '𓇳', fact: 'Fundó la Dinastía XXII de origen libio e invadió el reino de Israel y Judá.' },
    { id: 'psam1',    name: 'Psamético I',  yearBC: 664, icon: '𓆣', fact: 'Reunificó Egipto con ayuda griega y fundó el próspero período Saíta con capital en Sais.' },
    { id: 'necao2',   name: 'Necao II',     yearBC: 610, icon: '𓅃', fact: 'Ordenó excavar el primer canal entre el Nilo y el Mar Rojo y derrotó al rey Josías de Judá.' },
    { id: 'amasis2',  name: 'Amasis II',    yearBC: 570, icon: '𓋹', fact: 'Uno de los últimos grandes faraones nativos: fomentó el comercio con Grecia y la prosperidad.' },
    { id: 'nect1',    name: 'Nectanebo I',  yearBC: 380, icon: '𓂀', fact: 'Fundó la última dinastía nativa de Egipto y resistió con éxito la invasión persa.' },
    { id: 'cleop7',   name: 'Cleopatra VII', yearBC: 51, icon: '𓏌', fact: 'Última faraona de la dinastía ptolemaica. Dominaba 9 idiomas y fue aliada de César y Marco Antonio.' },
  ],
}
