import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      
      <Link to="/" className="logo pokedex-logo">
        Pokédex
      </Link>

      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => `btn-nav ${isActive ? "active" : ""}`}
        >
          Início
        </NavLink>

        <NavLink
          to="/favoritos"
          className={({ isActive }) => `btn-nav ${isActive ? "active" : ""}`}
        >
          Favoritos
        </NavLink>
      </nav>
    </header>
  );
}
