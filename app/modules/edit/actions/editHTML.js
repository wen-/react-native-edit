import {
    DeviceEventEmitter,
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
    const path = await RNFetchBlob.fs.dirs.DocumentDir + '/template/' + this.props.id + '/template.html';
      const content = await RNFetchBlob.fs.readFile(path);
      return {path, content};
  }

    async save(data){
        if(data != this.state.content){
            const res = await RNFetchBlob.fs.writeFile(this.state.filePath, data, 'utf8');
            DeviceEventEmitter.emit('保存css');
        }else{
            DeviceEventEmitter.emit('保存css');
        }
    }
}
