import React from 'react';
import './Categories.styles.scss';
import FontAwesome from 'react-fontawesome';

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
                        <div className="latest">Latest</div>
                        <div className="toprated">Top Rated</div>
                        <div className="nowplaying">Now Playing</div>
                        <div className="upcoming">Upcoming</div>
                        <div className="popular">Popular</div>
                    </div>
                }
            </div>
        );
    }
};

export default Categories;