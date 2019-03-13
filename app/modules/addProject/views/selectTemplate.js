import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  DeviceEventEmitter, Animated, Easing,
} from 'react-native';
import { connect } from 'dva-no-router';
import { Actions as Router } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Entypo';
import Template from 'config/template';
import Actions from '../actions/index';
import styles from '../style/index';

const mapStateToProps = ({ testData }) => ({ testData, title: '测试页' });

@connect(mapStateToProps)
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      current: props.template,
    };
    new Actions(this);
  }

  componentDidMount() {
    this.init();
    //Toast.info('测试toast提示框');
    //Toast.info({msg: '测试toast提示框', duration: 3000, onDismiss: ()=>{Toast.info('toast提示框')}});
    //Toast.loading({msg: "加载中"});
  }

  renderItem(item) {
    return(
      <TouchableOpacity
        key={item.id}
        activeOpacity={1}
        onPress={() => {
          this.setState({current: item});
          this.props.dispatch({type: 'addProject/setData', data: {template: item}});
          Router.pop();
        }}
        style={{paddingHorizontal: 16}}
      >
        <View style={[styles.rowCenter, {height: 49}]}>
          <View style={styles.f1}>
            <Text style={[styles.fs12, styles.mainColor]}>{item}</Text>
          </View>
          {this.state.current == item && <Icon name={"check"} size={20} color={'#4289d9'} />}
        </View>

      </TouchableOpacity>
    );
  }

  render() {
    const dataSource = Template;
    return (
      <FlatList
        style={{backgroundColor: '#fff'}}
        data={dataSource}
        keyExtractor = {(item, index) => item}
        renderItem={({ item }) => this.renderItem(item)}
        ItemSeparatorComponent={()=><View style={[styles.line, {marginLeft: 5}]} />}
      />
    );
  }
}
