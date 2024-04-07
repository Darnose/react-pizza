import styles from './sass/Button.module.scss';

const Button = ({ onClick, text, styleType }) => (
  <button onClick={onClick} className={styleType ? styles[styleType] : ''}>
    {text}
  </button>
);

export default Button;
