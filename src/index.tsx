import { Component, useCallback, useEffect, useMemo, useRef, useState } from "react";

type TFrameOptions = {
  component: Component | null,
  time?: number
}

type TUsePresentation = {
  framesOptions: Array<TFrameOptions>,
  startDelay?: number,
  isLoop?: boolean
} 

function usePresentation({ framesOptions, startDelay = undefined, isLoop = false }: TUsePresentation) {
  const [CurrentFrame, setCurrentFrame] = useState<Component | null>(null);
  const [loop, setLoop] = useState({});
  const framesRef = useRef(framesOptions);

  const setMotion = useCallback(async () => {
    if (startDelay) {
      await new Promise((resolve) => setTimeout(resolve, startDelay));
    }

    for await (let frame of framesRef.current) {
      const { component: Component, time = 1 } = frame;

      setCurrentFrame(Component);

      await new Promise((resolve) => setTimeout(resolve, time));
    }

    if (isLoop) {
      setLoop({});
    }
  }, [startDelay, isLoop]);

  useEffect(() => {
    setMotion();
  }, [setMotion, loop]);

  const Animation = useCallback(() => {
    return CurrentFrame;
  }, [CurrentFrame]);

  return useMemo(() => Animation, [Animation]);
}

export default usePresentation;
