import { useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import "../index.css";

function Checkout() {
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    numero: "",
    validade: "",
    cvv: ""
  });

  const [success, setSuccess] = useState(false);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 20;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { nome, endereco, numero, validade, cvv } = form;

    if (!nome || !endereco || !numero || !validade || !cvv) {
      toast.error("Preencha todos os campos ❌");
      return;
    }

    toast.loading("Processando pagamento...");

    setTimeout(() => {

      toast.dismiss();
      toast.success("Pagamento aprovado 🎉");

      // 🔥 SALVAR PEDIDO
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

      savedOrders.push({
        items: cart,
        total: total.toFixed(2),
        date: new Date().toLocaleString()
      });

      localStorage.setItem("orders", JSON.stringify(savedOrders));

      setSuccess(true);
      clearCart();

    }, 2000);
  }

  if (success) {
    return (
      <div className="checkout-success">
        <h1>✅ Pedido realizado!</h1>
        <p>Obrigado pela compra, {form.nome} 🎉</p>
        <h2>Total pago: R$ {total.toFixed(2)}</h2>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      
      {/* ESQUERDA */}
      <div className="checkout-left">
        <h2>Endereço de entrega</h2>

        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
        />

        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
        />

        <h2>Pagamento</h2>

        <input
          type="text"
          name="numero"
          placeholder="Número do cartão"
          value={form.numero}
          onChange={handleChange}
        />

        <div className="row">
          <input
            type="text"
            name="validade"
            placeholder="Validade"
            value={form.validade}
            onChange={handleChange}
          />

          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={form.cvv}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* DIREITA */}
      <div className="checkout-right">
        <h2>Resumo do pedido</h2>

        {cart.map((item) => (
          <div key={item.id} className="checkout-item">
            <span>
              {item.title} x{item.quantity}
            </span>
            <span>
              R$ {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <hr />

        <div className="price-row">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>

        <div className="price-row">
          <span>Envio</span>
          <span>R$ {shipping.toFixed(2)}</span>
        </div>

        <div className="price-row">
          <span>Imposto</span>
          <span>R$ {tax.toFixed(2)}</span>
        </div>

        <hr />

        <div className="price-row total">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>

        <button onClick={handleSubmit}>
          Finalizar pedido
        </button>
      </div>
    </div>
  );
}

export default Checkout;