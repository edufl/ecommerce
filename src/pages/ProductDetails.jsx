import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import "../index.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Carregando produto...</h2>;
  }

  if (!product) {
    return <h2 style={{ padding: "20px" }}>Produto não encontrado</h2>;
  }

  function handleAdd() {
    addToCart(product);
    toast.success("Adicionado ao carrinho 🛒");
  }

  return (
    <div className="details-container">

      {/* IMAGEM */}
      <div className="details-img">
        <img src={product.thumbnail} alt={product.title} />
      </div>

      {/* INFO */}
      <div className="details-info">
        <h1>{product.title}</h1>

        <p className="category">{product.category}</p>

        <p className="description">
          {product.description}
        </p>

        <h2 className="price">R$ {product.price}</h2>

        <button onClick={handleAdd}>
          Adicionar ao carrinho
        </button>
      </div>

    </div>
  );
}

export default ProductDetails;