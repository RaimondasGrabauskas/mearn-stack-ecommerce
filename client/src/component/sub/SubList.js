import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubCategories } from '../../utils/subCategoryRequest';

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubCategories().then((c) => {
      setSubs(c.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <div key={s._id} className="col btn btn-light btn-lg m-3">
        <Link to={`/sub/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading && <h4 className="text-center">Loading...</h4>}
        {!loading && showSubs()}
      </div>
    </div>
  );
};

export default SubList;
