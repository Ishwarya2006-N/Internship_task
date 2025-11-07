import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Loading products...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🛍️ Product List
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 object-contain mb-4"
            />
            <h2 className="text-md font-semibold mb-2 line-clamp-2 text-gray-700">
              {product.title}
            </h2>
            <p className="text-lg font-bold text-blue-600 mt-auto">
              ₹{(product.price * 83).toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
