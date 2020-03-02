import React from 'react';
import './SearchBar.styles.scss';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';
import {searchMovies} from '../../redux/home-reducer/home.actions';

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
            this.props.searchMovies(this.state.searchTerm);
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
const mapDispatchToProps = dispatch => ({
    searchMovies: search => dispatch(searchMovies(search))
});

export default connect(null, mapDispatchToProps)(SearchBar);