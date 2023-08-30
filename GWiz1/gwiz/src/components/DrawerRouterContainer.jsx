import WhiteLogo from "../images/white-logo.png"
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import '../App.css';


const items = [{
  text: 'Customers',
  icon: 'k-i-inbox',
  selected: true,
  route: '/'
}, {
  separator: true
}, {
  text: 'Orders',
  icon: 'k-i-bell',
  route: '/notifications'
}, {
  text: 'Store',
  icon: 'k-i-calendar',
  route: '/calendar'
}, {
  separator: true
}, {
  text: 'Additive',
  icon: 'k-i-hyperlink-email',
  route: '/attachments'
}];
const DrawerRouterContainer = props => {
  const [expanded, setExpanded] = React.useState(true);
  // const handleClick = () => {
  //   setExpanded(!expanded);
  // };
    
  const setSelectedItem = pathName => {
    let currentPath = items.find(item => item.route === pathName);
    if (currentPath.text) {
      return currentPath.text;
    }
  };
  let selected = setSelectedItem(props.location.pathname);
  return (
    <div className="logo-div">
      <div className="drawer-container">
      <img className="logo" src={WhiteLogo} alt="" />
      </div>

      <Drawer expanded={expanded} position={'start'} mode={'static'} mini={true} items={items.map(item => ({
      ...item,
      selected: item.text === selected
    }))} >
        <DrawerContent>
       
          {props.children}
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default withRouter(DrawerRouterContainer);
