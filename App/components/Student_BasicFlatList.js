import React, { Component } from "react";
import { TouchableHighlight, ActivityIndicator, FlatList, StyleSheet, Text, View, CheckBox } from "react-native";

import flatListData from "../data/flatListData";
import Student_FlatListItem from './Student_FlatListItem'
import SoundPlayer from 'react-native-sound-player'

function updateState(refresh) {
    if (!this.state.unmount) {
        this.setState({ refresh })
        //console.log(this.state)
    }
}

export { updateState }

export default class Student_BasicFlatList extends Component {

    state = {
        isListLongPressed: false,
        refresh: false,
        unmount: false,
        urgent: false,
    }

    constructor(props) {
        super(props)
        updateState = updateState.bind(this) 
    }

    playSiren = () => {
        if (!this.state.urgent) {
            this.state.urgent = true
            try {
                // play the file tone.mp3
                SoundPlayer.playSoundFile('urgent', 'mp3')
                // or play from url
                //SoundPlayer.playUrl('https://example.com/music.mp3')
            } catch (e) {
                console.log(`cannot play the sound file`, e)
            }
        }
    }
    componentDidMount(){
        SoundPlayer.onFinishedPlaying((success) => {
            this.state.urgent = false
        })
    }

    componentWillReceiveProps(props) {
        if (this.props.isFirstTabPage) {
            //this.setState({ isListLongPressed: !props.isListLongPressed });
            this.setState({ isListLongPressed: props.isListLongPressed });
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    componentWillUnmount() {
        this.setState({ unmount: true })
    }

    renderFooter = () => {
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderTopColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />

            </View>

        );
    }

    _onRefresh = () => {
        this.setState({ refresh: true });
        fetchData().then(() => {
            this.setState({ refresh: false });
        });
    }

    render() {
        updateState = updateState.bind(this);
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={flatListData}
                    extraData={this.state}
                    renderItem={({ item, index }) => {
                        //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);                                              
                        return <Student_FlatListItem
                            item={item}
                            index={index}
                            playSiren={this.playSiren}
                            changeListLongPressedState={this.props.changeListLongPressedState}
                            isListLongPressed={this.state.isListLongPressed}
                            changeListCheckBoxSelectState={this.props.changeListCheckBoxSelectState} />;
                    }}
                />
            </View>
        );
    }
}