import React from "react";
// import "./SignUpForm.css";
import Jumbotron from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';



function SignUpForm(props) {
  return (


    <Jumbotron className="jumbotron-3">
       <div >
       <h2>Join our Foodie Community!</h2>
       <div className="container-changes">
          <fieldset>
            <legend>Get started below</legend>
            <form>
            <div>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" onChange={props.handleInput} />
              </div>
              <div>
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" onChange={props.handleInput} />
              </div>

              <div>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" onChange={props.handleInput} />
              </div>
              <input value="Submit" type="submit" onClick={props.handleSignUp} />
            </form>
          </fieldset>
      </div>
    </div>
</Jumbotron>

        )
      }


 

export default SignUpForm;
