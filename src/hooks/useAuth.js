import { useDispatch, useSelector } from 'react-redux';

import { storageKeys } from '@/constants';
import { getCookie } from '@/utils/localStorage';
import { accountActions, accountActionTypes } from '@/redux/actions';

const useAuth = () => {
    const dispatch = useDispatch();

    const { profileData } = useSelector(state => state?.account || {});
    const loading = useSelector(state => state?.loading[accountActionTypes.GET_PROFILE]);
    const logout = () => {
        dispatch(accountActions.logout({
            params: {refreshToken: getCookie(storageKeys.REFRESH_TOKEN)},
            onCompleted: (res) => {
                dispatch(accountActions.removeToken());
            },
            onError: (err) => {
                dispatch(accountActions.removeToken());
            }
        }));
    }

    const hasRoles = (roles = []) => {
        return roles.includes(profileData?.role?.code)
    }

    return {
        isAuthenticated: !!getCookie(storageKeys.ACCESS_TOKEN),
        loading,
        user: profileData,
        logout,
        hasRoles,
    }
}

export default useAuth;
