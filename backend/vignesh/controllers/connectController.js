const ConnectRequest = require('../models/ConnectRequest');
const User = require('../models/User');

exports.sendRequest = async (req, res) => {
  try {
    const fromUser = req.user._id;
    const toUser = req.params.userId;

    if (fromUser.toString() === toUser.toString()) {
      return res.status(400).json({ message: 'You cannot connect with yourself.' });
    }

    const targetUser = await User.findById(toUser);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const existing1 = await ConnectRequest.find({ fromUser: fromUser, toUser: toUser });
    const existing2 = await ConnectRequest.find({ fromUser: toUser, toUser: fromUser });

    if (existing1.length > 0 || existing2.length > 0) {
      const existing = existing1.length > 0 ? existing1[0] : existing2[0];
      const msg =
        existing.status === 'pending'
          ? 'A connection request already exists between you two.'
          : `Request was already ${existing.status}.`;
      return res.status(409).json({ message: msg, status: existing.status });
    }

    const request = await ConnectRequest.create({ fromUser, toUser });

    res.status(201).json({
      message: `Connection request sent to ${targetUser.name}.`,
      request,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getIncoming = async (req, res) => {
  try {
    const requests = await ConnectRequest.find({
      toUser: req.user._id,
      status: 'pending',
    });

    const result = [];
    for (let i = 0; i < requests.length; i++) {
      const r = requests[i];
      const sender = await User.findById(r.fromUser);
      if (sender) {
        result.push({
          _id: r._id,
          fromUser: {
            _id: sender._id,
            name: sender.name,
            email: sender.email,
            bio: sender.bio,
            subjects: sender.subjects,
            environment: sender.environment,
          },
          toUser: r.toUser,
          status: r.status,
          createdAt: r.createdAt,
        });
      }
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSent = async (req, res) => {
  try {
    const requests = await ConnectRequest.find({
      fromUser: req.user._id,
    });

    const result = [];
    for (let i = 0; i < requests.length; i++) {
      result.push({
        toUser: requests[i].toUser,
        status: requests[i].status,
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const request = await ConnectRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found.' });
    }

    if (request.toUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorised to accept this request.' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ message: `Request is already ${request.status}.` });
    }

    request.status = 'accepted';
    await request.save();

    res.json({ message: 'Request accepted.', request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.declineRequest = async (req, res) => {
  try {
    const request = await ConnectRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found.' });
    }

    if (request.toUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorised to decline this request.' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ message: `Request is already ${request.status}.` });
    }

    request.status = 'declined';
    await request.save();

    res.json({ message: 'Request declined.', request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
