import { useState, useEffect } from "react";
import CartContainer from "./CartContainer";
import ProductForm from "./ProductForm";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import axios from "axios";

export default function GroceriesAppContainer() {
  // State variables
  const [productQuantity, setProductQuantity] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    image: "",
    price: "",
    brand: "",
  });

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [image, setLink] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProductData = { productName, price, brand, image };

    setProductName("");
    setPrice(0);
    setBrand("");
    setLink("");
    addNewProduct(newProductData);
  };

  // Fetch products from the database on mount
  useEffect(() => {
    fetchProductsFromDB();
  }, []);

  // Helper to initialize quantities
  const initialQuantity = (prods) =>
    prods.map((prod) => ({ id: prod.id, quantity: 0 }));

  // Fetch products from the database
  const fetchProductsFromDB = async () => {
    try {
      const result = await axios.get("http://localhost:3000/products");
      setProductList(result.data);
      setProductQuantity(initialQuantity(result.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  // Add a new product to the database
  const addNewProduct = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        product
      );
      setProductList((prev) => [...prev, response.data]);
      setNewProduct({ productName: "", price: "", brand: "", image: "" }); // Reset form
    } catch (error) {
      console.error(error.message);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      console.log("Deleting product with ID:", productId); // Log the ID to check its value
      const response = await axios.delete(
        `http://localhost:3000/products/${productId}`
      );
      // Handle successful deletion
      console.log("Product deleted successfully");
      // Update frontend state to reflect the change
      setProductList((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle 1  error, e.g., display an error message to the user
    }
  };

  // Edit a product
  const handleEditProduct = async (productId, updatedProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/products/${productId}`,
        updatedProduct
      );
      setProductList((prev) =>
        prev.map((product) =>
          product._id === productId ? response.data : product
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle quantity adjustments
  const handleAddQuantity = (productId, mode) => {
    const updater = (productList) =>
      productList.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );

    if (mode === "cart") {
      setCartList(updater(cartList));
    } else {
      setProductQuantity(updater(productQuantity));
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    const updater = (productList) =>
      productList.map((product) =>
        product.id === productId && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );

    if (mode === "cart") {
      setCartList(updater(cartList));
    } else {
      setProductQuantity(updater(productQuantity));
    }
  };

  // Add to cart
  const handleAddToCart = (productId) => {
    const product = productList.find((p) => p.id === productId);
    const quantityObj = productQuantity.find((q) => q.id === productId);

    if (!quantityObj || quantityObj.quantity === 0) {
      alert(`Please select a quantity for ${product.productName}`);
      return;
    }

    setCartList((prev) => {
      const productInCart = prev.find((p) => p.id === productId);

      if (productInCart) {
        return prev.map((p) =>
          p.id === productId
            ? { ...p, quantity: p.quantity + quantityObj.quantity }
            : p
        );
      }

      return [...prev, { ...product, quantity: quantityObj.quantity }];
    });
  };

  // Remove from cart
  const handleRemoveFromCart = (productId) => {
    setCartList((prev) => prev.filter((product) => product.id !== productId));
  };

  // Clear the cart
  const handleClearCart = () => {
    setCartList([]);
  };

  // Render components
  return (
    <div>
      <NavBar quantity={cartList.length} />
      <div className="GroceriesApp-Container">
        <ProductForm
          onAddProduct={setNewProduct}
          handleSubmit={handleSubmit}
          setProductName={setProductName}
          setBrand={setBrand}
          setLink={setLink}
          setPrice={setPrice}
        />
        <ProductsContainer
          products={productList}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={productQuantity}
          handleDeleteProduct={handleDeleteProduct}
          handleEditProduct={handleEditProduct}
        />
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
