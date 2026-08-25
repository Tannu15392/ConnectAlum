import Mentor from "../models/Mentor.js";

// Add mentor profile (alumni only)
export const addMentor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      profileLink,
      communication,
      organization,
      location,
      experience,
      expertise,
      linkedin,
      instagram,
      twitter,
    } = req.body;

    const user_id = req.userId;

    if (!firstName?.trim() || !lastName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "First and last name are required",
      });
    }

    // Prevent duplicate mentor profiles
    const existingMentor = await Mentor.findOne({ user_id });

    if (existingMentor) {
      return res.status(409).json({
        success: false,
        message: "You already have a mentor profile",
        mentor: {
          ...existingMentor.toObject(),
          id: existingMentor._id,
        },
      });
    }

    const parsedExperience = Number.parseInt(experience, 10);

    const mentor = await Mentor.create({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      user_id,
      profile_link: profileLink?.trim() || "",
      communication: Array.isArray(communication)
        ? communication.filter(Boolean)
        : communication
          ? [communication]
          : [],
      organization: organization?.trim() || "",
      location: location?.trim() || "",
      experience: Number.isNaN(parsedExperience)
        ? 0
        : Math.max(0, parsedExperience),
      expertise: expertise?.trim() || "",
      linkedin: linkedin?.trim() || "",
      instagram: instagram?.trim() || "",
      twitter: twitter?.trim() || "",
    });

    res.status(201).json({
      success: true,
      message: "Mentor profile created successfully",
      mentor: {
        ...mentor.toObject(),
        id: mentor._id,
      },
    });
  } catch (err) {
    console.error("Add Mentor Error:", err);

    // Handle MongoDB duplicate-key error
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You already have a mentor profile",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to save mentor",
    });
  }
};

// Get all mentors
export const getAllMentors = async (req, res) => {
  const { expertise, search } = req.query;

  try {
    const query = {};

    if (expertise?.trim()) {
      query.expertise = {
        $regex: expertise.trim(),
        $options: "i",
      };
    }

    if (search?.trim()) {
      const searchTerm = search.trim();

      query.$or = [
        {
          first_name: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          last_name: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          organization: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          expertise: {
            $regex: searchTerm,
            $options: "i",
          },
        },
      ];
    }

    const mentors = await Mentor.find(query)
      .populate("user_id", "name role college company")
      .sort({ createdAt: -1 });

    res.json(
      mentors.map((mentor) => ({
        ...mentor.toObject(),
        id: mentor._id,
      }))
    );
  } catch (err) {
    console.error("Get Mentors Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};