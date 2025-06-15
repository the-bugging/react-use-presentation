/* eslint-disable no-use-before-define */
import React, { act } from 'react';
import { render, waitFor, screen, renderHook } from '@testing-library/react';
import { framesOnce } from '../../example/src/frames';
import usePresentation from '..';

describe('Tests usePresentation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return usePresentation array of items', () => {
    const { result } = renderHook(() =>
      usePresentation({ framesOptions: framesOnce as any, startTrigger: true })
    );

    const [Presentation, currentFrame, framesLength] = result.current;

    expect(Presentation).toBeTruthy();
    expect(currentFrame).toEqual(1);
    expect(framesLength).toEqual(framesOnce.length);
  });

  it('should return usePresentation array of items for startTrigger false', () => {
    const { result } = renderHook(() =>
      usePresentation({ framesOptions: framesOnce as any, startTrigger: false })
    );

    const [Presentation, currentFrame] = result.current;

    expect(Presentation).toBeTruthy();
    expect(currentFrame).toEqual(0);
  });

  it('should render Presentation component without callback', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: 1 }],
        startTrigger: true,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should render Presentation component with callback and loop', async () => {
    const consoleInfoSpy = jest.spyOn(console, 'info');
    const myCallback = () => console.info('presentation finished!');

    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: 1 }],
        startTrigger: true,
        isLoop: true,
        callback: myCallback,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();

    await waitFor(
      () => {
        expect(consoleInfoSpy).toHaveBeenCalledWith('presentation finished!');
      },
      { timeout: 100 }
    );
  });

  it('should render Presentation component 0 framesOptions length', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [],
        startTrigger: true,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container.querySelectorAll('.animation-frame').length).toBe(0);
  });

  it('should render Presentation component with children', () => {
    function RenderPresentationWithChildren() {
      const [PresentationWithChildren] = usePresentation({
        framesOptions: [{ component: <div>Animation Frame</div>, time: 50 }],
        startTrigger: true,
      });

      return (
        <PresentationWithChildren>
          <p>I am a child</p>
        </PresentationWithChildren>
      );
    }

    const { container } = render(<RenderPresentationWithChildren />);
    expect(
      container.querySelectorAll('.animation-frame.with-children').length
    ).toBe(1);
  });

  it('should render Presentation component with its own className', () => {
    function RenderPresentationOwnClassName() {
      const [PresentationOwnClassName] = usePresentation({
        framesOptions: [{ component: <div>Animation Frame</div>, time: 50 }],
        startTrigger: true,
      });

      return <PresentationOwnClassName className="my-very-own-class" />;
    }

    const { container } = render(<RenderPresentationOwnClassName />);
    expect(
      container.querySelectorAll('.animation-frame.my-very-own-class').length
    ).toBe(1);
  });

  it('should render Presentation with 3 components with callback', async () => {
    const consoleInfoSpy = jest.spyOn(console, 'info');
    const myCallback = () => console.info('presentation finished!');

    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [
          { component: <div>test 1</div>, time: 10 },
          { component: <div>test 2</div>, time: 10 },
          { component: <div>test 3</div>, time: 10 },
        ],
        startTrigger: true,
        callback: myCallback,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();

    await waitFor(
      () => {
        expect(consoleInfoSpy).toHaveBeenCalledWith('presentation finished!');
        expect(screen.getByText('test 3')).toBeInTheDocument();
      },
      { timeout: 100 }
    );
  });

  it('should render Presentation with 1000 ms delay', async () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test 1</div>, time: 10 }],
        startTrigger: true,
        startDelay: 1000,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();

    await waitFor(
      () => {
        expect(screen.queryByText('test 1')).toBeNull();
      },
      { timeout: 900 }
    );

    await waitFor(
      () => {
        expect(screen.getByText('test 1')).toBeInTheDocument();
      },
      { timeout: 1100 }
    );
  });

  it('should handle animation cancellation', async () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [
          { component: <div>test 1</div>, time: 1000 },
          { component: <div>test 2</div>, time: 1000 },
        ],
        startTrigger: true,
      });

      return <Presentation />;
    }

    const { unmount } = render(<RenderPresentation />);
    unmount(); // This should trigger cleanup and cancel animations
  });

  it('should handle invalid callback', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: 1 }],
        startTrigger: true,
        callback: 'not a function' as any,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle component with null props', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: 1 }],
        startTrigger: true,
      });

      return <Presentation className={null as any} />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle startTrigger toggle', async () => {
    function RenderPresentation() {
      const [trigger, setTrigger] = React.useState(false);
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: 1 }],
        startTrigger: trigger,
      });

      React.useEffect(() => {
        setTrigger(true);
        setTimeout(() => setTrigger(false), 50);
      }, []);

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });

  it('should handle frame with zero time', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: 0 }],
        startTrigger: true,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle frame with negative time', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: -1 }],
        startTrigger: true,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle frame without time property', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div> }],
        startTrigger: true,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle frame with null component', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: null as any, time: 1 }],
        startTrigger: true,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle animation frame cancellation during animation', async () => {
    function RenderPresentation() {
      const [trigger, setTrigger] = React.useState(true);
      const [Presentation] = usePresentation({
        framesOptions: [
          { component: <div>test 1</div>, time: 1000 },
          { component: <div>test 2</div>, time: 1000 },
        ],
        startTrigger: trigger,
      });

      React.useEffect(() => {
        setTimeout(() => {
          act(() => {
            setTrigger(false);
          });
        }, 500);
      }, []);

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();

    await act(async () => {
      await waitFor(() => {
        expect(screen.getByText('test 1')).toBeInTheDocument();
      });
    });
  });

  it('should handle error in animation frame', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    let frameCount = 0;
    const mockRequestAnimationFrame = jest.fn().mockImplementation((cb) => {
      frameCount += 1;
      if (frameCount <= 2) {
        act(() => {
          cb(performance.now());
        });
      }
      return frameCount;
    });
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = mockRequestAnimationFrame;

    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: 1 }],
        startTrigger: true,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();

    // Give time for the component to render
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    expect(screen.getByText('test')).toBeInTheDocument();

    window.requestAnimationFrame = originalRequestAnimationFrame;
    consoleErrorSpy.mockRestore();
  });

  it('should handle component with non-object props', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [
          {
            component: <div>test</div>,
            time: 1,
          },
        ],
        startTrigger: true,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle rapid startTrigger toggles', async () => {
    function RenderPresentation() {
      const [trigger, setTrigger] = React.useState(false);
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: 1000 }],
        startTrigger: trigger,
      });

      React.useEffect(() => {
        const interval = setInterval(() => {
          act(() => {
            setTrigger((prev) => !prev);
          });
        }, 100);

        return () => clearInterval(interval);
      }, []);

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
  });

  it('should handle multiple callbacks in sequence', async () => {
    const consoleInfoSpy = jest.spyOn(console, 'info');
    const callback1 = () => console.info('callback 1');
    const callback2 = () => console.info('callback 2');

    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [
          { component: <div>test 1</div>, time: 1 },
          { component: <div>test 2</div>, time: 1 },
        ],
        startTrigger: true,
        callback: callback1,
      });

      const [Presentation2] = usePresentation({
        framesOptions: [
          { component: <div>test 3</div>, time: 1 },
          { component: <div>test 4</div>, time: 1 },
        ],
        startTrigger: true,
        callback: callback2,
      });

      return (
        <>
          <Presentation />
          <Presentation2 />
        </>
      );
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();

    // Give time for the callbacks to be called
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(consoleInfoSpy).toHaveBeenCalledWith('callback 1');
    expect(consoleInfoSpy).toHaveBeenCalledWith('callback 2');
  });

  it('should handle frame with undefined component', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: undefined as any, time: 1 }],
        startTrigger: true,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle frame with invalid time type', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: 'invalid' as any }],
        startTrigger: true,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle frame with NaN time', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: NaN }],
        startTrigger: true,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle frame with Infinity time', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: Infinity }],
        startTrigger: true,
      });

      return <Presentation />;
    }

    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle animation cancellation error path', async () => {
    function RenderPresentation() {
      const [trigger, setTrigger] = React.useState(true);
      const [Presentation] = usePresentation({
        framesOptions: [
          { component: <div>test 1</div>, time: 100 },
          { component: <div>test 2</div>, time: 100 },
        ],
        startTrigger: trigger,
      });
      React.useEffect(() => {
        setTimeout(() => setTrigger(false), 10);
      }, []);
      return <Presentation />;
    }
    const { unmount } = render(<RenderPresentation />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });
    unmount();
  });

  it('should handle frame with index -1', () => {
    // This will happen if the frame is not found in framesRef.current
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: 1 }],
        startTrigger: true,
      });
      // Simulate a frame not in framesRef.current
      (Presentation as any).framesRef = { current: [] };
      return <Presentation />;
    }
    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle frame with NaN/undefined/negative/zero time', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [
          { component: <div>NaN</div>, time: NaN },
          { component: <div>undefined</div>, time: undefined },
          { component: <div>negative</div>, time: -10 },
          { component: <div>zero</div>, time: 0 },
        ],
        startTrigger: true,
      });
      return <Presentation />;
    }
    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle callback that is not a function', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: 1 }],
        startTrigger: true,
        callback: 123 as any,
      });
      return <Presentation />;
    }
    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should cleanup on unmount', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: 1 }],
        startTrigger: true,
      });
      return <Presentation />;
    }
    const { unmount } = render(<RenderPresentation />);
    unmount();
  });

  it('should handle className and children edge cases', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [{ component: <div>test</div>, time: 1 }],
        startTrigger: true,
      });
      return (
        <>
          <Presentation className={null as any} />
          <Presentation className={undefined as any} />
          <Presentation className="" />
          <Presentation>child</Presentation>
        </>
      );
    }
    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });

  it('should handle framesQuantity 0 and startTrigger false', () => {
    function RenderPresentation() {
      const [Presentation] = usePresentation({
        framesOptions: [],
        startTrigger: false,
      });
      return <Presentation />;
    }
    const { container } = render(<RenderPresentation />);
    expect(container).toBeTruthy();
  });
});
