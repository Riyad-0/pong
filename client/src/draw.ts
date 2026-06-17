import { screenHeight, screenWidth } from "./screen";
import { buttonSize } from "./consts";
import { buttonsX, upButtonY, downButtonY } from "./buttonPosition.ts";
import type { State } from "./state";
import { touchPosition } from "./touchEvent.ts";

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
  const sw = screenWidth(canvas);
  const sh = screenHeight(canvas);
  ctx.clearRect(0, 0, sw, sh);
  ctx.fillStyle = "white";
  ctx.fillRect(buttonsX(sw), upButtonY(sh), buttonSize, buttonSize);
  ctx.fillRect(buttonsX(sw), downButtonY(sh), buttonSize, buttonSize);
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(0, sw);
  ctx.lineTo(sw, sw);
  ctx.stroke();

  const touch = touchPosition(state.touchState.stillDown);
  if (touch) {
    ctx.fillStyle = "blue";
    ctx.fillRect(touch.x, touch.y, 20, 20);
  }
}
