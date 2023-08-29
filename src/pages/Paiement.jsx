import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import CheckoutForm from "../components/CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51IpvphDqQKb3lCIT3UU1fIPnAXyyG57gLns831kNwLVGCFo1a3MtSucuiIwEijgip8fL85zUlKZKTK0a2JAhSWHt00ZWSjTErF"
);
const token = Cookies.get("token");

function Paiement() {
  return token ? (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default Paiement;
