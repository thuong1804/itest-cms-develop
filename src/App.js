import { Provider } from 'react-redux';
import RootRoutes from '@/routes';
import configureStore from '@/redux/store';

const store = configureStore();

const App = () => {
    return (
        <Provider store={store}>
            <RootRoutes />
        </Provider>
    );
}

export default App;
