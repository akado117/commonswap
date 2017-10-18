import React from 'react';
import FontIcon from 'material-ui/FontIcon';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <header>
                    <div className="container">
                        <video src="" poster="" autoplay loop muted plasinline>
                            <source src="" />
                        </video>
                        <div className="embed-responsive-item">
                            <div className="d-flex align-items-center justify-content-center flex-wrap">
                                <div className="header-container">
                                    <h1> CommonSwap <br />
                                        <strong>Travel More. Pay Less.</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="col s12">
                    <div className="col s6">
                        <div className="row">
                            <div className="col s6">
                                <img src="" alt="" />
                            </div>
                        </div>
                        <div className="row">
                            <h2 className="col s6"></h2>
                            <p></p>
                        </div>
                    </div>
                    <div className="col s6">
                        <div className="class-image"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
