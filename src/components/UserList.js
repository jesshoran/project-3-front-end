import React, { useState, useEffect } from "react";
import axios from "axios";
import UserShow from "./UserShow";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { CardGroup } from "react-bootstrap";

const UserList = (props) => {
  console.log("=====UserList running======")
  // const { name, email, photo, password, favorites } = user;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Need to wrap this in an async function to use await inside:
    async function fetchData() {
      const response = await axios.get("http://localhost:3001/api/users");
      console.log("=====fetch====", response)
      setUsers(response.data);
    }
    fetchData();
    console.log(users)
  }, []);

  const showUsers = users.map((user, i) => {
    return (
      // <div key={i}>
      //   <h1>Name: {user.name}</h1>
      //   <img src={user.photo} alt="Add Profile Picture!"/>
      // </div>
      <div>
      <Card
        style={{ width: '18rem' }}
        className="user-card card text-center m-2 "
        key={i}>
        <Card.Img variant="top" src={user.photo} alt="Add Profile Picture!" />
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>Email: {user.email} </Card.Text>
        </Card.Body>
      </Card>
      </div>
    );
  });
  return (

  <Container fluid>
        <h1>Check out our members!</h1>
    <CardGroup className="user-card-group">
    {showUsers}
    </CardGroup>
  </Container>
  );
};

export default UserList;