import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="hero">
        <div className="hero-inter">
          <h3>Prêts à faire du tri dans vos placards?</h3>
          <button>Commencer à vendre</button>
        </div>
      </div>

      <section className="product-name">
        {data.offers.map((offers, index) => {
          console.log(offers);
          return (
            <Link to={`/offer/${offers._id}`} key={index}>
              <div className="product">
                <p>{offers.product_name}</p>
                <img key={index} src={offers.product_image.secure_url} alt="" />
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default Home;
