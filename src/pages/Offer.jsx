import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <div>
        <img src={data.product_image.secure_url} alt={data.product_name} />
        <p>{data.product_price} €</p>
        {data.product_details.map((detail, index) => {
          console.log(detail);
          const keys = Object.keys(detail);
          // console.log(keys);
          const key = keys[0];
          // console.log(key);
          return (
            <p key={index}>
              {key} : {detail[key]}
            </p>
          );
        })}

        <Link
          to="/paiement"
          state={{ title: data.product_name, price: data.product_price }}
        >
          <button>Achetez</button>
        </Link>
      </div>
    </>
  );
};

export default Offer;
