import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchVerses: PropTypes.func.isRequired,
        clearVerses: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.text === '') {
            this.props.setAlert('Please Enter Something', 'light', "EmptyInput");
        } else {
            this.props.searchVerses(this.state.text);
            this.setState({ text: ''});
        }
        
    }
    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    render() {
        const { showClear, clearVerses } = this.props;

        return(
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input 
                        type="text" 
                        name="text" 
                        placeholder="Chapters: Romans 1-2, Verses: Romans 1:16, or Combination (use semi-colon): Romans 1-2; Romans 8:26"
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <input type="submit" value="search" className="btn btn-dark btn-block" />
                </form>
                {showClear && <button className="btn btn-light btn-block" onClick={clearVerses}>Clear</button>}
            </div>
        );
    }
}

export default Search;