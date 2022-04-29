const current = require("./current");
const updateSubscription = require("./updateSubscription");
const getOwnDictionarys = require("./getOwnDictionarys");
const getOwnDictionary = require("./getOwnDictionary");
const addOwnDictionary = require("./addOwnDictionary");
const removeOwnDictionaryById = require("./removeOwnDictionaryById");
const updateAvatar = require("./updateAvatar");
const emailVerification = require("./emailVerification");
const emailReVerification = require("./emailReVerification");
module.exports = {
  current,
  updateSubscription,
  getOwnDictionarys,
  getOwnDictionary,
  addOwnDictionary,
  removeOwnDictionaryById,
  updateAvatar,
  emailVerification,
  emailReVerification,
};
