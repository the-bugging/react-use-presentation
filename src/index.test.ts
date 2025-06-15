import React, { ReactElement } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import usePresentation, { TFrameOptions } from './index';

// Mock for requestAnimationFrame
let rafCallbacks: Array<(time: number) => void> = [];
let mockRafIdCounter = 0;
let currentMockTime = 0;

const mockPerformanceNow = jest.fn().mockImplementation(() => currentMockTime);

const mockRequestAnimationFrame = (callback: (time: number) => void): number => {
  rafCallbacks.push(callback);
  mockRafIdCounter++;
  return mockRafIdCounter;
};

const mockCancelAnimationFrame = (id: number) => {
  // Basic mock.
};

// Helper to advance RAF frames
const advanceRaf = (frames: number = 1) => {
  for (let i = 0; i < frames; i++) {
    const callback = rafCallbacks.shift();
    if (callback) {
      currentMockTime += 16; // Simulate 16ms passing
      callback(currentMockTime);
    } else {
      break;
    }
  }
};

describe('usePresentation Hook', () => {
  let originalRaf: (callback: FrameRequestCallback) => number;
  let originalCancelRaf: (handle: number) => void;
  let originalPerformanceNow: () => number;

  beforeEach(() => {
    originalRaf = window.requestAnimationFrame;
    originalCancelRaf = window.cancelAnimationFrame;
    originalPerformanceNow = performance.now;

    window.requestAnimationFrame = mockRequestAnimationFrame as any;
    window.cancelAnimationFrame = mockCancelAnimationFrame;
    performance.now = mockPerformanceNow;

    currentMockTime = 0;
    rafCallbacks = [];
    mockRafIdCounter = 0;

    jest.useFakeTimers();
  });

  afterEach(() => {
    window.requestAnimationFrame = originalRaf;
    window.cancelAnimationFrame = originalCancelRaf;
    performance.now = originalPerformanceNow;
    jest.clearAllMocks();
    jest.useRealTimers();
    rafCallbacks = [];
  });

  const getFrameComponent = (id: string): ReactElement => <div data-testid={id} />;

  it('should return correct initial state', () => {
    const framesOptions: TFrameOptions[] = [
      { component: getFrameComponent('1'), time: 100 },
    ];
    const { result } = renderHook(() => usePresentation({ framesOptions, startTrigger: false }));
    const [, currentFrame, framesQuantity] = result.current;
    expect(currentFrame).toBe(0);
    expect(framesQuantity).toBe(1);
  });

  it('should start animation after startDelay and cycle frames with callbacks', () => {
    const mockCallback = jest.fn();
    const framesOptions: TFrameOptions[] = [
      { component: getFrameComponent('frame1'), time: 100 },
      { component: getFrameComponent('frame2'), time: 200 },
    ];

    const { result, rerender } = renderHook(
      (props) => usePresentation(props),
      {
        initialProps: {
          framesOptions,
          startTrigger: false,
          startDelay: 50,
          callback: mockCallback,
          isLoop: false,
        },
      }
    );

    expect(result.current[1]).toBe(0);

    rerender({ framesOptions, startTrigger: true, startDelay: 50, callback: mockCallback, isLoop: false });

    act(() => {
      jest.advanceTimersByTime(50);
    });

    act(() => { advanceRaf(1); });
    expect(result.current[1]).toBe(1);

    for(let i = 0; i < Math.ceil(100/16) + 1; i++) {
      act(() => { advanceRaf(1); });
    }
    expect(result.current[1]).toBe(1);
    expect(mockCallback).toHaveBeenCalledTimes(1);

    act(() => { advanceRaf(1); });
    expect(result.current[1]).toBe(2);

    for(let i = 0; i < Math.ceil(200/16) + 1; i++) {
      act(() => { advanceRaf(1); });
    }
    expect(result.current[1]).toBe(2);
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  it('should cancel animation if startTrigger becomes false', () => {
    const mockCallback = jest.fn();
    const framesOptions: TFrameOptions[] = [
      { component: getFrameComponent('frame1'), time: 100 },
      { component: getFrameComponent('frame2'), time: 200 },
    ];

    const { result, rerender } = renderHook(
      (props) => usePresentation(props),
      {
        initialProps: {
          framesOptions,
          startTrigger: true,
          startDelay: 0,
          callback: mockCallback,
          isLoop: false,
        },
      }
    );

    act(() => { advanceRaf(1); });
    expect(result.current[1]).toBe(1);

    act(() => { advanceRaf(2); });

    rerender({ framesOptions, startTrigger: false, startDelay: 0, callback: mockCallback, isLoop: false });

    act(() => { advanceRaf(10); });

    expect(result.current[1]).toBe(1);
    expect(mockCallback).not.toHaveBeenCalled();
  });
});
