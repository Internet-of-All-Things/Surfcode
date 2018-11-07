import React, { Component } from "react";
import { TouchableHighlight, ActivityIndicator, FlatList, StyleSheet, Text, View, CheckBox } from "react-native";

import flatListData from "../data/flatListData";
import Student_FlatListItem from './Student_FlatListItem';

function updateState(refresh) {
    if(!this.state.unmount)
        this.setState({ refresh })
}

export { updateState }

export default class Student_BasicFlatList extends Component {
   
    state = {
        isListLongPressed: false,
        refresh : false,
        unmount : false,
    }

    constructor(props){
        super(props);
        updateState = updateState.bind(this);
    }

    componentWillReceiveProps(props) {
        console.log("component Will Receive Props1", JSON.stringify(props),props.isListLongPressed);
        if(this.props.isFirstTabPage){
            //this.setState({ isListLongPressed: !props.isListLongPressed });
            this.setState({ isListLongPressed: props.isListLongPressed });         
        }
    }

    shouldComponentUpdate(){
        updateState = updateState.bind(this);
        return true;
    }

    componentWillUnmount(){
        this.setState({unmount : true})
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

    _onRefresh = () => {
        this.setState({refresh: true});
        fetchData().then(() => {
          this.setState({refresh: false});
        });
    }
    
    render() {
        console.log('basicflatlist render')
        updateState = updateState.bind(this);
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={flatListData}
                    extraData={this.state}
                    renderItem={({ item, index }) => {
                        //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);                                              
                        return <Student_FlatListItem item={item} index={index} changeListLongPressedState={this.props.changeListLongPressedState} isListLongPressed={this.state.isListLongPressed} changeListCheckBoxSelectState={this.props.changeListCheckBoxSelectState}/>;
                    }}
                />
            </View>
        );
    }
}