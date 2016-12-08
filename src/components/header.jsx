import React, {Component, PropTypes} from 'react';
import {Button, Input} from 'semantic-ui-react';

class Header extends Component {
  constructor(props) {
    super(props);

    this.checkEnter = this.checkEnter.bind(this);
  }

  //On enter, fire
  checkEnter(e){
    if (e.keyCode === 13) {
      this.props.handleSubmit();
    }
  }

  render() {
    const {handleChange, handleSubmit, textVal} = this.props;
    return(
      <div className="header-wrapper">
        <h5 className="float-left header-text">
          Simple Stock Exchange
        </h5>
        <div className="float-right header-input-wrapper">
          <Input className="header-input"
                 icon="search" 
                 iconPosition="left"
                 onChange={handleChange}
                 onKeyUp={this.checkEnter}
                 placeholder="Enter Symbol"
                 value={textVal} />
          <Button className="theme-btn" onClick={handleSubmit}>Lookup</Button>
        </div>
      </div>
    );
  }
}

Header.PropTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  textVal: PropTypes.string.isRequired
}

export default Header;