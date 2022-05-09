import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "shards-react";

import {useAuth0} from '@auth0/auth0-react';
  
function MenuBar() {
  const {isAuthenticated} = useAuth0()
  const loggedIn = sessionStorage.getItem("email") || isAuthenticated;
  return(
    <Navbar type="dark" theme="primary" expand="md">
      <NavbarBrand href="/">CIS 550</NavbarBrand>
      <Nav navbar>
        <NavItem>
          <NavLink active href="/">
            Home
          </NavLink>
        </NavItem>
        { loggedIn !== null && ( <>
          <NavItem>
            <NavLink active href="/prices">
              prices
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active  href="/priceByTime" >
              priceByTime
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active  href="/priceSurges" >
              priceSurges
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active  href="/priceAboveMA" >
              priceAboveMA
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/Tweets">
              Tweets
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/User">
              Twitter Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/logout">
              Logout
            </NavLink>
          </NavItem>
        </>)}
      </Nav>
    </Navbar>
  )
}

export default MenuBar
  