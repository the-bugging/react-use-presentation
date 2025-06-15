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

type FrameOptions = {
  component: ReactElement;
  time?: number;
};

type FrameOptionsWithPosition = {
  component: ReactElement;
  time?: number;
  currentFrame: number;
};

type UsePresentation = {
  framesOptions: FrameOptions[];
  startTrigger: boolean;
  startDelay?: number;
  isLoop?: boolean;
  callback?: () => void;
};

type UsePresentationReturn = readonly [
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
}: UsePresentation): UsePresentationReturn {
  const [CurrentFrameOptions, setCurrentFrameOptions] =
    useState<FrameOptionsWithPosition | null>(null);
  const framesQuantity = framesOptions?.length || 0;
  const framesRef = useRef(framesOptions);
  const animationFrameIdRef = useRef<number | null>(null);
  const isCancelledRef = useRef<boolean>(false);
  const callbackCb = useCallback(() => {
    if (callback && typeof callback === 'function') {
      return callback();
    }

    return null;
  }, [callback]);

  const setFrameWithAwait = useCallback(
    async (framesArray: Array<FrameOptions>): Promise<void> => {
      // Ensure it returns Promise<void>
      if (isCancelledRef.current) return;

      const [firstFrame, ...otherFrames] = framesArray;
      const frameIndex = framesRef.current
        ? framesRef.current.indexOf(firstFrame)
        : -1;
      const currentFrame = frameIndex >= 0 ? frameIndex + 1 : 0;

      if (isCancelledRef.current) return;
      setCurrentFrameOptions({ ...firstFrame, currentFrame });

      if (firstFrame.time && firstFrame.time > 0) {
        try {
          await new Promise<void>((resolve, reject) => {
            let start: number | null = null;
            const step = (timestamp: number) => {
              if (isCancelledRef.current) {
                if (animationFrameIdRef.current !== null) {
                  cancelAnimationFrame(animationFrameIdRef.current);
                }
                animationFrameIdRef.current = null;
                reject(new Error('Animation cancelled'));
                return;
              }

              if (start === null) {
                start = timestamp;
              }
              const progress = timestamp - start;
              if (progress < firstFrame.time!) {
                animationFrameIdRef.current = requestAnimationFrame(step);
              } else {
                animationFrameIdRef.current = null;
                resolve();
              }
            };
            animationFrameIdRef.current = requestAnimationFrame(step);
          });
        } catch (error: any) {
          if (error.message === 'Animation cancelled') {
            // console.log('Frame animation await cancelled');
            return; // Stop execution if cancelled
          }
          throw error; // Re-throw other errors
        }
      }

      if (isCancelledRef.current) return;
      callbackCb(); // << MOVED HERE: Called after this frame's time, before next frame.

      if (isCancelledRef.current) return; // Check again before recursion logic

      if (otherFrames.length) {
        await setFrameWithAwait(otherFrames); // Recursive call
      }

      // callbackCb() is no longer here.
    },
    [callbackCb] // framesRef, setCurrentFrameOptions, animationFrameIdRef, isCancelledRef are stable
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
    // `mounted` variable can be removed if isCancelledRef handles all relevant cases.
    // Let's keep `mounted` for now as it has a slightly different scope (strict unmount).
    let mounted = true;

    if (framesQuantity > 0 && startTrigger && mounted) {
      isCancelledRef.current = false; // Reset cancellation flag before starting
      // Ensure any previous rAF is cleared before starting a new motion if setMotion itself doesn't handle it.
      // This is important if startTrigger rapidly toggles.
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      setMotion();
    } else {
      // Conditions to run are not met (e.g., startTrigger became false, or framesQuantity is 0)
      isCancelledRef.current = true;
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    }

    return () => {
      mounted = false;
      isCancelledRef.current = true;
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [framesQuantity, startTrigger, setMotion]); // setMotion's stability is important here.

  const Animation = useCallback(
    ({
      children,
      className,
    }: {
      children: ReactElement;
      className: string;
    }) => {
      const internalClassName = children
        ? 'animation-frame with-children'
        : 'animation-frame';

      const currentComponent = CurrentFrameOptions?.component
        ? (() => {
            const element = CurrentFrameOptions.component;
            const props =
              typeof element.props === 'object' && element.props !== null
                ? element.props
                : {};
            const newProps = {
              ...props,
              className: className
                ? `${internalClassName} ${className}`
                : internalClassName,
            };
            return cloneElement(
              element as ReactElement,
              newProps,
              children || element
            );
          })()
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

export type { FrameOptions };
export default usePresentation;
