import React, {Component} from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import ComplaintsScreen from "./ComplaintsScreen";
import ProfileScreen from "./ProfileScreen";
import AddComplaintScreen from "./AddComplaintScreen";

export default class MainScreen extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        headerTitle: 'WaterComplaints',
        headerLeft: null,
    };

    render() {
        return (
            <TabStackNavigator/>
        );
    }
}


const TabStackNavigator = createMaterialBottomTabNavigator(
    {
        Home: ComplaintsScreen,
        Create: AddComplaintScreen,
        Profile: ProfileScreen
    },
    {
        initialRouteName: 'Home',
        activeTintColor: '#000',
        inactiveTintColor: '#999',
        barStyle: {backgroundColor: '#fff'},
    }
);
