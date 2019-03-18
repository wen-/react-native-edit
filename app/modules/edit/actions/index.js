import {
  Platform,
} from 'react-native';
import BaseActions from 'tools/baseActions'
import RNFetchBlob from 'rn-fetch-blob';

export default class Actions extends BaseActions{

  init(){
    //this.props.dispatch({ type: 'testData/getOrderDetail', params: { id: 123 } });
  }

  async getPath(){
    let _path = await RNFetchBlob.fs.dirs.DocumentDir + '/template/monaco/monacoedit.html';
    _path = (Platform.OS == 'android')?('file://'+_path):_path;
    // this.setState({
    //   path: (Platform.OS == 'android')?('file://'+_path):_path
    // });
    console.log('_path:', _path);
    return _path;
  }

  async getContent(){
    const path = await RNFetchBlob.fs.dirs.DocumentDir + '/template/' + this.props.template + '/template.html';
    const data = await RNFetchBlob.fs.readFile(path);
    // this.mainWebView.injectJavaScript = ()=>{
    //   return(`(function(){window.templateContent = '${data}'})();`);
    // }
    // this.mainWebView.injectJavaScript = `(function(){window.templateContent = '${data}'})();`;
    // this.setState({
    //   content: data
    // })
    return data;
  }
}
