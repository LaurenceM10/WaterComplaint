import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { NavigationActions } from 'react-navigation'
import ComplaintsScreen from "./ComplaintsScreen";
import ProfileScreen from "./ProfileScreen";
import AddComplaintScreen from "./AddComplaintScreen";

export default class MainScreen extends Component {
    constructor(props){
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
        Contact: AddComplaintScreen,
        Profile: ProfileScreen
    },
    {
        initialRouteName: 'Home',
        activeTintColor: '#000',
        inactiveTintColor: '#999',
        barStyle: {backgroundColor: '#fff'},
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});