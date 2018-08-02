import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Body, Card, CardItem, Left, Thumbnail} from "native-base";


class CardComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <CardItem header style={styles.headerCard}>
                    <Left>
                        <Thumbnail source={{uri: this.props.picture}}/>
                        <Body>
                        <Text onPress={() => {
                            Alert.alert(this.props.title)
                        }}>{this.props.title}</Text>
                        </Body>
                    </Left>
                </CardItem>
            </Card>
        );
    }
}


CardComponent.propTypes = {
    title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    cardBody: {
        flex: 1,
        height: 200,
        width: null,
        backgroundColor: '#aaa',
    }
});

export default CardComponent;

