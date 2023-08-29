import Image from "../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
// import { Range } from "react-range";

import Cookies from "js-cookie";

const Header = ({ token, handleToken, search, setSearch }) => {
  return (
    <header>
      <Link to={"./"}>
        <img src={Image} alt="logo" />
      </Link>
      <input
        type="text"
        value={search}
        placeholder="Rechercher des articles"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      {token ? (
        <>
          <Link to={"./"}>
            <button
              onClick={() => {
                handleToken(null);
              }}
            >
              Se déconnecter
            </button>
          </Link>
        </>
      ) : (
        <>
          {/* <span>trier par prix</span> */}

          <Link to="/signup">S'inscrire</Link>
          <Link to="/login">Se connecter</Link>
        </>
      )}
      <Link to={token ? "/publish" : "/login"}>Vends tes articles</Link>
    </header>
  );
};
export default Header;
