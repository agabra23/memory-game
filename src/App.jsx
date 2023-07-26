import { useEffect, useState } from "react";
import "./styles/App.css";
import Card from "./components/Card";

function App() {
  const ENDPOINT =
    "https://api.giphy.com/v2/emoji?api_key=jLvjxLBegqMPTsPVnfAGVjxVZVqnkQdU&limit=30&offset=0";

  const [selectedImages, setSelectedImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [clickedImages, setClickedImages] = useState([]);

  const fetchEmojis = async () => {
    try {
      const response = await fetch(ENDPOINT, { mode: "cors" });
      const data = await response.json();
      setAllImages(data.data);
    } catch (error) {
      console.error("Error fetching emojis:", error);
    }
  };

  useEffect(() => {
    fetchEmojis();
  }, []);

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
      // put unclicked img at random index
      gridImages.splice(randomIndex, 0, getUnclickedImage());
    }

    return gridImages;
  };

  useEffect(() => {
    shuffleImages();
  }, [allImages]);

  return (
    <>
      <header>
        <h1>Memory Game</h1>
        <div className="scoreboard-container">
          <h6>Score:</h6>
          <h6>High Score:</h6>
        </div>
      </header>
      <main>
        <div className="card-container">
          {selectedImages.map((image) => (
            <Card
              key={crypto.randomUUID()}
              url={image.images?.original.url}
              alt={image.title}
              shuffleImages={shuffleImages}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
