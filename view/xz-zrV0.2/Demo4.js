/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView,Dimensions} from 'react-native';
import Modal from 'react-native-modalbox';
const {width,height} = Dimensions.get('window');
export default class Demo2 extends Component {
    constructor(props){
        super(props);
        this.state={
            title:'可加购责任',
            listData:[
                {
                    contImg:require('./images/img-contImg.png') ,
                    popupImg:require('./images/icon-popup.png'),
                    title1:'良性脑肿瘤特需医疗保险责任',
                    cont1:'100',
                    cont2:'0',
                    cont3:'床位费',
                    cont5:'50',
                    modalData:'111'
                },
                {

                    contImg:require('./images/img-contImg.png') ,
                    popupImg:require('./images/icon-popup.png'),
                    title1:'良性脑肿瘤特需医疗保险责任',
                    cont1:'100',
                    cont2:'0',
                    cont3:'床位费',
                    cont5:'10',
                    modalData:'222'
                },
                {
                    contImg:require('./images/img-contImg.png') ,
                    popupImg:require('./images/icon-popup.png'),
                    title1:'良性脑肿瘤特需医疗保险责任',
                    title2:'恶性脑肿瘤特需医疗保险责任',
                    cont1:'100',
                    cont2:'0',
                    cont3:'床位费100000000000000000000000000000000000000元',
                    cont4:'600',
                    cont5:'90',
                    modalData:'333',
                    modalData2:'444'

                }
            ]
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.title}</Text>
                {
                    this.state.listData.map((item,index)=>{
                        return(
                            <View  key={index}>
                                <SelectItem
                                    title1={item.title1}
                                    title2={item.title2}
                                    contImg={item.contImg}
                                    popupImg={item.popupImg}
                                    cont1={item.cont1}
                                    cont2={item.cont2}
                                    cont3={item.cont3}
                                    cont4={item.cont4}
                                    cont5={item.cont5}
                                    modalData={item.modalData}
                                    modalData2={item.modalData2}

                                />

                            </View>
                        )
                    })
                }
            </View>
        );
    }
}

class SelectItem extends Component {
    constructor(props){
        super(props);
        this.state={
            isSelect:this.props.isSelect || false,
        }
    }
    _select(){
        this.setState({
            isSelect:!this.state.isSelect
        })
    }
    render() {
        const {title1,title2,contImg,popupImg,cont1,cont2,cont3,cont4,cont5,modalData,modalData2}=this.props
        return (
            <View style={[styles.listView,this.state.isSelect ?{borderWidth:1,borderColor:'rgb(255,192,203)'}:{borderWidth:1,borderColor:'#e6e6e6',}]}>
                <Image source={contImg}style={{width:25,height:25,resizeMode:'contain'}}/>
                <View style={styles.contView}>
                    <View style={styles.contTopView}>
                        <Text style={{fontSize:15,color:'#666',marginRight:4}}>{title1}</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.refs.modal.open()}>
                            <Image source={popupImg} style={{width:14,height:14,resizeMode:'contain'}}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.contBottomView} numberOfLines={1}>{cont1}万元保额 | 免赔额: {cont2}元; {cont3}</Text>
                    {
                        cont4 != null ?
                            <View>
                                <View style={[styles.contTopView,]}>
                                    <Text style={{fontSize:15,color:'#666',marginRight:4}}>{title2}</Text>
                                    <TouchableOpacity activeOpacity={0.8}  onPress={() => this.refs.modal2.open()}>
                                        <Image source={popupImg} style={{width:14,height:14,resizeMode:'contain'}}/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.contBottomView} numberOfLines={1}>{cont4}万元保额</Text>
                                <Modal
                                    position="center"
                                    ref="modal2"
                                    backdropColor='black'
                                    backdropOpacity={0.3}
                                    coverScreen={true}
                                    style={styles.modalView}
                                >
                                    <View>
                                        <View style={styles.modalContView}>
                                            <ScrollView>
                                                <Text style={styles.modalCont}>
                                                    {modalData2}
                                                </Text>
                                            </ScrollView>
                                        </View>
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.refs.modal2.close()}>
                                            <Text style={{color:'#FFF',fontSize:12,marginTop:12,textAlign:'center'}}>关闭</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </View>
                            :null
                    }

                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this._select()}>
                    <View style={{alignItems:'center'}}>
                        <Image source={ this.state.isSelect ?require('./images/icon-select.png'):require('./images/icon-unSelect.png') } style={{width:12,height:12,resizeMode:'contain'}}/>
                        <Text> <Text style={{color:'#f02b2b'}}> ￥{cont5}</Text> 起</Text>
                    </View>
                </TouchableOpacity>
                <Modal
                    position="center"
                    ref="modal"
                    backdropColor='black'
                    backdropOpacity={0.3}
                    coverScreen={true}
                    style={styles.modalView}
                >
                    <View>
                        <View style={styles.modalContView}>
                            <ScrollView>
                                <Text style={styles.modalCont}>
                                    {modalData}
                                </Text>
                            </ScrollView>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.refs.modal.close()}>
                            <Text style={{color:'#FFF',fontSize:12,marginTop:12,textAlign:'center'}}>关闭</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:height,
        backgroundColor: '#FFF',
    },
    listView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:5,
        marginHorizontal:15,
        marginTop:15,
        paddingVertical:10,
        paddingHorizontal:6
    },
    contView:{
        flex:1,
        justifyContent:'flex-start',
        marginLeft:10,
        marginRight:20,
    },
    contTopView:{
        flexDirection:'row',
        alignItems:'center',
    },
    contBottomView:{
        flexDirection:'row',
        alignItems:'center',
        fontSize:12,
        color:'#999'
    },

    //弹窗
    modalView: {
        flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.3)'
    },
    modalContView:{
        backgroundColor:'#FFF',
        borderRadius:5,
        height:200,
        width:200,
    },
    modalCont:{
        paddingHorizontal:8,
        paddingVertical:15,
        fontSize:12,
        lineHeight:20,
    }
});
