import { useEffect, useState } from "react";
import "./styles/App.css";
import Card from "./components/Card";

function App() {
  const ENDPOINT =
    "https://api.giphy.com/v2/emoji?api_key=jLvjxLBegqMPTsPVnfAGVjxVZVqnkQdU&limit=30&offset=0";

  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch(ENDPOINT, { mode: "cors" });
        const data = await response.json();

        // Move the selection of four random images inside this useEffect
        const gridImages = [];
        for (let i = 0; i < 4; i++) {
          gridImages.push(
            data.data[Math.floor(Math.random() * data.data.length)]
          );
        }
        setSelectedImages(gridImages);
      } catch (error) {
        console.error("Error fetching emojis:", error);
      }
    };

    fetchEmojis();
  }, []);

  // useEffect(() => {
  //   const fourImages = [];
  //   for (let i = 0; i < 4; i++) {
  //     fourImages.push(imageArray[Math.floor(Math.random() * 31)]);
  //   }
  //   setSelectedImages([...fourImages]);
  // }, [imageArray]);

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);

  return (
    <>
      <header>
        <h1>Memory Game</h1>
        <div className="scoreboard-container">
          <h6>Score:</h6>
          <h6>High Score:</h6>
        </div>
      </header>
      <main className="card-container">
        {selectedImages.map((image) => (
          <Card
            key={crypto.randomUUID()}
            url={image.images?.original.url}
            alt={image.title}
          />
        ))}
      </main>
    </>
  );
}

export default App;
