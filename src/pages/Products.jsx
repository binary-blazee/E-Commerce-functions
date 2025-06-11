import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCart,
  addWishlist,
} from "../redux/AddCartAndWishlist";
import {
  decreaseProductQuantity,
  removeProduct,
  editProduct,
} from "../redux/addAndUpdate";

function Products() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const products = useSelector((state) => state.productAddAndUpdate.products);
  const dispatch = useDispatch();

  const [editing, setEditing] = React.useState(null);
  const [productDetail, setProductDetail] = React.useState({
    image: "",
    name: "",
    price: "",
    quantity: "",
  });
  const [originalDetails,setOriginalDetails] = React.useState(null)

  const handleAddCart = (product) => {
    dispatch(addCart(product));
    dispatch(decreaseProductQuantity(product));
    alert("Product added in cart");
  };

  const handleAddWishlist = (product) => {
    dispatch(addWishlist(product));
    alert("Product added in wishlist");
  };

  const handleRemoveProduct = (product) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      dispatch(removeProduct(product));
    }
  };

  const handleClickEdit = (product) => {
    setEditing(product.id);
    const detail = {
      image: product.image,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    }
    setProductDetail(detail);
    setOriginalDetails(detail)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = (productId) => {
    dispatch(editProduct({ id: productId, updatedProduct: productDetail }));
    setEditing(null);
    alert("Product updated successfully");
  };

  const handleCancelEdit = () => {
    setEditing(null);
  };
  
  const disableSave = ()=>{
     return (
    originalDetails &&
    productDetail.image === originalDetails.image &&
    productDetail.name === originalDetails.name &&
    Number(productDetail.price) === Number(originalDetails.price) &&
    Number(productDetail.quantity) === Number(originalDetails.quantity)
  )
  }
  if (products.length > 0) {
    return (
      <div className="bg-black text-white">
        <h2 className="text-center text-3xl font-semibold">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {products.map((product) => {
            const isEditing = editing === product.id;

            return (
              <div
                key={product.id}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-purple-500/20 transition duration-300 my-5 text-white"
              >
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="image"
                      value={productDetail.image}
                      onChange={handleInputChange}
                      placeholder="Image URL"
                      className="w-full mb-2 p-2 rounded border"
                    />
                    <input
                      type="text"
                      name="name"
                      value={productDetail.name}
                      onChange={handleInputChange}
                      placeholder="Product Name"
                      className="w-full mb-2 p-2 rounded border"
                    />
                    <input
                      type="number"
                      name="price"
                      value={productDetail.price}
                      onChange={handleInputChange}
                      placeholder="Price"
                      className="w-full mb-2 p-2 rounded border"
                    />
                    <input
                      type="number"
                      name="quantity"
                      value={productDetail.quantity}
                      onChange={handleInputChange}
                      placeholder="Quantity"
                      className="w-full mb-2 p-2 rounded border"
                    />
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleSaveEdit(product.id)}
                         disabled={disableSave()}
                        className={`px-3 py-1 rounded-md ${disableSave()?'bg-green-500 opacity-50 cursor-not-allowed': 'bg-green-600 hover:bg-green-700'}`} 
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={product.image}
                      className="w-full h-48 object-cover rounded-md"
                      alt={product.name}
                    />
                    <h3 className="text-xl font-semibold mt-3">{product.name}</h3>
                    <p className="mt-2 text-gray-300">
                      Price: <strong>&#8377; {product.price}</strong>
                    </p>
                    <p className="mt-2 text-gray-300">
                      Quantity: <strong>{product.quantity}</strong>
                    </p>

                    <div className="flex flex-wrap gap-3 mt-5">
                      {token === "user-token" && product.quantity > 0 && (
                        <>
                          <button
                            className="border px-3 py-1 rounded-md cursor-pointer bg-violet-600 hover:bg-violet-700 transition"
                            onClick={() => handleAddCart(product)}
                          >
                            Add to Cart
                          </button>
                          <button
                            className="border px-3 py-1 rounded-md bg-orange-500 hover:bg-orange-600 cursor-pointer transition"
                            onClick={() => handleAddWishlist(product)}
                          >
                            Add to Wishlist
                          </button>
                        </>
                      )}

                      {token === "user-token" && product.quantity === 0 && (
                        <button
                          className="bg-red-600 px-3 py-1 rounded-md text-white cursor-not-allowed"
                          disabled
                        >
                          Out of Stock
                        </button>
                      )}

                      {token === "merchant-token" && (
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition cursor-pointer"
                            onClick={() => handleClickEdit(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md transition cursor-pointer"
                            onClick={() => handleRemoveProduct(product)}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <h2 className="text-center font-bold text-4xl text-white mt-10">
        Products Not Available
      </h2>
    );
  }
}

export default Products;
