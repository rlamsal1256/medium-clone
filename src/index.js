import React from 'react';
import { render } from 'react-dom';
import './assets/medium.css';
import { Provider } from 'react-redux';

import { Router, Switch, Route } from 'react-router-dom';

import App from './App.js';
import registerServiceWorker from './registerServiceWorker';

import { store, history } from './redux/store';

import { getUser } from './redux/actions/actions'

if(localStorage.Auth) {
    console.log('first dispatch')
    //console.log(localStorage.Auth)
    // update localstorage
    store.dispatch({type: 'SET_USER', user: JSON.parse(localStorage.Auth)})

    var _id = JSON.parse(localStorage.Auth)._id
    getUser(_id).then((res)=>{
        //console.log(JSON.parse(res))
        store.dispatch({type: 'SET_USER', user: res})
    })
}

render((
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();