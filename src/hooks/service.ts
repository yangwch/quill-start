export interface Bounce {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const calcBubblePosition = (
  editorBounce: Bounce,
  selectionBounce: Bounce,
  bubbleSize: { width: number; height: number },
) => {
  const { width: wrapperWidth, height: wrapperHeight } = editorBounce;
  const { left, top, width, height } = selectionBounce;
  const { width: bubbleWidth, height: bubbleHeight } = bubbleSize;
  let bubbleLeft = Math.max(0, left + width / 2 - bubbleWidth / 2);
  let bubbleTop = top + height + 10;
  if (left + bubbleWidth > wrapperWidth) {
    bubbleLeft = wrapperWidth - bubbleWidth;
  }

  if (selectionBounce.width > bubbleWidth) {
  }

  return {
    left: bubbleLeft,
    top: bubbleTop,
  };
};
