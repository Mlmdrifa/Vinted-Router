import Image from "../assets/logo.jpeg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container">
      <img src={Image} alt="" />

      <input type="text" placeholder="recherche des articles" />
      <Link to="/signup">
        <button>S'inscrire</button>
      </Link>

      <Link to="/login">
        <button>Se connecter </button>
      </Link>

      <button> Vends tes articles</button>
    </header>
  );
};

export default Header;
