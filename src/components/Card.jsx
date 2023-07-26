export default function Card({ url, alt, cardClickHandler }) {
  return (
    <div className="card-cell-container">
      <button className="card-btn" onClick={cardClickHandler}>
        <img width="100px" src={url} alt={alt} />
      </button>
    </div>
  );
}
