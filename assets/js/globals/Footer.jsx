require("css/globals/Footer")

var React = require('react')

module.exports = React.createClass({
    render: function() {
        return (
            <div className="footer">
                <div className="name">
                    enkato
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
})