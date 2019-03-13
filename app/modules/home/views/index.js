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
import Icon from 'react-native-vector-icons/Entypo';
import Actions from '../actions/index';
import styles from '../style/index';

const mapStateToProps = ({ home }) => ({ dataSource: home.dataSource });

@connect(mapStateToProps)
export default class Index extends Component {
  constructor(props) {
    super(props);
    new Actions(this);
    props.dispatch({type: 'home/getData'});
  }

  componentDidMount() {
    //Store.clear();
    //this.init();
    //Toast.info('测试toast提示框');
    //Toast.info({msg: '测试toast提示框', duration: 3000, onDismiss: ()=>{Toast.info('toast提示框')}});
    //Toast.loading({msg: "加载中"});
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
            <Text style={[styles.fs16, styles.mainColor]}>{item.name} <Text style={[styles.fs12, styles.assistColor1]}>{item.template}</Text></Text>
            <Text style={[styles.fs12, styles.assistColor]}>{item.createTime}</Text>
          </View>
          <Icon name={"chevron-small-right"} size={20} color={'#d9d9d9'} />
        </View>

      </TouchableOpacity>
    );
  }

  render() {
    const dataSource = this.props.dataSource.length ? this.props.dataSource : [
      {id: '1', name: '基础项目', createTime: Date.now(), template: 'jQuery'},
      {id: '2', name: '基础项目', createTime: Date.now(), template: 'React'},
      {id: '3', name: '基础项目', createTime: Date.now(), template: 'Vue'}
    ];
    return (
      <FlatList
        style={{backgroundColor: "#fff"}}
        data={dataSource}
        keyExtractor = {(item, index) => item.id.toString()}
        renderItem={({ item }) => this.renderItem(item)}
        ItemSeparatorComponent={()=><View style={[styles.line, {marginLeft: 5}]} />}
      />
    );
  }
}
