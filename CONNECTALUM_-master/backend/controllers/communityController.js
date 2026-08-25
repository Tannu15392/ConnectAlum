import Community from "../models/Community.js";

// Create community (alumni only)
export const createCommunity = async (req, res) => {
  const { name, description, topic, is_private } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name required",
    });
  }

  try {
    const community = await Community.create({
      name: name.trim(),
      description,
      topic,
      is_private: !!is_private,
      created_by: req.userId,
      members: [req.userId],
    });

    const pop = await Community.findById(community._id).populate(
      "created_by",
      "name role college"
    );

    res.status(201).json({
      success: true,
      community: {
        ...pop.toObject(),
        id: pop._id,
      },
    });
  } catch (err) {
    console.error("Create Community Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all communities
export const getCommunities = async (req, res) => {
  const { search } = req.query;

  try {
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { topic: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const communities = await Community.find(query)
      .populate("created_by", "name role company")
      .sort({ createdAt: -1 });

    res.json(
      communities.map((c) => ({
        ...c.toObject(),
        id: c._id,
        memberCount: c.members.length,
        postCount: c.posts.length,
      }))
    );
  } catch (err) {
    console.error("Get Communities Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Join / Leave community
export const toggleMembership = async (req, res) => {
  const { id } = req.params;

  try {
    const community = await Community.findById(id);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    const isMember = community.members.some(
      (member) => member.toString() === req.userId
    );

    // Leave community
    if (isMember) {
      community.members = community.members.filter(
        (member) => member.toString() !== req.userId
      );

      await community.save();

      return res.json({
        success: true,
        joined: false,
        memberCount: community.members.length,
      });
    }

    // Private communities cannot be joined directly
    if (community.is_private) {
      return res.status(403).json({
        success: false,
        message: "This is a private community. Membership is restricted.",
      });
    }

    // Join public community
    community.members.push(req.userId);

    await community.save();

    res.json({
      success: true,
      joined: true,
      memberCount: community.members.length,
    });
  } catch (err) {
    console.error("Toggle Membership Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Post to community
export const addPost = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Text required",
    });
  }

  try {
    const community = await Community.findById(id);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    const isMember = community.members.some(
      (member) => member.toString() === req.userId
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Join community first",
      });
    }

    community.posts.push({
      author: req.userId,
      text: text.trim(),
    });

    await community.save();

    const updated = await Community.findById(id).populate(
      "posts.author",
      "name role college"
    );

    const newPost = updated.posts[updated.posts.length - 1];

    res.status(201).json({
      success: true,
      post: newPost,
    });
  } catch (err) {
    console.error("Add Post Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get community details with posts
export const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)
      .populate("created_by", "name role company")
      .populate("posts.author", "name role college");

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    // Check membership for private communities
    if (community.is_private) {
      const isMember = community.members.some(
        (member) => member.toString() === req.userId
      );

      if (!isMember) {
        return res.status(403).json({
          success: false,
          message: "Access denied. This is a private community.",
        });
      }
    }

    res.json({
      ...community.toObject(),
      id: community._id,
    });
  } catch (err) {
    console.error("Get Community Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Like a post
export const likePost = async (req, res) => {
  const { id, postId } = req.params;

  try {
    const community = await Community.findById(id);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found",
      });
    }

    const post = community.posts.id(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Only community members can like posts
    const isMember = community.members.some(
      (member) => member.toString() === req.userId
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Join the community first",
      });
    }

    const idx = post.likes.indexOf(req.userId);

    if (idx === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes.splice(idx, 1);
    }

    await community.save();

    res.json({
      success: true,
      likes: post.likes.length,
      liked: idx === -1,
    });
  } catch (err) {
    console.error("Like Post Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};