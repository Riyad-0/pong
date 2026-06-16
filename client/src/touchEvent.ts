
export interface TouchState {
  touchEvents: MyTouchEvent[],
  stillDown: Map<Identifier, Position>
}

export const initialTouchState: TouchState = {
  touchEvents: [],
  stillDown: new Map()
};

type MyTouchEvent = TouchDownEvent | TouchUpEvent;

interface TouchDownEvent {
  kind: "down",
  identifier: Identifier,
  x: number,
  y: number,
}

interface TouchUpEvent {
  kind: "up",
  identifier: Identifier,
}

interface TouchDown {
  identifier: Identifier,
  x: number,
  y: number,
}

type Identifier = number;

interface Position {
  x: number,
  y: number
};

// function updateTouchState(touchState: TouchState) {
//   const down = [];
//   for (const e of touchEvents) {
//     switch (e.kind) {
//       case "down": {
//         down.push({
//           identifier: e.identifier,
//           x: e.x,
//           y: e.y
//         });
//       }
//       case "up": {

//       }
//     }
//   }
//   for (const [identifier, position] of stillDown) {
    
//   }
// }

export function updateTouchState(touchState: TouchState) {
  const { stillDown: down, touchEvents } = touchState;
  for (const e of touchEvents) {
    switch (e.kind) {
      case "down": {
        down.set(e.identifier, {
          x: e.x,
          y: e.y
        });
        break;
      }
      case "up": {
        down.delete(e.identifier);
        break;
      }
    }
  }
  touchState.touchEvents = [];
}

function handleTouchDown(touchEvents: MyTouchEvent[], e: TouchEvent) {
  for (const touch of e.changedTouches) {
    touchEvents.push({
      kind: "down",
      identifier: touch.identifier,
      x: touch.clientX,
      y: touch.clientY
    });
  }
}

function handleTouchUp(touchEvents: MyTouchEvent[], e: TouchEvent) {
  for (const touch of e.changedTouches) {
    touchEvents.push({
      kind: "up",
      identifier: touch.identifier
    });
  }
}


export const handleTouchStart = handleTouchDown;
export const handleTouchMove = handleTouchDown;
export const handleTouchEnd = handleTouchUp;
export const handleTouchCancel = handleTouchUp;

// const ongoingTouches = [];

// function onTouchStart(event) {
//   event.preventDefault();
//   const touches = event.changedTouches
//   for (let i = 0; i < touches.length; i++) {
//     ongoingTouches.push(copyTouch(touches[i]))
//   }
// }

// function onTouchMove(event) {
//   event.preventDefault();
//   const touches = event.changedTouches
//   for (let i = 0; i < touches.length; i++) {
//     let touch = touches[i]
//     const ongoingTouchIndex = ongoingTouches.findIndex(ongoingTouch => ongoingTouch.identifier === touch.identifier)
//     if (ongoingTouchIndex !== -1) {
//       const ongoingTouch = ongoingTouches[ongoingTouchIndex]
//       x += worldUnits(touch.clientX - ongoingTouch.clientX)
//       y += worldUnits(touch.clientY - ongoingTouch.clientY)
//       ongoingTouches.splice(ongoingTouchIndex, 1, copyTouch(touch))
//     }
//   }
// }

// function onTouchEnd(event) {
//   event.preventDefault()
//   const touches = event.changedTouches
//   for (let i = 0; i < touches.length; i++) {
//     const touch = touches[i]
//     const ongoingTouchResult = findOngoingTouch(touch.identifier)
//     if (ongoingTouchResult == null) {
//       continue;
//     }
//     const [ongoingTouchIndex, ongoingTouch] = ongoingTouchResult
//     ongoingTouches.splice(ongoingTouchIndex, 1)
//   }
// }

// function findOngoingTouch(identifier) {
//   for (let [i, touch] of ongoingTouches.entries()) {
//     if (touch.identifier === identifier) {
//       return [i, touch]
//     }
//   }
//   return null
// }

// function copyTouch({ identifier, clientX, clientY }) {
//   return { identifier, clientX, clientY };
// }
