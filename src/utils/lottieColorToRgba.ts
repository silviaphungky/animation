export const lottieColorToRgba = (color: number, isAlpha?: boolean) => {
  return isAlpha ? color / 100 : color * 255
}
