import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Failed to load product"));
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 text-center">
      <img src={product.image} alt={product.title} className="h-64 mx-auto object-contain" />
      <h2 className="text-2xl font-semibold mt-4">{product.title}</h2>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-blue-600 font-bold mt-3">${product.price}</p>
    </div>
  );
}
