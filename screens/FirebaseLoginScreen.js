import React, {Component} from 'react';
import firebase from 'firebase';
import {Button, View} from 'react-native';

class FirebaseLoginScreen extends Component {
    constructor(props) {
        super(props);
    }

    // This function save a user
    saveUser() {
        let usuario = {
            uid: "5kskks502455545sjskshbjssdLKJbsakjbajkbsdlkbsdkjsd",
            nombre: "Laurence Montenegro",
            email: "laurenmontenegro100@gmail.com",
            foto: "https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/2018/2-thespacexfal.jpg",
            telefono: "520000000"
        };

        // Set element in database
        firebase.database().ref("notify/" + usuario.uid)
            .set(usuario);

        this.props.navigation.navigate('Main');
    }

    render() {
        return (
            <View>
                <Button
                    onPress={() => {
                        this.saveUser()
                    }}
                    title="Click"
                />
            </View>
        );
    }
}

FirebaseLoginScreen.propTypes = {};

export default FirebaseLoginScreen;
