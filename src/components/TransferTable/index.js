import { Transfer } from "antd";
import { BaseTable } from "../Table";
import { differenceArray } from "@/utils";

const TransferTable = ({ leftColumns, rightColumns, transferSelectKey = 'key', targetKeys, dataSource, ...restProps }) => {
    return (
        <Transfer 
            {...restProps}
            targetKeys={targetKeys}
            dataSource={dataSource}
            showSelectAll={false} 
            rowKey={({[transferSelectKey]: transferKey}) => transferKey}>
            {({
                direction,
                filteredItems,
                onItemSelectAll,
                onItemSelect,
                selectedKeys: listSelectedKeys,
                disabled: listDisabled,
            }) => {
                const columns = direction === 'left' ? leftColumns : rightColumns;
                const rowSelection = {
                    getCheckboxProps: (item) => ({
                      disabled: listDisabled || item.disabled,
                    }),
                    onSelectAll: (selected, selectedRows) => {
                        const selectedKeys = selectedRows
                                            .filter((item) => !item.disabled)
                                            .map(({ [transferSelectKey]: transferKey }) => transferKey);

                        const diffKeys = selected
                                    ? differenceArray(selectedKeys, listSelectedKeys)
                                    : differenceArray(listSelectedKeys, selectedKeys);
                        onItemSelectAll(diffKeys, selected);                
                    },
                    onSelect({ [transferSelectKey]: transferKey }, selected) {
                        onItemSelect(transferKey, selected);
                    },
                    selectedRowKeys: listSelectedKeys,
                };

                const onRowClick = ({ [transferSelectKey]: transferKey, disabled: itemDisabled }) => ({
                    onClick: () => {
                        if (itemDisabled || listDisabled) return;
                        onItemSelect(transferKey, !listSelectedKeys.includes(transferKey));
                    },
                })

                return (
                    <BaseTable
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={filteredItems}
                        onRow={onRowClick}
                    />
                )
            }}
        </Transfer>
    )
}

export default TransferTable;