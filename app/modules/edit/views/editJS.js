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
import { Actions as Router } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';
import Spinner from 'react-native-spinkit';
import Toast from 'components/base/toast';
import Actions from '../actions/editJS';
import styles from '../style/index';

const mapStateToProps = ({ edit }) => ({ ...edit });

@connect(mapStateToProps)
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: null,
            content: null,
        };
        this.mainWebView = React.createRef();
        new Actions(this);
        InteractionManager.runAfterInteractions(async () => {
            const path = await this.getPath();
            const data = await this.getContent();
            this.setState({
                path: path,
                content: data.content,
                filePath: data.path,
            });
        });

        // if(Platform.OS == 'android'){
        //   this.webViewUri = "file://"+this.webViewUri;
        // }
        //props.dispatch({type: 'editHtml/getData'});

    }

    componentDidMount() {
        //Store.clear();
        //this.init();
        //Toast.info('测试toast提示框');
        //Toast.info({msg: '测试toast提示框', duration: 3000, onDismiss: ()=>{Toast.info('toast提示框')}});
        //Toast.loading({msg: "加载中"});
        this.订阅保存 = DeviceEventEmitter.addListener('保存js',(params) => {
            Toast.loading();
            this.mainWebView.postMessage(JSON.stringify({type: 'getData'}))
        })
    }

    componentWillUnmount() {
        if(this.订阅保存) {
            this.订阅保存.remove();
        }
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
        }else if(data.type == 'saveDate'){
          this.save(decodeURI(data.params.content));
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

    render() {

        return (
            <View style={[styles.f1,{backgroundColor: '#fff'}]}>
                <WebView
                    style={[styles.f1]}
                    ref={(w)=>{this.mainWebView=w}}
                    source={{uri: this.state.path}}
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    //有换行符或缩进符的要转码
                    injectedJavaScript={`window.templateContent={"type": "js", "content": "${encodeURI(this.state.content)}"};`}
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
