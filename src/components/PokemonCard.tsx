import React from 'react';

interface PokemonCardProps {
  name: string;
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 text-center">
      <img src={image} alt={name} className="w-24 h-24 mx-auto" />
      <h3 className="text-lg font-bold mt-2 capitalize">{name}</h3>
      <button className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
  Favoritar
</button>

    </div>
  );
};

export default PokemonCard;
