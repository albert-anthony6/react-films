import React from 'react';
import './Actor.styles.scss';

import NoImage from '../../assets/no_image.jpg';
import {IMAGE_BASE_URL, POSTER_SIZE} from '../../assets/config';

const Actor = ({actor}) => (
    <div className="actor">
        <img src={actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : NoImage} alt="actorThumb"/>
        <span className="actor-name">{actor.name}</span>
        <span className="actor-character">{actor.character}</span>
    </div>
);

export default Actor;