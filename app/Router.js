import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';
import CustomNavBar from './components/customNav'
import Home from './modules/home/views';
import AddProject from './modules/addProject/views';
import SelectTemplate from './modules/addProject/views/selectTemplate';
import Edit from './modules/edit/views';
import EditHTML from './modules/edit/views/editHTML';
import EditJS from './modules/edit/views/editJS';
import EditCSS from './modules/edit/views/editCSS';
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
          <Scene key="edit" component={Edit} title="编辑" navBar={CustomNavBar} />
          <Tabs
            key="tabbar"
            routeName="tabbar"
            legacy
            backToInitial
            onTabOnPress={() => {
              console.log('Back to initial and also print this');
            }}
            swipeEnabled
            showLabel={true}
            hideTabBar
            navBar={CustomNavBar}
            tabBarStyle={{}}
            activeBackgroundColor="white"
            inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
          >
            <Scene key="editJS" hideNavBar component={EditJS} title="js" />
            <Scene key="editHTML" hideNavBar component={EditHTML} title="html" />
            <Scene key="editCSS" hideNavBar component={EditCSS} title="css" />
            {/*<Stack*/}
              {/*key="tab_1"*/}
              {/*title="Tab #1"*/}
              {/*hideNavBar*/}
            {/*>*/}
              {/*<Scene key="editJS" component={EditJS} title="js" />*/}
            {/*</Stack>*/}
            {/*<Stack*/}
              {/*key="tab_2"*/}
              {/*title="Tab #2"*/}
              {/*hideNavBar*/}
            {/*>*/}
              {/*<Scene key="editHTML" component={EditHTML} title="html" />*/}
            {/*</Stack>*/}
            {/*<Stack*/}
              {/*key="tab_3"*/}
              {/*title="Tab #3"*/}
              {/*hideNavBar*/}
            {/*>*/}
              {/*<Scene key="editCSS" component={EditCSS} title="css" />*/}
            {/*</Stack>*/}
          </Tabs>
        </stack>
        <Scene key="ToastView" component={ToastView} title="ToastView" navBar={CustomNavBar} />
        <Scene key="DialogsView" component={DialogsView} title="DialogsView" navBar={CustomNavBar} />
      </Modal>

    </Overlay>
  </Router>
);

export default Example;
