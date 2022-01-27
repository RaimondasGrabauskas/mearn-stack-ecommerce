import UserNav from '../../component/nav/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const Password = () => {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // const reauthenticate = (currentPassword) => {
  //   const user = auth.currentUser;
  //   // const credential = user.credential(user.email, '123456');

  //   const credential = user.credential(user.email, currentPassword);
  //   return reauthenticateWithCredential(user, credential);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = auth.currentUser;

    await updatePassword(user, newPassword)
      .then(() => {
        setLoading(false);
        setNewPassword('');
        toast.success('Password updated');
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passWordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
        />
        <button className="btn btn-primary" disabled={!newPassword || newPassword.length < 6 || loading}>
          Submit
        </button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Password Update</h4>}
          {passWordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
