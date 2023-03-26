import { RotatingLines } from 'react-loader-spinner';
import LoaderBlock from './Loader.styled';

const Loader = () => {
  return (
    <LoaderBlock className="Loader">
      <RotatingLines
        strokeColor="#3f51b590"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </LoaderBlock>
  );
};

export default Loader;
