import React from 'react'
import ReactDOM from 'react-dom'
import AutocompleteApp from './components/AutocompleteApp'

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.render(
  <AutocompleteApp />,
  document.getElementById('root')
);