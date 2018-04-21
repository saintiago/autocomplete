import React from 'react'
import PropTypes from "prop-types";

Database.propTypes = {
  updateDb: PropTypes.func,
  content: PropTypes.string
};

let textareaContent = '';

export default function Database({updateDb, content}) {

  function saveInput(e) {
    textareaContent = e.target.value;
  }

  function handleUpdateDbClick() {
    updateDb(textareaContent);
  }

  return (
    <div>
      <h2>Database</h2>
      <textarea tabIndex="2" onInput={(e) => saveInput(e)} className="database" defaultValue={content}></textarea>
      <button tabIndex="3" className="update_database_button" onClick={(e) => handleUpdateDbClick()}>Update database</button>
    </div>
  )
};

