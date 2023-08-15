import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { DropdownField } from "./index";

const AsyncDropdownField = ({fieldName, getListAction, mappingData, params, ...rest}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (getListAction) {
            setLoading(true)
            dispatch(getListAction({
                params,
                onCompleted: (res) => {
                    setData((mappingData ? mappingData(res.data) : res.data) || []);
                    setLoading(false);
                },
                onError: (err) => {
                    setLoading(false);
                }
            }))
        }
    }, [getListAction])

    return (
        <DropdownField
            fieldName={fieldName}
            loading={loading}
            options={data || []}
            {...rest}
        />
    );
};

export default AsyncDropdownField;