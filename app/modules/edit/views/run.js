import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  WebView,
  Platform,
  Image,
  Button,
  InteractionManager,
  DeviceEventEmitter, Animated, Easing,
} from 'react-native';
import { connect } from 'dva-no-router';
import Icon from 'react-native-vector-icons/Entypo';
import Spinner from 'react-native-spinkit';
import styles from '../style/index';

export default class RunHtml extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: (Platform.OS == 'android'&&!props.path.startsWith('file'))?('file://'+props.path):props.path,
    }
    this.mainWebView = React.createRef();
  }

  componentDidMount() {
    //Store.clear();
    //this.init();
    //Toast.info('测试toast提示框');
    //Toast.info({msg: '测试toast提示框', duration: 3000, onDismiss: ()=>{Toast.info('toast提示框')}});
    //Toast.loading({msg: "加载中"});
  }

  renderLoading(){
    return(
      <View style={[styles.f1, styles.rowCenter, styles.flexCenter]}>
        <Spinner style={{margin: 10}} size={30} type={'Circle'} color={'#6cc2ff'}/>
      </View>
    )
  }

  onload(){
    //注入脚本
    //this.mainWebView.injectJavaScript(`window.templateContent1 = "abc";`);
  }

  onMessage(event){
    console.log(event.nativeEvent.data);
    let data = event.nativeEvent.data && JSON.parse(event.nativeEvent.data);
    if(data.type == 'test'){
      console.log(data);
    }
  }

  renderError(){
    return(
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {this.mainWebView.reload()}}
        style={[styles.f1, styles.rowCenter, styles.flexCenter]}
      >
        <Text>出错了，点击重试！</Text>
      </TouchableOpacity>
    )
  }

    injectedJs(){
    const template = this.props.template;
    if(template == "React"){
        return `const css = document.createElement("link");css.type="text/css";css.rel="stylesheet";css.href="template.css?"+new Date().getTime();document.head.appendChild(css);const mainjs = document.createElement("script");mainjs.type="text/babel";mainjs.src="main.js?"+new Date().getTime();document.body.appendChild(mainjs);window.templateContent={};`
      }else{
        return `const css = document.createElement("link");css.type="text/css";css.rel="stylesheet";css.href="template.css?"+new Date().getTime();document.head.appendChild(css);const mainjs = document.createElement("script");mainjs.src="main.js?"+new Date().getTime();document.body.appendChild(mainjs);window.templateContent={};`
      }
    }

  render() {

    return (
      <View style={styles.f1}>
        <WebView
          style={[styles.f1]}
          ref={(w)=>{this.mainWebView=w}}
          source={{uri: this.state.path+'?'+Date.now()}}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          //有换行符或缩进符的要转码
          injectedJavaScript={this.injectedJs()}
          //allowUniversalAccessFromFileURLs={true}
          allowFileAccess={true}
          //geolocationEnabled={true}
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={false}
          onLoad={this.onload.bind(this)}
          onMessage={this.onMessage.bind(this)}
          renderLoading={this.renderLoading}
          renderError={this.renderError}
        />
      </View>
    );
  }
}
