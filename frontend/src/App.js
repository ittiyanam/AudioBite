import React, { useState, useEffect } from 'react';
import DishesList from "./DishesList";
import DishForm from "./DishForm";

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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🍽️ AudioBite</h1>

      <DishForm onDishAdded={handleDishAdded} />

      <h2 className="text-xl font-semibold mt-6">All Dishes</h2>
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
    </div>
  );
}


export default App;
