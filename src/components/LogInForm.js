import React from "react";
import Jumbotron from 'react-bootstrap/Button';

function LogInForm(props) {
  return (
    

      <Jumbotron className="jumbotron-3">
        <div>
      <h2>Log In to FOOdBAR</h2>
      <div className="container-changes">
        <fieldset>
          <legend>Enter credentials below</legend>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" onChange={props.handleInput} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" onChange={props.handleInput} />
        </div>

        <input value="Submit" type="submit" onClick={props.handleLogIn} />
      </form>
      </fieldset>
    </div>
    </div>
    </Jumbotron>
  );
}

export default LogInForm;
