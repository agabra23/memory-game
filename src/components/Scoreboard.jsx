export default function Scoreboard({ score, highScore }) {
  return (
    <div className="scoreboard-container">
      <h6>Score: {score}</h6>
      <h6>High Score: {highScore}</h6>
    </div>
  );
}
