import { render, waitFor, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { framesOnce } from '../../example/src/frames';
import usePresentation from '..';

describe('Tests usePresentation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return usePresentation array of items', () => {
    const { result } = renderHook(() =>
      usePresentation({ framesOptions: framesOnce, startTrigger: true })
    );

    const [Presentation, currentFrame, framesLength] = result.current;

    expect(Presentation).toBeTruthy();
    expect(currentFrame).toEqual(1);
    expect(framesLength).toEqual(framesOnce.length);
  });

  it('should return usePresentation array of items for startTrigger false', () => {
    const { result } = renderHook(() =>
      usePresentation({ framesOptions: framesOnce, startTrigger: false })
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

    render(<RenderPresentation />);
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

    render(<RenderPresentation />);

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

    render(<RenderPresentation />);

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

    render(<RenderPresentation />);

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
});
