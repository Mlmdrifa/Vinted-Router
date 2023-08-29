import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <form
        className="signup-form"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/login",
              {
                email,
                password,
              }
            );
            console.log(response.data);
            handleToken(response.data.token);
            navigate("/");
          } catch (error) {
            alert(
              "Vous avez saisi un mauvais e-mail ou mot de passe ! Si vous n'avez pas de compte, inscrivez-vous."
            );

            console.log(error.response.data);
          }
        }}
      >
        <h2>Se connecter</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button className="form-validation" type="submit" value="Se connecter">
          {/* Se connecter */}
        </button>
        <Link to="/signup"> Pas encore de compte ? Inscris-toi !</Link>
      </form>
    </div>
  );
};

export default Login;
