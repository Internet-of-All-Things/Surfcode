import React, { Component } from "react";
import { TouchableHighlight, Image, FlatList, StyleSheet, Text, View, CheckBox } from "react-native";

import {weather_imageData} from '../data/weather_imageData'

let img;
class Weather_HorizontalFlatListItem extends Component {
    constructor(props){
        super(props)
        if(props.item.wind > 3)
            img = weather_imageData.Wind.lv3
        else if(props.item.wind > 2)
            img = weather_imageData.Wind.lv2
        else         
            img = weather_imageData.Wind.lv1
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
            <Image source={img} style={{width : 18, height :18, resizeMode: 'contain'}} ></Image>
            <Text style={{
                fontSize:12,
                fontFamily:'Spoqa Han Sans Regular',
                color : '#3b3e4c',
                margin : 3
            }}>
            {this.props.item.wind} m/s
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

                    data={this.props.weatherData}
                    renderItem={({ item, index }) => {
                        return <Weather_HorizontalFlatListItem item={item} index={index} parentFlatList={this} />;
                    }}
                />
            </View>
        );
    }
}