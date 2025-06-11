import { useDispatch, useSelector } from "react-redux";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeAndAddInWishlist,
  addWishlist,
} from "../redux/AddCartAndWishlist";
import {
  increaseProductQuantity,
  decreaseProductQuantity,
} from "../redux/addAndUpdate";

function Cart() {
  const cart = useSelector((state) => state.addCartAndWishlist.cart);
  const products = useSelector((state) => state.productAddAndUpdate.products);
  const dispatch = useDispatch();

  const handleIncrease = (product) => {
    const stock = products.find((p) => p.id === product.id);
    if (stock && stock.quantity > 0) {
      dispatch(increaseCartQuantity(product));
      dispatch(decreaseProductQuantity(product));
    } else {
      alert("Stock is not available");
    }
  };

  const handleDecrease = (product) => {
    if (product.cartQuantity > 1) {
      dispatch(decreaseCartQuantity(product));
      dispatch(increaseProductQuantity(product));
    } else {
      handleRemove(product);
    }
  };

  const handleRemove = (product) => {
    for (let i = 0; i < product.cartQuantity; i++) {
      dispatch(increaseProductQuantity(product));
    }
    const addWishlists = window.confirm(
      "Can you like add this product to wishlist?"
    );
    if (addWishlists) {
      dispatch(removeAndAddInWishlist(product));
      dispatch(addWishlist(product));
    } else {
      dispatch(removeAndAddInWishlist(product));
    }
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );

  if (cart.length > 0) {
    return (
      <div className="bg-black text-white min-h-screen py-10 px-4">
        <h2 className="text-center text-4xl font-bold mb-10">Your Cart</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 border border-gray-700">Image</th>
                <th className="p-3 border border-gray-700">Product Name</th>
                <th className="p-3 border border-gray-700">Price</th>
                <th className="p-3 border border-gray-700">Quantity</th>
                <th className="p-3 border border-gray-700">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr
                  key={product.id}
                  className="bg-gray-900 hover:bg-gray-800 transition"
                >
                  <td className="p-3 border border-gray-700 flex justify-center">
                    <img
                      src={product.image}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 border border-gray-700 font-semibold">
                    {product.name}
                  </td>
                  <td className="p-3 border border-gray-700">
                    &#8377; {product.price}
                  </td>
                  <td className="p-3 border border-gray-700">
                    <div className="flex items-center gap-3 justify-center">
                      <button
                        className="bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 transition cursor-pointer"
                        onClick={() => handleDecrease(product)}
                      >
                        &minus;
                      </button>
                      <span className="text-lg">{product.cartQuantity}</span>
                      <button
                        className="bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 transition cursor-pointer"
                        onClick={() => handleIncrease(product)}
                      >
                        &#43;
                      </button>
                    </div>
                  </td>
                  <td className="p-3 border border-gray-700 text-center">
                    <button
                      onClick={() => handleRemove(product)}
                      className="bg-red-600 px-4 py-1 rounded-md hover:bg-red-500 transition cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-10 text-right pr-4">
            <h3 className="text-2xl font-bold">
              Total Amount:{" "}
              <span className="text-yellow-300">₹ {totalAmount}</span>
            </h3>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-black h-[80vh] flex items-center justify-center">
        <h2 className="text-center text-2xl font-semibold  text-red-600">
          Your Cart is empty
        </h2>
      </div>
    );
  }
}

export default Cart;
