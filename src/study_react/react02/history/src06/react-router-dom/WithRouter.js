import React, { Component}  from 'react';
import {Route} from '../react-router-dom'
export default (Component) => () => {
    return <Route component={Component}/> 
}

