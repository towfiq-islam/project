"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, Heart, Check, ChevronRight, ZoomIn } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/Context/CartContext";
import axiosInstance from "@/lib/axios";
import RelatedProducts from "../_Components/RelatedProducts";
import SizeChartModal from "../_Components/SizeChartModal";
import ImagePreviewModal from "../_Components/ImagePreviewModal";
import { PromoBanner } from "@/app/_Components/PromoBanner";

const COLORS = [
  { name: "Shadow Navy", code: "#253043" },
  { name: "Army Green", code: "#707E6E" },
];

const SIZES = ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"];

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
  const [selectedSize, setSelectedSize] = useState("38");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProductLoading, setRelatedProductLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/products/${id}`);
        setProductDetails(data);
        setSelectedImage(0);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

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

  const getFourImages = (images = []) => {
    if (!images.length) return [];
    const result = [...images];
    while (result.length < 4) {
      result.push(images[result.length % images.length]);
    }
    return result.slice(0, 4);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-secondary-black tracking-[0.2em] uppercase font-medium">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">Product not found</div>
          <button
            onClick={() => router.push("/")}
            className="text-black underline hover:no-underline text-sm"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  const displayImages = getFourImages(productDetails?.images);

  return (
    <>
      <div className="container mx-auto px-4 md:px-7 lg:px-10 xl:px-16 2xl:px-16">
        <div className="py-6">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-black transition-colors my-3 lg:my-5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to home</span>
          </button>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-5 lg:mb-16 lg:items-start">
            {/* ===== LEFT: IMAGES ===== */}

            {/* Desktop: 2x2 grid */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {displayImages.map((image, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setPreviewImage(image);
                    setIsPreviewOpen(true);
                  }}
                  className="group relative bg-[#EAEAE4] rounded-2xl overflow-hidden cursor-zoom-in h-[320px]"
                >
                  <img
                    src={image}
                    alt={`${productDetails?.title} view ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: Carousel */}
            <div className="lg:hidden">
              <div
                className="relative bg-[#EAEAE4] rounded-2xl overflow-hidden"
                style={{ height: "360px" }}
              >
                <img
                  src={displayImages[selectedImage]}
                  alt={`${productDetails?.title}`}
                  className="w-full h-full object-cover"
                />
                {/* Prev/Next */}
                {selectedImage > 0 && (
                  <button
                    onClick={() => setSelectedImage(prev => prev - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
                {selectedImage < displayImages.length - 1 && (
                  <button
                    onClick={() => setSelectedImage(prev => prev + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {displayImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`rounded-full transition-all ${selectedImage === idx ? "w-5 h-1.5 bg-black" : "w-1.5 h-1.5 bg-black/30"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Mobile thumbnail strip */}
              <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                {displayImages.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 size-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ===== RIGHT: PRODUCT INFO ===== */}
            <div className="flex flex-col gap-5">
              {/* Badge */}
              <div>
                <span className="inline-block bg-primary-blue text-white text-xs font-semibold px-3 py-1.5 rounded-lg tracking-wide uppercase">
                  New Release
                </span>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary-black leading-tight tracking-tight uppercase mb-2">
                  {productDetails?.title}
                </h2>

                <p className="text-2xl font-bold text-black">
                  ${productDetails?.price?.toFixed(2)}
                </p>
              </div>

              {/* Color */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2.5">
                  Color
                </h3>
                <div className="flex items-center gap-3">
                  {COLORS.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      title={color.name}
                      className={`w-8 h-8 cursor-pointer rounded-full border-2 transition-all ${
                        selectedColor === idx
                          ? "border-black scale-110 shadow-md"
                          : "border-transparent hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color.code }}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1.5">
                  {COLORS[selectedColor]?.name} /{" "}
                  {COLORS.map(c => c.name).join(" / ")}
                </p>
              </div>

              {/* Size */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Size
                  </h3>
                  <button
                    onClick={() => setIsSizeChartOpen(true)}
                    className="text-xs cursor-pointer font-semibold uppercase tracking-wider text-black underline underline-offset-2 hover:no-underline transition-all"
                  >
                    Size Chart
                  </button>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-5 gap-2">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 cursor-pointer rounded-lg text-sm font-semibold transition-all ${
                        selectedSize === size
                          ? "bg-black text-white shadow-md"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2.5 pt-1">
                <div className="flex gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 cursor-pointer py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                      added
                        ? "bg-green-600 text-white"
                        : "bg-secondary-black text-white hover:bg-black active:scale-[0.98]"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added to Cart
                      </>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>

                  <button
                    onClick={() => setIsWishlisted(v => !v)}
                    className={`w-12 cursor-pointer flex items-center justify-center rounded-xl border transition-all ${
                      isWishlisted
                        ? "bg-red-50 border-red-300 text-red-500"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </button>
                </div>

                <button className="w-full cursor-pointer bg-primary-blue text-white py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all active:scale-[0.98]">
                  Buy It Now
                </button>
              </div>

              {/* About */}
              <div>
                <h3 className="font-bold text-[15px] uppercase tracking-wider mb-2 lg:mb-3">
                  About the Product
                </h3>

                <p className="text-[15px] text-gray-600 leading-relaxed lg:mb-4">
                  {productDetails?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="pt-4">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6">
              You May Also Like
            </h2>

            <RelatedProducts relatedProducts={relatedProducts} />
          </div>
        </div>
      </div>

      <PromoBanner />

      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
      />
      <ImagePreviewModal
        isOpen={isPreviewOpen}
        image={previewImage}
        onClose={() => setIsPreviewOpen(false)}
      />
    </>
  );
}
