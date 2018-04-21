import React from 'react'
import suggestionsModel from '../logic/suggestionsModel'
import SuggestionsList from './SuggestionsList'
import Database from './Database.jsx'

export default class AutocompleteApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentInput: '',
      suggestions: [],
      hoverOn: 0,
      database: suggestionsModel.getDatabase(),
      error: null
    };
  }

  handleInput(e) {
    const input = e.target.value;
    if (input.length > 0) {
      suggestionsModel.requestSuggestions(input)
        .then(
          suggestions => this.setState({
            suggestions,
            currentInput: input
          }),
          error => this.setState({error})
        );
    } else {
      this.setState({
        suggestions: [],
        currentInput: input
      });
    }
  }

  handleKeyDown(e) {
    const code = e.code || e.keyCode;
    let hoverOn = this.state.hoverOn;
    const suggestionsCount = this.state.suggestions.length;
    switch (code) {
      case 38: // up
        e.preventDefault();
        if (hoverOn > 0) {
          this.setState({hoverOn: hoverOn - 1});
        }
        break;
      case 40: // down
        e.preventDefault();
        if (hoverOn < (suggestionsCount - 1)) {
          this.setState({hoverOn: hoverOn + 1});
        }
        break;
      case 13: // enter
      case 9: // tab
        e.preventDefault();
        this.selectItem(hoverOn);
        break;
    }
  }

  selectItem(index) {
    this.setState({
      currentInput: this.state.suggestions[index],
      suggestions: [],
      hoverOn: 0
    })
  }

  changeHover(index) {
    this.setState({hoverOn: index});
  }

  updateDb(db) {
    suggestionsModel.setDatabase(db);
  }

  render () {
    return (
      <div className="container">
        <h1>Autocomplete field</h1>
        <div className="input_field_wrapper">
          <input
            className="input_field"
            onKeyDown={(e) => {this.handleKeyDown(e)}}
            onInput={(e) => {this.handleInput(e)}}
            type="text"
            value={this.state.currentInput}
            placeholder="Start typing"
          />
        {
          this.state.suggestions.length > 0 ?
            <SuggestionsList
              suggestions={this.state.suggestions}
              selectItem={this.selectItem.bind(this)}
              hoverOn={this.state.hoverOn}
              changeHover={this.changeHover.bind(this)}
            />
          : ''
        }
        </div>
        <Database updateDb={this.updateDb.bind(this)} content={this.state.database} />
      </div>
    );
  }
}
