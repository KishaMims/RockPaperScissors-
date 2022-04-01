import { useState } from "react";
import { useNavigate } from 'react-router-dom';



const Form = (props) => {
    

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    //create functions that handle the event of the user typing into the form
    const handleUserNameChange = (event) => {
        const username = event.target.value;
        setUser((user) => ({ ...user, username}));

    }

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setUser((user) => ({ ...user, password}));

    }

    //A function to handle the post request
    const postUser = (newUser) => {
        return fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(newUser)
      }).then((response) => {
          return response.json()
      }).then((data) => {
        console.log("From the post ", data);
        props.addUser(data);
      
    });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postUser(user);
        
    };
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label>username</label>
                <input
                    type="text"
                    id="add-user-name"
                    placeholder="Username"
                    required
                    value={user.name}
                    onChange={handleUserNameChange}

                />
                <label>password</label>
                <input
                    type="text"
                    id="add-user-lastname"
                    placeholder="Enter Password"
                    required
                    value={user.password}
                    onChange={handlePasswordChange}
                />
            </fieldset> 
            <button onClick={() => navigate("/game")}>Sign In</button>
        </form>
    );
};

export default Form;