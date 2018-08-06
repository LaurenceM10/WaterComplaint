import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {Body, Card, CardItem, Left, Thumbnail} from "native-base";
import firebase from 'firebase';
import Swipeout from 'react-native-swipeout';



class CardComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Buttons
        const SwipeOut = [
            {
                text: 'Button',
                onPress: () => { this.props._onPress}
            }
        ];

        return (
            <Swipeout right={SwipeOut}>
                <Card>
                    <CardItem header>
                        <Left>
                            <Thumbnail
                                source={{uri: this.props.picture}}
                            />
                            <Body>
                            <Text
                                style={styles.name}
                            >{this.props.name}</Text>
                            <Text style={styles.email}>{this.props.email}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </Swipeout >
        );
    }
}


const styles = StyleSheet.create({
    name: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 13
    },
    email: {
        color: '#555',
        fontSize: 12
    }
});

export default CardComponent;

