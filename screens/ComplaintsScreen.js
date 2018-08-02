import React, {Component} from 'react';
import {Alert, AsyncStorage, FlatList, StyleSheet, Text, View} from 'react-native';
import {List} from "react-native-elements";
import {Icon} from "native-base";
import CardComponent from "../components/CardComponent";
import firebase from 'firebase';

export default class ComplaintsScreen extends Component {
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


    loadData = () => {
        this.setState({
            loading: true
        });

        let dataFromFirebase = [];
        let i = 0;
        firebase.database().ref("notify")
            .on('child_added', (snapshot) => {
                dataFromFirebase.push(snapshot.val());
                console.log(dataFromFirebase);
                this.setState({
                    data: dataFromFirebase,
                    loading: false
                });
            });
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount() {
        //this.fetchComplaints();
        this.loadData()
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <Text>Loading</Text>
                </View>
            )
        }


        console.log(this.state.data);
        return (
            <List containerStyle={{marginTop: 0, borderTopColor: '#fff'}}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <CardComponent
                            title={item.email}
                            picture={item.foto}
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