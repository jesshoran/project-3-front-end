import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Jumbotron from 'react-bootstrap/Button';

// import "./RestaurantShow.css";
function RestaurantShow(props) {
  // load up params from react router:
  const params = useParams()
  // console.log("-----match-----", params.id)

  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    // Need to wrap this in an async function to use await inside:
    async function fetchData() {
      const response = await axios.get(`http://localhost:3001/api/restaurants/${params.id}`);
      console.log("=====fetch restaurant====", response)
      setRestaurant(response.data);
    }
    fetchData();
  }, [!restaurant]);


  
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    // Need to wrap this in an async function to use await inside:
    async function fetchData() {
      const response = await axios.get(`http://localhost:3001/api/users/${props.user.id}`);
      console.log("=====fetch====", response)
      setUser(response.data);
      console.log(props.user.id)
    }
    fetchData();
  }, [!user]);

  
  const addToFavorites = () => {
    console.log(restaurant)
    console.log('BELOW')
    console.log(props.user.favorites)
    props.user.favorites.push(restaurant)
    

    // if (props.isLoggedIn === true) {
    //   user.favorite.push()
    }
  







  const { name, address, likes, reviews, image_url } = restaurant;
  // const {_id, email, photo, password, favorites } = user;
  return (
    <Jumbotron className="jumbotron-3">
    <div className="restaurant-preview container-changes-2">
    <h1>{name}</h1>
      <img src={image_url} alt={name} className="restaurant-image" />

  
      {props.isLoggedIn ? <h4>Likes: {likes}</h4> : ""}
      {/* {props.isLoggedIn ? <h4>Reviews: {reviews.username}: {reviews.text}</h4> : ""} */}
      {props.isLoggedIn ? <h4>Address: {address}</h4> : ""}
      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
    </Jumbotron>
  );
}
// console.log(username)

export default RestaurantShow;