import React, {Component} from 'react';
import {Alert, AsyncStorage, FlatList, ProgressBarAndroid, StyleSheet, View} from 'react-native';
import {List} from "react-native-elements";
import {Icon} from "native-base";
import CardComponent from "../components/CardComponent";

export default class ComplaintsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentDidMount() {
        this.fetchComplaints();
    }

    static navigationOptions = {
        tabBarIcon: <Icon name='home'/>,
    };

    fetchComplaints = async () => {
        // Get access token to send in header request
        AsyncStorage.getItem('accessToken').then(value => {
            try {
                // Update loading state
                this.setState({loading: true});

                fetch("https://api-complaint.herokuapp.com/api/Complaints", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': value.toString()
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        this.setState({
                            data: res,
                            loading: false
                        });
                    });
            } catch (error) {
                Alert.alert("Complaints error. Try again.");
            }
        })
    };


    render() {

        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ProgressBarAndroid
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={0.5}
                    />
                </View>
            )
        }

        return (
            <List containerStyle={{marginTop: 0, borderTopColor: '#fff'}}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <CardComponent
                            title={item.title}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </List>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#afd3ff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        padding: 0
    },
    cardHeader: {}
});