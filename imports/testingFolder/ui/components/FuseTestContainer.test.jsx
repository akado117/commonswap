let sinon = require('sinon')
let chai = require('chai')
let should = chai.should()
let sinonChai = require("sinon-chai")
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
require('../../DOMConfig')('<html><body></body></html>');

chai.use(sinonChai);

import FuseTestContainer from '../../../ui/components/FuseTestContainer.jsx'

describe('FuseTestContainer Component', function(){
    let FuseTestContainerComponentc
    beforeEach(function(){

        ReactTestUtils.renderIntoDocument(React.createElement(FuseTestContainer))
    })


    it('try one ', function(){

        "".should.eql('')
    })
})