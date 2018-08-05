import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container, Content, Thumbnail} from 'native-base';
import {createMaterialTopTabNavigator} from 'react-navigation';
import WorkOrderTab from "../TabComponents/WorkOrderTab";
import ComplaintsScreen from "./ComplaintsScreen";

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picture: 'https://i.kinja-img.com/gawker-media/image/upload/s--KicRiFQ5--/c_scale,f_auto,fl_progressive,q_80,w_800/dh58ggwna1am5pfbvv9t.jpg'
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={styles.headerProfile}>
                        <View>
                            <Thumbnail large source={{uri: this.state.picture}}/>
                            <Text style={styles.usernameLabel}>Lauren Steven</Text>
                        </View>
                    </View>
                    <TabStackNavigator/>
                </Content>
            </Container>
        );
    }
}

const TabStackNavigator = createMaterialTopTabNavigator({
        WorkOrder: WorkOrderTab,
        Other: WorkOrderTab,
    },
    {
        tabBarOptions: {
            activeTintColor: '#28a5f4',
            inactiveTintColor: '#28a5f4',
            indicatorStyle: {
                backgroundColor: '#28a5f4'
            },
            style: {
                backgroundColor: '#fff',
            },
            tabBarIcon: {
                tintColor: '#28a5f4'
            }
        },
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerProfile: {
        backgroundColor: '#28a5f4',
        height: 180,
        width: null,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    usernameLabel: {
        color: '#fff',
        fontWeight: 'bold'
    },
});