import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckOutForm = ({ token, title, price }) => {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const fraisProtection = Number(1);
  const fraisDePort = Number(2);
  const total = fraisDePort + fraisProtection + price;
  // console.log(price);
  // console.log(typeof price, typeof fraisDePort, typeof fraisProtection);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: token,
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/payment",

        {
          token: stripeToken,
          title: title,
          amount: total,
        }
      );
      console.log("===>", response.data);
      setIsLoading(false);
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="paiement" onSubmit={handleSubmit}>
      <h1>Résumé de la commande</h1>
      <br />
      <section>
        <ul>
          <li>
            Commande <span>{price} €</span>
          </li>
          <br />
          <li>
            Frais de protection acheteurs
            <span>{fraisProtection}</span>
          </li>
          <br />
          <li>
            Frais de port
            <span>{fraisDePort}</span>
          </li>
          <br />
          <li>
            Total
            <span>{total}€</span>
          </li>
          <br />
          <div>
            <span>
              Il ne vous reste plus qu'un étape pour vous offrir{title}. Vous
              allez payer {total} € (frais de protection et frais de port
              inclus).
            </span>
          </div>
          <br />

          <CardElement />
          {completed === true ? (
            <p>Merci pour votre achat.</p>
          ) : (
            <input type="submit" disabled={isLoading} />
          )}
        </ul>
      </section>
    </form>
  );
};

export default CheckOutForm;
