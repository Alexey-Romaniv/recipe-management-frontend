import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {store, persist} from "./redux/store";

import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
            <Provider store={store}>
                <PersistGate persistor={persist}>
                    <Router>
                        <App/>
                    </Router>
                </PersistGate>
            </Provider>
    </React.StrictMode>,
)