import { Spin } from 'antd';

import styles from './FullScreenLoading.module.scss';
import classNames from 'classnames';

const FullScreenLoading = ({className, style = {}, size = 'large', loading, isShowOverlay}) => {
    return (
        <div
            className={classNames(styles.fullScreenLoading, {[className]: !!className})}
            style={{
                ...style,
                ...(isShowOverlay && { backgroundColor: 'rgba(0,0,0,.45)'})
            }}
        >
            <Spin spinning={loading} size={size}/>
        </div>
    )
}

export default FullScreenLoading;
