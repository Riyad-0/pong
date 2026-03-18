import { buttonsBottomMargin, buttonsRightMargin, buttonsGap, buttonSize } from "./consts";

export function buttonsX(screenWidth: number) {
  return screenWidth - buttonsRightMargin - buttonSize;
}

export function upButtonY(screenHeight: number) {
  return screenHeight - buttonsBottomMargin - buttonSize - buttonsGap - buttonSize;
}

export function downButtonY(screenHeight: number) {
  return screenHeight - buttonsBottomMargin - buttonSize;
}
