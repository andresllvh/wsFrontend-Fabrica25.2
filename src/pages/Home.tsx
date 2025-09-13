import React, { useEffect, useState } from 'react';
import { getPokemons } from '../services/pokeApi';
import PokemonCard from '../components/PokemonCard';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemons();
      setPokemons(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Pokémons</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemons.map((pokemon: any) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            image={pokemon.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
