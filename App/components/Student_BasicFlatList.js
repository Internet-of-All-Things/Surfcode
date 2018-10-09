import React, { Component } from "react";
import { TouchableHighlight, ActivityIndicator, FlatList, StyleSheet, Text, View, CheckBox } from "react-native";

import flatListData from "../data/flatListData";
import Student_FlatListItem from './Student_FlatListItem'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ListItem } from "react-native-elements";

function updateState(refresh) {
    this.setState({ refresh })
}

export { updateState }

export default class Student_BasicFlatList extends Component {
    state = {
        isListLongPressed: false,
        refresh : false,
    }

    constructor(props){
        super(props);
        updateState = updateState.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({ isListLongPressed: !props.isListLongPressed });
        console.log("component Will Receive Props1", this.state.isListLongPressed);
    }
    changeListLongPressedState = () => {
        this.setState({
            isListLongPressed: !this.state.isListLongPressed
        });
        this.props.changeListLongPressedState();
        console.log("list! : " + this.state.isListLongPressed);
    }

    renderFooter = () =>{
        return(
                <View
                style={{
                    paddingVertical:20,
                    borderTopWidth:1,
                    borderTopColor:"#CED0CE"
                }}
                >
                <ActivityIndicator animating size="large"/>
                    
                </View>

        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={flatListData}
                    extraData={this.state}
                    renderItem={({ item, index }) => {
                        //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);                                              
                        return <Student_FlatListItem item={item} index={index} changeListLongPressedState={this.changeListLongPressedState} isListLongPressed={this.state.isListLongPressed} changeListCheckBoxSelectState={this.props.changeListCheckBoxSelectState}/>;
                    }}
                />
            </View>
        );
    }
}