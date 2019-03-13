import {
  fetchOrderDetail
} from '../api/index';

export default {
  namespace: 'home',
  state: {
    dataSource: [],
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
