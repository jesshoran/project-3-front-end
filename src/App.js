import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from "./components/NavBar";
import RestaurantList from "./components/RestaurantList";
import RestaurantShow from "./components/RestaurantShow";
import SignUpForm from "./components/SignUpForm";
import LogInForm from "./components/LogInForm";
import LogOut from "./components/LogOut";
import UserShow from "./components/UserShow";
import UserList from "./components/UserList";
import UserEdit from "./components/UserEdit";
import Homepage from "./components/Homepage";


import "./scss/styles.scss";


const App = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    id: "",
    favorites: [],
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.token && localStorage.email) {
      setIsLoggedIn(true);
      // decode the token, grab the id out of it:
      const decodedToken = JSON.parse(atob(localStorage.token.split(".")[1]))
      setState({
        ...state, 
        name: localStorage.name, 
        email: localStorage.email, 
        id: decodedToken.id,
        // favorites
      })
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  // If you pass an empty array to useEffect, it will only run this
  // code once (per lifecycle of the component)
  useEffect(()=>{
    let favorites = []
    if (localStorage.favorites){
      favorites = JSON.parse(localStorage.favorites)
    }
    setState({
      ...state,
      favorites
    })
  }, [])

  const handleLogOut = () => {
    setState({
      name: "",
      email: "",
      password: "",

    });
    setIsLoggedIn(false);
    localStorage.clear();
    props.history.push('/');
  };

  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users/signup", {
        name: state.name,
        email: state.email,
        password: state.password,
        favorites: state.favorites
      });
      console.log(response);
      localStorage.token = response.data.token;
      localStorage.email = state.email;
      localStorage.favorites = state.favorites
      // decode the token, grab the id out of it:
      const decodedToken = JSON.parse(atob(response.data.token.split(".")[1]))
      setState({...state, id: decodedToken.id})
      setIsLoggedIn(true);
      props.history.push('/restaurants');

    } catch (err) {
      console.log(err);
    }
  };
  // const handleEdit = (user) => {
  //   setState(
  //     { ...state, 
  //     }
  //   )
  // }

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email: state.email,
        password: state.password,
        name: state.name,
      });
      localStorage.token = response.data.token;
      localStorage.email = state.email;
      localStorage.name = state.name;
      // decode the token, grab the id out of it:
      const decodedToken = JSON.parse(atob(response.data.token.split(".")[1]))
      setIsLoggedIn(true);
      setState({...state, id: decodedToken.id})
      props.history.push('/profile');
    } catch (error) {
      console.log(error);
      let userChoice;
      userChoice = prompt(`Are you already a member (yes) || (no)?`)
      if (userChoice === 'yes'){
          alert('Did you mistype your email?')
      }
      else if (userChoice === 'no'){
          alert(`Oh... Sign up then!`);
          props.history.push('/signup');
      }
    }
  };
  

  const handleUpdateFavorites = (restaurant) => {
    setState(
      { ...state, 
        favorites: [
          ...state.favorites, 
          restaurant
        ]
      }
    )
  }

  return (
    
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="body">
        <Switch>
          <Route
            path="/signup"
            render={(props) => {
              return (
                <SignUpForm
                isLoggedIn={isLoggedIn}
                handleInput={handleInput}
                handleSignUp={handleSignUp}
                />
                );
              }}
          />
          <Route
            path="/logout"
            render={(props) => {
              return (
                <LogOut 
                isLoggedIn={isLoggedIn} 
                handleLogOut={handleLogOut} 
                />
                
                );
              }}
          />
              <Route
                path="/:id/edit"
                render={(props) => {
                  return (
                    <UserEdit 
                    isLoggedIn={isLoggedIn} 
                    user={state}
                    />
                    
                  );
                }}
              />
          <Route
            path="/allusers"
            render={(props) => {
              return (
                <UserList 
                isLoggedIn={isLoggedIn} 
                />
                
              );
            }}
          />
           
          <Route
            path="/profile"
            render={(props) => {
              return (
                <UserShow 
                isLoggedIn={isLoggedIn} 
                handleLogOut={handleLogOut} 
                user={state}
                />
                
              );
            }}
          />
          <Route
            path="/login"
            render={(props) => {
              return (
                <LogInForm
                  isLoggedIn={isLoggedIn}
                  handleInput={handleInput}
                  handleLogIn={handleLogIn}
                />
              );
            }}
          />
          <Route
            path="/restaurants/:id"
            // component={RestaurantShow}
            render={(props) => {
              return (
                <RestaurantShow 
                  isLoggedIn={isLoggedIn} 
                  handleLogIn={handleLogIn}
                  user={state} 
                  handleUpdateFavorites={handleUpdateFavorites}
                />
              )
            }}
          />
          <Route
            path="/restaurants"
            render={(props) => {
              return (
              <RestaurantList isLoggedIn={isLoggedIn} user={state}/>
              )

            }}
          />
          <Route
            path="/"
            render={(props) => {
              return (
                <Homepage 
                isLoggedIn={isLoggedIn} 
                />
                
              );
            }}
          />
        </Switch>
      </div>

    </div>


  );
};
export default withRouter(App);
