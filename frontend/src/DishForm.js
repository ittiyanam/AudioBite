import React, { useState } from "react";
// import './index.css';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const newDish = await response.json();
      onDishAdded(newDish);
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
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">Add a Dish</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Dish name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="restaurant"
          placeholder="Restaurant"
          value={formData.restaurant}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="user"
          placeholder="Your name"
          value={formData.user}
          onChange={handleChange}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <textarea
        name="comment"
        placeholder="Comment"
        value={formData.comment}
        onChange={handleChange}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="song_title"
          placeholder="Song title"
          value={formData.song_title}
          onChange={handleChange}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="song_artist"
          placeholder="Song artist"
          value={formData.song_artist}
          onChange={handleChange}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <input
        type="text"
        name="song_url"
        placeholder="Song URL (mp3/Spotify preview)"
        value={formData.song_url}
        onChange={handleChange}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition"
      >
        Add Dish
      </button>
    </form>
  );
};

export default DishForm;
