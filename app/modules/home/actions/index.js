
import templateConfig from "config/template";
import RNFetchBlob from "rn-fetch-blob";
import BaseActions from "tools/baseActions"

export default class Actions extends BaseActions{

  init(){
    //this.props.dispatch({ type: 'testData/getOrderDetail', params: { id: 123 } });
  }

  //拷贝基础模版
  async initTemplate(){
    let path = await RNFetchBlob.fs.dirs.DocumentDir + "/template";
    if(!await RNFetchBlob.fs.isDir(path)){
      await RNFetchBlob.fs.mkdir(path);
    }
    const p = await RNFetchBlob.fs.asset("template");
    await RNFetchBlob.fs.copyDirectory(p, path);
    // templateConfig.forEach(async (v)=>{
    //   let _path = await RNFetchBlob.fs.dirs.DocumentDir + '/template/' + v;
    //   if(!await RNFetchBlob.fs.isDir(_path)){
    //     await RNFetchBlob.fs.mkdir(_path);
    //     const _p = await RNFetchBlob.fs.asset('template/'+v);
    //     await RNFetchBlob.fs.copyDirectory(_p, _path);
    //   }
    // });
  }

}
