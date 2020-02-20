import React from 'react';
import './Grid.styles.scss';

const Grid = ({header, children}) => (
    <div className="grid">
        <h1>{header}</h1>
        <div className="grid-content">{children}</div>
    </div>
);

export default Grid;