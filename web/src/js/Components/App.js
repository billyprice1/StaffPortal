import React from 'react';
import { Router, browserHistory } from 'react-router';
import Routes from './Routes/';

export default class App extends React.Component {
    constructor() {
        super()
        console.log('%c Stop', 'font-family: sans-serif; font-weight: bold; font-size: 48px; color: red;')
        console.log('%c This is a browser feature intended for developers. If someone told you to copy-paste something here to "hack" someone\'s StaffPortal account, it is a most obviously a scam and will give them access to your StaffPortal account.', 'font-family: sans-serif; font-weight: bold; font-size: 24px;');
    }

    render() {
        return (
            <Router history={browserHistory} routes={Routes} onUpdate={() => window.scrollTo(0, 0)}/>
        );
    }
}