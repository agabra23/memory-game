import { useEffect, useState } from "react";
import "./styles/App.css";
import Card from "./components/Card";

function App() {
  const ENDPOINT =
    "https://api.giphy.com/v2/emoji?api_key=jLvjxLBegqMPTsPVnfAGVjxVZVqnkQdU&limit=30&offset=0";

  const [selectedImages, setSelectedImages] = useState([]);
  const [allImages, setAllImages] = useState([]);

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
      const gridImages = [];
      for (let i = 0; i < 9; i++) {
        gridImages.push(
          allImages[Math.floor(Math.random() * allImages.length)]
        );
      }
      setSelectedImages(gridImages);
    }
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
