import React, { Component } from "react";
import { TouchableHighlight, Modal, ActivityIndicator, Image, FlatList, StyleSheet, Text, View, CheckBox } from "react-native";
import firebase from "react-native-firebase";
import ActionBar from "react-native-action-bar";
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

class Student_LogListItem extends Component {
    state = {
        imageUrl: '../images/personxhdpi.png',
        modalVisible: false,
        chartLabels: [],
        chartDatas: []
    }
    constructor(props) {
        super(props)
        console.log("Student_LogListItem!!!", props.item.tel, props.item.email)
        firebase.storage().ref('student/' + props.item.tel + '/profile.jpg').getDownloadURL()
            .then((url) => {
                this.state.imageUrl = url;
                console.log("@@@ ", logArray.length, url)
            }).catch((error) => {
                /* There is no match ref */
                if (error.code === 'storage/object-not-found')
                    this.state.imageUrl =  '../images/personxhdpi.png'                    
            })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentWillReceiveProps(props) {
        console.log("Student_LogListItem Receive props!!!");
    }
    checkListLog() {
        // this.setState({

        // })
        console.log(this.props.item)
        this.setModalVisible(!this.state.modalVisible);
    }
    render() {
        return (
            <View>
                {/*modal부분 start*/}
                <Modal
                    animationType="slide"
                    transparent={false}
                    style={{ flex: 1 }}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
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
                            onLeftPress={() => this.setModalVisible(!this.state.modalVisible)}
                            leftIconContainerStyle={modalStyles.leftIconContainerStyle}
                        />

                        <LineChart
                            // labels={this.state.chartLabels}
                            // data={this.state.chartDatas}
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                                datasets: [{
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]
                                }]
                            }}
                            width={screenWidth}
                            height={Dimensions.get('window').height}
                            chartConfig={{
                                //backgroundColor:'#f9f9fa',
                                //backgroundColor: '#e26a00',
                                 backgroundGradientFrom: '#f9f9fa',
                                 backgroundGradientTo: '#f9f9fa',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 5
                            }}
                        />
                    </View>
                </Modal>
                {/*modal부분 end*/}

                <TouchableHighlight onPress={() => { this.checkListLog() }} underlayColor="#ffb8c6">
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
                                <View style={{ flex: 0.35 }}>
                                    <Text style={styles.smallText}>Tel</Text>
                                </View>
                                <Text style={[styles.textStyle, { flex: 0.5, marginBottom: 2 }]}>{this.props.item.tel}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 0.5, marginTop: 2, alignItems: 'center' }}>
                                <View style={{ flex: 0.35 }}>
                                    <Text style={styles.smallText}>E-mail</Text>
                                </View>
                                <Text style={[styles.textStyle, { flex: 0.5, marginBottom: 2 }]}>{this.props.item.email}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
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
        console.log("Student_LogFlatList!!!", props)
    }
    componentWillReceiveProps(props) {
        this.setState({ animating: true })
        console.log("Student_LogFlatList Receive props!!!", props.userLogData.length);
        this.setState({ userLogData: props.userLogData })
        this.setState({ animating: false })
    }
    componentDidMount() {
        this.setState({ animating: false })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.userLogData.length > 0 ?
                    (
                        <View>
                            <ActivityIndicator
                                animating={this.state.animating}
                                color='#bc2b78'
                                size="large"
                                style={styles.activityIndicator} />
                            <FlatList
                                data={this.props.userLogData}
                                //showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return <Student_LogListItem item={item} index={index} parentFlatList={this} />;
                                }}
                            />
                        </View>
                    ) : (
                        <Text style={styles.textStyle}>기록 없음</Text>
                    )}
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
        top: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    bar: {
        height: 55,
        alignItems: "center"
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