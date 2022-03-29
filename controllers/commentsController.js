import Spot from '../models/spot.js';

const createComment = async (req, res, next) => {
  try {
    const spot = await Spot.findById(req.params.id);

    if (!spot) {
      return res.status(404).send({ message: 'Spot not found!' });
    }

    const newComment = { ...req.body, createdBy: req.currentUser._id };

    spot.comments.push(newComment);
    const savedSpot = await spot.save();

    return res.status(201).json({ message: 'New comment created!', savedSpot });
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id, commentId } = req.params;

    const spot = await Spot.findById(id);

    if (!spot) {
      return res.status(404).send({ message: 'Spot not found!' });
    }

    const comment = spot.comments.id(commentId);

    if (!comment) {
      return res.status(404).send({ message: 'Comment not found!' });
    }

    if (!comment.createdBy.equals(req.currentUser._id)) {
      return res
        .status(401)
        .send({ messsage: 'Cannot delete another users comment!' });
    }

    comment.remove();

    const savedSpot = await spot.save();

    return res.status(200).send({ message: 'Comment deleted!' }, savedSpot);
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { id, commentId } = req.params;
    const spot = await Spot.findById(id);

    if (!spot) {
      return res.status(404).send({ message: 'Spot not found!' });
    }

    const comment = spot.comments.id(commentId);

    if (!comment) {
      return res.status(404).send({ message: 'Comment not found!' });
    }

    if (!comment.createdBy.equals(req.currentUser._id)) {
      return res
        .status(401)
        .send({ messsage: 'Cannot edit another users comment!' });
    }

    comment.set(req.body);

    const savedSpot = await spot.save();
    return res.status(200).send({ message: 'Comment Updated!' }, savedSpot);
  } catch (err) {
    next(err);
  }
};

export default {
  createComment,
  deleteComment,
  updateComment,
};
