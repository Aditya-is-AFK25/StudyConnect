const Progress = require("../../models/progress");
const User = require("../../../vignesh/models/User");

module.exports = async (req,res) => {
    try {
        const userId = req.user.id;
        let progressRecords = await Progress.find({ user: userId });
        
        if (progressRecords.length === 0) {
            // Seed default milestones if none exist for user
            const user = await User.findById(userId);
            if (user && user.subjects && user.subjects.length > 0) {
                const defaultMilestones = [
                    "Module 1: Basics & Core Concepts",
                    "Module 2: Midterm Syllabus Review",
                    "Module 3: Practical Assignment Submission",
                    "Module 4: Final Exam Revision"
                ];
                
                const seedData = [];
                for (const subject of user.subjects) {
                    for (const milestone of defaultMilestones) {
                        seedData.push({
                            user: userId,
                            subject: subject,
                            topic: milestone,
                            status: "Pending"
                        });
                    }
                }
                
                if (seedData.length > 0) {
                    progressRecords = await Progress.insertMany(seedData);
                }
            }
        }

        // Map backend progress records to what frontend expects
        const mappedRecords = progressRecords.map(pr => ({
            id: pr._id,
            _id: pr._id,
            category: pr.subject,
            text: pr.topic,
            done: pr.status === "Completed"
        }));

        res.status(200).json(mappedRecords);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};