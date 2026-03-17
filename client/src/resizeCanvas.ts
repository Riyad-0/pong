import { dpr } from "./consts";

// Returns whether the canvas's width and height were actually set. This is
// important to react to because setting the canvas's width or height clears
// the canvas and resets some of its properties like the context's scale.
function resizeCanvas(
  canvas: HTMLCanvasElement
): boolean {
  const { width: pxWidth, height: pxHeight } = canvas.getBoundingClientRect();

  const scaledWidth = pxWidth * dpr;
  const scaledHeight = pxHeight * dpr;
  if (canvas.width !== scaledWidth || canvas.height !== scaledHeight) {
    canvas.width = scaledWidth;
    canvas.height = scaledHeight;
    return true;
  }
  return false;
}

export default resizeCanvas;
