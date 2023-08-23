import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Offer = () => {
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
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
      <div className="offer">
        <div className="offer-img">
          <img src={data.product_image.secure_url} alt="" />
        </div>
        <div className="offer-details">
          {data.product_details.map((details) => {
            return (
              <div key={id}>
                <span> {details.MARQUE} </span>
                <span>{details.ETAT}</span>
                <span>{details.COULEUR}</span>
                <span>{details.EMPLACEMENT}</span>
              </div>
            );
          })}
          <div>
            <p>{data.product_price}</p>
            <p>{data.product_description}</p>
            <button>Acheter</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
