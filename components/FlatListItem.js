import React, { Component } from "react";
import { TouchableHighlight, FlatList, StyleSheet, Text, View, CheckBox } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default class FlatListItem extends Component {
    state = {
        isListLongPressed: false
    }
    constructor(props) {
        super(props);
        this._onLongPressButton = this._onLongPressButton.bind(this);
    }
    _onLongPressButton() {
        this.props.changeListLongPressedState();
    }
    componentWillReceiveProps(props) {
        this.setState({ isListLongPressed: this.props.isListLongPressed });
        console.log("item! : " + this.state.isListLongPressed + " " + this.props.index);
    }
    render() {
        return (
            <View>
                <TouchableHighlight onLongPress={() => { this._onLongPressButton() }} underlayColor="#ff0000">
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        padding: 10,
                        backgroundColor:
                            '#f9f9fa'
                        //this.props.index % 2 == 0 ? "#ffffff" : "#65edea"
                    }}>
                        {this.state.isListLongPressed ? (
                            // <CheckBox
                            //     containerStyle={
                            //         {
                            //             width: 30,
                            //             height: 30,
                            //             padding: 0,
                            //             paddingRight: -10,
                            //             margin: 0,
                            //             borderColor: '#ff000000'
                            //         }
                            //     }
                            //     textStyle={
                            //         {
                            //             width: 0,
                            //             innerHeight: 0,
                            //             padding: 0,
                            //             margin: 0,
                            //         }
                            //     }

                            //     checkedIcon='dot-circle-o'
                            //     uncheckedIcon='circle-o'
                            //     checked={this.state.checked}
                            //     checkedColor='#84dcf4'
                            //     size={20}
                            //     onPress={() => this.setState({ checked: !this.state.checked })}
                            // />
                            <CheckBox
                                value={this.state.checked}
                                onChange={() => this.setState({ checked: !this.state.checked })}
                                />

                        ) : null}

                        <Icon style={{ marginLeft: 5, justifyContent: 'center' }} name="heart" color={'#ff0000'} size={40} />

                        <View style={{ flex: 0.5, flexDirection: "column", marginLeft: 25 }}>
                            <Text style={[styles.textStyle, { fontSize: 24 }]}>{this.props.item.name}</Text>
                            <Text style={styles.smallText}>{this.props.item.state}</Text>
                        </View>
                        <View style={{ flex: 0.5, flexDirection: "row", paddingTop: 5 }}>
                            <View style={{ flex: 0.5, alignItems: 'center' }}>
                                <Text style={[styles.textStyle, { flex: 0.5 }]}>{this.props.item.bpm} BPM</Text>
                                <View style={{ flexDirection: 'row', flex: 0.5 }}>
                                    <Icon style={{ marginRight: 5 }} name="heart" color={'#ff0000'} size={12} />
                                    <Text style={styles.smallText}>심박</Text>
                                </View>
                            </View>

                            <View style={{ width: 1, marginBottom: 15, backgroundColor: '#d0d2da', marginTop: 15 }} />{/* 바 부분 */}
                            <View style={{ flex: 0.5, alignItems: 'center' }}>
                                <Text style={[styles.textStyle, { flex: 0.5 }]}>{this.props.item.brethe}/Min</Text>
                                <View style={{ flexDirection: 'row', flex: 0.5 }}>
                                    <Icon style={{ marginRight: 5 }} name="heart" color={'#ff0000'} size={12} />
                                    <Text style={styles.smallText}>호흡</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
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