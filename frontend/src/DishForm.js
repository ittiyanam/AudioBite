import React, { useState } from "react";

const DishForm = ({ onDishAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    restaurant: "",
    user: "",
    score: "",
    comment: "",
    song_title: "",
    song_artist: "",
    song_url: ""
  });

// changes to inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// backend interaction with post request
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/dishes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const newDish = await response.json();
      onDishAdded(newDish); // tell parent component we added one
      setFormData({
        name: "",
        restaurant: "",
        user: "",
        score: "",
        comment: "",
        song_title: "",
        song_artist: "",
        song_url: ""
      });
    } else {
      console.error("Error adding dish");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-2">
      <input
        type="text"
        name="name"
        placeholder="Dish name"
        value={formData.name}
        onChange={handleChange}
        required
        className="border p-1 w-full"
      />
      <input
        type="text"
        name="restaurant"
        placeholder="Restaurant"
        value={formData.restaurant}
        onChange={handleChange}
        required
        className="border p-1 w-full"
      />
      <input
        type="text"
        name="user"
        placeholder="Your name"
        value={formData.user}
        onChange={handleChange}
        className="border p-1 w-full"
      />
      <input
        type="number"
        name="score"
        placeholder="Score (0–5)"
        value={formData.score}
        onChange={handleChange}
        min="0"
        max="5"
        required
        className="border p-1 w-full"
      />
      <textarea
        name="comment"
        placeholder="Comment"
        value={formData.comment}
        onChange={handleChange}
        className="border p-1 w-full"
      />
      <input
        type="text"
        name="song_title"
        placeholder="Song title"
        value={formData.song_title}
        onChange={handleChange}
        className="border p-1 w-full"
      />
      <input
        type="text"
        name="song_artist"
        placeholder="Song artist"
        value={formData.song_artist}
        onChange={handleChange}
        className="border p-1 w-full"
      />
      <input
        type="text"
        name="song_url"
        placeholder="Song URL (mp3/Spotify preview)"
        value={formData.song_url}
        onChange={handleChange}
        className="border p-1 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
        Add Dish
      </button>
    </form>
  );
};

export default DishForm;