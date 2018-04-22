import React from 'react'
import PropTypes from "prop-types";

SuggestionsList.propTypes = {
  suggestions: PropTypes.array,
  selectItem: PropTypes.func,
  hoverOn: PropTypes.number
};

export default function SuggestionsList({suggestions, selectItem, hoverOn}) {
  return (
    <ul className="suggestions_list">
      {suggestions.map((item, i) => <li className={i === hoverOn ? 'hover' : ''} onMouseDown={(e) => selectItem(i)} key={i}>{item}</li>)}
    </ul>
  )
};