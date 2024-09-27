const Favorites = require("../models/favoritesModel");
const mongoose = require("mongoose");

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorites.find();
    return res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postFavorites = async (req, res) => {
  const {
    adult,
    backdrop_path,
    genre_ids,
    id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
  } = req.body;

  try {
    const favorite = new Favorites({
      adult,
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count,
    });

    await favorite.save();
    return res.status(201).json({ message: "Successfully created", favorite });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFavorite = async(req,res) => {
    const id  = req.params;
    try{
        if(!id){
            return res.status(400).json({message: 'ID is required'});
        }

        const favorite = await Favorites.findOneAndDelete(id);
        if(!favorite){
            return res
              .status(404)
              .json({ message: "Movie not found in Favorites" });
        }
        return res.status(200).json({message: 'Movie deleted from Favorites', favorite});
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getFavorites, postFavorites, deleteFavorite };