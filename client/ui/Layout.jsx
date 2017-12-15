import React from 'react';
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './components/Navbar';

const test = gql;

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class Layout extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Navbar />
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}
Layout.propTypes = { children: PropTypes.object };

// Initialize GraphQL queries or mutations with the `gql` tag
const query = gql`query {say {
    foo
    bar
  }}`;
//const MyMutation = gql`mutation MyMutation { addTodo(text: "Test 123") { id } }`;

// We then can use `graphql` to pass the query results returned by MyQuery
// to MyComponent as a prop (and update them as the results change)
//export default graphql(query)(Layout);

// Or, we can bind the execution of MyMutation to a prop
// export default graphql(MyMutation)(MyComponent);

export default Layout;