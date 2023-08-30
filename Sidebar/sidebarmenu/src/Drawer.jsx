import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
// import Inbox from './Inbox';
// import Notifications from './Notifications';
// import Calendar from './Calendar';
// import Attachments from './Attachments';
// import Favourites from './Favourites';
import DrawerRouterContainer from './DrawerRouterContainer';
import './styles.css';


function Drawer() {
    return (
        <div>
            <React.Fragment>
    <HashRouter>
      <DrawerRouterContainer>
        <Switch>
          <Route exact={true} path="/"  />
          <Route exact={true} path="/notifications"  />
          <Route exact={true} path="/calendar" />
          <Route exact={true} path="/attachments"  />
          <Route exact={true} path="/favourites" />
        </Switch>
      </DrawerRouterContainer>
    </HashRouter>
  </React.Fragment>
        </div>
    );
}

export default Drawer;