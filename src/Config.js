const getSendClickURL = (env) => {
  if (env === "development" || env === "test") {
    return process.env.REACT_APP_DEV_SEND_CLICK_URL;
  } else if (env === "production") {
    return process.env.REACT_APP_PROD_SEND_CLICK_URL;
  } else {
    return "localhost:5000/click";
  }
};

const getGetClicksURL = (env) => {
  if (env === "development" || env === "test") {
    return process.env.REACT_APP_DEV_GET_CLICKS_URL;
  } else if (env === "production") {
    return process.env.REACT_APP_PROD_GET_CLICKS_URL;
  } else {
    return "localhost:5000/clicks";
  }
};

export { getSendClickURL, getGetClicksURL };
