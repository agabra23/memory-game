import { useEffect, useState } from "react";
import "./styles/App.css";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";

function App() {
  const ENDPOINT =
    "https://api.giphy.com/v2/emoji?api_key=jLvjxLBegqMPTsPVnfAGVjxVZVqnkQdU&limit=30&offset=0";

  const [selectedImages, setSelectedImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [clickedImages, setClickedImages] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, sethighScore] = useState(0);

  const fetchEmojis = async () => {
    try {
      const response = await fetch(ENDPOINT, { mode: "cors" });
      const data = await response.json();
      setAllImages(data.data);
    } catch (error) {
      console.error("Error fetching emojis:", error);
    }
  };

  const shuffleImages = () => {
    if (allImages.length > 0) {
      setSelectedImages(getSelectedImages());
    }
  };

  const getSelectedImages = () => {
    const gridImages = [];

    const getAnyUnusedImage = () => {
      let randomImage = allImages[Math.floor(Math.random() * allImages.length)];

      while (gridImages.some((image) => image.id === randomImage.id)) {
        randomImage = allImages[Math.floor(Math.random() * allImages.length)];
      }
      return randomImage;
    };

    const getUnclickedImage = () => {
      let randomImage = allImages[Math.floor(Math.random() * allImages.length)];

      while (
        gridImages.some((image) => image.id === randomImage.id) ||
        clickedImages.some((image) => image.id === randomImage.id)
      ) {
        randomImage = allImages[Math.floor(Math.random() * allImages.length)];
      }

      return randomImage;
    };

    for (let i = 0; i < 8; i++) {
      let randomImage = getAnyUnusedImage();

      gridImages.push(randomImage);
    }

    const randomIndex = Math.floor(Math.random() * 9);

    if (randomIndex === 8) {
      gridImages.push(getUnclickedImage());
    } else {
      gridImages.splice(randomIndex, 0, getUnclickedImage());
    }

    return gridImages;
  };

  const addtoClicked = (imageObject) => {
    setClickedImages([...clickedImages, imageObject]);
  };

  const cardClickHandler = (imageObject) => {
    if (clickedImages.some((image) => image.id === imageObject.id)) {
      resetGame();
    } else {
      addtoClicked(imageObject);
      setScore(score + 1);
    }

    shuffleImages();
  };

  const resetGame = () => {
    setScore(0);
    setClickedImages([]);
  };

  useEffect(() => {
    fetchEmojis();
  }, []);

  useEffect(() => {
    shuffleImages();
  }, [allImages]);

  useEffect(() => {
    if (score > highScore) sethighScore(score);
  }, [score, highScore]);

  useEffect(() => {
    console.log("clicked images", clickedImages);
  }, [clickedImages]);

  return (
    <>
      <header>
        <h1>Memory Game</h1>
        <Scoreboard score={score} highScore={highScore} />
      </header>
      <main>
        <div className="card-container">
          {selectedImages.map((image) => (
            <Card
              key={image.id}
              url={image.images?.original.url}
              alt={image.title}
              cardClickHandler={() => cardClickHandler(image)}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
