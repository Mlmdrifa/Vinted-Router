import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {/* //   isLoading ? <span>En cours de chargement... </span> : <></>; */}
    </>
  );
};

export default Login;
