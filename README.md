<img align="right" alt="traffic" src="https://pv-badge.herokuapp.com/total.svg?repo_id=olavoparno-react-use-presentation"/>

# react-use-presentation

> Create pure HTML (React enriched if you will) presentations with a provided array of components and their time durations. The library will do the rest triggering a re-render per array item.

[![NPM](https://img.shields.io/npm/v/react-use-presentation.svg)](https://www.npmjs.com/package/react-use-presentation)

---

| Statements                                                                    | Branches                                                                  | Functions                                                                   | Lines                                                               |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-80.95%25-yellow.svg) | ![Branches](https://img.shields.io/badge/branches-78.79%25-red.svg) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/lines-84.81%25-yellow.svg) |

## Table of Contents

- [Running example](#running-example)
- [Install](#install)
- [Usage](#usage)
- [Documentation](#documentation)
- [Contributors](#contributors)
- [License](#license)

---

## Running example

| Plain                                                             | Video BG                                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| ![Example](./assets/readme.gif)                                   | ![Example](./assets/readme-bg.gif)                                                      |
| [Preview!](https://codesandbox.io/s/react-use-presentation-1c2du) | [Preview with BG video!](https://codesandbox.io/s/react-use-presentation-with-bg-d7f7j) |

> You may also find a running [example](./example) in this project which are served at [Github Pages](https://olavoparno.github.io/react-use-presentation).

---

## Install

```bash
npm install --save react-use-presentation
```

---

## Usage

- Set up your presentation array with each object acting as a movie frame. See the example and contract below:

```tsx
export const myFramesArray = [
  {
    component: <div>First Frame with 1 second duration</div>,
    time: 1000
  },
  {
    component: <div>Second Frame with 2 second duration</div>,
    time: 2000
  },
  {
    component: <div>Last Frame without duration</div>,
  },
  ...
]
```

- To initialize a Presentation component:

```tsx
import * as react from 'react';
import usePresentation from 'react-use-presentation';
import { myFramesArray1 } from './myFramesArray';

export default function App() {
  const [Presentation] = usePresentation({
    framesOptions: myFramesArray1,
    startTrigger: false,
  });

  return <Presentation />;
}
```

- To initialize a **delayed** (in milliseconds) Presentation component:

```tsx
import * as react from 'react';
import usePresentation from 'react-use-presentation';
import { myFramesArray2 } from './myFramesArray';

export default function App() {
  const [DelayedPresentation] = usePresentation({
    framesOptions: myFramesArray2,
    startTrigger: true,
    startDelay: 1000,
  });

  return <DelayedPresentation />;
}
```

- To initialize a **delayed** (in milliseconds) and also in **loop** Presentation component:

```tsx
import * as react from 'react';
import usePresentation from 'react-use-presentation';
import { myFramesArray3 } from './myFramesArray';

export default function App() {
  const [DelayedAndLoopedPresentation] = usePresentation({
    framesOptions: myFramesArray3,
    startTrigger: true,
    startDelay: 1000,
    isLoop: true,
  });

  return <DelayedAndLoopedPresentation />;
}
```

- To initialize multiple separated presentations and with its current frame and length:

```tsx
import * as react from 'react';
import usePresentation from 'react-use-presentation';
import {
  myFramesArray1,
  myFramesArray2,
  myFramesArray3,
} from './myFramesArray';

export default function App() {
  const [Presentation] = usePresentation({
    framesOptions: myFramesArray1,
    startTrigger: false,
  });
  const [DelayedPresentation] = usePresentation({
    framesOptions: myFramesArray2,
    startTrigger: true,
    startDelay: 1000,
  });
  const [DelayedAndLoopedPresentation, currentLoopFrame, loopFramesLength] =
    usePresentation({
      framesOptions: myFramesArray3,
      startTrigger: true,
      startDelay: 1000,
      isLoop: true,
    });

  return (
    <>
      <Presentation />
      <DelayedPresentation />
      <div>
        <p>
          Current frame: {currentLoopFrame}/{loopFramesLength}
        </p>
        <DelayedAndLoopedPresentation />
      </div>
    </>
  );
}
```

- You can also render elements as children (note that the component passed via array must support children):

```tsx
import * as react from 'react';
import usePresentation from 'react-use-presentation';
import { myFramesArray1 } from './myFramesArray';

export default function App() {
  const [PresentationWithChildren, currentFrame, framesLength] =
    usePresentation({
      framesOptions: myFramesArray1,
      startTrigger: true,
    });

  return (
    <PresentationWithChildren>
      <p>
        Current frame: {currentFrame}/{framesLength}
      </p>
    </PresentationWithChildren>
  );
}
```

- You can control when to start the presentation using `startTrigger` as a control. You can also specify a callback to when it finishes:

```tsx
import * as react from 'react';
import usePresentation from 'react-use-presentation';
import { myFramesArray1 } from './myFramesArray';

export default function App() {
  const [startTrigger, setStartTrigger] = React.useState(false);

  const [PresentationTriggered] = usePresentation({
    framesOptions: myFramesArray1,
    startTrigger,
    callback: () => setStartTrigger(false),
  });

  return (
    <>
      <button type="button" onClick={() => setStartTrigger(true)}>
        Click to start presenting!
      </button>
      <PresentationTriggered />
    </>
  );
}
```

---

## Documentation

`usePresentation()` constructor:

```tsx
type TFrameOptions = {
  component: Component | null;
  time?: number;
};

type TUsePresentation = {
  framesOptions: TFrameOptions[];
  startTrigger: boolean;
  startDelay?: number;
  isLoop?: boolean;
};

usePresentation(TUsePresentation);
```

`usePresentation()` returns:

- An array with 3 positions, described below:

  1. The very animation component;
  2. The current position of the frame (1 based);
  3. The total quantity of frames;

> As the return is an array you may name each array position in an arbitrary way, e.g.:

```tsx
const [MyLittleComponent, currentFrameLittle, totalLengthLittle] =
  usePresentation();
```

`CSS selectors`:

- Both frames with or without children have its own CSS selectors:

1. Without children: `className="animation-frame"`
2. With children: `className="animation-frame with-children"`

- You can also pass in your own className:

1. With or without children:

```tsx
const [PresentationCustomCss] = usePresentation({
  framesOptions: myFramesArray1,
  startTrigger: true,
});

return <PresentationCustomCss className="my-custom-class" />;
```

- **The default behaviour is to automatically merge classNames.**

---

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://olavoparno.github.io"><img src="https://avatars1.githubusercontent.com/u/7513162?v=4?s=70" width="70px;" alt=""/><br /><sub><b>Olavo Parno</b></sub></a><br /><a href="#ideas-olavoparno" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/the-bugging/react-use-presentation/commits?author=olavoparno" title="Code">💻</a> <a href="https://github.com/the-bugging/react-use-presentation/commits?author=olavoparno" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

---

## License

react-use-presentation is [MIT licensed](./LICENSE).

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
