import {Redirect, Route, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authUser} from "../../services/actions/auth";
import {setCookie} from "../../utils/common";

export function ProtectedRoute({ ...props }) {
    const dispatch = useDispatch();

    const authState = useSelector(store => store.auth);

    useEffect(() => {
        dispatch(authUser())
    }, []);

    const location = useLocation();

    if (!authState.authUser.isLoaded) return null;

    if (authState.user) {
        return <Route {...props} />;
    } else {
        setCookie('accessToken', null, { expires: - 1});
        localStorage.setItem('refreshToken', null);
        return <Redirect path to={{
            pathname: '/login',
            state: {
                from: location.pathname
            }
        }} />;
    }
}
