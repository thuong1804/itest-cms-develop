import classNames from 'classnames';

import styles from './index.module.scss';

const FieldSet = ({ title, className, children }) => (
    <fieldset className={classNames(styles.cFieldset, { [className]: !!className })}>
        <legend>{title}</legend>
        {children}
    </fieldset>
);

export default FieldSet;