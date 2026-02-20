"use client";
import { useCart } from "@/Context/CartContext";
import { Trash2, ChevronLeft, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const navigate = useRouter();
  const { items, removeItem, updateItemQuantity, total } = useCart();

  const subtotal = total;
  const delivery = items.length > 0 ? 6.99 : 0;
  const tax = subtotal * 0.1;
  const finalTotal = subtotal + delivery + tax;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate.push("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Continue shopping
        </button>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Add some awesome sneakers to get started!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold mb-6">Your Bag</h1>

              <div className="space-y-4">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm sm:text-base truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Color: {item.color} | Size: {item.size}
                      </p>
                      <p className="text-blue-600 font-bold mt-2">
                        ${item.price.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() =>
                            updateItemQuantity(
                              item.productId,
                              item.quantity - 1,
                            )
                          }
                          className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={e =>
                            updateItemQuantity(
                              item.productId,
                              Math.max(1, parseInt(e.target.value) || 1),
                            )
                          }
                          className="w-12 text-center border border-gray-300 rounded py-1 text-sm"
                        />
                        <button
                          onClick={() =>
                            updateItemQuantity(
                              item.productId,
                              item.quantity + 1,
                            )
                          }
                          className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <p className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-2">
                  Saving to celebrate
                </h3>
                <p className="text-sm text-blue-800">
                  Sign up for 15% off on your next order. Well keep your details
                  safe. See our privacy policy.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-bold mb-4">You may also like</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="group">
                      <div className="bg-gray-100 rounded-2xl aspect-square mb-2 overflow-hidden">
                        <img
                          src={`https://images.pexels.com/photos/${1456706 + i}/pexels-photo-${1456706 + i}.jpeg?auto=compress&cs=tinysrgb&w=300`}
                          alt={`Product ${i}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-xs sm:text-sm font-medium line-clamp-2">
                        ADIDAS 4DFWD X PARLEY
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        ${(150 + i * 5).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 border-b pb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium">${delivery.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 font-bold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-3">
                  Checkout
                </button>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
