import React, { Component } from "react";
import { TouchableHighlight, Image, FlatList, StyleSheet, Text, View, CheckBox } from "react-native";

import {waveStatus} from '../data/wave_flatListData'
import {waveListData} from '../data/wave_flatListData'

class Weather_HorizontalFlatListItem extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 60,                    
                    margin: 4
            }}>
            <Text style={{
                fontSize:12,
                fontFamily:'Spoqa Han Sans Regular',
                color : '#82889c',
                margin : 3
            }}>
            {this.props.item.hour}
            </Text>
            <Image source={require("../images/weather/sunny-color.png")} style={{width : 18, height :18, resizeMode: 'contain'}} ></Image>
            <Text style={{
                fontSize:12,
                fontFamily:'Spoqa Han Sans Regular',
                color : '#3b3e4c',
                margin : 3
            }}>
            {this.props.item.wave} m
            </Text>
            </View>
        )
    }
}
export default class Weather_BasicFlatList extends Component {
    state = {
    }
    constructor(props) {
        super(props);      
    }
    render() {
        return (
            <View style={{height:90,width:'100%'}}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={waveListData}
                    renderItem={({ item, index }) => {                                                                   
                        return <Weather_HorizontalFlatListItem item={item} index={index} parentFlatList={this} />;
                    }}
                />
            </View>
        );
    }
}