import { dpr } from "./consts";

export function screenWidth(canvas: HTMLCanvasElement) {
 return canvas.width / dpr;
}

export function screenHeight(canvas: HTMLCanvasElement) {
  return canvas.height / dpr;
}