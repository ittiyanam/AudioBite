import React, { useState, useEffect } from 'react';
import DishForm from "./DishForm";
import './index.css';


function App() {
  const [dishes, setDishes] = useState([]);

  // get the dishes when page loads
  useEffect(() => {
    fetch("http://127.0.0.1:8000/dishes")
      .then((res) => res.json())
      .then((data) => setDishes(data))
      .catch((err) => console.error("Error fetching dishes:", err));
  }, []);

  // adding a new dish
  const handleDishAdded = (newDishResponse) => {
    // backend returns { message: "Dish added!", dish: {...} }
    setDishes([...dishes, newDishResponse.dish]);
  };

  return (
    <div className="min-h-screen bg-rose-50">
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-6xl font-extrabold font-dm text-rose-400 text-center">
        AudioBite
      </h1>

      {dishes.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-6 text-gray-400 pb-7">
          <span className="text-8xl mb-5">^_^</span>
          <p className="text-lg">Nothing added yet! Time to add your first dish.</p>
        </div>
      ) : (
      <ul className="space-y-4 mt-2">
        {dishes.map((dish, i) => (
          <li key={i} className="border p-3 rounded">
            <h3 className="font-bold">{dish.name}</h3>
            <p className="text-sm text-gray-600">{dish.restaurant}</p>
            <p>
              ⭐ {dish.rating.score} by {dish.rating.user}
            </p>
            {dish.rating.comment && <p>{dish.rating.comment}</p>}
            {dish.song && (
              <div>
                <p className="mt-2">
                  🎵 {dish.song.title} – {dish.song.artist}
                </p>
                {dish.song.spotify_url && (
                  <audio controls src={dish.song.spotify_url}></audio>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      )}

      <DishForm onDishAdded={handleDishAdded} />

    </div>
    </div>
  );
}


export default App;
