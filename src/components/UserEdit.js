// import React, { useState, useEffect } from "react";
// import {useParams, Link} from "react-router-dom";
// import axios from "axios";

// function UserEdit(props) {
//     const [user, setUser] = useState([]);
//     const { name, _id, email, password, photo, favorites } = user;
//     console.log(user)
//     return (
//         <div className="user-edit">
//             <h1>Edit your Profile, {user.name}</h1>
//             <br />
//             <form action={`/users/${_id}?_method=PUT`} method="POST" className="new-form">
//                 Name: <input type="text" name="name" defaultValue={name} />
//                 <br />
//                 Photo: <input type="text" name="photo" defaultValue={photo} />
//                 <br />
//                 <input type="submit" name="" value="Submit Card" ></input>
//             </form>
//         </div>
//     );
// }


// export default UserEdit;