import React from 'react';
import './Footer.css';

function Footer (){
    let currentYear = new Date().getFullYear();
    let githubLink = "https://github.com/ArifShariar/";
    let gitHubIcon = "https://img.icons8.com/bubbles/50/000000/github.png";
    return(  
        <div className="footer-container">
            <section className='footer-subscription'>
                <p className="footer-subscription-heading">
                    All rights reserved by MorseCoders © {currentYear}
                </p>                
                <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-item">
                        <h4>About Us</h4>
                        <p className="footer-subscription-link">
                            Find us on<a href={githubLink} target="_blank" rel="noopener noreferrer"><img src={gitHubIcon} alt={"GitHub"}/></a>
                        </p>
                    </div>
                </div>
            </div>
            </section>
        </div> 
    );
}

export default Footer;