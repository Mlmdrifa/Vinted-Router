import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Signup = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5173/signup");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  return (
    //   isLoading ? (
    //     <span>En cours de chargement... </span>
    //   ) : (
    <>
      <div className="container">
        <div className="signup">
          <div className="inscription">
            <h2>S'inscrire</h2>
          </div>
          {/* <div> */}
          <form>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={username}
              placeholder="Nom d'utilisateur"
              onChange={handleUsernameChange}
            />
            <br />

            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <br />
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Mot de passe"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            <br />

            <div className="checkbox-container">
              <input type="checkbox" name="" id="" />
              <span className="check">S'inscrire à notre newsletter</span>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>

            <button type="submit">S'inscrire</button>
          </form>
          <a href="/login">Tu as un déjà un compte ? Connecte-toi !</a>
        </div>
      </div>
    </>
  );
};

export default Signup;
