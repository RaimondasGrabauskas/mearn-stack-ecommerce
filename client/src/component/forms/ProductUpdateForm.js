import { Select } from 'antd';
const { Option } = Select;

const ProductUpdateForm = ({
  handleChange,
  handleSubmit,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
  setValues,
  categories,
}) => {
  const { title, description, price, category, subs, shipping, quantity, images, colors, brands, color, brand } =
    values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" className="form-control" value={title} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input type="text" name="description" className="form-control" value={description} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input type="number" name="price" className="form-control" value={price} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          value={shipping === 'Yes' ? 'Yes' : 'No'}
          onChange={handleChange}
        >
          <option>--</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Color</label>
        <select name="color" className="form-control" value={color} onChange={handleChange}>
          <option>--</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Brand</label>
        <select name="brand" className="form-control" value={brand} onChange={handleChange}>
          <option>--</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select className="form-control" name="category" onChange={handleCategoryChange}>
          <option>{category ? category.name : '--'}</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductUpdateForm;
