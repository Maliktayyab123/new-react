import * as React from "react";
//import * as ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import Inbox from "./Inbox";
import Notifications from "./Notifications";
import Calendar from "./Calendar";
import Attachments from "./Attachments";
import Favourites from "./Favourites";
import DrawerRouterContainer from "./DrawerRouterContainer";
import "../styles.css";


function Drawer(props) {
    return (
      <HashRouter>
      <DrawerRouterContainer>
        <Switch>
          <Route exact={true} path="/" component={Inbox} />
          <Route exact={true} path="/notifications" component={Notifications} />
          <Route exact={true} path="/calendar" component={Calendar} />
          <Route exact={true} path="/attachments" component={Attachments} />
          <Route exact={true} path="/favourites" component={Favourites} />
        </Switch>
      </DrawerRouterContainer>
    </HashRouter>
    );
}

export default Drawer;
