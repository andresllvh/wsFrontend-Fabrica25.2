import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-red-600 text-white p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">Pokédex</h1>
    <nav className="space-x-4">
      <Link to="/" className="hover:underline">Início</Link>
      <Link to="/favoritos" className="hover:underline">Favoritos</Link>
    </nav>
  </header>
);

export default Header;
