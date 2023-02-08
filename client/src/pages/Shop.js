import { fetchProductsByFilter, getProductsByCount } from './../utils/productRequest';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './../component/cards/ProductCard';
import Star from '../component/forms/Star';
import { useEffect, useState } from 'react';
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import { getCategories } from './../utils/categoryRequest';
import { getSubCategories } from '../utils/subCategoryRequest';

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState('');
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const [shipping, setShipping] = useState('');
  const [brands, setBrands] = useState(['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS', 'HP', 'MSI']);
  const [brand, setBrand] = useState('');
  const [colors, setColors] = useState(['Black', 'Brown', 'Silver', 'White', 'Blue']);
  const [color, setColor] = useState('');

  const { search } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const { text } = search;

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadSubs();
  }, []);

  // load products by default on page load
  const loadProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  const loadSubs = () => getSubCategories().then((res) => setSubs(res.data));

  // load products on user search input

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadProducts();
      }
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
    setStar('');
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
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
    setStar('');
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');

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

  const handleStarClick = (number) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub('');
    setBrand('');
    setColor('');
    setStar(number);
    setShipping('');
    fetchProducts({ stars: number });
  };

  const handleSub = (sub) => {
    setSub(sub);
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setBrand('');
    setColor('');
    setShipping('');
    fetchProducts({ sub });
  };

  const showStars = () => (
    <div style={{ paddingLeft: 20 }}>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: 'pointer' }}
      >
        {s.name}
      </div>
    ));

  const handleBrand = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setSub('');
    setColor('');
    setShipping('');
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const showBrands = () =>
    brands.map((b) => (
      <Radio
        style={{ display: 'flex' }}
        key={b}
        value={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleColor = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setSub('');
    setBrand('');
    setShipping('');
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  const showColors = () =>
    colors.map((c) => (
      <Radio
        style={{ display: 'flex' }}
        key={c}
        value={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleShippingChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setSub('');
    setBrand('');
    setColor('');

    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  const showShipping = () => (
    <>
      <Checkbox className="pb-2 pl-4 pr-4" onChange={handleShippingChange} value="Yes" checked={shipping === 'Yes'} />{' '}
      Yes
      <Checkbox className="pb-2 pl-4 pr-4" onChange={handleShippingChange} value="No" checked={shipping === 'No'} /> No
    </>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />

          <Menu defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']} mode="inline">
            <ItemGroup>
              <SubMenu
                key="1"
                title={
                  <span className="h6">
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
                  <span className="h6">
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
                  <span className="h6">
                    <StarOutlined className="mr-2" /> Rating
                  </span>
                }
              >
                {showStars()}
              </SubMenu>
            </ItemGroup>

            <ItemGroup>
              <SubMenu
                key="4"
                title={
                  <span className="h6">
                    <DownSquareOutlined className="mr-2" /> Sub Categories
                  </span>
                }
              >
                <div style={{ marginTop: '-10px' }} className="pl-4 pr-4">
                  {showSubs()}
                </div>
              </SubMenu>
            </ItemGroup>

            <ItemGroup>
              <SubMenu
                key="5"
                title={
                  <span className="h6">
                    <DownSquareOutlined className="mr-2" /> Brands
                  </span>
                }
              >
                <div style={{ marginTop: '-10px' }} className="pl-4 pt-2 pr-4">
                  {showBrands()}
                </div>
              </SubMenu>
            </ItemGroup>

            <ItemGroup>
              <SubMenu
                key="6"
                title={
                  <span className="h6">
                    <DownSquareOutlined className="mr-2" /> Colors
                  </span>
                }
              >
                <div style={{ marginTop: '-10px' }} className="pl-4 pt-2 pr-4">
                  {showColors()}
                </div>
              </SubMenu>
            </ItemGroup>

            <ItemGroup>
              <SubMenu
                key="7"
                title={
                  <span className="h6">
                    <DownSquareOutlined className="mr-2" /> Shipping
                  </span>
                }
              >
                <div style={{ marginTop: '-10px' }} className="pl-4 pt-2 pr-4">
                  {showShipping()}
                </div>
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
