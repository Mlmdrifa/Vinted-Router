import Image from "../assets/logo.jpeg";

const Header = () => {
  return (
    <header className="container">
      <img src={Image} alt="" />

      <input type="text" placeholder="recherche des articles" />

      <button>S'inscrire</button>
      <button>Se connecter </button>
      <button> Vends tes articles</button>
    </header>
  );
};

export default Header;
