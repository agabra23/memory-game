import { useEffect, useState } from "react";
import "./styles/App.css";

function App() {
  const ENDPOINT =
    "https://api.giphy.com/v2/emoji?api_key=jLvjxLBegqMPTsPVnfAGVjxVZVqnkQdU&limit=10&offset=0";

  const [display, setDisplay] = useState("");
  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      const response = await fetch(ENDPOINT, { mode: "cors" });
      const data = await response.json();
      setDisplay(JSON.stringify(data, null, 6));

      setImageArray(data.data);
    };

    fetchEmojis();
  }, []);

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
        {imageArray.map((image) => (
          <Card url={image.images?.original.url} alt={image.title} />
        ))}
      </main>
    </>
  );
}

export default App;
