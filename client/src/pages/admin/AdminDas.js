import AdminNav from '../../component/nav/AdminNav';

const AdminDash = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">Admin dashboard page</div>
      </div>
    </div>
  );
};

export default AdminDash;
