import {
  cloneElement,
  Component,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type TFrameOptions = {
  component: ReactElement | null;
  time?: number;
};

type TFrameOptionsWithPosition = {
  component: ReactElement | null;
  time?: number;
  currentFrame: number;
};

type TUsePresentation = {
  framesOptions: TFrameOptions[];
  startDelay?: number;
  isLoop?: boolean;
};

function usePresentation({
  framesOptions,
  startDelay = undefined,
  isLoop = false,
}: TUsePresentation): (number | Component)[] {
  const [
    CurrentFrameOptions,
    setCurrentFrameOptions,
  ] = useState<TFrameOptionsWithPosition | null>(null);
  const framesQuantity = framesOptions.length || 0;
  const framesRef = useRef(framesOptions);

  const setFrameWithAwait = useCallback(
    async (framesArray: Array<TFrameOptions>) => {
      const [firstFrame, ...otherFrames] = framesArray;
      const currentFrame = framesRef.current.indexOf(firstFrame) + 1;

      setCurrentFrameOptions({ ...firstFrame, currentFrame });

      await new Promise((resolve) => setTimeout(resolve, firstFrame.time));

      if (otherFrames.length) {
        await setFrameWithAwait(otherFrames);
      }
    },
    []
  );

  const setMotion = useCallback(async () => {
    const framesArray = framesRef.current;

    if (startDelay) {
      await new Promise((resolve) => setTimeout(resolve, startDelay));
    }

    await setFrameWithAwait(framesArray);

    if (isLoop) {
      setMotion();
    }
  }, [startDelay, isLoop, setFrameWithAwait]);

  useEffect(() => {
    setMotion();
  }, [setMotion]);

  const Animation = useCallback(
    ({ children }) => {
      const currentComponent = CurrentFrameOptions?.component || null;

      if (children) {
        return currentComponent
          ? cloneElement(currentComponent, undefined, children)
          : null;
      }

      return currentComponent;
    },
    [CurrentFrameOptions]
  );

  return useMemo(() => {
    const { currentFrame } = CurrentFrameOptions ?? { currentFrame: 0 };

    return [(Animation as unknown) as Component, currentFrame, framesQuantity];
  }, [Animation, CurrentFrameOptions, framesQuantity]);
}

export default usePresentation;
