import React, { useState } from "react";
import "./Button.css";
import { motion } from "framer-motion";
import Spinner from "react-bootstrap/Spinner";

const Button = (props) => {
  const history = props.history;
  const [clicked, setClicked] = useState(false);
  const handleClick = async () => {
    setClicked(true);
    try {
      // Set URL from state passed by config TODO
      let response = await props.sendClick(
        props.sendClickURL,
        props.geoLocation.country_code,
        props.geoLocation.ip
      );
      let message = await response.json();
      if (!response.ok) {
        throw Error(`Failed to send click ${message}`);
      } else {
        console.log(
          `Sent click for ${props.geoLocation.country_code} ip ${props.geoLocation.ip}`
        );
        history.push("/total");
      }
    } catch (error) {
      console.warn(`Failed to send click due to ${error}`);
      setClicked(false);
      alert("Please try again!");
    }
  };
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={props.pageVariants}
      transition={props.pageTransition}
    >
      <div className="button-div">
        <button
          className="button"
          disabled={clicked ? true : false}
          onClick={handleClick}
        >
          Press Me
        </button>
        <br />
        {clicked && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </div>
    </motion.div>
  );
};

export default Button;
