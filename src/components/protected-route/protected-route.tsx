import {Redirect, Route, RouteProps, useLocation} from "react-router-dom";
import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authUser} from "../../services/actions/auth";
import {setCookie} from "../../utils/common";
import {IAuth, IStore} from "../../services/store";
import {AnyAction} from "redux";

export const ProtectedRoute:FC<RouteProps & {children?: React.ReactNode}> = ({ ...props }) => {
    const dispatch = useDispatch();

    const authState = useSelector<IStore>(store => store.auth) as IAuth;

    useEffect(() => {
        dispatch(authUser() as AnyAction)
    }, []);

    const location = useLocation();

    if (!authState.authUser.isLoaded) return null;

    if (authState.user) {
        return <Route {...props} />;
    } else {
        setCookie("accessToken", null, { expires: - 1});
        localStorage.removeItem("refreshToken");
        return <Redirect to={{
            pathname: '/login',
            state: {
                from: location.pathname
            }
        }} />;
    }
}
