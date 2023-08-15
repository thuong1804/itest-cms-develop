import { useLocation, matchRoutes } from 'react-router-dom';
import routes from '@/routes/routes';

const useCurrentPath = () => {
    const location = useLocation()
    const [{ route }] = matchRoutes(routes, location);

    return {
        path: route.path,
        roles: route.roles
    };
}

export default useCurrentPath;