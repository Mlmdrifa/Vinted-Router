import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ search, priceMini, priceMax, sort }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&priceMin=${priceMini}&priceMax=${priceMax}&sort=${sort}`
        );
        // console.log( response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [search, sort, priceMini, priceMax]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="hero">
        <div className="hero-inter">
          <h3>Prêts à faire du tri dans vos placards?</h3>

          <Link className="hero-button" to="/publish">
            <button>Commencer à vendre</button>
          </Link>
        </div>
      </div>

      <section className="product-name">
        {data.offers.map((offer, index) => {
          console.log(offer);
          return (
            <Link to={`/offers/${offer._id}`} key={index}>
              <article>
                <div className="product">
                  {offer.owner.account.avatar && (
                    <img
                      className="avatar"
                      src={offer.owner.account.avatar.secure_url}
                      alt={offer.owner.account.username}
                    />
                  )}
                  <span>{offer.owner.account.username}</span>
                </div>
                <div className="card-username">
                  <img
                    key={index}
                    src={offer.product_image.secure_url}
                    alt={offer.product_name}
                  />
                </div>

                <p>{offer.product_price}€</p>
                {offer.product_details.map((detail, index) => {
                  if (detail.MARQUE || detail.TAILLE) {
                    return <p key={index}>{detail.MARQUE || detail.TAILLE}</p>;
                  } else {
                    return null;
                  }
                })}
              </article>
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default Home;
