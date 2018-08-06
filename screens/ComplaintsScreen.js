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
                let item = snapshot.val();

                this.setState(prevState => ({
                    data: [...prevState.data, item]
                }))

            }).bind(this);
    };

    componentDidMount() {
        this.getUsersFromFirebase()
    }

    removeUser = (uid) => {
        this.setState({
            data: []
        });
        firebase.database().ref("notify/" + uid).remove();
    };

    render() {
        return (
            <List containerStyle={{marginTop: 0, borderTopColor: '#fff'}}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <CardComponent
                            name={item.nombre}
                            email={item.email}
                            picture={item.foto}
                            _onPress={this.removeUser(item.uid)}
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