import React, {Component} from 'react';
import {Alert, AsyncStorage, Button, StyleSheet, TextInput, View} from 'react-native';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            email: '',
            password: ''
        }
    }

    componentWillMount(){
        this.isAuthenticated()
    }

    isAuthenticated = () => {
        AsyncStorage.getItem('accessToken')
            .then((value) => {
                if (value !== null) {
                    this.props.navigation.navigate('Main');
                }
            });
    };

    static navigationOptions = {
        header: null
    };

    checkTextInput = () => {
        if (this.state.email === '' || this.state.password === '') {
            Alert.alert("Complete all the inputs")
        } else {
            this.doLogin();
        }
    };

    doLogin = async () => {
        try {
            let response = await fetch("https://api-complaint.herokuapp.com/api/Users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            });
            let responseJson = await response.json();
            this.storeAccessToken(responseJson.id)
        } catch (error) {
            Alert.alert("Login error. Try again.");
        }
    };

    storeAccessToken = async (key) => {
        try {
            await AsyncStorage.setItem('accessToken', key);
            if (AsyncStorage.getItem('accessToken') !== null) {
                this.props.navigation.navigate('Main');
            }
        } catch (error) {
            // Show error dialog
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title={"Login"}
                            onPress={() => this.checkTextInput()}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#49ffc7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        height: 250,
        backgroundColor: 'rgba(255, 255, 255, .9)',
        borderRadius: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        marginHorizontal: 15,
        elevation: 5,
        alignSelf: 'stretch'
    },
    textInput: {
        paddingLeft: 3,
        marginBottom: 15,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});