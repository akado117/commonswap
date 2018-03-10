import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import { defaultImageUrls } from '../../../../imports/lib/Constants'

const teamData = [
    {
        name: 'Kevin Moreno',
        title: 'CEO & Co-Founder',
        TLDR: 'A natural visionary, Kevin also enjoys attending music festivals and everything basketball related. ',
        description: 'My vision and pursuit for CommonSwap has matured over time. At first, I just wanted to work for myself and help build a cool product that others can use. This original sentiment has since progressed to wanting to help others experience the same excitement and carefree attitude I have when traveling, Maybe I\'m crazy, but I think it\'s in these moments where we are truly living and not just on life\'s auto-pilot. I\'ve become more open-minded and understanding of everyone\'s differences through these experiences and as a result I\'m a better human being because of it. Have you seen the divide within our country in the news lately? I think the world needs this.',
        imgUrl: defaultImageUrls.kevin,
    }, {
        name: 'Alex Kaidan',
        title: 'TBM & Co-Founder',
        description: 'I’ve always been someone who likes to solve puzzles and complex challenges. From my roots as a mechanical engineer to my current path in software engineering. It’s always been about leveraging my analytical prowess by solving problems and providing the most positive impact to this world. Common Swap’s vision grabbed me from day one. More than just a service to enable cheap traveling. We aim to expand minds and build a much more open and accepting world through the power of travel. This is much more than an app to me; it’s the ability to change the lives of thousands, and someday millions.',
        imgUrl: defaultImageUrls.alex,
    }, {
        name: 'Alec Miller',
        title: 'CMO & Co-Founder',
        description: 'Kevin and I meet for the first time at a Startup Weekend event in Columbus in June of 2017. Within just a few minutes of meeting Kevin and hearing the basic idea behind CommonSwap, I knew that it had massive potential and that Kevin had the drive and ability to make it a success. What I saw in CommonSwap was on opportunity to build a company that had purpose and that would change the way people viewed travel forever. By providing more people the opportunity to experience the world from the viewpoint of another person, culture, or country I truly believe we will build a more connected and compassionate society.',
        imgUrl: defaultImageUrls.alec,
    }, {
        name: 'Tim Hawkins Hodgson',
        title: 'TBM & Co-Founder',
        description: 'I am a connector. I want to inspire people to go do things in real life by giving them the tools to explore new places. CommonSwap provides the perfect platform to connect people from all walks of life.',
        imgUrl: defaultImageUrls.tim,
    }
];

class Founders extends Component {
    getCofounders(cofounderData) {
        return (
            <div className="cofounder" key={cofounderData.name}>
                <div className="col s12 m3">
                    <img
                        className="circle responsive-img"
                        src={cofounderData.imgUrl ? cofounderData.imgUrl : 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/profStock.jpeg'}
                        alt="profDemo"
                        style={{ height: '140px', width: '140px' }}
                    />
                </div>
                <div className="col s12 m9">
                    <div className="col s12">
                        <h5>{cofounderData.name}</h5>
                    </div>
                    <div className="col s12">
                        <p>{cofounderData.title}</p>
                    </div>
                    <div className="col s12">
                        <p>{cofounderData.description}</p>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const coFounders = teamData.map(teamMember => this.getCofounders(teamMember));
        return (
            <div className="founder-container">
                <AppBar
                    title={<span>Our Co-Founders</span>}
                    showMenuIconButton={false}
                    style={{ marginBottom: '10px', zIndex: '0' }}
                />
                <div className="row">
                    {coFounders}
                </div>
            </div>
        );
    }
}

export default Founders;
