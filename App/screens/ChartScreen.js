import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import ActionBar from "react-native-action-bar";
import PureChart from 'react-native-pure-chart';
import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
const screenWidth = Dimensions.get('window').width

export default class ChartScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@chart")
    }
    render() {
        console.log("@##$@");
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <ActionBar
                        containerStyle={styles.bar}
                        allowFontScaling={true}
                        title={'기록조회( ' + this.props.item.name + ' )'}
                        backgroundColor={"#f9f9fa"}
                        titleStyle={modalStyles.titleStyle}
                        titleContainerStyle={modalStyles.titleContainerStyle}
                        iconImageStyle={modalStyles.iconImageStyle}
                        leftIconName={"back"}
                        onLeftPress={() => this.setChartModalVisible(!this.state.chartModalVisible)}
                        leftIconContainerStyle={modalStyles.leftIconContainerStyle}
                    />
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                        <Text style={[styles.textStyle, { fontSize: 15, fontFamily: 'Spoqa Han Sans Bold' }]}>심박수 및 호흡수</Text>
                    </View>
                    <View style={{ marginTop: 20, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5, alignItems: 'center' }}>
                            <Text style={[styles.textStyle, { fontSize: 14, fontFamily: 'Spoqa Han Sans Regular' }]}>최고 심박수 : {this.state.maxHeart}</Text>
                        </View>
                        <View style={{ flex: 0.5, alignItems: 'center' }}>
                            <Text style={[styles.textStyle, { fontSize: 14, fontFamily: 'Spoqa Han Sans Regular' }]}>최저 심박수 : {this.state.minHeart}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ flex: 0.5, alignItems: 'center' }}>
                            <Text style={[styles.textStyle, { fontSize: 14, fontFamily: 'Spoqa Han Sans Regular' }]}>최고 호흡수 : {this.state.maxBrethe}</Text>
                        </View>
                        <View style={{ flex: 0.5, alignItems: 'center' }}>
                            <Text style={[styles.textStyle, { fontSize: 14, fontFamily: 'Spoqa Han Sans Regular' }]}>최저 호흡수 : {this.state.minBrethe}</Text>
                        </View>
                    </View>



                    <PureChart
                        type={'line'}
                        width={screenWidth}
                        height={this.state.screenHeight}
                        maxValue={this.state.maxBrethe > this.state.maxHeart ? this.state.maxHeart + 100 : this.state.maxBrethe + 100}
                        minValue={this.state.minBrethe > this.state.minHeart ? this.state.minHeart - 10 : this.state.minBrethe - 10}
                        numberOfYAxisGuideLine={50}
                        data={this.state.chartDatas}
                        customValueRenderer={(index, point) => {
                            if (index % 2 === 0) return null
                            return (
                                <Text style={{ top: '23%', textAlign: 'center', fontSize: 11, fontFamily: 'Spoqa Han Sans Regular', paddingTop: 10 }}>{point.y}</Text>
                            )
                        }} />
                    {/* <LineChart
                            data={{
                                labels: this.state.chartLabels,
                                datasets: this.state.chartDatas
                            }}
                            width={Dimensions.get('window').width} // from react-native
                            height={220}
                            chartConfig={{
                                backgroundColor: '#e26a00',
                                backgroundGradientFrom: '#fb8c00',
                                backgroundGradientTo: '#ffa726',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        /> */}

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: 15 }}>
                        <View style={[styles.colorStyle, { backgroundColor: "#ff0000" }]} />
                        <Text style={[styles.textStyle, { fontSize: 10, fontFamily: 'Spoqa Han Sans Regular' }]}>심박수</Text>
                        <View style={[styles.colorStyle, { backgroundColor: "#0000ff" }]} />
                        <Text style={[styles.textStyle, { fontSize: 10, fontFamily: 'Spoqa Han Sans Regular' }]}>호흡수</Text>
                    </View>
                </View>
            </View>
        );
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
    activityIndicator: {
        flex: 1,
        position: 'absolute',
        left: '45%',
        top: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    bar: {
        height: 55,
        alignItems: "center"
    },
    colorStyle: {
        marginLeft: 8,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 5,
    }
});
const modalStyles = StyleSheet.create({
    titleStyle: {
        fontSize: 16,
        color: "#3b3e4c"
    },
    titleContainerStyle: {
        alignItems: "center",
        paddingRight: 40
    },
    iconImageStyle: {
        width: 14.5,
        height: 30,
        tintColor: "#82889c"
    },
});