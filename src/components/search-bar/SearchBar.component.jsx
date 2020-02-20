import React from 'react';
import './SearchBar.styles.scss';
import FontAwesome from 'react-fontawesome';

class SearchBar extends React.Component{
    constructor(){
        super();
        this.state={
            searchTerm: ''
        }
    }

    timeOut = React.createRef(null);

    doSearch = e => {
        clearTimeout(this.timeOut.current);
        this.setState({[e.target.name]: e.target.value});

        this.timeOut.current = setTimeout(() => {
            this.props.callback(this.state.searchTerm);
        }, 500);
    }

    render(){
        return(
            <div className="searchbar">
                <div className="searchbar-content">
                    <FontAwesome className="fa-search" name="search" size="2x"/>
                    <input type="text" placeholder="Movie" onChange={this.doSearch} name="searchTerm" value={this.state.searchTerm}/>
                </div>
            </div>
        );
    }
}

export default SearchBar;