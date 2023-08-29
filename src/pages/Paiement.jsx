import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import CheckoutForm from "../components/CheckOutForm";

import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);
const token = Cookies.get("token");

function Paiement() {
  // console.log({ title, price });
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;
  const { name } = location.state;

  return token ? (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price} title={title} name={name} />
      </Elements>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default Paiement;
