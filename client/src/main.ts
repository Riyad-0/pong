import './style.css';
import { initialDrawState, requestDraw } from './draw';
import initCanvas from './initCanvas';
import handleWindowResize from './handleCanvasResize';
import type { State } from './state';
import { screenHeight, screenWidth } from './screen';
import { dt } from './consts';
import { handleTouchCancel, handleTouchEnd, handleTouchMove, handleTouchStart, initialTouchState, updateTouchState } from './touchEvent';

function init() {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
  const ctx = canvas.getContext('2d')!;

  initCanvas(canvas, ctx);

  let state: State = {
    drawState: initialDrawState,
    touchState: initialTouchState
  };

  function onWindowResize() {
    handleWindowResize(state, canvas, ctx);
  }

  function onTouchStart(e: TouchEvent) {
    handleTouchStart(state.touchState.touchEvents, e);
  }

  function onTouchMove(e: TouchEvent) {
    handleTouchMove(state.touchState.touchEvents, e);
  }

  function onTouchEnd(e: TouchEvent) {
    handleTouchEnd(state.touchState.touchEvents, e);
  }

  function onTouchCancel(e: TouchEvent) {
    handleTouchCancel(state.touchState.touchEvents, e);
  }

  window.addEventListener("resize", onWindowResize);

  // Need passive: false for some Chrome-specific thing?
  // https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
  window.addEventListener('touchstart', onTouchStart, {passive: false})
  window.addEventListener('touchmove', onTouchMove, {passive: false})
  window.addEventListener('touchend', onTouchEnd, {passive: false})
  window.addEventListener('touchcancel', onTouchCancel, {passive: false})

  // console.time();
  function tick() {
    // console.timeLog();
    // console.timeEnd();
    // console.time();
    console.log(state.touchState.touchEvents);

    updateTouchState(state.touchState);

    requestDraw(state, canvas, ctx);
  }
  setInterval(tick, dt);

  requestDraw(state, canvas, ctx);
}

window.addEventListener("load", init);
