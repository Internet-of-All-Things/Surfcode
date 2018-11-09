import React, { Component } from "react";
import { TouchableHighlight, Image, FlatList, StyleSheet, Text, View, CheckBox } from "react-native";

import {weatherStatus} from '../data/weather_flatListData'
import {weatherListData} from '../data/weather_flatListData'

class Weather_HorizontalFlatListItem extends Component {
    constructor(props){
        super(props)
        console.log("::::::::::",this.props.item.status.color);
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
            {this.props.item.temperature} °C
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
        console.log('basicflatlist render')
        return (
            <View style={{height:90,width:'100%'}}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={weatherListData}
                    renderItem={({ item, index }) => {                        
                        console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);                                              
                        return <Weather_HorizontalFlatListItem item={item} index={index} parentFlatList={this} />;
                    }}
                />
            </View>
        );
    }
}