import { Link } from 'react-router-dom';
import { Button } from 'antd';

import styles from './index.module.scss';

const NotFound = () => {
    return (
        <div className={styles.notFoundPage}>
            <h1 className={styles.title}>
                404
            </h1>
            <div className={styles.description}>
                The Page you're looking for was not found.
            </div>
            <Link to="/"><Button className={styles.btnBack} type="primary" size="large">Go Back</Button></Link>
        </div>
    );
}

export default NotFound;