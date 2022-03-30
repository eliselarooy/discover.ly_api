import Spot from '../models/spot.js';

const searchSpots = async (req, res, next) => {
  const searchText = req.query.text;
  searchText.replace(' ', '%20');
  const regex = new RegExp(searchText, 'i'); // i for case insensitive

  try {
    const results = await Spot.find({ title: { $regex: regex } });

    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

export default {
  searchSpots,
};
