import type { DrawState } from "./draw";
import type { TouchState } from "./touchEvent";

interface State {
  drawState: DrawState,
  touchState: TouchState
}

export type { State };
