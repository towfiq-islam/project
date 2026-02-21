"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, Heart, Share2, Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/Context/CartContext";
import axiosInstance from "@/lib/axios";
import RelatedProducts from "../_Components/RelatedProducts";
import SizeChartModal from "../_Components/SizeChartModal";
import ImagePreviewModal from "../_Components/ImagePreviewModal";

const COLORS = [
  { name: "Black", code: "#253043" },
  { name: "White", code: "#707E6E" },
];

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

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

  const getFourImages = (images = []) => {
    if (!images.length) return [];

    const result = [...images];

    while (result.length < 4) {
      result.push(images[result.length % images.length]);
    }

    return result.slice(0, 4);
  };

  const displayImages = getFourImages(productDetails?.images);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left */}
          <div className="grid grid-cols-2 gap-3">
            {displayImages?.map((image, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setPreviewImage(image);
                  setIsPreviewOpen(true);
                }}
                className="bg-gray-100 cursor-pointer rounded-2xl w-full h-[350px] overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${productDetails?.title} image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {productDetails?.title}
            </h1>

            <p className="text-blue-600 text-xl font-bold mb-4">
              ${productDetails?.price?.toFixed(2)}
            </p>

            {/* COLOR */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase mb-3">Color</h3>
              <div className="flex gap-3">
                {COLORS.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      selectedColor === idx ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.code }}
                  />
                ))}
              </div>
            </div>

            {/* SIZE */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold uppercase">Size</h3>

                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-xs cursor-pointer underline text-gray-500 hover:text-black"
                >
                  Size chart
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {[
                  "38",
                  "39",
                  "40",
                  "41",
                  "42",
                  "43",
                  "44",
                  "45",
                  "46",
                  "47",
                ].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-lg text-sm font-medium transition ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="space-y-3">
              <div className="flex gap-3">
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

                <button className="w-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                BUY IT NOW
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">About the product</h3>
              <p className="text-sm text-gray-600">
                {productDetails?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <RelatedProducts relatedProducts={relatedProducts} />
        </div>
      </div>

      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
      />

      <ImagePreviewModal
        isOpen={isPreviewOpen}
        image={previewImage}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
