import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class GamesNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameName: '',
      startDate: new Date().toLocaleDateString("en-GB")
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  static contextTypes = {
    router: PropTypes.object
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.context.router.push("/games");
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div className="column is-2">
        <form onSubmit={this.onFormSubmit}>
          <TextField 
            name="gameName"
            hintText="Game name"
            onChange={this.onChange} />
          <TextField
            name="startDate"
            defaultValue={this.state.startDate}
            onChange={this.onChange} />
            
          <RaisedButton primary={true} type="submit" label="ADD" />  
        </form>
      </div>
    );
  }
}