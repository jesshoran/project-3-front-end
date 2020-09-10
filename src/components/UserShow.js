import React, { useState, useEffect } from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import Jumbotron from 'react-bootstrap/Button';


function UserShow(props) {
  const [user, setUser] = useState([]);
  
  console.log("======usershow component running======")
  console.log(props)
  useEffect(() => {
    // Need to wrap this in an async function to use await inside:
    async function fetchData() {
      const response = await axios.get(`http://localhost:3001/api/users/${props.user.id}`);
      console.log("=====fetch====", response)
      setUser(response.data);
    }
    fetchData();
  }, [!user]);

  const { name, email, photo, _id, password, favorites } = user;
  return (
    <Jumbotron className="jumbotron-3">
    <div className="user-preview container-changes-2">
    <h1>{name}</h1>
      <img src={photo} alt={name} className="user-image" />

    <h3>{email}</h3>
      {props.isLoggedIn ? <h4>Favorites: {favorites}</h4> : ""}


      <Link to={`/${_id}/edit`}><h3>Edit your Profile</h3></Link>
      {/* <Link to={`/${_id}`}><button>Delete your Profile</button></Link>
       */}
      <form action={`/${_id}?_method=DELETE`} method="POST"><input type="submit" value="Delete Profile"/></form>
      
      
      
      
      {props.isLoggedIn ? <h4>Favorites:</h4> : ""}
      <ul>
        {props.user.favorites?.map((restaurant)=>{
          console.log(restaurant)
          return (
            <li>{restaurant.name}</li>
            )
          })}
      </ul>

    </div>
    </Jumbotron>
  );
}


export default UserShow;