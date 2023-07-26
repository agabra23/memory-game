export default function Card({ url, alt }) {
  return (
    <button className="card-btn">
      <img src={url} alt={alt} />
    </button>
  );
}
