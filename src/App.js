import React, { useEffect, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Switch,
  Route,
  NavLink,
  useLocation,
  useHistory,
} from "react-router-dom";
import Button from "./components/Button";
import TotalClicks from "./components/TotalClicks";

const App = () => {
  // State
  const [geoLocation, setGeoLocation] = useState({});
  // Get IP of the client
  const fetchIp = useCallback(async () => {
    const response = await fetch("https://ip.nf/me.json");
    const data = await response.json();
    setGeoLocation(data.ip);
  });

  // Hook that is called on every load of the DOM
  useEffect(() => {
    fetchIp();
  }, []);

  const location = useLocation();
  const history = useHistory();
  const country = {
    countryCode: "US",
    count: 1020,
  };
  const l = [country];
  const sendClick = async () => {
    const response = await fetch("https://ip.nf/me.json");
    const data = await response.json();
  };

  return (
    <AnimatePresence>
      <Switch location={location} key={location.pathname}>
        <Route
          path="/total"
          render={(props) => <TotalClicks countries={l} />}
        />
        <Route
          path="/*"
          render={(props) => (
            <Button
              sendClick={sendClick}
              history={history}
              geoLocation={geoLocation}
              pageTransition={pageTransition}
              pageVariants={pageVariants}
            />
          )}
        />
      </Switch>
    </AnimatePresence>
  );
};

const pageVariants = {
  initial: {
    opacity: 0,
    y: "-100vw",
    scale: 0.8,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: "100vw",
    scale: 1.2,
  },
};

const pageStyle = {
  position: "fixed",
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export default App;
