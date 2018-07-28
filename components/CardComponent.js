import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
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
                        <Thumbnail small
                                   source={{uri: 'https://i.kinja-img.com/gawker-media/image/upload/s--KicRiFQ5--/c_scale,f_auto,fl_progressive,q_80,w_800/dh58ggwna1am5pfbvv9t.jpg'}}/>
                        <Body>
                        <Text>{this.props.title}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <View style={styles.cardBody}/>
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

