import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonDetails } from "../services/pokeApi";
import { useFavorites } from "../state/useFavorites";

type Stat = { name: string; value: number };
type PokeDetails = {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  weightKg: number;
  heightM: number;
  stats: Stat[];
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

export default function Details() {
  const { id } = useParams();
  const nav = useNavigate();
  const [pokemon, setPokemon] = useState<PokeDetails | null>(null);

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    (async () => {
      if (id) {
        const p = await getPokemonDetails(Number(id));
        setPokemon(p);
      }
    })();
  }, [id]);

  if (!pokemon) return <section className="detail-wrap"><p>Carregando…</p></section>;

  const mainType = pokemon.types[0]?.toLowerCase() || "normal";
  const bgColor = typeColors[mainType] || "#888";

  return (
    <section className="detail-wrap">
      <button onClick={() => nav(-1)} className="btn">← Voltar</button>

      <div className="detail">
        <div className="image-wrap">
          <div className="circle" />
          <img src={pokemon.imageUrl} alt={pokemon.name} />
        </div>

        <div className="panel" style={{ backgroundColor: bgColor }}>
          <div className="number">#{String(pokemon.id).padStart(3, "0")}</div>
          <h1>{pokemon.name}</h1>

          <div className="meta">
            {pokemon.types.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <div className="kv">
            <div>
              <div className="muted">Peso</div>
              <b>{pokemon.weightKg.toFixed(1)}kg</b>
            </div>
            <div>
              <div className="muted">Altura</div>
              <b>{pokemon.heightM.toFixed(1)}m</b>
            </div>
          </div>

          <button onClick={() => toggleFavorite(pokemon.id)} className="btn">
            {isFavorite(pokemon.id) ? "★ Remover dos favoritos" : "☆ Adicionar aos favoritos"}
          </button>
        </div>
      </div>
    </section>
  );
}
