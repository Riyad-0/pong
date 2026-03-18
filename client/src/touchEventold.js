
function init() {
  // Need passive: false for some Chrome-specific thing?
  // https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
  window.addEventListener('touchstart', onTouchStart, {passive: false})
  window.addEventListener('touchmove', onTouchMove, {passive: false})
  window.addEventListener('touchend', onTouchEnd, {passive: false})
  window.addEventListener('touchcancel', onTouchEnd, {passive: false})
}

const ongoingTouches = [];

function onTouchStart(event) {
  event.preventDefault();
  const touches = event.changedTouches
  for (let i = 0; i < touches.length; i++) {
    ongoingTouches.push(copyTouch(touches[i]))
  }
}

function onTouchMove(event) {
  event.preventDefault();
  const touches = event.changedTouches
  for (let i = 0; i < touches.length; i++) {
    let touch = touches[i]
    const ongoingTouchIndex = ongoingTouches.findIndex(ongoingTouch => ongoingTouch.identifier === touch.identifier)
    if (ongoingTouchIndex !== -1) {
      const ongoingTouch = ongoingTouches[ongoingTouchIndex]
      x += worldUnits(touch.clientX - ongoingTouch.clientX)
      y += worldUnits(touch.clientY - ongoingTouch.clientY)
      ongoingTouches.splice(ongoingTouchIndex, 1, copyTouch(touch))
    }
  }
}

function onTouchEnd(event) {
  event.preventDefault()
  const touches = event.changedTouches
  for (let i = 0; i < touches.length; i++) {
    const touch = touches[i]
    const ongoingTouchResult = findOngoingTouch(touch.identifier)
    if (ongoingTouchResult == null) {
      continue;
    }
    const [ongoingTouchIndex, ongoingTouch] = ongoingTouchResult
    ongoingTouches.splice(ongoingTouchIndex, 1)
  }
}

function findOngoingTouch(identifier) {
  for (let [i, touch] of ongoingTouches.entries()) {
    if (touch.identifier === identifier) {
      return [i, touch]
    }
  }
  return null
}

function copyTouch({ identifier, clientX, clientY }) {
  return { identifier, clientX, clientY };
}
