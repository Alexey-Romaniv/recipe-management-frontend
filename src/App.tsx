import React, {useEffect} from 'react';
import './App.css';
import {PrivateRoute, PublicRoute} from "./HOCs/Routes";
import {useAppDispatch, useAppSelector} from "./utils/hook";
import {fetchCurrentUser} from "./redux/auth/authOperations";
import {Route, Routes} from "react-router-dom";
import RecipesPage from "./pages/RecipesPage";
import AppBar from "./components/AppBar/AppBar";
import SavedRecipesPage from "./pages/SavedRecipesPage";
import CookingModePage from "./pages/CookingModePage";
import LoginPage from "./pages/LoginPage";
import {Loading} from "./components/Loading/Loading";
import RegisterPage from "./pages/RegisterPage";

// Пример с центрированием по горизонтали и вертикали


function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    const {isLoading, isFetching} = useAppSelector(state => state.auth);


    const isAuth = useAppSelector((state) => state.auth.isAuth);


    return (<>
            {(isLoading || isFetching) ? <Loading/> : null}
            <AppBar/>
            <Routes>
                <Route index path="/" element={<PrivateRoute><RecipesPage/></PrivateRoute>}/>
                <Route path="/saved-recipes" element={<PrivateRoute><SavedRecipesPage/></PrivateRoute>}/>
                <Route path="/cooking-mode/:recipeId" element={<PrivateRoute><CookingModePage/></PrivateRoute>}/>

                <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>}/>
                <Route path="/register" element={<PublicRoute><RegisterPage/></PublicRoute>}/>

            </Routes>
        </>
    );

}

export default App;
