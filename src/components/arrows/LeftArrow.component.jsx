import React from 'react';
// import FontAwesome from 'react-fontawesome';  

  const LeftArrow = ({goToPrevSlide}) => {
    return (
      <div className="backarrow arrow" onClick={goToPrevSlide}>
        <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
        {/* <FontAwesome className="fa-arrow-circle-left" name="arrow-cirlce-left" size="3x"/> */}
      </div>
    );
  }
  
  export default LeftArrow;