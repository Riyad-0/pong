import './style.css'
import { initialDrawState, requestDraw } from './draw';
import initCanvas from './initCanvas';
import handleWindowResize from './handleCanvasResize';
import type { State } from './state';
import { screenHeight, screenWidth } from './screen';
import { dt } from './consts';

function init() {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
  const ctx = canvas.getContext('2d')!;

  initCanvas(canvas, ctx);

  let state: State = {
    drawState: initialDrawState,
  };

  function onWindowResize() {
    handleWindowResize(state, canvas, ctx);
  }

  window.addEventListener("resize", onWindowResize);

  // console.time();
  function tick() {
    // console.timeLog();
    // console.timeEnd();
    // console.time();

    requestDraw(state, canvas, ctx);
  }
  setInterval(tick, dt);

  requestDraw(state, canvas, ctx);
}

window.addEventListener("load", init);
