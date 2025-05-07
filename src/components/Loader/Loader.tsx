import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';
export const Loader = () => {
  return (
    <>
      <div className={styles.backDrop}>
        <ClipLoader
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};
