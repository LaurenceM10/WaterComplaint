import React, {Component} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {List} from "react-native-elements";
import {Icon} from "native-base";
import CardComponent from "../components/CardComponent";
import firebase from 'firebase';

export default class ComplaintsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    // Navigations options - toolbar title and icons
    static navigationOptions = {
        tabBarIcon: <Icon name='home'/>,
    };

    // To get a list of user from Firebase Real Time database
    getUsersFromFirebase = () => {
        this.setState({
            loading: true
        });

        // When a user is added
        firebase.database().ref("notify").on('child_added', (snapshot) => {
            let item = snapshot.val();

            this.setState(prevState => ({
                data: [...prevState.data, item]
            }))

        }).bind(this);

        // When a user is removed
        firebase.database().ref("notify")
            .on('child_removed', (snapshot) => {
                let newChange = this.state.data;
                newChange.splice(this.state.data[0], 1);

                this.setState(prevState => ({
                    data: newChange
                }))

            }).bind(this);
    };

    componentDidMount() {
        this.getUsersFromFirebase()
    }

    render() {
        return (
            <List containerStyle={{marginTop: 0, borderTopColor: '#fff'}}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <CardComponent
                            uid={item.uid}
                            name={item.nombre}
                            email={item.email}
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