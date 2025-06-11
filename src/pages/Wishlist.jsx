import { useDispatch, useSelector } from "react-redux";
import { addCart, removeFromWishlist } from "../redux/AddCartAndWishlist";
import { decreaseProductQuantity } from "../redux/addAndUpdate";
function Wishlist() {
  const wishlist = useSelector((state) => state.addCartAndWishlist.wishlist);
  const dispatch = useDispatch();
  const rQ = useSelector((state) => state.productAddAndUpdate.products);
  console.log(rQ);

  const handleAddToCart = (product) => {
    const confirm = window.confirm("Are you sure to add this ptoduct to cart");
    if (confirm) {
      dispatch(addCart(product));
      dispatch(removeFromWishlist(product));
      dispatch(decreaseProductQuantity(product));
    }
  };

  const handleRemove = (product) => {
    const confirm = window.confirm("Are you remove this product?");
    if (confirm) {
      dispatch(removeFromWishlist(product));
    }
  };

  if (wishlist.length > 0) {
    return (
      <div className="bg-black text-white min-h-screen py-10 px-4">
        <h2 className="text-center text-4xl font-bold mb-10">Your Wishlist</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 border border-gray-700">Image</th>
                <th className="p-3 border border-gray-700">Product Name</th>
                <th className="p-3 border border-gray-700">Price</th>
                <th className="p-3 border border-gray-700">Add to Cart</th>
                <th className="p-3 border border-gray-700">Remove</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((product) => (
                <tr
                  key={product.id}
                  className="bg-gray-900 hover:bg-gray-800 transition"
                >
                  <td className="p-3 border border-gray-700 flex justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 border border-gray-700 font-semibold">
                    {product.name}
                  </td>
                  <td className="p-3 border border-gray-700">
                    &#8377; {product.price}
                  </td>
                  <td className="p-3 border border-gray-700 text-center">
                    {(() => {
                      const currentProduct = rQ.find(
                        (item) => item.id === product.id
                      );
                      if (currentProduct?.quantity === 0) {
                        return (
                          <span className="text-red-500 font-semibold">
                            Out of Stock
                          </span>
                        );
                      }
                      return (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-green-600 px-4 py-1 rounded-md hover:bg-green-500 transition cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      );
                    })()}
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
        </div>
        {/* <div className="flex justify-end my-10">
          <button className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-500 transition">
            Add All to Cart
          </button>
        </div> */}
      </div>
    );
  } else {
    return (
      <div className="bg-black text-white h-[80vh] flex justify-center items-center">
        <h2 className="text-center text-2xl font-semibold text-green-500">
          Your wishlist is empty
        </h2>
      </div>
    );
  }
}

export default Wishlist;
