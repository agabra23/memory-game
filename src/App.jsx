import { useEffect, useState } from "react";

function App() {
  const ENDPOINT =
    "https://api.giphy.com/v2/emoji?api_key=jLvjxLBegqMPTsPVnfAGVjxVZVqnkQdU&limit=10&offset=0";

  const [display, setDisplay] = useState("");

  useEffect(() => {
    const fetchEmojis = async () => {
      const response = await fetch(ENDPOINT);
      const data = await response.json();
      setDisplay(JSON.stringify(data, null, 6));
      console.log(data);
    };

    fetchEmojis();
  }, []);

  return (
    <p>
      <pre>{display}</pre>
    </p>
  );
}

export default App;
