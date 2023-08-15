import React from 'react';
import { Table } from 'antd';
import classNames from 'classnames';

import EmptyData from './EmptyData';
import {PAGE_SIZE_OPTIONS} from "@/constants";

import styles from './BaseTable.module.scss';

const BaseTable = ({className, pageSizeOptions, ...props}) => {
    const defaultPageSizeOptions = pageSizeOptions?.length ? pageSizeOptions : PAGE_SIZE_OPTIONS;

    return (
        <Table
            className={classNames(styles.baseTable, {[className]: !!className})}
            size="middle"
            // scroll={{ x: true }}
            // scroll={{ x: 'max-content' }}
            locale={{
                emptyText: <EmptyData/>
            }}
            {...props}
            pagination={props.pagination ? {...props.pagination, pageSizeOptions: defaultPageSizeOptions} : false}
        />
    )
}

export default BaseTable;