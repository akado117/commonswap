import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Founders from '../components/about/Founders';
import AboutUs from '../components/about/AboutUs';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Remove from 'material-ui/svg-icons/content/remove';

const menuItemStyle = {
    fontSize: '14px',
    width: '85%',
    overflow: 'hidden',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    lineHeight: '36px'
};

class FAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        };
    }
    FAQFields = [
        "Exactly how does CommonSwap work?",
        "How much does CommonSwap cost?",
        "Is CommonSwap safe?",
        "How do I enter my swap’s place?",
        "How do I report a problem or provide feedback?"
    ];
    FAQContent = [
        <div><p>Sign-up, create your profile, and list your space. CommonSwap will connect you with other travelers who are looking to go to your city. Browse profiles and request to swap with another user based on your interests and travel location/dates preferences.
            Once each party confirms, exchange places to stay and experience each other’s city. Users are encouraged to provide each other recommendations based on your interests to truly capture a local, authentic experience. Example: Ryan and Sarah from Chicago,
            IL swap places to stay with Mike and Katie from Los Angeles, CA during Labor Day weekend.</p>
            <strong>Example: </strong> <p>Ryan and Sarah from Chicago, IL swap places to stay with Mike and Katie from Los Angeles, CA during Labor Day weekend.</p></div>,
        <div> <p>Each user will pay CommonSwap a one-time $25 service fee each time he/she utilizes our service. There is no exchange of money between users.</p>
            <p><strong>Cost Comparison (3-night stay in New York, NY)</strong></p>
            <div className="col s3">
                <p>Average Airbnb</p>
                <p>$492</p>
            </div>
            <div className="col s3">
                <p>Average Hotel</p>
                <p>$735</p>
            </div>
            <div className="col s3">
                <p>CommonSwap</p>
                <p>$50</p>
            </div>
        </div>,
        <div>
            <p>Our main priority is to ensure that our community is safe and have the best experience during their trip. Each user goes through a background check and verification process. Users can contact us via email or call our 24/7 hotline for any problems 
                experienced during their swap. CommonSwap has outlined our standards and expectations in our Community Values section and any violators will be banned from our community. For more information, refer to our Trust and Safety page.</p>
        </div>,
        <div>
            <p>
            It is up to the users to communicate these instructions to each other. CommonSwap suggests using a secure key-padlock, utilizing a doorman (if applicable), or leave they key with roommates or friends. 
            </p>
        </div>,
        <div>
            <p>
                Contact us here.
            </p>
        </div>
    ]


    select = (index) => this.setState({ selectedIndex: index });

    render() {
        const menuItems = this.FAQFields.map((field, idx) => <MenuItem
            primaryText={field}
            key={`faq-${idx}`}
            onClick={() => this.select(idx)}
            style={menuItemStyle}
            leftIcon={<Remove />}
        />
        )
        return (
            <div>
                <Navbar className="invisible"></Navbar>
                <div className="row container faq-container" style={{ marginTop: '35px', height: '90%', minHeight: '500px' }}>
                    <div className="col s4">
                        <div className="col s12">
                            <Paper>
                                <Menu width={'100%'}>
                                    {menuItems}
                                </Menu>
                            </Paper>
                        </div>
                    </div>
                    <div className="col s8">
                        <div className="header">
                            <h4><strong>{this.FAQFields[this.state.selectedIndex]}</strong></h4>
                        </div>
                        <div className="content">
                            {this.FAQContent[this.state.selectedIndex]}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default FAQ;
