import React from 'react';
import {Link} from "react-router-dom";

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/ComponentOne">Component One</Link>
                    </li>
                    <li>
                        <Link to="/ComponentTwo">Component Two</Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

