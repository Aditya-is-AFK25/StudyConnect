const User = require('../models/User');

exports.getRecommendations = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const candidates = await User.find({ _id: { $ne: currentUser._id } }).select('-password');

    const rankedMatches = candidates
      .map((candidate) => {
        const subjectOverlap = (currentUser.subjects || []).filter((subject) => (candidate.subjects || []).includes(subject));
        const availabilityOverlap = (currentUser.availability || []).filter((slot) => (candidate.availability || []).includes(slot));
        const environmentMatch = currentUser.environment === candidate.environment ? 1 : 0;
        const score = subjectOverlap.length * 3 + availabilityOverlap.length + environmentMatch;

        return {
          ...candidate.toObject(),
          score,
          sharedSubjects: subjectOverlap,
          sharedAvailability: availabilityOverlap,
          environmentMatch: Boolean(environmentMatch),
        };
      })
      .sort((a, b) => b.score - a.score);

    res.json(rankedMatches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
