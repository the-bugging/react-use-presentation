const FrameContainer = ({ children, className }) => (
  <div className={`frame-container ${className || ''}`}>
    {children}
  </div>
);

const loopBasicStyle = (diff) => ({
  boxShadow: `1px -1px ${diff}px 0px rgb(243 0 0 / 75%)`,
  width: '100%',
  color: '#e1e1e1',
  textShadow: '1px 1px 0px #eee, 3px 3px 0px #707070',
  overflow: 'hidden',
});

const franticStyle = (x, y) => ({
  color: '#e1e1e1',
  textShadow: '1px 1px 0px #eee, 3px 3px 0px #707070',
  overflow: 'hidden',
  top: `calc(${y}vh - 2.5rem)`,
  left: `calc(${x}vw - 5rem)`,
  height: '5rem',
  width: '10rem',
  backgroundColor: `rgb(${x} ${x} ${y} / 80%)`,
  position: 'absolute',
  borderRadius: '5px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
});

const AnimatedText = ({ children, animation }) => (
  <div className={`animated-text ${animation}`}>
    <h1 style={{ margin: 0, padding: '1rem' }}>{children}</h1>
  </div>
);

export const framesInLoop = [
  {
    component: (
      <div style={loopBasicStyle(20)}>
        <AnimatedText animation="fade">THIS</AnimatedText>
      </div>
    ),
    time: 1000,
  },
  {
    component: (
      <div style={loopBasicStyle(10)}>
        <AnimatedText animation="fade">I</AnimatedText>
      </div>
    ),
    time: 300,
  },
  {
    component: (
      <div style={loopBasicStyle(30)}>
        <AnimatedText animation="fade">THI</AnimatedText>
      </div>
    ),
    time: 100,
  },
  {
    component: (
      <div style={loopBasicStyle(5)}>
        <AnimatedText animation="fade">IS</AnimatedText>
      </div>
    ),
    time: 1000,
  },
  {
    component: (
      <div style={loopBasicStyle(20)}>
        <AnimatedText animation="fade">IN</AnimatedText>
      </div>
    ),
    time: 1000,
  },
  {
    component: (
      <div style={loopBasicStyle(25)}>
        <AnimatedText animation="grow">LOOP</AnimatedText>
      </div>
    ),
    time: 500,
  },
  {
    component: (
      <div style={loopBasicStyle(20)}>
        <AnimatedText animation="grow">LOO</AnimatedText>
      </div>
    ),
    time: 200,
  },
  {
    component: (
      <div style={loopBasicStyle(15)}>
        <AnimatedText animation="slide-left">LOO</AnimatedText>
      </div>
    ),
    time: 200,
  },
  {
    component: (
      <div style={loopBasicStyle(20)}>
        <AnimatedText animation="slide-left">LOO</AnimatedText>
      </div>
    ),
    time: 200,
  },
  {
    component: (
      <div style={loopBasicStyle(15)}>
        <AnimatedText animation="slide-left">LOOP</AnimatedText>
      </div>
    ),
    time: 1000,
  },
  {
    component: (
      <div style={loopBasicStyle(15)}>
        <AnimatedText animation="slide-left">GLITCHY</AnimatedText>
      </div>
    ),
    time: 1000,
  },
];

export const framesOnce = [
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="grow">Welcome to</AnimatedText>
      </FrameContainer>
    ),
    time: 2000,
  },
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="fade">react-use-presentation</AnimatedText>
      </FrameContainer>
    ),
    time: 2000,
  },
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="fade">Create presentations</AnimatedText>
      </FrameContainer>
    ),
    time: 2000,
  },
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="fade">Using only React</AnimatedText>
      </FrameContainer>
    ),
    time: 2000,
  },
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="fade">What do you think?</AnimatedText>
      </FrameContainer>
    ),
    time: 2000,
  },
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="fade">IS</AnimatedText>
      </FrameContainer>
    ),
    time: 200,
  },
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="fade">IT</AnimatedText>
      </FrameContainer>
    ),
    time: 200,
  },
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="fade">IN</AnimatedText>
      </FrameContainer>
    ),
    time: 200,
  },
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="fade">TER</AnimatedText>
      </FrameContainer>
    ),
    time: 200,
  },
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="fade">EST</AnimatedText>
      </FrameContainer>
    ),
    time: 200,
  },
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="fade">ING</AnimatedText>
      </FrameContainer>
    ),
    time: 200,
  },
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="fade">TO</AnimatedText>
      </FrameContainer>
    ),
    time: 600,
  },
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="fade">YOU?</AnimatedText>
      </FrameContainer>
    ),
    time: 3000,
  },
  {
    component: (
      <FrameContainer>
        <AnimatedText animation="fade">TRY IT NOW!</AnimatedText>
      </FrameContainer>
    ),
    time: 5000,
  },
];

export const framesFrantic = [
  {
    component: <div style={franticStyle(25, 40)} />,
    time: 1000,
  },
  {
    component: <div style={franticStyle(50, 20)} />,
    time: 300,
  },
  {
    component: <div style={franticStyle(25, 40)} />,
    time: 30,
  },
  {
    component: <div style={franticStyle(50, 20)} />,
    time: 1000,
  },
  {
    component: <div style={franticStyle(75, 40)} />,
    time: 1000,
  },
  {
    component: <div style={franticStyle(75, 40)} />,
    time: 50,
  },
  {
    component: <div style={franticStyle(74, 40)} />,
    time: 80,
  },
  {
    component: <div style={franticStyle(75, 40)} />,
    time: 50,
  },
  {
    component: <div style={franticStyle(50, 65)} />,
    time: 1000,
  },
  {
    component: <div style={franticStyle(74, 40)} />,
    time: 30,
  },
  {
    component: <div style={franticStyle(50, 65)} />,
    time: 1000,
  },
];
