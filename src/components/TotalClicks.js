import "./TotalClicks.css";
import { useState, useEffect } from "react";

import ReactCountryFlag from "react-country-flag";

const TotalClicks = (props) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getAllClicks();
  }, []);

  function getAllClicks() {
    props.allClicks.then((items) => {
      const countriesSorted = sortItems(items);
      console.log(items);
      const countryRows = countriesSorted.map((item) => (
        <Country item={item} />
      ));
      setRows(countryRows);
    });
  }
  return (
    <div className="total-clicks-div">
      <table className="table-clicks">
        <thead>
          <tr key="head">
            <th>Country</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody id="countries">{rows}</tbody>
      </table>
    </div>
  );
};

const Country = (props) => {
  return (
    <tr id={props.item.country} key={props.item.country}>
      <td>
        <ReactCountryFlag
          countryCode={props.item.country}
          svg
          style={{
            width: "1.5em",
            height: "1.5em",
          }}
        />
      </td>
      <td>{props.item.count}</td>
    </tr>
  );
};

function sortItems(items) {
  const itemsSorted = items.sort((a, b) => a.count - b.count);
  return itemsSorted;
}

export default TotalClicks;
