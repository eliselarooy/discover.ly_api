import Spot from '../models/spot.js';

const getAllSpots = async (req, res) => {
  const spots = await Spot.find({});
  return res.status(200).json(spots);
};

const getAllSpotsForUser = async (req, res, next) => {
  try {
    const spots = await Spot.find({ createdBy: req.params.userId });
    return res.status(200).json(spots);
  } catch (err) {
    next(err);
  }
};

const getSpotById = async (req, res) => {
  const spot = await Spot.findById(req.params.spotId); //spotId is parameter of url (express.js)

  !spot ? res.status(404) : res.status(200).json(spot);
};

// !  Potential here for checking if spot already exists?
// ! i.e: if (spot === (already created spot) {return res.status(404).send({ message: 'Spot already created: @spot})}
const createSpot = async (req, res) => {
  const userId = req.currentUser._id;
  const spot = await Spot.create({ ...req.body, createdBy: userId });
  return res.status(200).json(spot);
};

const editSpot = async (req, res) => {
  const spot = await Spot.findById(req.params.id);
  spot.set(req.body);
  const updatedSpot = await spot.save();
  return res.status(200).json(updatedSpot);
};

const deleteSpot = async (req, res) => {
  await Spot.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .json({ message: 'You deleted your spot!' + req.params.id });
};

export default {
  getAllSpots,
  getSpotById,
  createSpot,
  editSpot,
  deleteSpot,
  getAllSpotsForUser,
};
