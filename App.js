import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import firebase from 'firebase';

export default class App extends React.Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyBDlfbUKGuh-TgCs64t-_ge-FJLcMPOUbU",
            authDomain: "testnotify-cb4f5.firebaseapp.com",
            databaseURL: "https://testnotify-cb4f5.firebaseio.com",
            projectId: "testnotify-cb4f5",
            storageBucket: "testnotify-cb4f5.appspot.com",
            messagingSenderId: "767000720015"
        });
    }

    render() {
        return (
            <AppStackNavigator />
        );
    }
}



const AppStackNavigator = createStackNavigator({
    Main: MainScreen
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
