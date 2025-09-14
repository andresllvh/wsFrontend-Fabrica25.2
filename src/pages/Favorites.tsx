import { useFavorites } from "../state/useFavorites";
import { getPokemonDetails } from "../services/pokeApi";
import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";

type Poke = { id: number; name: string; imageUrl: string; types: string[] };

export default function Favorites() {
  const { favorites } = useFavorites();
  const [pokemons, setPokemons] = useState<Poke[]>([]);

  useEffect(() => {
    (async () => {
      const list: Poke[] = [];
      for (const id of favorites) {
        const p = await getPokemonDetails(id);
        list.push(p);
      }
      setPokemons(list);
    })();
  }, [favorites]);

  return (
    <main className="favorites">
      <h1>Meus Favoritos</h1>

      {favorites.length === 0 ? (
        <p>Você ainda não adicionou nenhum Pokémon aos favoritos.</p>
      ) : (
        <div className="cards">
          {pokemons.map((p) => (
            <PokemonCard
              key={p.id}
              id={p.id}
              name={p.name}
              imageUrl={p.imageUrl}
              types={p.types}
            />
          ))}
        </div>
      )}
    </main>
  );
}
