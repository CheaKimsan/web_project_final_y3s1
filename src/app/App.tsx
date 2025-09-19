import React from 'react';
import AppRoute from "./routing/AppRoute";
import { Provider } from 'react-redux';
import { store } from './redux/store';
function App() {
    return (
        <Provider store={store}>
            <AppRoute/>
        </Provider>
    );
}

export default App;
