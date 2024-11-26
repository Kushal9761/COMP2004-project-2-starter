import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  productName,
  brand,
  image,
  price,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleDeleteProduct,
  handleEditProduct,
  id,
}) {
  return (
    <div key={productName._id} className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt={name} />
      <h4>{brand}</h4>
      {/* <div className="ProductQuantityDiv">
        <div onClick={() => handleRemoveQuantity(id)} className="QuantityBtn">
          <p>➖</p>
        </div>

        <p>{productQuantity}</p>
        <div onClick={() => handleAddQuantity(id)} className="QuantityBtn">
          <p>➕</p>
        </div>
      </div> */}
      <QuantityCounter
        handleAddQuantity={handleAddQuantity}
        productQuantity={productQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={id}
        mode="product"
      />
      <h3>{price}</h3>
      <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
      <button onClick={() => handleDeleteProduct(id)}>Delete</button>
      <button onClick={() => handleEditProduct(product._id)}>Edit</button>
    </div>
  );
}
