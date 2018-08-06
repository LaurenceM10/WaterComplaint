import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Body, Card, CardItem, Left, Thumbnail} from "native-base";


class CardComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={ this.props._onPress }
            >
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
            </TouchableOpacity>
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

