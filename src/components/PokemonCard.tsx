import { Link } from "react-router-dom";
import { useFavorites } from "../state/useFavorites";

type Props = {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
};

const typeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function PokemonCard({ id, name, imageUrl, types }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const mainType = types[0]?.toLowerCase() || "normal";
  const bgColor = typeColors[mainType] || "#888";

  return (
    <Link to={`/detalhes/${id}`} className="card" style={{ backgroundColor: bgColor }}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(id);
        }}
        className="fav-btn"
      >
        {isFavorite(id) ? "★" : "☆"}
      </button>

      <div className="number">#{String(id).padStart(3, "0")}</div>
      <h3 className="name">{name}</h3>

      <div className="types">
        {types.map((t) => (
          <span key={t} className={`type-tag type-${t.toLowerCase()}`}>
            {t}
          </span>
        ))}
      </div>

      <div className="image-wrap">
        <img src={imageUrl} alt={name} />
      </div>
    </Link>
  );
}