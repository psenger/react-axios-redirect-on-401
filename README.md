# react-axios-redirect-on-401

This is a POC, illustrating how to redirect with React Router once, an Axios Service has failed on 401

I created a ServiceProvider.js which injects into context, all the services in `services/index.js`

Using dependency injection, it injects a customized axios instance into the module and proxys all
 the values with a promise `catch`... if the error is a 401, and attempts to recall the axios
  call after it re-auths. It can distinguish between an 2nd attempt by the meta attribute added
   called `__isRetryRequest`
