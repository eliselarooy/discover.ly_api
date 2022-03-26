import Spot from '../models/spot.js';
import User from '../models/user.js';

const like = async (req, res, next) => {
  try {
    const spot = await Spot.findById(req.params.id);

    if (!spot) {
      return res.status(404).send({ message: 'Spot not found!' });
    }

    const userId = req.currentUser._id.toString();

    if (!spot.likedBy.includes(req.currentUser._id)) {
      spot.likedBy.push(req.currentUser._id);

      const data = await spot.save();

      await User.updateMany(
        { _id: spot.likedBy },
        { $push: { likedSpots: spot._id } }
      );

      return res.status(201).json({ message: 'Liked', data });
    }

    await User.updateMany(
      { _id: spot.likedBy },
      { $pull: { likedSpots: spot._id } }
    );

    const index = spot.likedBy.indexOf(userId);

    spot.likedBy.splice(index, 1);

    const data = await spot.save();

    return res.status(200).json({ message: 'Removed like', data });
  } catch (err) {
    next(err);
  }
};

export default {
  like,
};
