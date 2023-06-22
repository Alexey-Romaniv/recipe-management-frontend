import React , {PropsWithChildren}from "react";
import {Navigate} from "react-router";
import {useAppSelector} from "../utils/hook";


export const PrivateRoute: React.FC<PropsWithChildren> = ({children}) => {
    const isAuth = useAppSelector(state => state.auth.isAuth);

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}


export const PublicRoute: React.FC<PropsWithChildren> = ({children}) => {
    const isAuth = useAppSelector(state => state.auth.isAuth);

    if (isAuth) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}



