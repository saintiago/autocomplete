import React from 'react'
import PropTypes from "prop-types";

export default function Database({updateDb, content}) {

  let textareaContent = content;

  function saveInput(e) {
    textareaContent = e.target.value;
  }

  function handleUpdateDbClick() {
    updateDb(textareaContent);
  }

  return (
    <div>
      <h2>Database</h2>
      <textarea onInput={(e) => saveInput(e)} className="database" defaultValue={content}></textarea>
      <button className="update_database_button" onClick={(e) => handleUpdateDbClick()}>Update database</button>
    </div>
  )
};

Database.propTypes = {
  updateDb: PropTypes.func,
  content: PropTypes.string
};