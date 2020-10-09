import React from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
// import {Redirect} from "react-router-dom";
import services from "../services";

export const ServiceContext = React.createContext({});

class InvalidCredentialsError extends Error {
    constructor() {
        super("Invalid Credentials") // pass parameters up.
        if (Error.captureStackTrace) { // doing this allows you to set the stack trace correctly
            Error.captureStackTrace(this, InvalidCredentialsError)
        }
        this.name = 'InvalidCredentialsError';
        this.code = 401;
    }
}

export default class ServiceProvider extends React.Component {
    static AxiosInstance;
    static ServiceProxy = {};

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
        this.onFulfilledAxios = this.onFulfilledAxios.bind(this);
        this.onRejectedAxios = this.onRejectedAxios.bind(this);
        ServiceProvider.AxiosInstance = axios.create({
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            },
            ...this.props.axiosConfig
        });
        /**
         * ----------------------
         * Add a response interceptor adopted from :
         * https://stackoverflow.com/questions/35900230/axios-interceptors-and-asynchronous-login
         */
        ServiceProvider.AxiosInstance.interceptors.response.use(this.onFulfilledAxios, this.onRejectedAxios);

        const Services = services(ServiceProvider.AxiosInstance);
        const self = this;
        // auto proxy.
        for (const [key,] of Object.entries(Services)) {
            ServiceProvider.ServiceProxy[key] = (...a) => {
                return Services[key](...a)
                    .catch((error)=>{
                        console.log('caught an exception');
                        if (error instanceof InvalidCredentialsError) {
                            return self.setState({hasError: true});
                        }
                        throw error;
                    })
            }
        }
    }

    onFulfilledAxios(value) {
        return value;
    }

    onRejectedAxios(err) {
        if (err.isAxiosError && err.response.status === 401 && !err.config.__isRetryRequest) {
            // following line to test custom error;
            return Promise.reject(new InvalidCredentialsError());
            // return new InvalidCredentialsError();
            // return getRefreshToken()
            //     .then(function (success) {
            //         setTokens(success.access_token, success.refresh_token) ;
            //         err.config.__isRetryRequest = true;
            //         err.config.headers.Authorization = 'Bearer ' + getAccessToken();
            //         return axios(err.config);
            //     })
            //     .catch(function (error) {
            //         console.log('Refresh login error: ', error);
            //         return Promise.reject(new InvalidCredentialsError());
            //     });
        }
        return Promise.reject(err);
    }

    render() {

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
            // return <Redirect to={{pathname: "/login", state: { from: this.props.location }}}/>;
            // return <ServiceContext.Provider value={{...ServiceProvider.ServiceProxy}}>
            //     <Redirect to={{pathname: "/login", state: { from: this.props.location }}}/>
            // </ServiceContext.Provider>;
        }
        return (
            <ServiceContext.Provider value={{...ServiceProvider.ServiceProxy}}>
                {this.props.children}
            </ServiceContext.Provider>
        );
    }
}

ServiceProvider.propTypes = {
    axiosConfig: PropTypes.any
}

ServiceProvider.defaultProps = {
    axiosConfig: {}
}
