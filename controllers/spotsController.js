import Spot from '../models/spot.js';

const getAllSpots = async (req, res) => {
  const spots = await Spot.find();
  return res.status(200).json(spots);
};

const getSpotById = async (req, res) => {
  const spot = await Spot.findById(req.params.spotId); //spotId is parameter of url (express.js)

  !spot ? res.status(404) : res.status(200).json(spot);
};

const createSpot = async (req, res) => {
  const spot = await Spot.create(req.body);
  return res.status(401).send(201);
};

const editSpot = async (req, res) => {
  const spot = await Spot.findById(req.params.id);
  spot.set(req.body);
  const updatedSpot = await spot.save();
  return res.status(200).json(updatedSpot);
};

const deleteSpot = async (req, res) => {
  const spot = Spot.findByIdAndDelete(req.params.id);
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
};
