import React, { useState } from "react";
import "./Button.css";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import Spinner from "react-bootstrap/Spinner";

const Button = (props) => {
  const history = props.history;
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    props.sendClick();
    // TODO: ADD API CALL to update button number and then get all button clicks
    history.push("/total");
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
