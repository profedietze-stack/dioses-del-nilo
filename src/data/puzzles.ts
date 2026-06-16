import type { Glyph, PuzzleDef } from '../types'

const GLYPH_SET_1: Glyph[] = [
  { s: '𓂀', c: true, lbl: 'Ojo de Horus (Udjat)', desc: 'Amuleto de protección. Uno de los símbolos más usados del Egipto antiguo.' },
  { s: '𓇳', c: true, lbl: 'Disco solar de Ra', desc: 'El sol encarnado. Ra viajaba el cielo en su barca solar combatiendo a Apofis.' },
  { s: '𓆣', c: true, lbl: 'Escarabajo Khepri', desc: 'Símbolo del renacimiento y el sol del amanecer. Khepri empujaba el sol como el escarabajo su bola.' },
  { s: '𓈖', c: true, lbl: 'Agua ondulada (Nilo)', desc: 'Representa el agua y el sagrado Nilo, fuente de toda vida en Egipto.' },
  { s: '𓋹', c: true, lbl: 'Ankh - Cruz de la vida', desc: 'El símbolo de la vida eterna. Solo dioses y faraones podían sostenerlo.' },
  { s: '𓅃', c: true, lbl: 'Halcón de Horus', desc: 'El halcón era la forma del dios Horus, protector del faraón y del cielo.' },
  { s: '☯', c: false, lbl: 'Yin-Yang (China)', desc: 'Símbolo de equilibrio del taoísmo chino. Sin relación con Egipto.' },
  { s: 'ᚱ', c: false, lbl: 'Runa vikinga', desc: 'Alfabeto rúnico usado por pueblos germánicos del norte de Europa.' },
  { s: 'ॐ', c: false, lbl: 'Om (hinduismo)', desc: 'Sílaba sagrada del hinduismo y budismo. Originaria del subcontinente indio.' },
  { s: '⚜', c: false, lbl: 'Fleur-de-lis (Francia)', desc: 'Símbolo heráldico medieval de la monarquía francesa.' },
  { s: '☪', c: false, lbl: 'Media luna islámica', desc: 'Símbolo del Islam, surgido en Arabia siglos después del Egipto faraónico.' },
  { s: '✡', c: false, lbl: 'Estrella de David', desc: 'Símbolo del judaísmo. No es de origen egipcio antiguo.' },
]

const GLYPH_SET_2: Glyph[] = [
  { s: '𓁹', c: true, lbl: 'Ojo de Wadjet', desc: 'El ojo de la cobra Wadjet, protectora del Bajo Egipto y del faraón.' },
  { s: '𓂧', c: true, lbl: 'Mano (jeroglífico D)', desc: 'Signo fonético para el sonido "d". Clave en la escritura jeroglífica egipcia.' },
  { s: '𓆑', c: true, lbl: 'Cobra uraeus', desc: 'La cobra real en posición de ataque: símbolo de poder en la corona del faraón.' },
  { s: '𓂋', c: true, lbl: 'Boca (jeroglífico R)', desc: 'Representa la boca. Usado para el sonido "r" en escritura egipcia.' },
  { s: '𓏌', c: true, lbl: 'Papiro enrollado', desc: 'Símbolo de escritura y conocimiento. Los escribas usaban papiro para sus textos.' },
  { s: '𓇋', c: true, lbl: 'Caña (jeroglífico I)', desc: 'Jeroglífico fonético para el sonido "i". Frecuente en nombres de faraones.' },
  { s: '卐', c: false, lbl: 'Svástika (sánscrito)', desc: 'Símbolo de buena suerte en culturas indoeuropeas y asiáticas. No es egipcio.' },
  { s: '⛤', c: false, lbl: 'Pentagrama', desc: 'Símbolo de la tradición esotérica occidental medieval. Ajeno al mundo egipcio.' },
  { s: '𐊠', c: false, lbl: 'Escritura caria', desc: 'Alfabeto de la antigua Caria (Turquía). No es escritura egipcia.' },
  { s: '☽', c: false, lbl: 'Luna creciente', desc: 'Símbolo lunar de diversas culturas. No tiene significado jeroglífico egipcio.' },
  { s: '⚡', c: false, lbl: 'Rayo (Zeus/Júpiter)', desc: 'Símbolo de dioses del trueno en las culturas griega y romana, no egipcias.' },
  { s: '᚛', c: false, lbl: 'Ogham celta', desc: 'Sistema de escritura de los celtas de Irlanda. Completamente ajeno a Egipto.' },
]

