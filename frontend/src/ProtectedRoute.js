import React from "react";
import { Redirect, Route } from "react-router-dom";
import verifyToken from "./services/VerifyToken";
import { connect } from 'react-redux';

class ProdectedRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
        }
    }
    componentDidMount() {
        this.props.verifyToken();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isLoaded === true)
            if (this.props.inProgress === false && prevProps.inProgress === true){
                this.setState({ isLoaded: this.props.inProgress });
            }
    }

    render() {
        const { component: Component, exact, path, ...rest } = this.props;
        
        if (this.state.isLoaded === true)
            return <>Ładowanie...</>

        if (!this.props.user.token)
            return <Redirect to={{
                pathname: '/login',
                state: { msg: 'Sesja wygasła' }
            }} />
        return (
            < Route exact={exact} path={path}>
                <Component {...rest} />
            </Route>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        user: state.usersReducer.user,
        inProgress: state.usersReducer.inprogress,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        verifyToken: (props) => {
            dispatch(verifyToken(props));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProdectedRoute);

