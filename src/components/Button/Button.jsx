import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ text, onClick }) => (
  <button className={css.Button} type="button" onClick={onClick}>
    {text}
  </button>
);
export default Button;

Button.protoTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
