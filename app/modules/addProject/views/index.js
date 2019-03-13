import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  DeviceEventEmitter, Animated, Easing,
} from 'react-native';
import { connect } from 'dva-no-router';
import { Actions as Router } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Entypo';
import moment from "moment";
import Toast from 'components/base/toast';
import Actions from '../actions/index';
import styles from '../style/index';

const mapStateToProps = ({ addProject }) => ({ template: addProject.template });

@connect(mapStateToProps)
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: ''
    };
    new Actions(this);
  }

  componentWillMount(){
    this.订阅保存新增项目 = DeviceEventEmitter.addListener('保存新增项目', (params) => {
      if(!this.state.name){
        Toast.info('请输入项目名称');
        return;
      }
      const newProject = {
        id: Date.now(),
        name: this.state.name,
        createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        template: this.props.template
      };
      Store.adddate('projectList', newProject);
      this.props.dispatch({type: 'home/addData', data: [newProject]});
      Router.pop();
    });
  }

  componentDidMount() {
    //this.init();
  }

  componentWillUnmount() {
    if(this.订阅保存新增项目) {
      this.订阅保存新增项目.remove();
    }
  }

  renderItem(item) {
    return(
      <TouchableOpacity
        key={item.id}
        activeOpacity={1}
        onPress={() => {}}
        style={[styles.itemBox]}
      >
        <View style={[styles.rowCenter, styles.item]}>
          <View style={styles.f1}>
            <Text style={[styles.fs16, styles.mainColor]}>{item.name} <Text style={[styles.fs12, styles.assistColor1]}>{item.type}</Text></Text>
            <Text style={[styles.fs12, styles.assistColor]}>{item.createTime}</Text>
          </View>
          <Icon name={"chevron-small-right"} size={20} color={'#d9d9d9'} />
        </View>

      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={[styles.f1, styles.bgColor]}>
        <Text style={[styles.fs14, styles.assistColor, styles._title]}>项目名称</Text>
        <View style={styles.item}>
          <TextInput
            style={{}}
            placeholder="请输入项目名称"
            placeholderTextColor="#d9d9d9"
            value={this.state.name}
            onChangeText={text => {
              this.setState({ name: text });
            }}
          />
        </View>

        <Text style={[styles.fs14, styles.assistColor, styles._title]}>选项</Text>
        <TouchableOpacity
          style={[styles.rowCenter, styles.item]}
          activeOpacity={1}
          onPress={() => {Router.selectTemplate({template: this.props.template})}}
        >
          <Text style={[styles.f1, styles.fs16, styles.mainColor]}>模版</Text>
          <Text style={[styles.fs12, styles.assistColor]}>{this.props.template}</Text>
          <Icon name={"chevron-small-right"} size={20} color={'#d9d9d9'} />
        </TouchableOpacity>
      </View>
    );
  }
}
