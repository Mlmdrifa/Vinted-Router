import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = (token, title, price) => {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const fraisProtection = Number(1);
  const fraisDePort = Number(2);
  const total = fraisDePort + fraisProtection + price;

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
        "https://lereacteur-vinted-api.herokuapp.com/paiement",
        {
          token: stripeToken,
          title: title,
          amount: price,
        }
      );
      console.log(response.data);

      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Formulaire de paiement</h1>
      <div>
        <span>Commande</span>
        <span>{price}</span>
      </div>
      <div>
        <span>Frais de protection acheteurs</span>
        <span>{fraisProtection}</span>
      </div>
      <div>
        <span>Frais de port</span>
        <span>{fraisDePort}</span>
      </div>
      <div>
        <span>Total</span>
        <span>{total}</span>
      </div>
      <div>
        <span>
          Il ne vous reste plus qu'un étape pour vous offrir{title} Vous allez
          payer {total} € (frais de protection et frais de port inclus).
        </span>
      </div>

      <CardElement />
      {completed === true ? (
        <p>Payement Completed</p>
      ) : (
        <input type="submit" disabled={isLoading} />
      )}
    </form>
  );
};

export default CheckoutForm;
