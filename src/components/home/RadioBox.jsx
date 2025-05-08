const RadioBox = ({ prices, handleFilters }) => {
  const handleChange = (e) => {
    handleFilters(e.target.value);
  };

  return prices.map((price) => (
    <div key={price.id} className="mb-3 flex gap-1.5">
      <input
        onChange={handleChange}
        value={price.id}
        name="price_filter"
        type="radio"
        className="w-4"
      />
      <label className="form-check-lable mr-4">{price.name}</label>
    </div>
  ));
};

export default RadioBox;
