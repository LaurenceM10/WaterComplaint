import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Icon} from "native-base";

class WorkOrderTab extends Component {
    static navigationOptions = {
        icon: <Icon name='home'/>,
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Work Order</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

WorkOrderTab.propTypes = {};

export default WorkOrderTab;
