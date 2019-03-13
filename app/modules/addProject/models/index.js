import Template from 'config/template';
// import {
//   fetchOrderDetail
// } from '../api/index';

export default {
  namespace: 'addProject',
  state: {
    template: Template[0],
  },
  effects: {
    //详情
    // *getOrderDetail({params}, { call, put }) {
    //   console.log(params);
    //   const result = yield call(fetchOrderDetail, params);
    //   if(result.code==200) {
    //     const data = result.data;
    //     yield put({ type: 'setOrdersDetail', data });
    //   }
    // }
  },
  reducers: {
    setData(state, { data }) {
      return { ...state, ...data }
    },
    clear() {
      return { template: Template[0] }
    },
  }
}
