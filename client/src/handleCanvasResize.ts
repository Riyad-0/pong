import { dpr } from "./consts";
import { requestDraw } from "./draw";
import resizeCanvas from "./resizeCanvas";
import type { State } from "./state";

function handleWindowResize(
  state: State,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  if (resizeCanvas(canvas)) {
    ctx.scale(dpr, dpr);

    requestDraw(state, canvas, ctx);
  }
}

export default handleWindowResize;