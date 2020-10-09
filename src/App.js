import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ServiceProvider from './components/ServiceProvider';
import ComponentOne from "./views/ComponentOne";
import ComponentTwo from "./views/ComponentTwo";
import Login from "./views/Login";
import Nav from './components/Nav';
import Welcome from './views/Welcome';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Route render={({location, history}) => (
                    <ServiceProvider>
                        <Nav>
                            <Switch>
                                <Route exact path="/ComponentOne"
                                       component={props => <ComponentOne {...props} />}/>
                                <Route exact path="/ComponentTwo"
                                       component={props => <ComponentTwo {...props} />}/>
                                <Route exact path="/Login"
                                       component={props => <Login {...props} />}/>
                                <Route component={props => <Welcome {...props} />}/>
                            </Switch>
                        </Nav>
                    </ServiceProvider>
                )}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
