if (location.protocol === "http:") {
  location.replace(
    `https:${location.href.substring(location.protocol.length)}`
  );
}

const { Fragment, useEffect, useState, StrictMode } = React;

function getRandomInt() {
  return Math.floor(Math.random() * (3 - 0)) + 0;
}

function generateImages(setImages) {
  setImages([
    {
      id: getRandomInt(),
    },
    {
      id: getRandomInt(),
    },
    {
      id: getRandomInt(),
    }
  ]);
}

function reset(setPoints, setFails, setStart, setImages) {
  setPoints(0);
  setFails(0);
  setStart(false);
  setImages([
    {
      id: null,
    },
    {
      id: null,
    },
    {
      id: null,
    }
  ]);
}

function onClick({ start, setStart, images, setImages, points, setPoints, fails, setFails }) {
  if (start) {
    if (
      images[0]?.id === images[1]?.id &&
      images[1]?.id === images[2]?.id
    ) {
      setPoints(points + 1);
    } else {
      setFails(fails + 1);
    }
  } else {
    generateImages(setImages);
  }
  setStart(!start);
}

const imageSource = [
  'strawberry-512.webp',
  'Lemon-512.webp',
  'Cherry-512.webp',
];

const ImageRows = ({ images }) => (
  <Fragment>
    <Image id={images[0]?.id} />
    <Image id={images[1]?.id} />
    <Image id={images[2]?.id} />
  </Fragment>
);

const Image = ({ id }) => {
  return (
    <img
      src={`https://cdn.glitch.global/58e62a59-7cbf-4532-b158-7b698986ec5e/${imageSource[id ?? 0]}?v=1648033906277`}
      draggable="false"
      width="100px"
      height="100px"
    />
  );
};

const StartButton = (props) => {
  return (
    <button onClick={() => onClick(props)}>
      {props.start ? "Parar" : "Empezar"}
    </button>
  )
};

const App = () => {
  const [start, setStart] = useState(false);
  const [images, setImages] = useState([]);
  const [points, setPoints] = useState(0);
  const [fails, setFails] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!start) return;

      generateImages(setImages);
    }, 200);
    return () => clearInterval(interval);
  });

  return (
    <Fragment>
      <h1>Tres Iguales</h1>
      <ImageRows images={images} />
      <h2>Puntos: {points}</h2>
      <h3>Fallos: {fails}</h3>
      <StartButton {...{images, setImages, points, setPoints, fails, setFails, start, setStart}} />
      <br />
      <br />
      <button onClick={() => reset(setPoints, setFails, setStart, setImages)}>Reiniciar</button>
    </Fragment>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
