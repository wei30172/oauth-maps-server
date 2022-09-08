const router = require("express").Router();
const {
  googleOauthHandler,
  facebookOauthHandler,
  getCurrentUser,
  getCurrentFBInfo,
  userLogout,
  userUnbind,
} = require("../controller/auth");
const { requireUser } = require("../middleware/requireUser");

router.get("/sessions/oauth/google", googleOauthHandler);

router.get("/sessions/oauth/facebook", facebookOauthHandler);

router.get("/user", getCurrentUser);

router.get("/userfb", requireUser, getCurrentFBInfo);

router.get("/logout", requireUser, userLogout);

router.get("/unbind", requireUser, userUnbind);

module.exports = router;
