import { useState } from "react";
import AddProduct from "../assets/svg/undraw_groceries_4via.svg";
import { useDispatch, useSelector } from "react-redux";
import { addProduct} from "../redux/addAndUpdate";
function AddProducts() {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.productAddAndUpdate?.products || []
  );
  const [productId, setProductId] = useState(2);
  const [product, setProduct] = useState({
    image: "",
    name: "",
    price: "",
    quantity: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: productId,
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity),
    };

    dispatch(addProduct(newProduct));

    setProductId((prev) => prev + 1);

    setProduct({
      image: "",
      name: "",
      price: "",
      quantity: "",
    });
  };

  console.log(products);
  return (
    <div className="h-[82vh]">
      <h1 className="text-center text-5xl font-semibold py-5">
        Add Your Products
      </h1>
      <div className="flex justify-center gap-50 items-center">
        <div>
          <img src={AddProduct} className="h-100" />
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <input
              name="image"
              value={product.image}
              onChange={handleChange}
              type="text"
              className="border px-7 py-1"
              placeholder="Enter a Product Image URL"
            />
          </div>
          <div>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              type="text"
              className="border px-7 py-1"
              placeholder="Enter a Product Name"
            />
          </div>
          <div>
            <input
              name="price"
              value={product.price}
              onChange={handleChange}
              type="number"
              className="border px-7 py-1"
              placeholder="Enter the Product Price"
            />
          </div>
          <div>
            <input
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              type="number"
              className="border px-7 py-1"
              placeholder="Enter the Product Quantity"
            />
          </div>
          <div>
            <button
              className="border px-17 py-1 cursor-pointer rounded-md"
              onClick={handleAddProduct}
            >
              Add a Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
