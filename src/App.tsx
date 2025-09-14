import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";
import "./App.css"; 

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detalhes/:id" element={<Details />} />
          <Route path="/favoritos" element={<Favorites />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}