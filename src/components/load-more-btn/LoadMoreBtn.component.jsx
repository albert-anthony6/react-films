import React from 'react';
import './LoadMoreBtn.styles.scss';

const LoadMoreBtn = ({text, callback}) => (
    <div className="loadmore-btn" onClick={callback}>
        {text}
    </div>
);

export default LoadMoreBtn;