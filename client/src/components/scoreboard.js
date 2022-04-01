import React from 'react'
import { useState, useEffect } from 'react';

export default function Scoreboard() {
    const [gamedata, setGameData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
           .then((response) => response.json())
           //.then(response => response.text())
            .then(gamedata => {
                setGameData(gamedata);
            }

            )
           
    }, []);
  return (
<div className="contacts">
          <h1>User Data</h1>
          <ul>
              {gamedata.map((data, index) =>
                  <li key={index}> 
                {data.username} {data.wins}</li>)}
                {/* <button onClick={()=>className="edit-button">Edit</button> */}
          </ul>
          {/* <EditContact EditContact={EditContact}/>  */}
        </div>
      );
    }