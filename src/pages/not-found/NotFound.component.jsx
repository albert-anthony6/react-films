import React from 'react';
import './NotFound.styles.scss';

import Footer from '../../components/footer/Footer.component';
import { Link } from 'react-router-dom';

class NotFound extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="not-found">
                    <h2>404: Page Not Found</h2>
                    <Link to="/"><button>Go Back</button></Link>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default NotFound;