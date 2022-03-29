import Spot from '../models/spot.js';

const searchSpots = async (req, res, next) => {
  const searchText = req.body.text;
  const results = [];
  try {
    const spots = await Spot.find();
    spots.filter(function (spot) {
      if (
        spot.description.includes(searchText) ||
        spot.title.includes(searchText)
      ) {
        results.push(spot);
      }
    });

    results.length === 0
      ? res.status(404).send({ message: 'No results' })
      : res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

export default {
  searchSpots,
};
