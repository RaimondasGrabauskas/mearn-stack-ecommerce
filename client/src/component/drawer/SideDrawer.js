import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Button } from 'antd';
import { Link } from 'react-router-dom';
import appleMac from '../../images/appleMac.png';

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: '100%',
    height: '50px',
    objectFit: 'cover',
  };

  const handleDrawerClose = () => {
    dispatch({
      type: 'SET_VISIBLE',
      payload: false,
    });
  };
  return (
    <Drawer
      title={`Cart / ${cart.length} Product`}
      className="text-center"
      closable={false}
      onClose={handleDrawerClose}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} style={imageStyle} alt="" />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                <img src={appleMac} style={imageStyle} alt="" />
                <p>
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}

      <Link to="/cart">
        <button className="text-center btn btn-primary btn-raised btn-block" onClick={handleDrawerClose}>
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
