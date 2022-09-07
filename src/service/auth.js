const axios = require("axios");
const qs = require("qs");

const getGoogleOAuthTokens = async ({ code }) => {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECTURL,
    grant_type: "authorization_code",
  };

  try {
    const { data } = await axios.post(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return data; // { access_token, expires_in, token_type, refresh_token }
  } catch (error) {
    console.error(
      "Failed to fetch Google Oauth Tokens",
      error.response.data.error
    );
    throw new Error(error.message);
  }
};

const getGoogleUser = async ({ id_token, access_token }) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching Google user", error);
    throw new Error(error.message);
  }
};

const getFaceBookOAuthTokens = async ({ code }) => {
  const url = "https://graph.facebook.com/v4.0/oauth/access_token";

  const values = {
    code,
    client_id: process.env.FACEBOOK_CLIENT_ID,
    client_secret: process.env.FACEBOOK_CLIENT_SECRET,
    redirect_uri: process.env.FACEBOOK_OAUTH_REDIRECTURL,
  };

  try {
    const { data } = await axios.get(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return data; // { access_token, token_type, expires_in }
  } catch (error) {
    console.error(
      "Failed to fetch FaceBook Oauth Tokens",
      error.response.data.error
    );
    throw new Error(error.message);
  }
};

const getFaceBookUser = async ({ access_token }) => {
  try {
    const { data } = await axios.get({
      url: "https://graph.facebook.com/me",
      params: {
        fields: ["name", "email", "picture"].join(","),
        access_token,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching Google user", error);
    throw new Error(error.message);
  }
};

module.exports = {
  getGoogleOAuthTokens,
  getGoogleUser,
  getFaceBookOAuthTokens,
  getFaceBookUser,
};
