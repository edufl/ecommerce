import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    senha: ""
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleLogin(e) {
    e.preventDefault();

    const { email, senha } = form;

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    // 💡 login fake
    login(email);

    navigate("/");
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Entrar</h2>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={form.email}
            onChange={handleChange}
          />

          <label>Senha</label>
          <input
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            value={form.senha}
            onChange={handleChange}
          />

          <button type="submit">
            Entrar
          </button>
        </form>

        <p className="login-footer">
          Qualquer email e senha funcionam 😎
        </p>
      </div>
    </div>
  );
}

export default Login;