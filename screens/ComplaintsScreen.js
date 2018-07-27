import React, {Component} from 'react';
import {Alert, AsyncStorage, FlatList, StyleSheet, Text, View} from 'react-native';
import {List} from "react-native-elements";

export default class ComplaintsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        }
    }

    componentDidMount() {
        this.fetchComplaints();
    }

    fetchComplaints = async () => {
        try {
            // Update loading state
            this.setState({loading: true});

            fetch("https://api-complaint.herokuapp.com/api/Complaints", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'mIZa94QSFCzAJdrKX7vK70Y6EkL0b15FN6mYYpYZ5g65ulEbVTVUebCc57C2NuHH'
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
    };

    getAccessToken = () => AsyncStorage.getItem('accessToken');

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <Text>Loading complaints</Text>
                </View>
            )
        }

        return (
                <List>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => (
                            <Text>{item.title}</Text>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});