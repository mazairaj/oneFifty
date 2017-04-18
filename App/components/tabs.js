import { View, Text, StyleSheet, TabBarIOS, TouchableOpacity } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
const { jumpTo } = navigationActions;
// import IndexPage from './index';
// import ProfilePage from './myProfilePage';
// import CreateEvent from './createEvent';
// import Notifications from './notifications';
// import MessageIndex from './messageIndex';
import WorkoutForm from './workoutForm'
class ApplicationTabs extends Component {
	_renderTabContent(tab) {
		if (tab.key === 'messageBoard') {
			return (
				<WorkoutForm />
			);
		}

		if (tab.key === 'calandar') {
			return (
				<View style={[styles.tabContent, {backgroundColor: 'green'}]} />
			);
		}

		if (tab.key === 'workoutHistory') {
			return (
				<View style={[styles.tabContent, {backgroundColor: 'red'}]} />
			);
		}


		return <Text>SOmething went wrong</Text>;
	}

	render() {
		const { dispatch, navigation, indexPage } = this.props;
		const children = navigation.routes.map( (tab, i) => {
			console.log("IN TABS", tab)
			return (
				<TabBarIOS.Item key={tab.key}
						icon={tab.icon}
						selectedIcon={tab.selectedIcon}
						title={tab.title} onPress={ () => dispatch(jumpTo(i, navigation.key)) }
						selected={this.props.navigation.index === i}>
						{ this._renderTabContent(tab) }
				</TabBarIOS.Item>
			);
		});
		console.log("TABS PROPS", this.props)
		return (
			<TabBarIOS
				itemPositioning='auto'
				unselectedTintColor='black'
				tintColor='black'
				unselectedItemTintColor="gray"
				barTintColor='white'>
				{children}
			</TabBarIOS>
		);
	}
}

// ApplicationTabs.propTypes = {
//     onPress: PropTypes.func.isRequired,
//     profile: PropTypes.object.isRequired
// };

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.get('tabs'),
	};
}

const styles =  StyleSheet.create({
	tabContent: {
		flex: 1,
		alignItems: 'center'
	},
	tabText: {
		color: 'white',
		margin: 50,
	},
	toolbar: {
		backgroundColor: '#E9EAED',
		height: 56,
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);
