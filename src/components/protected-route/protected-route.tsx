import {Redirect, Route, RouteProps, useLocation} from "react-router-dom";
import React, {FC} from "react";
import {useSelector} from "../../redux/hooks";

export const ProtectedRoute:FC<RouteProps & {children?: React.ReactNode}> = ({ ...props }) => {
    const location = useLocation();

    const { user } = useSelector(store => store.user);

    if (user) {
        return <Route {...props}/>;
    } else {
        return <Redirect to={{
            pathname: '/login',
            state: { from: location.pathname }
        }} />;
    }
}
