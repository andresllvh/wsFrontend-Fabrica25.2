const BASE = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit = 151) {
  const res = await fetch(`${BASE}/pokemon?limit=${limit}`);
  const data = await res.json();
  const detailed = await Promise.all(
    data.results.map(async (r: any) => {
      const d = await fetch(r.url).then((x) => x.json());
      const image =
        d.sprites?.other?.["official-artwork"]?.front_default ||
        d.sprites?.front_default || "";
      return {
        id: Number(d.id),
        name: String(d.name),
        imageUrl: image,
        types: (d.types || []).map((t: any) => t.type?.name ?? ""),
      };
    })
  );
  return detailed as { id:number; name:string; imageUrl:string; types:string[] }[];
}

export async function getPokemonDetails(id: number) {
  const d = await fetch(`${BASE}/pokemon/${id}`).then((x) => x.json());
  const image =
    d.sprites?.other?.["official-artwork"]?.front_default ||
    d.sprites?.front_default || "";
  return {
    id: Number(d.id),
    name: String(d.name),
    imageUrl: image,
    types: (d.types || []).map((t: any) => t.type?.name ?? ""),
    weightKg: Number(d.weight || 0) / 10,
    heightM: Number(d.height || 0) / 10,
    stats: (d.stats || []).map((s: any) => ({ name: s.stat?.name ?? "", value: Number(s.base_stat) || 0 })),
  };
}
