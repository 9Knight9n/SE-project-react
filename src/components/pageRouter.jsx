import React, {Component} from 'react';
import Navbar from "./homepage/navbar/navbar";
import Footer from "./homepage/footer";
import {Route, Switch} from "react-router-dom";
import SearchUser from "./homepage/searchUser/searchUser";
import Settings from "./settings/settings";
import Hosting from "./hosting/hosting";
import Homepage from "./homepage/homepage";
import VillaProfile from './villa/villaProfile/villaProfile';
import SlideShow from './villa/villaProfile/slideShow/sildeShow';
import Reserve from './villa/reservation/reserve';

class PageRouter extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={'min-vh-100 d-flex flex-column'}>
                <Navbar/>
                <Switch>
                    <Route path="/settings/">
                        <Settings/>
                    </Route>
                    <Route path="/hosting/">
                        <Hosting/>
                    </Route>
                    <Route path="/villa/villaProfile/">
                        <VillaProfile/>
                    </Route>
                    <Route path="/">
                        <Homepage/>
                    </Route>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default PageRouter;
