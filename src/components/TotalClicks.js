import Container from "react-bootstrap/Container";
import { Grid, Row, Col } from "react-bootstrap";
import "./TotalClicks.css";
import ReactCountryFlag from "react-country-flag";

const TotalClicks = (props) => {
  function renderRows(props) {
    return <Country countryCode={props.countryCode} count={props.count} />;
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
        <tbody>{props.countries.map(renderRows)}</tbody>
      </table>
    </div>
  );
};

const Country = (props) => {
  return (
    <tr key={props.countryCode}>
      <td>
        <ReactCountryFlag
          countryCode={props.countryCode}
          svg
          style={{
            width: "1.5em",
            height: "1.5em",
          }}
        />
      </td>
      <td>{props.count}</td>
    </tr>
  );
};

export default TotalClicks;
