import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div style={{
      background: "#131921",
      color: "#fff",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <Link to="/" style={{ color: "#fff" }}>
        Loja
      </Link>

      <div>
        <Link to="/cart" style={{ color: "#fff", marginRight: "15px" }}>
          Carrinho ({totalItems})
        </Link>

        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              {user.email}
            </span>

            <button onClick={logout}>
              Sair
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: "#fff" }}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;