import LoadMoreBtn from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onloadMore }) => {
  return (
    <LoadMoreBtn type="button" onClick={onloadMore}>
      Load more
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func,
};

export default Button;
