import React, { Component } from "react";
import { TouchableHighlight, StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import Modal from 'react-native-modalbox'
import Button from 'react-native-button'

var screen = Dimensions.get('window');

export default class AddModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal style={{
                justifyContent: 'center',
                borderRadius: Platform == 'ios' ? 30 : 0,
                shadowRadius: 10,
                width: screen.width - 80,
                height: 200
            }}
            position='center'
            backdrop={true}
            onClosed={()=>{
                alert('Modal closed')
            }}
            >
                <Text>Modal Info</Text>
            </Modal>
        );
    }

}