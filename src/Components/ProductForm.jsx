export default function ProductForm({
  productName,
  brand,
  link,
  price,
  handleSubmit,
  setProductName,
  setLink,
  setBrand,
  setPrice,
}) {
  return (
    <div className="productform">
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Product Form</h2>
          <label>Product Name: </label>
          <input
            type="text"
            id="name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div>
          <label>Brand: </label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div>
          <label>Image Link: </label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="price">
          <label>Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="addproduct">
          Add Product
        </button>
      </form>
    </div>
  );
}
