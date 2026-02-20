"use client";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export function NewDrops() {
  const navigate = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, image_urls")
        .limit(4);

      if (data) setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  // useEffect(() => {
  //   loadProducts();
  // }, []);

  // const loadProducts = async () => {
  //   const { data } = await supabase
  //     .from("products")
  //     .select("id, name, price, image_urls")
  //     .limit(4);
  //   if (data) {
  //     setProducts(data);
  //   }
  //   setLoading(false);
  // };

  if (loading) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          DONT MISS OUT
          <br />
          NEW DROPS
        </h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors">
          Shop <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="group">
            <div className="bg-gray-100 rounded-2xl overflow-hidden mb-3 aspect-square">
              <img
                src={product.image_urls[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-medium text-sm mb-2">{product.name}</h3>
            <p className="text-blue-600 font-bold text-sm mb-2">
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={() => navigate.push(`/product/${product.id}`)}
              className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
