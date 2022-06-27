import React from "react";
import { useState, useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import verifyToken from "./services/VerifyToken";
import usePrevious from "./customHooks/prevState";
import Loading from "./components/Loading";


const ProdectedRoute = (props) => {
    const [isLoaded, setIsLoaded] = useState(true);

    const inProgress = useSelector((state) => state.userAuthorizationReducer.inprogress);
    const user = useSelector((state) => state.userAuthenticationReducer.user,);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(verifyToken());
    }, [dispatch])

    const prevIsLoaded = usePrevious(isLoaded);
    const prevInProgress = usePrevious(inProgress);

    useEffect(() => {
        if (prevIsLoaded === true)
            if (inProgress === false && prevInProgress === true) {
                setIsLoaded(false);
            }
    }, [prevIsLoaded, inProgress, prevInProgress])

    if (inProgress)
        return Loading();

    if (!user.token)
        return <Navigate to={{
            pathname: '/',
            state: { msg: 'Sesja wygasła' }
        }} />

    return <Outlet />;

}



export default ProdectedRoute;

