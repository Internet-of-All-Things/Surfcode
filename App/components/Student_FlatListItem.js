import React, { Component } from "react";
import { TouchableHighlight, TouchableOpacity, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { CheckBox } from 'react-native-elements'

export default class Student_FlatListItem extends Component {
    state = {
        isListLongPressed: false,
        itemChecked: false,
    }
    constructor(props) {
        super(props);
        this._onLongPressButton = this._onLongPressButton.bind(this);
    }
    _onLongPressButton() {
        this.props.changeListLongPressedState();
    }
    checkListItem() {
        if (this.state.isListLongPressed) {
            console.log("dddd", this.state);
            var itemstate = this.state.itemChecked = !this.state.itemChecked;
            this.setState({ itemChecked: itemstate });
            //this.state.checked = !this.state.checked//이건 위의 this.state
            this.props.changeListCheckBoxSelectState(this.props.index, itemstate);
            console.log(this.props.index + " checked : " + itemstate);
        }
    }
    componentWillReceiveProps(props) {
        this.setState({ itemChecked: false });
        this.setState({ isListLongPressed: this.props.isListLongPressed });
        //console.log("item! : " + this.state.isListLongPressed + " " + this.props.index + " "+ this.state.itemChecked );
    }
    render() {
        return (
            <View>
                <TouchableHighlight onPress={() => { this.checkListItem() }} onLongPress={() => { this._onLongPressButton() }} underlayColor="#ff0000">
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        padding: 10,
                        backgroundColor:
                            '#f9f9fa'
                        //this.props.index % 2 == 0 ? "#ffffff" : "#65edea"
                    }}>
                        {this.state.isListLongPressed ? (
                            <View style={{ flex: 0.18, marginLeft: 0, width: 62, height: 40, paddingTop: 5, paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                                <CheckBox
                                    title=''
                                    containerStyle={
                                        {
                                            padding: 0,
                                            borderColor: '#ff000000',
                                            backgroundColor: '#ff000000'
                                        }
                                    }
                                    checked={this.state.itemChecked}
                                    onPress={() => { this.checkListItem() }}
                                />
                            </View>

                        ) : null}


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                            <Image source={require('../images/personxhdpi.png')} style={{
                                width: 45,
                                height: 45,
                                borderWidth: 1,
                                borderColor: '#82889c',
                                borderRadius: 100,
                            }} />
                        </View>

                        <View style={{ flex: 0.45, flexDirection: "column", marginLeft: 25 }}>
                            <Text style={[styles.textStyle, { fontSize: 24 }]}>{this.props.item.name}</Text>
                            <Text style={styles.smallText}>{this.props.item.state}</Text>
                        </View>
                        <View style={{ flex: 0.55, flexDirection: "row", paddingTop: 5 }}>
                            <View style={{ flex: 0.5, alignItems: 'center' }}>
                                <Text style={[styles.textStyle, { flex: 0.5 }]}>{this.props.item.bpm} BPM</Text>
                                <View style={{ flexDirection: 'row', flex: 0.5, justifyContent: 'center' }}>                                
                                    <Image style={{ marginRight: 5,marginTop:4, width:12, height:12, tintColor:"#82889c", resizeMode:'contain' }} source={require('../images/empty-heartmdpi.png')}  />
                                    <Text style={styles.smallText}>심박</Text>
                                </View>
                            </View>

                            <View style={{ width: 1, marginBottom: 15, backgroundColor: '#d0d2da', marginTop: 15 }} />{/* 바 부분 */}
                            <View style={{ flex: 0.5, alignItems: 'center' }}>
                                <Text style={[styles.textStyle, { flex: 0.5 }]}>{this.props.item.brethe}/Min</Text>
                                <View style={{ flexDirection: 'row', flex: 0.5 }}>
                                <Image style={{ marginRight: 5,marginTop:4, width:12, height:12, tintColor:"#82889c", resizeMode:'contain' }} source={require('../images/breathingmdpi.png')} />
                                    <Text style={styles.smallText}>호흡</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    textStyle: {
        color: '#3b3e4c',
        fontSize: 14
    },
    smallText: {
        fontSize: 12,
        color: '#82889c'
    }
});