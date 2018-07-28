import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from "native-base";

export default class AddComplaintScreen extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name='add'/>,
    };


    render() {
        return (
            <View style={styles.container}>
                <Text>Profile Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
