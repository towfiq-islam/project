"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, Heart, Share2, Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/Context/CartContext";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

const COLORS = [
  { name: "Black", code: "#000000" },
  { name: "White", code: "#ffffff" },
  { name: "Red", code: "#ef4444" },
];

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useCart();

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProductLoading, setRelatedProductLoading] = useState(true);
  const [added, setAdded] = useState(false);

  // Data fetching
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/products/${id}`);
        setProductDetails(data);
        setSelectedSize(SIZES[0]);
        setSelectedImage(0);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Data fetching for related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setRelatedProductLoading(true);
        const { data } = await axiosInstance.get(`/products/${id}/related`);
        setRelatedProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setRelatedProductLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [id]);

  const handleAddToCart = () => {
    if (!productDetails || !selectedSize) return;

    const cartItem = {
      id: `${productDetails.id}-${Date.now()}`,
      productId: productDetails.id,
      name: productDetails.title,
      price: productDetails.price,
      image: productDetails.images?.[0],
      size: selectedSize,
      color: COLORS[selectedColor]?.name,
      quantity,
    };

    addItem(cartItem);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">Product not found</div>
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 hover:text-blue-700"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="bg-gray-100 rounded-2xl aspect-square mb-4 overflow-hidden">
              <img
                src={productDetails?.images?.[selectedImage]}
                alt={productDetails?.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {productDetails?.images?.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-blue-600"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${productDetails?.title} image ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {productDetails?.title}
            </h1>
            <p className="text-blue-600 text-xl font-bold mb-4">
              ${productDetails?.price?.toFixed(2)}
            </p>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">(234 reviews)</span>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Color</h3>
              <div className="flex gap-3">
                {COLORS.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === idx
                        ? "border-gray-900"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 rounded-lg border-2 font-medium transition-all ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 text-gray-900 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={e =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center border border-gray-300 rounded-lg py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to cart
                  </>
                ) : (
                  "ADD TO CART"
                )}
              </button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">About the product</h3>
              <p className="text-sm text-gray-600">
                {productDetails?.description}
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium">$6.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Returns</span>
                <span className="font-medium">Free</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts?.map(relProduct => (
              <div key={relProduct?.id} className="group text-left">
                <div className="bg-gray-100 rounded-2xl overflow-hidden mb-3 aspect-square">
                  <img
                    src={relProduct?.images[0]}
                    alt={relProduct?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-medium text-sm mb-2">
                  {relProduct?.title}
                </h3>

                <p className="text-blue-600 font-bold">${relProduct?.price}</p>

                <Link
                  href={`/product/${relProduct?.id}`}
                  className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors mt-3 block text-center"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
