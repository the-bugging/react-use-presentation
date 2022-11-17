/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  JSXElementConstructor,
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type TFrameOptions = {
  component: ReactElement<any, string | JSXElementConstructor<any>> | null;
  time?: number;
};

type TFrameOptionsWithPosition = {
  component: ReactElement<any, string | JSXElementConstructor<any>> | null;
  time?: number;
  currentFrame: number;
};

type TUsePresentation = {
  framesOptions: TFrameOptions[];
  startTrigger: boolean;
  startDelay?: number;
  isLoop?: boolean;
  callback?: () => void;
};

type TUsePresentationReturn = readonly [
  ({
    children,
  }: any) => ReactElement<any, string | JSXElementConstructor<any>> | null,
  number,
  number
];

function usePresentation({
  framesOptions,
  startTrigger,
  startDelay = undefined,
  isLoop = false,
  callback = undefined,
}: TUsePresentation): TUsePresentationReturn {
  const [CurrentFrameOptions, setCurrentFrameOptions] =
    useState<TFrameOptionsWithPosition | null>(null);
  const framesQuantity = framesOptions?.length || 0;
  const framesRef = useRef(framesOptions);
  const callbackCb = useCallback(() => {
    if (callback && typeof callback === 'function') {
      return callback();
    }

    return null;
  }, [callback]);

  const setFrameWithAwait = useCallback(
    async (framesArray: Array<TFrameOptions>) => {
      const [firstFrame, ...otherFrames] = framesArray;
      const currentFrame = (framesRef.current?.indexOf(firstFrame) || 0) + 1;

      setCurrentFrameOptions({ ...firstFrame, currentFrame });

      await new Promise((resolve) => setTimeout(resolve, firstFrame.time));

      if (otherFrames.length) {
        await setFrameWithAwait(otherFrames);
      }

      callbackCb();
    },
    [callbackCb]
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
    let mounted = true;

    if (framesQuantity > 0 && startTrigger && mounted) {
      setMotion();
    }

    return () => {
      mounted = false;
    };
  }, [framesQuantity, startTrigger, setMotion]);

  const Animation = useCallback(
    ({ children, className }) => {
      const internalClassName = children
        ? 'animation-frame with-children'
        : 'animation-frame';

      const currentComponent = CurrentFrameOptions?.component
        ? cloneElement(
            CurrentFrameOptions.component,
            {
              className: className
                ? `${internalClassName} ${className}`
                : internalClassName,
            },
            children || CurrentFrameOptions.component
          )
        : null;

      return currentComponent;
    },
    [CurrentFrameOptions]
  );

  return useMemo(() => {
    const { currentFrame } = CurrentFrameOptions ?? { currentFrame: 0 };

    return [Animation, currentFrame, framesQuantity] as const;
  }, [Animation, CurrentFrameOptions, framesQuantity]);
}

export default usePresentation;
