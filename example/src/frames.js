import {
  Typography,
  makeStyles,
  Fade,
  Grow,
  Zoom,
  Slide,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
});

const FrameContainer = ({ children, className }) => {
  const classes = useStyles();

  return (
    <div className={className ? `${classes.root} ${className}` : classes.root}>
      {children}
    </div>
  );
};

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

export const framesInLoop = [
  {
    component: (
      <div style={loopBasicStyle(20)}>
        <Fade in timeout={200}>
          <h1 style={{ margin: 0, padding: '1rem' }}>THIS</h1>
        </Fade>
      </div>
    ),
    time: 1000,
  },
  {
    component: (
      <div style={loopBasicStyle(10)}>
        <Fade in timeout={200}>
          <h1 style={{ margin: 0, padding: '1rem' }}>I</h1>
        </Fade>
      </div>
    ),
    time: 300,
  },
  {
    component: (
      <div style={loopBasicStyle(30)}>
        <Fade in timeout={200}>
          <h1 style={{ margin: 0, padding: '1rem' }}>THI</h1>
        </Fade>
      </div>
    ),
    time: 100,
  },
  {
    component: (
      <div style={loopBasicStyle(5)}>
        <Fade in timeout={200}>
          <h1 style={{ margin: 0, padding: '1rem' }}>IS</h1>
        </Fade>
      </div>
    ),
    time: 1000,
  },
  {
    component: (
      <div style={loopBasicStyle(20)}>
        <Fade in timeout={200}>
          <h1 style={{ margin: 0, padding: '1rem' }}>IN</h1>
        </Fade>
      </div>
    ),
    time: 1000,
  },
  {
    component: (
      <div style={loopBasicStyle(25)}>
        <Grow in timeout={50}>
          <h1 style={{ margin: 0, padding: '1rem' }}>LOOP</h1>
        </Grow>
      </div>
    ),
    time: 500,
  },
  {
    component: (
      <div style={loopBasicStyle(20)}>
        <Grow in timeout={60}>
          <h1 style={{ margin: 0, padding: '1rem' }}>LOO</h1>
        </Grow>
      </div>
    ),
    time: 200,
  },
  {
    component: (
      <div style={loopBasicStyle(15)}>
        <Slide direction="left" in timeout={30}>
          <h1 style={{ margin: 0, padding: '1rem' }}>LOO</h1>
        </Slide>
      </div>
    ),
    time: 200,
  },
  {
    component: (
      <div style={loopBasicStyle(20)}>
        <Slide direction="left" in timeout={50}>
          <h1 style={{ margin: 0, padding: '1rem' }}>LOO</h1>
        </Slide>
      </div>
    ),
    time: 200,
  },
  {
    component: (
      <div style={loopBasicStyle(15)}>
        <Slide direction="left" in timeout={30}>
          <h1 style={{ margin: 0, padding: '1rem' }}>LOOP</h1>
        </Slide>
      </div>
    ),
    time: 1000,
  },
  {
    component: (
      <div style={loopBasicStyle(15)}>
        <Slide direction="left" in timeout={30}>
          <h1 style={{ margin: 0, padding: '1rem' }}>GLITCHY</h1>
        </Slide>
      </div>
    ),
    time: 1000,
  },
];

export const framesOnce = [
  {
    component: (
      <FrameContainer>
        <Grow timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h3" component="h1">
            Welcome to
          </Typography>
        </Grow>
      </FrameContainer>
    ),
    time: 2000,
  },
  {
    component: (
      <FrameContainer>
        <Fade timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h3" component="h1">
            react-use-presentation
          </Typography>
        </Fade>
      </FrameContainer>
    ),
    time: 2000,
  },
  {
    component: (
      <FrameContainer>
        <Fade timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h3" component="h1">
            Create presentations
          </Typography>
        </Fade>
      </FrameContainer>
    ),
    time: 2000,
  },
  {
    component: (
      <FrameContainer>
        <Fade timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h3" component="h1">
            Using only React
          </Typography>
        </Fade>
      </FrameContainer>
    ),
    time: 2000,
  },
  {
    component: (
      <FrameContainer>
        <Fade timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h3" component="h1">
            What do you think?
          </Typography>
        </Fade>
      </FrameContainer>
    ),
    time: 2000,
  },
  {
    component: (
      <FrameContainer>
        <Zoom timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h2" component="h1">
            IS
          </Typography>
        </Zoom>
      </FrameContainer>
    ),
    time: 200,
  },
  {
    component: (
      <FrameContainer>
        <Zoom timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h2" component="h1">
            IT
          </Typography>
        </Zoom>
      </FrameContainer>
    ),
    time: 200,
  },
  {
    component: (
      <FrameContainer>
        <Zoom timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h2" component="h1">
            IN
          </Typography>
        </Zoom>
      </FrameContainer>
    ),
    time: 200,
  },
  {
    component: (
      <FrameContainer>
        <Zoom timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h2" component="h1">
            TER
          </Typography>
        </Zoom>
      </FrameContainer>
    ),
    time: 200,
  },
  {
    component: (
      <FrameContainer>
        <Zoom timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h2" component="h1">
            EST
          </Typography>
        </Zoom>
      </FrameContainer>
    ),
    time: 200,
  },
  {
    component: (
      <FrameContainer>
        <Zoom timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h2" component="h1">
            ING
          </Typography>
        </Zoom>
      </FrameContainer>
    ),
    time: 200,
  },
  {
    component: (
      <FrameContainer>
        <Zoom timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h2" component="h1">
            TO
          </Typography>
        </Zoom>
      </FrameContainer>
    ),
    time: 600,
  },
  {
    component: (
      <FrameContainer>
        <Zoom timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h2" component="h1">
            YOU?
          </Typography>
        </Zoom>
      </FrameContainer>
    ),
    time: 3000,
  },
  {
    component: (
      <FrameContainer>
        <Fade timeout={300} in mountOnEnter unmountOnExit>
          <Typography align="center" variant="h3" component="h1">
            TRY IT NOW!
          </Typography>
        </Fade>
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
