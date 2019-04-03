import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, DeviceEventEmitter, NativeEventEmitter} from 'react-native'
import React from 'react'
import { Actions as Router } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Entypo';
const h = (Platform.OS === 'ios') ? 64 : 44;
const pt = (Platform.OS === 'ios') ? 20 : 0;
const styles = StyleSheet.create({
    container: {
        height: h,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: pt
    },
    navBarLeftItem: {
        position:"absolute",
        zIndex:10,
        left:0,
        top:0,
        width:50,
        height:h,
        paddingLeft:10,
        paddingTop: pt,
        justifyContent: 'center'
    },
    navBarTitleItem:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        paddingLeft:50,
        paddingRight:50,
    },
    navBarRightItem:{
        position:"absolute",
        zIndex:10,
        right:0,
        top:0,
        width:50,
        height:h,
        paddingTop: pt,
        justifyContent:'center'
    },
    navTitle:{
        color:"#fff",
        fontSize:16,
    },
    flexCenter:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowCenter:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    navBarEditItem:{
        height: 30,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#fff'
    }
});

export default class CustomNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            透明度: 0,
            currentScene: props.routeName || props.initialRouteName,
            currentEdit: 'js'
        }
    }

    componentWillMount(){
        this.订阅改变导航透明度 = DeviceEventEmitter.addListener('改变导航透明度', (params) => {
            // this.setState({
            //     透明度:params.透明度
            // });

          //两种方式改变导航背景色。
          let _rgba = 'rgba(255,255,255,'+params.透明度+')';
          this.navBar.setNativeProps({
            backgroundColor: _rgba
          });
        });
        this.订阅编辑切换 = DeviceEventEmitter.addListener('编辑',(params) => {
            this.setState({
                currentEdit: params
            });
        })
    }

    componentWillUnmount() {
        if(this.订阅改变导航透明度) {
            this.订阅改变导航透明度.remove();
        }
        if(this.订阅编辑切换) {
            this.订阅编辑切换.remove();
        }
    }

    _renderLeft() {
        if (['home'].includes(this.state.currentScene)) {
            return null;
        } else {
            return (
                <TouchableOpacity
                    onPress={()=>{
                        Router.pop()
                    }}
                    style={[styles.navBarLeftItem]}>
                    <Icon name={"chevron-small-left"} size={20} color={'#fff'} />
                </TouchableOpacity>
            )
        }
    }

    _renderMiddle() {
        if (this.state.currentScene === 'tabbar') {
            return (
                <View style={[styles.navBarTitleItem, styles.rowCenter]}>
                    <TouchableOpacity
                        onPress={()=>{
                            Router.jump('editJS');
                        }}
                        activeOpacity={0.8}
                        style={[
                            styles.navBarEditItem,
                            {
                                borderLeftWidth: 1,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: '#fff',
                                borderTopLeftRadius: 4,
                                borderBottomLeftRadius: 4,
                            },
                            this.state.currentEdit=='js'&&{backgroundColor: '#fff'}
                        ]}
                    >
                        <Text style={[styles.navTitle, this.state.currentEdit=='js'&&{color: '#6cc2ff'}]}>js</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            Router.jump('editHTML');
                        }}
                        activeOpacity={0.8}
                        style={[styles.navBarEditItem,{borderWidth: 1, borderColor: '#fff'},this.state.currentEdit=='html'&&{backgroundColor: '#fff'}]}
                    >
                        <Text style={[styles.navTitle, this.state.currentEdit=='html'&&{color: '#6cc2ff'}]}>html</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            Router.jump('editCSS');
                        }}
                        activeOpacity={0.8}
                        style={[
                            styles.navBarEditItem,
                            {
                                borderRightWidth: 1,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: '#fff',
                                borderTopRightRadius: 4,
                                borderBottomRightRadius: 4
                            },
                            this.state.currentEdit=='css'&&{backgroundColor: '#fff'}
                        ]}
                    >
                        <Text style={[styles.navTitle, this.state.currentEdit=='css'&&{color: '#6cc2ff'}]}>css</Text>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return (
                <View style={styles.navBarTitleItem}>
                    <Text style={styles.navTitle}>{ this.props.title }</Text>
                </View>
            )
        }

    }

    _renderRight() {
        if (this.state.currentScene === 'home') {
            return (
              <View style={[styles.navBarRightItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                <TouchableOpacity
                  onPress={() => {
                    Router.addProject();
                  }}
                  style={{ paddingRight: 10,justifyContent: 'center' }}>
                  <Icon name={"plus"} size={20} color={'#fff'} />
                </TouchableOpacity>
              </View>
            )
        } else if (this.state.currentScene === 'addProject') {
            return (
              <View style={[styles.navBarRightItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                <TouchableOpacity
                  onPress={() => {
                    DeviceEventEmitter.emit('保存新增项目');
                  }}
                  style={{ paddingRight: 10,justifyContent: 'center' }}>
                  <Icon name={"save"} size={20} color={'#fff'} />
                </TouchableOpacity>
              </View>
            )
        } else if (this.state.currentScene === 'tabbar') {
            return (
                <View style={[styles.navBarRightItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                    <TouchableOpacity
                        onPress={() => {
                            DeviceEventEmitter.emit('运行');
                        }}
                        style={{ paddingRight: 10,justifyContent: 'center' }}>
                        <Icon name={"triangle-right"} size={20} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return null;
        }
    }

    render() {
        let dinamicStyle = {};
        if (this.state.currentScene === '我的') {
            let _rgba = 'rgba(108,194,255,'+this.state.透明度+')';
            dinamicStyle = {position:"absolute", width:"100%",top:0, backgroundColor: _rgba}
            if(this.state.透明度 > 0.5){
                dinamicStyle.borderBottomWidth = StyleSheet.hairlineWidth;
                dinamicStyle.borderBottomColor = "#6cc2ff";
                //dinamicStyle.shadowOffset = {width:0,height:1};
                //dinamicStyle.shadowColor = "#ddd";
                //dinamicStyle.shadowOpacity = .5;
            }else{
                dinamicStyle.borderBottomWidth = StyleSheet.hairlineWidth;
                dinamicStyle.borderBottomColor = "transparent";
                //dinamicStyle.shadowOffset = {width:0,height:1};
                //dinamicStyle.shadowColor = "#ddd";
                //dinamicStyle.shadowOpacity = .5;
            }
        } else {
            dinamicStyle.backgroundColor = '#6cc2ff';
            dinamicStyle.borderBottomWidth = StyleSheet.hairlineWidth;
            dinamicStyle.borderBottomColor = "#6cc2ff";
            //dinamicStyle.shadowOffset = {width:0,height:1};
            //dinamicStyle.shadowColor = "#568bb8";
            //dinamicStyle.shadowOpacity = .5;
        }

        return (
            <View style={[styles.container, dinamicStyle]} ref={(nav)=>{this.navBar = nav}}>
                { this._renderLeft() }
                { this._renderMiddle() }
                { this._renderRight() }
            </View>
        )
    }
}
