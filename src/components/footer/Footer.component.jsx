import React from 'react';
import './Footer.styles.scss';

import FontAwesome from 'react-fontawesome';

class Footer extends React.Component{
    render(){
        return(
            <footer className="footer">
                <div className="footer-container">
                    <h2>React Theater</h2>

                    <div className="medias">
                        <a href="https://github.com/albert-anthony6" target="_blank"><FontAwesome className="fa-github" name="github" size="3x"/></a>
                        <a href="https://linkedin.com/in/avaldes21" target="_blank"><FontAwesome className="fa-linkedin" name="linkedin" size="3x"/></a>
                    </div>

                    <p>Portfolio: <a href="https://albertvaldes.herokuapp.com" target="_blank">albertvaldes.herokuapp.com</a></p>
                    <p>Phone Number: (901) 265-2710</p>
                    <p className="copyright">Copyright ©2019</p>
                </div>
            </footer>
        );
    }
}

export default Footer;