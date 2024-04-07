import styles from './sass/Categories.module.scss';

const Categories = ({ categoryId, onChangeCategory, categories }) => {
  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={categoryId === index ? styles.active : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
