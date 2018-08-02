import React, {Component} from 'react';
import ComplaintsScreen from "./ComplaintsScreen";
import ProfileScreen from "./ProfileScreen";
import AddComplaintScreen from "./AddComplaintScreen";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

export default class MainScreen extends Component {
    static navigationOptions = {
        headerTitle: 'WaterComplaints',
        headerLeft: null
    };

    constructor(props) {
        super(props)
    }

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
        tabBarIcon: {
            tintColor: '#999'
        }
    }
);
