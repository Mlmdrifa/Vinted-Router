import Image from "../assets/logo.jpeg";
import { Link } from "react-router-dom";
// import { Range } from "react-range";

const Header = ({
  token,
  handleToken,
  search,
  setSearch,
  sortPrice,
  // setSortPrice,
}) => {
  return (
    <header className="container">
      <Link to={"./"}>
        <img src={Image} alt="logo" />
      </Link>
      <input
        className="search-input"
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
          <span> Trier par prix :</span>
          {/* <Range={} /> */}
          <span className="checkbox">
            <input
              type="checkbox"
              checked={sortPrice}
              onChange={() => {}}
              name="price"
            />
            {/* <div
              className="desc"
              onClick={() => {
                setSortPrice(!sortPrice);
              }}
            >
              <div className="filter">
                <span>{sortPrice ? "asc" : "desc"}</span>
              </div> */}
            {/* </div> */}
          </span>
          <div>
            <Link className="header-signup" to="/signup">
              S'inscrire
            </Link>
            <Link className="header-login" to="/login">
              Se connecter
            </Link>
          </div>
        </>
      )}

      <div>
        <Link className="header-salt" to={token ? "/publish" : "/login"}>
          Vends tes articles
        </Link>
      </div>
    </header>
  );
};
export default Header;
