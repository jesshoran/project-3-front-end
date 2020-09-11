import React from "react";
import { withRouter, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import { Jumbotron } from "react-bootstrap";


function NavBar(props) {
  let navBarItems = [
    <li key={1}>
      <Link to="/">Home</Link>
    </li>,
  ];
  if (props.isLoggedIn) {
    navBarItems.push(
        <li key={2}>
          <Link to="/restaurants">Restaurants/Bars</Link>
        </li>
      );
      navBarItems.push(
        <li key={3}>
          <Link to="/profile">Profile</Link>
        </li>
      );

      navBarItems.push(
        <li key={4}>
          <Link to="/allusers">All Users</Link>
        </li>
      );
    navBarItems.push(
      <li key={5}>
        <Link to="/logout">Log Out</Link>
      </li>
    );

  } else {
    navBarItems.push(
      <li key={6}>
        <Link to="/signup">Sign Up</Link>
      </li>
    );
    navBarItems.push(
      <li key={7}>
        <Link to="/login">Log In</Link>
      </li>
    );
  }

  return (
    <>
      <nav bg="dark">
         <ul>{navBarItems}</ul>
        
      </nav>
    </>
  );
}

export default withRouter(NavBar);
