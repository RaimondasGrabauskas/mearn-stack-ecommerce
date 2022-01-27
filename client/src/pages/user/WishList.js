import UserNav from '../../component/nav/UserNav';

const WishList = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col md-2">
          <UserNav />
        </div>
        <div className="col">User wishlist page</div>
      </div>
    </div>
  );
};

export default WishList;
