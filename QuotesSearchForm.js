'use strict';

var React = require('react-native');

var {
		StyleSheet,
		Text,
		TextInput,
		View,
		TouchableHighlight,
		ActivityIndicatorIOS,
		Component
} = React;

var styles = StyleSheet.create({
		container: {
				padding: 30,
				marginTop: 65,
				alignItems: 'center'
		},
		description: {
				marginBottom: 15,
				fontSize: 20,
				textAlign: 'center',
				color: '#666565'
		},
		flowRight: {
				flexDirection: 'row',
				alignItems: 'center',
				alignSelf: 'stretch'
		},
		queryInput: {
				height: 36,
				padding: 4,
				marginRight: 5,
				flex: 4,
				fontSize: 15,
				borderWidth: 1,
				borderColor: '#48BBEC',
				borderRadius: 5,
				color: '#48BBEC'
		},
		button: {
				height: 36,
				flex: 1,
				flexDirection: 'row',
				backgroundColor: '#48BBEC',
				borderColor: '#48BBEC',
				borderWidth: 1,
				borderRadius: 8,
				marginBottom: 10,
				alignSelf: 'stretch',
				justifyContent: 'center'
		},
		buttonText: {
				fontSize: 18,
				color: 'white',
				alignSelf: 'center'
		},
		quote:{
				fontSize: 9,
				justifyContent: 'center'
		},
	buttonClean: {
				height: 36,
				flex: 3,
				flexDirection: 'row',
				backgroundColor: '#48BBEC',
				borderColor: '#48BBEC',
				borderWidth: 1,
				borderRadius: 8,
				marginBottom: 1,
				alignSelf: 'stretch',
				justifyContent: 'center'
		}
});


class QuotesSearchForm extends Component {
		render() {
				var loading = this.state.isLoading ? ( <ActivityIndicatorIOS hidden='true' size='large'/> ) : ( <View/>);

				return (
				   <View style={styles.container}>
					   <Text style={styles.description}>
						   eg: search by "Joel on Software"		
						 </Text>
						
						 <View style={styles.flowRight}>
								<TextInput style={styles.queryInput} 
          				onChange = {this.onQueryTextChanged.bind(this)}
						      value =  {this.state.query}/>

							<TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
   							<Text style={styles.buttonText}
								onPress={this.onSearchPressed.bind(this)}>GO</Text>
							</TouchableHighlight>
						 </View>

								<TouchableHighlight style={styles.buttonClean} underlayColor='#99d9f4'>
								<Text style={styles.buttonText}
						       onPress={this.cleanAll.bind(this)}>Clean All</Text>
								</TouchableHighlight>

						{loading}

						
						<Text style={styles.description}>{this.state.message}</Text>
						<Text style={styles.quote}>{this.state.quote}</Text>
						</View>
				)
		}

		cleanAll(){
				this.setState({query: '', quote: ''});
		}

		onQueryTextChanged(textInput) {
				this.setState({query: textInput.nativeEvent.text});
		}

		_handleResponse(response) {
				this.setState({quote: response.quote, isLoading: false });
		}

		onSearchPressed() {
				this.setState({ isLoading: true , quote: '' });
				fetch(buildApiUrl(this.state.query))
						.then(response => response.json())
						.then(json => this._handleResponse(json))
				    .catch(error =>
									 this.setState({
											 isLoading: false,
											 message: 'Shit!' + error}));
				
		}


		constructor(props){
				super(props);
				this.state = {
						query: 'joel on software',
						isLoading: false,
						message: ''
				};
		}
}

function buildApiUrl(query) {
		var query = query.split(' ').join('_').toLowerCase() + "+";
		return "http://www.iheartquotes.com/api/v1/random?format=json&source="+query
};

module.exports = QuotesSearchForm;
