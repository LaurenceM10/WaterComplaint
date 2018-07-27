import React, {Component} from 'react';
import {Alert, AsyncStorage, FlatList, ProgressBarAndroid, StyleSheet, Text, View} from 'react-native';
import {Button, Card, List} from "react-native-elements";

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

    getAccessToken = async () => {
        await AsyncStorage.getItem('accessToken').then(value => {
            console.log(value.toString());
            return value.toString();
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
                        <Card
                            containerStyle={{margin: 2}}
                            title={item.title}>
                            <Text style={{marginBottom: 10}}>
                                {
                                    item.description
                                }
                            </Text>
                            <Button
                                backgroundColor='#03A9F4'
                                buttonStyle={
                                    {
                                        borderRadius: 8,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 0
                                    }
                                }
                                title='Visit'/>
                        </Card>
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
    }
});