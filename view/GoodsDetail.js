
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,Dimensions,Image,TextInput,TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modalbox';
import Picker from "react-native-picker";
import area from './lib/area1.json';
const {width} = Dimensions.get('window');
export default class Demo1 extends Component {
    constructor(props){
        super(props);
        this.state={
            sliderValue: 0.3,
            swiperData:[require('./images/img-goods.png'),require('./images/img-goods.png'),require('./images/img-goods.png'), require('./images/img-goods.png')],
            title:'酷挖创意车贴',
            pay:'0.00',
            payNum:300,
            name:'圆子同学',
            phone:'18149521022',
            address:'福建省 福州市 鼓楼区 丞相坊',
            titleGoods:'酷挖创意车贴',
            numGoods:'1',
            freeGive:'包邮',
            numWb:'300',
            place:'所在地区',
            address2:'鼓楼区 丞相坊',
            number:1,
            isAdd:false,
        }
    }
    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }
            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }
    _showAreaPicker() {
        Picker.init({
            pickerData: this._createAreaData(),
            selectedValue: ['湖北', '武汉', '江岸区'],
            pickerConfirmBtnText: "选择",
            pickerConfirmBtnColor: [1, 186, 245, 1],
            pickerCancelBtnText: "取消",
            pickerCancelBtnColor: [140, 140, 140, 1],
            pickerTitleText: "",
            pickerTitleColor:[20, 20, 20, 1],
            pickerToolBarBg: [232, 232, 232, 1],
            pickerToolBarFontSize: 16,
            pickerBg: [220, 220, 220, 1],
            pickerFontColor: [255, 179, 0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
                this.setState({
                    place:pickedValue
                })
            },
        });
        Picker.show();
    }
    reduce(){
        if(this.state.number>1){
            this.setState({
                number:this.state.number-1
            })
        }else {
            alert('兑换数量不能少于1')
        }
    }
    plus(){
        this.setState({
            number:this.state.number+1
        })
    }
    render() {
        const {title,pay,payNum,name,phone,address,titleGoods,numGoods,freeGive,numWb,place,address2,number}=this.state
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Swiper height={220} autoplay  loop showsPagination={false} style={styles.wrapper} >
                        {
                            this.state.swiperData.map((item,index)=>{
                                return(
                                    <View key={index}>
                                        <Image source={item} style={styles.imageSize} resizeMode={'contain'} />
                                        <Text style={styles.numStyle}>{index} / {index}</Text>
                                    </View>
                                )
                            })
                        }
                    </Swiper>

                    <View style={styles.payView}>
                        <View style={styles.payTop}>
                            <Text style={styles.payTitle}>{title}</Text>
                            <Text style={styles.pay}>运费:{pay}</Text>
                        </View>
                        <Text style={styles.payNum}>{payNum}挖币</Text>
                    </View>

                    <View style={styles.change}>
                        <Text style={styles.changeTitle}>兑换数量</Text>
                        <View style={styles.changeView}>
                            <Text onPress={()=>this.reduce()} style={styles.reduce}>_</Text>
                            <Text style={styles.changeNum}>{number}</Text>
                            <Text onPress={()=>this.plus()} style={styles.plus}>+</Text>
                        </View>
                    </View>


                    <View style={{backgroundColor:'#fff',}}>
                        <Text style={styles.goodsDetail}>商品详细介绍</Text>
                        <View>
                            <Text></Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.btnView}>
                    <Text style={styles.btn} onPress={() => this.refs.modal1.open()}>立即兑换</Text>
                </View>

                <Modal style={styles.modalView} position={"bottom"} ref={"modal1"}>
                    <View style={styles.modal}>
                        <View style={styles.themeView}>
                            <View style={styles.info}>
                                <Text style={styles.titleTheme}>{name}{phone}</Text>
                                <Text style={styles.addressInfo}>{address}</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.8}  onPress={() => [this.refs.modal1.close(),this.refs.modal2.open()]}>
                                <Image source={require('./images/icon-edit.png')} style={styles.edit}/>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.themeView}>
                            <Text style={styles.titleTheme}>{titleGoods}</Text>
                            <Text style={styles.titleTheme}>x {numGoods}</Text>
                        </View>
                        <View style={styles.themeView}>
                            <Text style={styles.titleTheme}>配送方式</Text>
                            <Text style={styles.freeGive}>x {freeGive}</Text>
                        </View>
                        <View style={styles.themeView}>
                            <Text style={styles.titleTheme}>应付挖币</Text>
                            <Text style={styles.freeGive}>{numWb}挖币</Text>
                        </View>
                        <View style={styles.btnView2}>
                            <Text style={styles.btn2}>提交订单</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.8}  onPress={() => this.refs.modal1.close()} style={styles.deletView}>
                            <Image source={require('./images/icon-delet.png')} style={styles.delet}/>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal style={styles.modalView} position={"bottom"} ref={"modal2"}>
                    <View style={styles.modal}>
                        <Text style={styles.editAddr}>修改地址</Text>
                        <TextInput placeholder={name}            placeholderTextColor="rgb(51,51,51)" style={styles.textInput}/>
                        <TextInput placeholder={phone}           placeholderTextColor="rgb(51,51,51)" style={styles.textInput}  keyboardType={'numeric'}/>
                         <Text  onPress={()=>this._showAreaPicker()} style={[styles.textInput,{lineHeight:45,paddingLeft:4}]}  >{place} </Text>
                        <TextInput placeholder={address2}        placeholderTextColor="rgb(51,51,51)" style={styles.textInput}/>
                        <TouchableOpacity activeOpacity={0.8}  onPress={() => [this.refs.modal2.close(),this.refs.modal3.open()]}>
                            <View style={styles.btnView2}>
                                <Text style={styles.btn2}>确认修改</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}  onPress={() => this.refs.modal2.close()} style={styles.deletView}>
                            <Image source={require('./images/icon-delet.png')} style={styles.delet}/>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal style={styles.modalView} position={"bottom"} ref={"modal3"}>
                    <View style={styles.modal}>
                        <Text style={styles.editAddr}>添加地址</Text>
                        <TextInput placeholder={name}         placeholderTextColor="rgb(51,51,51)"   style={styles.textInput}   underlineColorAndroid='transparent'/>
                        <TextInput placeholder="联系电话"     placeholderTextColor="rgb(198,198,198)" style={styles.textInput}  keyboardType={'numeric'} underlineColorAndroid='transparent'/>
                        <Text  style={[styles.addr,{color:place==='所在地区'? 'rgb(198,198,198)':'rgb(51,51,51)'}]} onPress={()=>this._showAreaPicker()}>{place} </Text>
                        <TextInput placeholder="详细地址"     placeholderTextColor="rgb(198,198,198)" style={styles.textInput}  underlineColorAndroid='transparent'/>

                        <TouchableOpacity activeOpacity={0.8}  onPress={() => [this.refs.modal2.close(),this.refs.modal3.open()]}>
                            <View style={styles.btnView2}>
                                <Text style={styles.btn2}>确认添加</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity  onPress={() => this.refs.modal3.close()} style={styles.deletView}>
                            <Image source={require('./images/icon-delet.png')} style={styles.delet}/>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(245,245,245)',
    },
    wrapper:{
        marginTop: 10,
    },
    numStyle: {
        width:25,
        height:15,
        borderRadius:3,
        backgroundColor:'rgba(0,0,0,0.4)',
        color: '#fff',
        fontSize: 10,
        textAlign:'center',
        zIndex:99,
        position:'absolute',
        right:20,
        bottom:13,
    },
    imageSize: {
        width:width,
        height:220,
    },
    payView:{
        paddingHorizontal:15,
        paddingVertical:15,
        backgroundColor:'#fff'
    },
    payTop:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    payTitle:{
        fontSize:17,
        color:'rgb(51,51,51)',
    },
    pay:{
        fontSize:14,
        color:'rgb(153,153,153)',
    },
    payNum:{
        fontSize:18,
        color:'rgb(255,179,0)',
        paddingTop:10
    },
    change:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:15,
        backgroundColor:'#fff',
        marginVertical:10,
    },
    changeTitle:{
        color:'rgb(51,51,51)',
        fontSize:16,
    },
    changeView:{
        flexDirection:'row',
        justifyContent:'space-between',
        color:'rgb(97,97,97)',
        borderWidth:1,
        borderColor:'rgb(144,144,144)',
        height:28,
        minWidth:90,
        fontSize:20,
    },
    reduce:{
        borderRightWidth:1,borderRightColor:'rgb(144,144,144)',
        minWidth:30,
        height:26,
        textAlign:'center',
        lineHeight:16,
    },
    plus:{
        borderLeftWidth:1,borderLeftColor:'rgb(144,144,144)',
        minWidth:30,
        height:26,
        textAlign:'center',
        lineHeight:26,
    },
    changeNum:{
        minWidth:30,
        height:28,
        textAlign:'center',
        lineHeight:28,
    },
    btnView:{
        backgroundColor:'#fff',
        width:width,
    },
    btn:{
        marginHorizontal:15,
        marginVertical:15,
        width:width-30,
        paddingVertical:10,
        fontSize:18,
        color:'#fff',
        textAlign:'center',
        backgroundColor:'rgb(255,179,0)',
        borderRadius:5,
    },

    goodsDetail:{
        fontSize:17,
        color:'rgb(51,51,51)',
        paddingLeft:15,
        paddingVertical:15,
    },
    /*弹窗*/
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    modal: {
        backgroundColor:'#FFF',
        width:width-30,
        position:'absolute',
        bottom:14,
        borderRadius:5,
        paddingVertical:15,
        paddingHorizontal:10
    },
    themeView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:10,
        borderBottomColor:'rgb(230,230,230)',
        borderBottomWidth:1,
    },
    titleTheme:{
        color:'rgb(51,51,51)',
        fontSize:14,
    },
    addressInfo:{
        color:'rgb(153,153,153)',
        fontSize:14,
    },
    freeGive:{
        color:'rgb(255,179,0)',
        fontSize:14,
    },
    edit:{
        width:15,
        height:15,
    },
    btnView2:{
        justifyContent:'center',
        alignItems:'center',
    },
    btn2:{
        width:width-50,
        paddingVertical:10,
        fontSize:18,
        color:'#fff',
        textAlign:'center',
        backgroundColor:'rgb(255,179,0)',
        borderRadius:5,
        marginTop:20,
    },
    deletView:{
        position:'absolute',
        top:-15,
        right:12,
    },
    delet:{
        width:36,
        height:36,
    },

    /*修改地址*/
    editAddr:{
        color:'rgb(0,0,0)',
        fontSize:18,
        textAlign:'center',
        paddingBottom:16,
    },
    textInput:{
        borderBottomColor:'rgb(230,230,230)',
        borderBottomWidth:1,
        color:'rgb(51,51,51)',
        height:45,
        textAlign:'left'
    },
    addr:{
        paddingVertical:15,
        borderBottomColor:'rgb(230,230,230)',
        borderBottomWidth:1,
        paddingLeft:4
    },


});
