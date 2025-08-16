import React, { useEffect, useState } from "react";

function DishesList() {
  const [dishes, setDishes] = useState([]);

  // api call to backend list for list of dishes
  useEffect(() => {
    fetch("http://127.0.0.1:8000/dishes")
      .then((res) => res.json())
      .then((data) => setDishes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {dishes.length === 0 && <p>No dishes added yet</p>}
      {dishes.map((dish, index) => (
        <div key={index} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h2>{dish.name}</h2>
          <p>Restaurant: {dish.restaurant}</p>
          <p>
            Rating: {dish.rating.score} by {dish.rating.user}{" "}
            {dish.rating.comment && `- "${dish.rating.comment}"`}
          </p>
          {dish.song && (
            <div>
              <p>Song: {dish.song.title} by {dish.song.artist}</p>
              <audio controls>
                <source src={dish.song.spotify_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DishesList;
