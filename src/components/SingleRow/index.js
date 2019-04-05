import React from "react";

const SingleRow = ({ data, selected, onCheck, onClick }) => (
  <tbody>
    <tr className="tableRow">
      <td className="headerCheckbox">
        <button
          name="check"
          className={selected ? "selected" : "unselected"}
          variant="fab"
          onClick={onCheck}
        >
        {
          selected &&
          <img
            src={require("../../images/check.png")}
            className="check"
            alt=""
          />
        }
        </button>
      </td>
      <td className="header name" onClick={onClick}>
        <div className="headerStyling cell">{`${data.name.first} ${data.name.last}`}</div>
      </td>
      <td className="header email" onClick={onClick}>
        <div className="headerStyling cell">{data.email}</div>
      </td>
      <td className="header cell" onClick={onClick}>
        <div className="headerStyling cell">{data.cell}</div>
      </td>
      <td className="header eid" onClick={onClick}>
        <div className="headerStyling cell">✓</div>
      </td>
      <td className="header situation" onClick={onClick}>
        <div className="headerStyling cell">{data.situation}</div>
      </td>
      <td className="header iban" onClick={onClick}>
        <div className="headerStyling cell">{data.bankAccount}</div>
      </td>
      <td className="header statuss" onClick={onClick}>
        <div className="headerStyling cell bold">{data.status}</div>
      </td>
    </tr>
  </tbody>
);

export default SingleRow;
