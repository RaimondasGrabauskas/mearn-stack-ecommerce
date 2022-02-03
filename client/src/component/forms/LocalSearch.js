const LocalSearch = ({ keyword, handleSearchChange }) => {
  return (
    <div className="container pt-4 pb-4">
      <h5>Filter categories</h5>
      <input
        type="search"
        placeholder="Filter"
        value={keyword}
        onChange={handleSearchChange}
        className="form-control mb-4"
      />
    </div>
  );
};

export default LocalSearch;
