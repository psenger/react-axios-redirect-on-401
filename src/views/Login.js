import React from 'react';
import {Link} from "react-router-dom";
import {ServiceContext} from '../components/ServiceProvider';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <Link to="/">Reset Login</Link>
            </div>
        );
    }
}

Login.contextType = ServiceContext;
