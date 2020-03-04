import React from 'react';
import './Categories.styles.scss';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

class Categories extends React.Component{
    constructor(){
        super();
        this.state={
            hidden: true,
            toggleHidden: ''
        };
    }

    toggleHidden = () => {
        if(this.state.toggleHidden === ''){
            this.setState({toggleHidden: 'toggle-hidden'});
        }else{
            this.setState({toggleHidden: ''})
        }

        this.setState({hidden: !this.state.hidden});
    };

    render(){
        return(
            <div className={`categories ${this.state.toggleHidden}`}>
                {this.state.hidden ? <button onClick={this.toggleHidden}>Categories <FontAwesome className="fa-caret-down" name="caret-down"/></button> : 
                    <div className="categories-container">
                        <button onClick={this.toggleHidden}>Categories <FontAwesome className="fa-caret-down" name="caret-down"/></button>
                        <Link to="category/latest">Latest</Link>
                        <Link to="category/top-rated">Top Rated</Link>
                        <Link to="category/now-playing">Now Playing</Link>
                        <Link to="category/upcoming">Upcoming</Link>
                        <Link to="category/popular">Popular</Link>
                    </div>
                }
            </div>
        );
    }
};

export default Categories;