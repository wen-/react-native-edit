import { Platform } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob';
import { Actions as Router } from 'react-native-router-flux'
import BaseActions from 'tools/baseActions'
import moment from "moment/moment";
import Toast from "components/base/toast";
export default class Actions extends BaseActions{

  async init(){
    //this.props.dispatch({ type: 'testData/getOrderDetail', params: { id: 123 } });
    //const p = await RNFetchBlob.fs.asset('template/jQuery');
    //await RNFetchBlob.fs.copyDirectory(p, RNFetchBlob.fs.dirs.DocumentDir);
  }

  async save(params) {
    console.log(params);
    if(!this.state.name){
      Toast.info('请输入项目名称');
      return;
    }
    Toast.loading();
    const newProject = {
      id: Date.now(),
      name: this.state.name,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      template: this.props.template
    };
    Store.adddate('projectList', newProject);
    this.props.dispatch({type: 'home/addData', data: [newProject]});

    let path = await RNFetchBlob.fs.dirs.DocumentDir + '/template/' + newProject.id;
    // if(Platform.OS == 'android'){
    //   path = 'file://' + path;
    // }
    if(!await RNFetchBlob.fs.isDir(path)){
      await RNFetchBlob.fs.mkdir(path);
      const p = await RNFetchBlob.fs.asset('template/'+newProject.template);
      console.log(p);
      await RNFetchBlob.fs.copyDirectory(p, path);
    }
    Toast.hide();
    Router.pop();
  }

}
