import React, { Component } from "react";
import { TouchableHighlight, ActivityIndicator, FlatList, StyleSheet, Text, View, CheckBox } from "react-native";

import flatListData from "../data/flatListData";
import Student_FlatListItem from './Student_FlatListItem'
import SoundPlayer from 'react-native-sound-player'
import urgentStudents from '../data/urgentStudents'

function updateState(refresh) {
    if (this.state.mount) {
        this.setState({ refresh })
    }
}

function soundOff(){
    this.state.urgent = false
}

export { updateState, soundOff }

export default class Student_BasicFlatList extends Component {

    state = {
        isListLongPressed: false,
        refresh: false,
        mount: false,
        urgent: false,
    }

    constructor(props) {
        super(props)
        updateState = updateState.bind(this)
        soundOff = soundOff.bind(this)
    }

    setUrgentFalse = () => {
        this.state.urgent = false
    }

    playSiren = () => {
        if (!this.state.urgent) {
            this.state.urgent = true
            try {
                SoundPlayer.playSoundFile('urgent', 'mp3')
                //SoundPlayer.resume()
            } catch (e) {
                console.log(`cannot play the sound file`, e)
            }
        }
    }

    componentDidMount() {
        this.state.mount = true
        SoundPlayer.onFinishedPlaying((success) => {
            this.state.urgent = false
            if (urgentStudents.length > 0)
                this.playSiren()
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
        this.state.mount = false
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
                            setUrgentFalse={this.setUrgentFalse}
                            changeListLongPressedState={this.props.changeListLongPressedState}
                            isListLongPressed={this.state.isListLongPressed}
                            changeListCheckBoxSelectState={this.props.changeListCheckBoxSelectState} />;
                    }}
                />
            </View>
        );
    }
}