import React from 'react';
// import FontAwesome from 'react-fontawesome';

const RightArrow = ({goToNextSlide}) => {
    return (
      <div className="nextarrow arrow" onClick={goToNextSlide}>
        <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
        {/* <FontAwesome className="fa-arrow-circle-right" name="arrow-cirlce-right" size="3x"/> */}
      </div>
    );
  }
  
  export default RightArrow;