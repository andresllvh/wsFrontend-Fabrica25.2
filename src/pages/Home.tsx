import { useEffect, useMemo, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { getPokemonList } from "../services/pokeApi";

type Item = { id: number; name: string; imageUrl: string; types: string[] };

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      const list = await getPokemonList(151);
      setItems(list);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? items.filter(
          (p) =>
            p.name.toLowerCase().includes(q) || String(p.id).includes(q)
        )
      : items;
  }, [items, query]);

  return (
    <>
      <section className="hero">
        <h1>Encontre todos os pokémons em um só lugar</h1>
        <div className="search">
          <input
            placeholder="Digite o nome ou número do Pokémon..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Cards */}
      <section className="cards">
        {filtered.map((p) => (
          <PokemonCard
            key={p.id}
            id={p.id}
            name={p.name}
            imageUrl={p.imageUrl}
            types={p.types}
          />
        ))}
      </section>
    </>
  );
}
