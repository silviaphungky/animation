export enum Abbv {
  NAME = 'nm',
  TYPE = 'ty',
  HIDDEN = 'hd',
  ID = 'ln',
  INDEX = 'ind',
  PRECOMP_ID = 'refId',
  WIDTH = 'w',
  HEIGHT = 'h',
  OPACITY = 'o',
  COLOR = 'c',
  KEYFRAMES = 'k',
  RECTANGLE = 'rc',
  ELLIPSE = 'el',
  STROKE = 'st',
  FILL = 'fl',
  GRADIENT_FILL = 'gf',
  GRADIENT_STROKE = 'gs',
  GROUP = 'gr',
  GROUP_SHAPES = 'it',
  GRADIENT_COLORS = 'g',
  FRAME_RATE = 'fr',
  ANIMATED = 'a',
}

export interface LottieJSON {
  v: string
  op: number
  ip: number
  [Abbv.NAME]: string
  [Abbv.FRAME_RATE]: number
  [Abbv.WIDTH]: number
  [Abbv.HEIGHT]: number
  layers: Array<LottieLayer>
  assets?: Array<LottieAssets>
}

export interface LottieShape {
  [Abbv.TYPE]:
    | Abbv.STROKE
    | Abbv.FILL
    | Abbv.GRADIENT_STROKE
    | Abbv.GRADIENT_FILL
    | Abbv.GROUP
  [Abbv.COLOR]: {
    [Abbv.ANIMATED]: 0 | 1
    [Abbv.KEYFRAMES]:
      | Array<number>
      | Array<{
          s: Array<number>
        }>
  }
  [Abbv.GROUP_SHAPES]: Array<LottieShape>
  [Abbv.GRADIENT_COLORS]: {
    [Abbv.KEYFRAMES]: {
      [Abbv.KEYFRAMES]: Array<
        | {
            s: Array<number>
          }
        | number
      >
    }
  }
}

export interface LottieLayer {
  ind: number
  [Abbv.NAME]: string
  [Abbv.PRECOMP_ID]?: string
  [Abbv.HIDDEN]: boolean
  sc?: string
  ks: {
    o: {
      a: number
      k: number
    }
  }
  shapes?: Array<LottieShape>
}

export interface LottieAssets {
  [Abbv.NAME]: string
  id: string
  fr: number
  layers: Array<LottieLayer>
}
