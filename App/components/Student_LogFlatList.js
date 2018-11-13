import React, { Component } from "react";
import { TouchableHighlight, Modal, ActivityIndicator, Image, FlatList, StyleSheet, Text, View, CheckBox } from "react-native";
import firebase from "react-native-firebase";
import ActionBar from "react-native-action-bar";
import PureChart from 'react-native-pure-chart';
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

class Student_LogListItem extends Component {
    
    state = {
        imageUrl: '../images/personxhdpi.png',
        chartModalVisible: false,
        chartDatas: [],
        chartDatas2: [],
        maxHeart: 0,
        minHeart: 0,
        maxBrethe: 0,
        minBrethe: 0,
        screenHeight: 1200,
        chartLabels : []
    }
    constructor(props) {
        super(props)
        //console.log("Student_LogListItem!!!", props.item.tel, props.item.email)

    }
    componentDidMount() {
        this.loadData();
        firebase.storage().ref('student/' + this.props.item.tel + '/profile.jpg').getDownloadURL()
            .then((url) => {
                this.setState({ imageUrl: url })
            }).catch((error) => {
                /* There is no match ref */
                if (error.code === 'storage/object-not-found')
                    this.state.imageUrl = '../images/personxhdpi.png'
            })
    }
    loadData() {
        var keys = Object.keys(this.props.item.data);
        var datas = [
            {
                seriesName: 'heart',
                data: [

                ],
                color: '#ff0000'
            },
            {
                seriesName: 'brethe',
                data: [

                ],
                color: '#0000ff'
            }
        ]
        var datas2;
        var ddd = []
        var hhh = []
        var ttt = []

        var maxHeart = parseInt(this.props.item.data[keys[0]]['심박수'])
        var minHeart = parseInt(this.props.item.data[keys[0]]['심박수'])
        var maxBrethe = parseInt(this.props.item.data[keys[0]]['호흡수'])
        var minBrethe = parseInt(this.props.item.data[keys[0]]['호흡수'])
        for (var i = 0; i < keys.length; i++) {
            var heart = parseInt(this.props.item.data[keys[i]]['심박수'])
            var brethe = parseInt(this.props.item.data[keys[i]]['호흡수'])
            
            datas[0].data.push({
                x: keys[i],
                y: heart
            })
            datas[1].data.push({
                x: keys[i],
                y: brethe
            })
            
            if (maxBrethe < brethe)
                maxBrethe = brethe;
            if (minBrethe > brethe)
                minBrethe = brethe;
            if (maxHeart < heart)
                maxHeart = heart;
            if (minHeart > heart)
                minHeart = heart;

        }
       
        this.setState({
            //chartLabels : ttt,
            chartDatas: datas,
            maxHeart: maxHeart,
            minHeart: minHeart,
            maxBrethe: maxBrethe,
            minBrethe: minBrethe,
        });
    }
    setChartModalVisible(visible) {
        this.setState({ chartModalVisible: visible });
    }
    componentWillReceiveProps(props) {
    }
    

    render() { 
        return (
            <View>
                {/*modal부분 start*/}
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.chartModalVisible}
                    onRequestClose={() => {
                        this.setChartModalVisible(!this.state.chartModalVisible);
                    }}
                >
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
                                maxValue={this.state.maxBrethe>this.state.maxHeart?this.state.maxHeart+100:this.state.maxBrethe+100}
                                minValue={this.state.minBrethe>this.state.minHeart?this.state.minHeart-10:this.state.minBrethe-10}
                                numberOfYAxisGuideLine={50}
                                data={this.state.chartDatas}
                                customValueRenderer={(index, point) => {
                                    if (index % 2 === 0) return null
                                    return (                                        
                                         <Text style={{top:'23%', textAlign: 'center', fontSize: 11, fontFamily: 'Spoqa Han Sans Regular',paddingTop:10}}>{point.y}</Text>                                        
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
                </Modal>
                {/*modal부분 end*/}
                {/*onPress={() => navigate('ChartScreen',this.state)}*/}
                <TouchableHighlight onPress={() => this.setChartModalVisible(!this.state.chartModalVisible)} underlayColor="#ffb8c6">
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        padding: 10,
                        alignItems: 'center',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={{ uri: this.state.imageUrl }} style={{
                                width: 50,
                                height: 50,
                                borderWidth: 1,
                                borderColor: '#82889c',
                                borderRadius: 100,
                                backgroundColor: '#f9f9fa'
                            }} />
                        </View>
                        <View style={{ flex: 0.3, flexDirection: "column", marginLeft: 25 }}>
                            <Text style={[styles.textStyle, { fontSize: 22, fontFamily: 'Spoqa Han Sans Bold' }]}>{this.props.item.name}</Text>
                        </View>
                        <View style={{ flex: 0.7, flexDirection: "column", paddingTop: 5 }}>
                            <View style={{ flexDirection: 'row', flex: 0.5, marginTop: 2, alignItems: 'center' }}>
                                <View style={{ flex: 0.3 }}>
                                    <Text style={styles.smallText}>Tel</Text>
                                </View>
                                <Text numberOfLines={1} style={[styles.textStyle, { flex: 0.7, marginBottom: 2 }]}>{this.props.item.tel}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 0.5, marginTop: 2, alignItems: 'center' }}>
                                <View style={{ flex: 0.3 }}>
                                    <Text style={styles.smallText}>E-mail</Text>
                                </View>
                                <Text numberOfLines={1} style={[styles.textStyle, { flex: 0.7, marginBottom: 2 }]}>{this.props.item.email}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View >
        );
    }
}

export default class Student_LogFlatList extends Component {
    state = {
        userLogData: [],
        animating: true
    }

    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(props) {
        //console.log("Student_LogFlatList Receive props!!!", props.userLogData.length);
        this.setState({ userLogData: props.userLogData })
        this.setState({ animating: false })
    }
    componentDidMount() {
        this.setState({ animating: false })
    }
    componentWillUnmount() {
        this.setState({ animating: true })
    }
    render() {        
        return (
            <View style={{ flex: 1 }}>

                <ActivityIndicator
                    animating={this.state.animating}
                    color='#bc2b78'
                    size="large"
                    style={styles.activityIndicator} />
                <FlatList
                    data={this.props.userLogData}
                    //showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return <Student_LogListItem item={item} index={index} parentFlatList={this}/>;
                    }}
                />

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