'use strict';

var React = require('react-native');
var QuotesSearchForm = require('./QuotesSearchForm');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

class RandomQuotes extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Random Quotes',
          component: QuotesSearchForm
        }}/>
    );
  }
}


var styles = StyleSheet.create({
  text: {
    color: 'blue',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('RandomQuotes', () => RandomQuotes);
