import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import "../index.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const data = await getProducts();
        setProducts(data);

      } catch (err) {
        console.error(err);
        setError(true);

      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const categories = ["all", ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "all" || product.category === category;

    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <div className="container">
        <h2>Carregando produtos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2>Erro ao carregar produtos 😢</h2>
        <button onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container">

      {/* HERO */}
      <div className="hero">
        <h1>🛒 Loja Online</h1>
        <p>Os melhores produtos com os melhores preços</p>
      </div>

      {/* BUSCA */}
      <input
        className="search"
        type="text"
        placeholder="Buscar produto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CATEGORIAS BONITAS */}
      <div className="categories">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUTOS */}
      <div className="grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}

export default Home;