export const PUZZLES_DEF: PuzzleDef[] = [
  { id: 1, type: 'ordenar', afterEvent: 3, tpl: 'El [NILO] inundaba los campos cada año depositando [LIMO] negro y fértil. Este proceso se llamaba [AKHET] y era la base de la [AGRICULTURA] egipcia.', words: ['NILO', 'LIMO', 'AKHET', 'AGRICULTURA'], penalty: 3 },
  { id: 2, type: 'glifos', afterEvent: 6, cat: 'Jeroglíficos del Antiguo Imperio', timeLimit: 40, target: 60, glyphs: GLYPH_SET_1, penalty: 3 },
  { id: 3, type: 'ordenar', afterEvent: 9, tpl: 'El [FARAON] era considerado un dios viviente. Su deber era mantener el orden cósmico llamado [MAAT]. Gobernaba con ayuda del [VISIR], el funcionario más importante del [ESTADO].', words: ['FARAON', 'MAAT', 'VISIR', 'ESTADO'], penalty: 3 },
  { id: 4, type: 'ordenar', afterEvent: 12, tpl: 'El arquitecto [IMHOTEP] diseñó la primera pirámide escalonada para el faraón [DJOSER] en [SAQQARA]. Esta innovación marcó el inicio de la era de las grandes construcciones del [ANTIGUO] Imperio.', words: ['IMHOTEP', 'DJOSER', 'SAQQARA', 'ANTIGUO'], penalty: 3 },
  { id: 5, type: 'ordenar', afterEvent: 15, tpl: 'Los [HICSOS] introdujeron el [CARRO] de guerra en Egipto. Aunque considerados invasores, modernizaron la tecnología [MILITAR] que los egipcios usarían luego para [EXPULSARLOS].', words: ['HICSOS', 'CARRO', 'MILITAR', 'EXPULSARLOS'], penalty: 3 },
  { id: 6, type: 'ordenar', afterEvent: 18, tpl: 'Hatshepsut gobernó como [FARAONA] durante 20 años. Organizó expediciones a [PUNT] y construyó el templo de [DEIR]. Su [MEMORIA] fue borrada por sus sucesores pero rescatada por la arqueología.', words: ['FARAONA', 'PUNT', 'DEIR', 'MEMORIA'], penalty: 3 },
  { id: 7, type: 'glifos', afterEvent: 21, cat: 'Jeroglíficos del Imperio Nuevo y Período Tardío', timeLimit: 45, target: 65, glyphs: GLYPH_SET_2, penalty: 3 },
  { id: 8, type: 'ordenar', afterEvent: 24, tpl: 'Akenatón impuso el culto al dios [ATON], prohibiendo a los demás. Su capital fue [AMARNA]. Fue la primera forma de [MONOTEISMO] documentada en la historia. Su sucesor [TUTANKAMON] restauró el culto tradicional.', words: ['ATON', 'AMARNA', 'MONOTEISMO', 'TUTANKAMON'], penalty: 3 },
  { id: 9, type: 'ordenar', afterEvent: 27, tpl: 'El [LIBRO] de los Muertos guiaba al alma a través del [DUAT]. El corazón del difunto era pesado en la balanza de [MAAT] frente al dios [ANUBIS], juez de los muertos.', words: ['LIBRO', 'DUAT', 'MAAT', 'ANUBIS'], penalty: 3 },
  { id: 10, type: 'balanza', afterEvent: 16, timeLimit: 60, cardCount: 8, statKeys: ['fe', 'cultura', 'estabilidad'], penalty: 3 },
  { id: 11, type: 'balanza', afterEvent: 25, timeLimit: 50, cardCount: 8, statKeys: ['fe', 'cultura', 'estabilidad'], penalty: 3 },
]
