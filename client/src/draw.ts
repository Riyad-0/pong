import { screenHeight, screenWidth } from "./screen";
import type { State } from "./state";

interface DrawState {
  drawAlreadyRequested: boolean
}
export type { DrawState };

export const initialDrawState = {
  drawAlreadyRequested: false
};

export function requestDraw(
  state: State,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  if (state.drawState.drawAlreadyRequested) return;
  state.drawState.drawAlreadyRequested = true;
  requestAnimationFrame(() => {
    draw(state, canvas, ctx);
    state.drawState.drawAlreadyRequested = false;
  });
}

// console.time();
function draw(
  state: State,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  // console.timeLog();
  // console.timeEnd();
  // console.time();
  ctx.clearRect(0, 0, screenWidth(canvas), screenHeight(canvas));
  ctx.fillStyle = "white";
  ctx.fillRect(10, 20, 10, 20);
}
