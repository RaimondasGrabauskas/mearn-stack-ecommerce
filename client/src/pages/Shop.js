import { fetchProductsByFilter, getProductsByCount } from './../utils/productRequest';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './../component/cards/ProductCard';
import Star from '../component/forms/Star';
import { useEffect, useState } from 'react';
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import { Menu, Slider, Checkbox } from 'antd';
import { getCategories } from './../utils/categoryRequest';

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState('');

  const { search } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const { text } = search;

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  // load products by default on page load
  const loadProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // load products on user search input

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  const loadCategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  };

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });

    setCategoryIds([]);
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const showCategories = () =>
    categories.map((c) => (
      <Checkbox
        key={c._id}
        onChange={handleCheck}
        value={c._id}
        style={{ display: 'flex', margin: 0 }}
        className="pb-2 pl-4 pr-4"
        name="category"
        checked={categoryIds.includes(c._id)}
      >
        {c.name}
      </Checkbox>
    ));

  const handleCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });

    setPrice([0, 0]);

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  const handleStarClick = (number) => {};

  const showStars = () => <Star starClick={handleStarClick} numberOfStars={5} />;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />

          <Menu defaultOpenKeys={['1', '2', '3']} mode="inline">
            <ItemGroup>
              <SubMenu
                key="1"
                title={
                  <span>
                    <DollarOutlined className="mr-2" /> Price
                  </span>
                }
              >
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(value) => `$${value}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                />
              </SubMenu>
            </ItemGroup>

            <ItemGroup>
              <SubMenu
                key="2"
                title={
                  <span>
                    <DownSquareOutlined className="mr-2" /> Categories
                  </span>
                }
              >
                {showCategories()}
              </SubMenu>
            </ItemGroup>

            <ItemGroup>
              <SubMenu
                key="3"
                title={
                  <span>
                    <StarOutlined className="mr-2" /> Rating
                  </span>
                }
              >
                {showStars()}
              </SubMenu>
            </ItemGroup>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? <h4 className="text-danger">Loading...</h4> : <h4 className="text-danger">Products</h4>}
          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
