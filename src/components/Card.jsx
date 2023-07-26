export default function Card({ url, alt, shuffleImages }) {
  return (
    <div className="card-cell-container">
      <button className="card-btn" onClick={shuffleImages}>
        <img width="100px" src={url} alt={alt} />
      </button>
    </div>
  );
}
