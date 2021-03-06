import RNFetchBlob from 'rn-fetch-blob';
import {
  fetchOrderDetail
} from '../api/index';

console.log('RNFetchBlob.fs.dirs.DocumentDir:', RNFetchBlob.fs.dirs.DocumentDir);

export default {
  namespace: 'edit',
  state: {
    // createTime: "2019-03-17 13:52:57"
    // id: 1552830777815
    // name: "test1"
    // template: "jQuery"
  },
  effects: {
    //详情
    *getData({params}, { call, put }) {
      const result = yield call(()=>Store.get('projectList'));
      console.log(result);
      if(result){
        yield put({
          type: 'addData',
          data: result
        });
      }
    }
  },
  reducers: {
    setData(state, { data }) {
      return { ...state, ...data }
    },
    addData(state, { data }) {
      const dataSource = state.dataSource.concat(data);
      return { ...state, dataSource}
    },
    clear() {
      return { }
    },
  }
}
