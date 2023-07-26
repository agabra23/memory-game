export default function Card({ url, alt }) {
  return (
    <button className="card-btn">
      <img width="100px" src={url} alt={alt} />
    </button>
  );
}
