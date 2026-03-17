import { dpr } from "./consts";
import resizeCanvas from "./resizeCanvas";

function initCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  resizeCanvas(canvas);
  ctx.scale(dpr, dpr);
}

export default initCanvas;