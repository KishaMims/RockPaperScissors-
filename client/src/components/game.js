import { useEffect, useState } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";




export default function Game(props) {

  const [userChoice, setUserChoice] = useState(null);
  const [computerPick, setComputerPick] = useState(null);
  const [winner, setWinner] = useState(null);
  const results = ['rock', 'paper', 'scissors'];
  const [score, setScore] = useState(0);

  const handleOnClick = (value) => {
    setUserChoice(value)
    getComputerPick()
    // e.preventDefault();
    // postWins(wins)
  }


  const getComputerPick = () => {
    const randomChoice = results[Math.floor(Math.random() * results.length)];
    setComputerPick(randomChoice);
  };

  const postUser = (newUser) => {
    return fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("From the post ", data);
      props.addUser(data);

    });
  }



  useEffect(() => {
    {
      switch (userChoice + computerPick) {
        case 'scissorspaper':
        case 'rockscissors':
        case 'paperrock':
          setWinner('You win!')
          setScore(score + 1);
          break;
        case 'paperscissors':
        case 'scissorsrock':
        case 'rockpaper':
          setWinner('You lose!')
          setScore(score - 1);
          break;
        case 'rock':
        case 'paperpaper':
        case 'scissorsscissors':
          setWinner('Its a draw!')
          break;
      }
    }
  }, [computerPick, userChoice])

  const navigate = useNavigate();
  return (
    <div>
      <h1>Rock 🪨 Paper 📃 Scissors ✂️ </h1>
      <p>Pick your Choice!</p>
      <p>User choice is {userChoice}</p>
      <p>Computer choice is {computerPick}</p>
      {results.map((result, index) =>
        <button key={index} onClick={() => handleOnClick(result)}>{result}</button>)}
      <h1>{winner} </h1>
      <h2>Your current score is {score}!</h2>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}
