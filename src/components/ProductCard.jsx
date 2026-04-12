import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../index.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleAddToCart() {
    // 🔥 BLOQUEIO SE NÃO ESTIVER LOGADO
    if (!user) {
      alert("Você precisa estar logado!");
      navigate("/login");
      return;
    }

    addToCart(product);
  }

  return (
    <div className="card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={product.thumbnail} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      
      <p>R$ {product.price}</p>

      <button onClick={handleAddToCart}>
        Adicionar ao carrinho
      </button>

      <Link to={`/product/${product.id}`}>
        
      </Link>
    </div>
  );
}

export default ProductCard;