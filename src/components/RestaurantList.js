import React, { useState, useEffect } from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import RestaurantShow from "./RestaurantShow";
import Card from 'react-bootstrap/Card';
import { CardGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


const RestaurantList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    // Need to wrap this in an async function to use await inside:
    async function fetchData() {
      const response = await axios.get("http://localhost:3001/api/restaurants");
      setRestaurants(response.data);
      // console.log(response.data)
    }
    fetchData();
  }, [restaurants]);
  
  const showRestaurants = restaurants.map((restaurant, i) => {
    const { name, address, _id, likes, reviews, image_url } = restaurant;
    return (
      <div>
        <Card key={i}
        style={{ width: 300 }}
        className="restaurant-card card text-center m-2 ">
        {/* <div className="restaurant-preview"> */}
            <Card.Img variant="top" src={image_url} alt={name} className="restaurant-image" />
            
            <Card.Body>
            {/* <Card.Text style={{fontSize: 15}}>{name}</Card.Text> */}
              <Card.Text style={{fontSize: 15}}>{address}</Card.Text>
              {/* <Card.Text></Card.Text> */}
            </Card.Body>
            <Link to ={`/restaurants/${_id}`}> <button className="restaurant-button"><p>{name}</p></button></Link> 
          
{/* 
            {props.isLoggedIn ? <h4>Likes: {likes}</h4> : ""}
            {props.isLoggedIn ? <h4>Reviews: {reviews.username}: {reviews.text}</h4> : ""}
            
            {props.isLoggedIn ? <h4>Address: {address}</h4> : ""} */}
        </Card>

      </div>
    );
  });
  return (
  <Container fluid>
    <h1 style={{margin: 20}}>Food and Bar Locations</h1>
    <CardGroup className="user-card-group">
  {showRestaurants}
  </CardGroup>
  </Container>
  );
};

export default RestaurantList;