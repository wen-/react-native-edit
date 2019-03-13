import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';
import CustomNavBar from './components/customNav'
import Home from './modules/home/views';
import AddProject from './modules/addProject/views';
import SelectTemplate from './modules/addProject/views/selectTemplate';
import ToastView from 'components/base/toastView';
import DialogsView from 'components/base/dialogsView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
  navigationBar:{
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    elevation: 0,
    height: 44,
  },
  navigationBarTitle:{
    fontSize: 18,
    fontWeight: 'normal',
    color: '#222',
    textAlign: 'center',
    alignSelf: 'center',
    flex:1
  }
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    //console.log('reducer: ACTION:', action);
    return defaultReducer(state, action);
  };
};

const stateHandler = (prevState, newState, action) => {
  //console.log('onStateChange: ACTION:', action);
};

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF',
  shadowOpacity: 1,
  shadowRadius: 3,
});

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forHorizontal,
});

const Example = () => (
  <Router createReducer={reducerCreate} onStateChange={stateHandler} getSceneStyle={getSceneStyle} uriPrefix={prefix}>
    <Overlay key="overlay">
      <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
        <stack key="root" transitionConfig={transitionConfig}>
          <Scene key="home" component={Home} title="项目" navBar={CustomNavBar} initial />
          <Scene key="addProject" component={AddProject} title="新项目" navBar={CustomNavBar} />
          <Scene key="selectTemplate" component={SelectTemplate} title="选择模版" navBar={CustomNavBar} />
        </stack>
        <Scene key="ToastView" component={ToastView} title="ToastView" navBar={CustomNavBar} />
        <Scene key="DialogsView" component={DialogsView} title="DialogsView" navBar={CustomNavBar} />
      </Modal>

    </Overlay>
  </Router>
);

export default Example;
