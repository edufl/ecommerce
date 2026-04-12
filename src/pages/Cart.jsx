import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import "../index.css";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  } = useCart();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  if (cart.length === 0) {
    return <h2 style={{ padding: "20px" }}>Carrinho vazio</h2>;
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 20;
  const tax = subtotal * 0.1;

  const total = subtotal + shipping + tax - discount;

  function applyCoupon() {
    if (coupon === "DESCONTO10") {
      const value = subtotal * 0.1;
      setDiscount(value);
      toast.success("Cupom aplicado 🎉");
    } else {
      setDiscount(0);
      toast.error("Cupom inválido ❌");
    }
  }

  return (
    <div className="cart-container">
      
      {/* ESQUERDA */}
      <div className="cart-left">
        <h2>Seu carrinho</h2>

        {cart.map((item) => (
          <div key={item.id} className="cart-card">
            <img src={item.thumbnail} alt={item.title} />

            <div className="cart-info">
              <h3>{item.title}</h3>
              <p>R$ {item.price}</p>

              <div className="qty">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DIREITA */}
      <div className="cart-right">

        <h2>Resumo</h2>

        {/* CUPOM */}
        <p>Você tem um código promocional?</p>

        <input
          type="text"
          placeholder="Digite DESCONTO10"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="coupon-input"
        />

        <button className="coupon-btn" onClick={applyCoupon}>
          Aplicar
        </button>

        <hr />

        {/* VALORES */}
        <div className="price-row">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>

        <div className="price-row">
          <span>Envio</span>
          <span>R$ {shipping.toFixed(2)}</span>
        </div>

        <div className="price-row">
          <span>Imposto ⓘ</span>
          <span>R$ {tax.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="price-row" style={{ color: "green" }}>
            <span>Desconto</span>
            <span>- R$ {discount.toFixed(2)}</span>
          </div>
        )}

        <hr />

        <div className="price-row total">
          <span>Total estimado</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>

        <Link to="/checkout">
          <button>Confira</button>
        </Link>

        <button onClick={clearCart} className="clear-btn">
          Limpar carrinho
        </button>

        <p className="help">
          Precisa de ajuda? 📞 +55 01-0001-00001
        </p>

      </div>
    </div>
  );
}

export default Cart;