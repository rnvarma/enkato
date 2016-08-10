import React, { Component } from 'react'
import djangoImageLinkHandler from 'js/globals/DjangoImageLinkHandler';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="name">
                    <img src={djangoImageLinkHandler("blue_logo.png")} className="logoMedium"/>
                </div>
                <div className="footerPart">
                    <div className="title">
                        Company
                    </div>
                    <div className="itemsList">
                        <div><a className="item" href="#">About</a></div>
                        <div><a className="item" href="#">Job</a></div>
                        <div><a className="item" href="#">Team</a></div>
                        <div><a className="item" href="#">Blog</a></div>
                    </div>
                </div>
                <div className="footerPart">
                    <div className="title">
                        Students
                    </div>
                    <div className="itemsList">
                        <div><a className="item" href="#">How it works</a></div>
                        <div><a className="item" href="#">Pricing</a></div>
                        <div><a className="item" href="#">Sign up</a></div>
                    </div>
                </div>
                <div className="footerPart">
                    <div className="title">
                        Educators
                    </div>
                    <div className="itemsList">
                        <div><a className="item" href="#">How it works</a></div>
                        <div><a className="item" href="#">Pricing</a></div>
                        <div><a className="item" href="#">Sign up</a></div>
                    </div>
                </div>
                <div className="footerPart">
                    <div className="title">
                        Contact Us
                    </div>
                    <div className="itemsList">
                        <div><a className="item" href="#">team@enkato.com</a></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;