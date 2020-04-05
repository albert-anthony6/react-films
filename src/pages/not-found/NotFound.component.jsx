import React from 'react';
import './NotFound.styles.scss';

import Footer from '../../components/footer/Footer.component';

class NotFound extends React.Component{
    render(){
        return(
            <React.Fragment>
                <h2 className="not-found">404: Page Not Found</h2>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default NotFound;