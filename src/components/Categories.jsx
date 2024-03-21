const Categories = ({ categoryId, setCategoryId, categories }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => setCategoryId(index)}
            className={categoryId === index ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
