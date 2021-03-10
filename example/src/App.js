import usePresentation from 'react-use-presentation';
import { framesOnce, framesInLoop, framesFrantic } from './frames';
import './styles.css';

export default function App() {
  const [PresentationLoop, currentPosition, framesQuantity] = usePresentation({
    framesOptions: framesOnce,
    startDelay: 1000,
    isLoop: false,
    startTrigger: true,
  });

  const [
    AnimateLoop,
    currentPositionLoop,
    framesQuantityLoop,
  ] = usePresentation({
    framesOptions: framesInLoop,
    isLoop: false,
    startTrigger: true,
  });

  const [
    FranticLoop,
    currentPositionFrantic,
    framesQuantityFrantic,
  ] = usePresentation({
    framesOptions: framesFrantic,
    isLoop: false,
    startTrigger: true,
  });

  return (
    <div className="App">
      <img
        className="image-background"
        src="https://wallpaperaccess.com/full/2415294.jpg"
        alt=""
      />
      <FranticLoop>
        <p>
          Am I glitchy? {currentPositionFrantic}/{framesQuantityFrantic}
        </p>
      </FranticLoop>
      <p
        style={{
          position: 'absolute',
          left: '20px',
          top: 0,
          color: 'white',
        }}
      >
        {currentPositionLoop}/{framesQuantityLoop}
      </p>
      <AnimateLoop />
      <p
        style={{
          position: 'absolute',
          left: '20px',
          bottom: 0,
          color: 'white',
        }}
      >
        Current frame: {currentPosition}/{framesQuantity}
      </p>
      <div className="content">
        <PresentationLoop className="my-very-own-class" />
      </div>
    </div>
  );
}
