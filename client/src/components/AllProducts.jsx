import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/products`
        );

        console.log("all products", res.data);

        if (isMounted) {
          setProducts(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching products:", err.message);

        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl px-4">

      {/* Title */}
      <div className="mt-10 mb-6 text-2xl font-semibold">
        All Products
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error while fetching: {error.message}</p>}

      {/* Grid Layout */}
      <div className="grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        gap-4">

        {(Array.isArray(products) ? products : []).map((product) => (
          <ProductCard
            key={product._id || product.id}
            product={product}
            home={false}
          />
        ))}

      </div>
    </div>
  );
};

export default AllProducts;