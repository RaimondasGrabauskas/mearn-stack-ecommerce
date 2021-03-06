import ModalImage from 'react-modal-image';
import appleMac from '../../images/appleMac.png';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

const ProductCardInCheckout = ({ p }) => {
  const { title, price, brand, color, shipping, count, images } = p;
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > p.quantity) {
      toast.error(`Max avalible quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));

      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));

      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '100px', height: 'auto' }}>
            {images.length ? (
              <ModalImage small={images[0].url} large={images[0].url} />
            ) : (
              <ModalImage small={appleMac} large={appleMac} />
            )}
          </div>
        </td>
        <td>{title}</td>
        <td>${price}</td>
        <td>{brand}</td>
        <td>
          <select onChange={handleColorChange} name="color" className="form-control">
            {color ? <option value={color}>{color}</option> : <option>Select</option>}
            {colors
              .filter((c) => c !== color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input className="form-control" type="number" value={count} onChange={handleQuantityChange} />
        </td>
        <td className="text-center">
          {p.shipping === 'Yes' ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">{<CloseOutlined onClick={handleRemove} className="text-danger pointer" />}</td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
