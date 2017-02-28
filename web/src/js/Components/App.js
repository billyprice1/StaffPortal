import React from 'react';
import { Router, browserHistory } from 'react-router';
import Routes from './Routes/';

import consoleImage from 'console-image';

export default class App extends React.Component {
    constructor() {
        super()
        consoleImage('http://4vector.com/i/free-vector-stop-sign-clip-art_110930_Stop_Sign_clip_art_medium.png', 0.5);
        console.log('%c This is a browser feature intended for developers. If someone told you to copy-paste something here to "hack" someone\'s Discord and StaffPortal account, it is a scam and will give them access to your Discord and StaffPortal account.', 'font-family: sans-serif; font-weight: bold; font-size: 24px; ');
    }

    render() {
        return (
            <Router history={browserHistory} routes={Routes} onUpdate={() => window.scrollTo(0, 0)}/>
        );
    }
}