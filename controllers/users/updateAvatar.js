const { User } = require("../../models");
// const fs = require('fs/promises')
const fs = require("fs").promises;
const path = require("path");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tmpDir, originalname } = req.file;
  const [extension] = originalname.split(".").reverse();
  const filename = `${_id}.${extension}`;
  const uploadDir = path.join(__dirname, "../../", "public//avatars", filename);

  try {
    await fs.rename(tmpDir, uploadDir);
    await User.findByIdAndUpdate(_id, { avatarURL: uploadDir });
    res.status(200).json({
      avatarURL: uploadDir,
    });
  } catch (error) {
    await fs.unlink(tmpDir);
    next(error);
  }
};

module.exports = updateAvatar;
