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
    getUsersFromFirebase = async () => {
        this.setState({
            loading: true
        });

        // When a user is added
        firebase.database().ref("notify").on('child_added', (snapshot) => {
            let item = snapshot.val();
            console.log(item);

            this.setState(prevState => ({
                data: [...prevState.data, item]
            }))

        }).bind(this);

        // When a user is removed
        await firebase.database().ref("notify")
            .on('child_removed', (snapshot) => {
                // el item acá es el elemento eliminado
                let item = snapshot.val();
                console.log(item);

                this.setState(prevState => ({
                    data: this.state.data.filter((_, i) => {
                        console.log(_.uid);
                        return _.uid !== item.uid
                    })
                }))

            }).bind(this);
    };

    componentDidMount() {
        this.getUsersFromFirebase()
    }

    removeUser = (uid) => {
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
                            _onPress={() => {
                                this.setState({
                                    data: []
                                });
                                this.removeUser(item.uid)
                            }}
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