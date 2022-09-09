const {
  getGoogleOAuthTokens,
  getGoogleUser,
  getFaceBookOAuthTokens,
  getFacebookUser,
} = require("../service/auth");

const googleOauthHandler = async (req, res) => {
  // get the code from qs
  const code = req.query.code;

  try {
    // get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });
    // console.log({ id_token, access_token });

    // get user with tokens
    const googleUser = await getGoogleUser({ id_token, access_token });

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified.");
    }

    req.session.user = googleUser;
    res.redirect(`${process.env.CLIENT_URL}/profile`);
  } catch {
    console.error("Google login failure.", error);
    const errorMsg = "Google login failure.";
    res.redirect(`${process.env.CLIENT_URL}/login?errorMsg=${errorMsg}`);
  }
};

const facebookOauthHandler = async (req, res) => {
  // get the code from qs
  const code = req.query.code;

  try {
    // get access token with the code
    const { access_token } = await getFaceBookOAuthTokens({ code });

    // get user with tokens
    const facebookUserID = await getFacebookUser({ access_token });

    req.session.fbinfo = facebookUserID;
    res.redirect(`${process.env.CLIENT_URL}/profile`);
  } catch (error) {
    console.error("Facebook bind failure.", error);
    const errorMsg = "Facebook bind failure.";
    res.redirect(`${process.env.CLIENT_URL}/profile?errorMsg=${errorMsg}`);
  }
};

const getCurrentUser = async (req, res) => {
  if (req.session.user) {
    return res.send({ user: req.session.user });
  } else {
    return res.send({ user: null });
  }
};

const getCurrentFBInfo = async (req, res) => {
  if (req.session.fbinfo) {
    return res.send({ fbinfo: req.session.fbinfo });
  } else {
    return res.send({ fbinfo: null });
  }
};

const userLogout = async (req, res) => {
  try {
    req.session.user = null;
    return res.send("User session destroyed success.");
  } catch (error) {
    return res.send("User session destroyed failure.");
  }
};

const userUnbind = async (req, res) => {
  try {
    req.session.fbinfo = null;
    return res.send("fbinfo session destroyed success.");
  } catch (error) {
    return res.send("fbinfo session destroyed failure.");
  }
};

module.exports = {
  googleOauthHandler,
  facebookOauthHandler,
  getCurrentUser,
  getCurrentFBInfo,
  userLogout,
  userUnbind,
};
