import React, { Component } from "react";
import { TouchableHighlight, ActivityIndicator, FlatList, StyleSheet, Text, View, CheckBox } from "react-native";




class Student_LogListItem extends Component {
    render() {
        <View>
            <TouchableHighlight onPress={() => { this.checkListItem() }} onLongPress={() => { this._onLongPressButton() }} underlayColor="#ff0000">
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={{ uri: this.state.userImageSource }} style={{
                        width: 50,
                        height: 50,
                        borderWidth: 1,
                        borderColor: '#82889c',
                        borderRadius: 100,
                        backgroundColor: '#f9f9fa'
                    }} />
                </View>
                <View style={{ flex: 0.45, flexDirection: "column", marginLeft: 25 }}>
                    <Text style={[styles.textStyle, { fontSize: 22, fontFamily: 'Spoqa Han Sans Bold' }]}>{this.props.item.name}</Text>
                </View>
                <View style={{ flex: 0.55, flexDirection: "column", paddingTop: 5 }}>
                    <View style={{ flexDirection: 'row', flex: 0.5, marginTop: 2, alignItems: 'center' }}>
                        <Text style={styles.smallText}>Tel</Text>
                        <Text style={[styles.textStyle, { flex: 0.5, marginBottom: 2 }]}>{this.props.item.tel}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 0.5, marginTop: 2, alignItems: 'center' }}>
                        <Text style={styles.smallText}>E-mail</Text>
                        <Text style={[styles.textStyle, { flex: 0.5, marginBottom: 2 }]}>{this.props.item.email}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    }
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#3b3e4c',
        fontSize: 12,
        fontFamily: 'Spoqa Han Sans Regular'
    },
    smallText: {
        fontSize: 12,
        color: '#82889c',
        fontFamily: 'Spoqa Han Sans Regular'
    },
});


export default class Student_LogFlatList extends Component {
    state = {
        isListLongPressed: false,
        refresh: false,
        unmount: false,
    }

    constructor(props) {
        super(props);
        updateState = updateState.bind(this);
    }
    render() {
        updateState = updateState.bind(this);
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={flatListData}
                    extraData={this.state}
                    renderItem={({ item, index }) => {
                        return <Student_LogListItem item={item} index={index} />;
                    }}
                />
            </View>
        );
    }
}