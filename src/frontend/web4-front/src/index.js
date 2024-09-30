import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/main/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, createBrowserRouter, Route, Routes} from "react-router-dom";
import AppRegister from "./components/register/AppRegister";
import AppLogin from "./components/login/AppLogin";
import StartPage from "./components/start/StartPage";
import {Provider} from "react-redux";
import {store} from "./app/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<StartPage />}/>
            <Route path={"/main"} element={
                <Provider store={store}>
                    <App />
                </Provider>
            }/>
            <Route path={"/login"} element={<AppLogin />}/>
            <Route path={"/register"} element={<AppRegister />}/>
        </Routes>

    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
