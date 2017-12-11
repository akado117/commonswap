import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import Footer from '../components/Footer';
import Founders from '../components/about/Founders';
import AboutUs from '../components/about/AboutUs';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: parseInt(props.params.index, 10) || 0,
        };
    }

    select = (index) => this.setState({ selectedIndex: index });

    render() {
        let internalComponent;
        if (this.state.selectedIndex === 0) {
            internalComponent = <AboutUs />;
        }
        else if (this.state.selectedIndex === 1) {
            internalComponent = <Founders />;
        }
        return (
            <div>
                <div className="row container" style={{ marginTop: '35px' }}>
                    <div className="col s3">
                        <div className="col s12">
                            <Paper>
                                <Menu>
                                    <MenuItem
                                        primaryText="About Us"
                                        onClick={() => this.select(0)}
                                    />
                                    <MenuItem
                                        primaryText="Co-Founders"
                                        onClick={() => this.select(1)}
                                    />
                                </Menu>
                            </Paper>
                        </div>
                    </div>
                    <div className="col s9">
                        <div className="about">
                            {internalComponent}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default About;
