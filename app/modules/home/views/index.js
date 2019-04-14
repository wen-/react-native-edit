
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  DeviceEventEmitter,
  Animated,
  Easing,
} from "react-native";
import { connect } from "dva-no-router";
import { Actions as Router } from "react-native-router-flux"
import Icon from "react-native-vector-icons/Entypo";
import { SwipeListView } from "react-native-swipe-list-view";
import templateConfig from "config/template";
import Actions from "../actions/index";
import styles from "../style/index";


const mapStateToProps = ({ home }) => ({ dataSource: home.dataSource });

@connect(mapStateToProps)
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    new Actions(this);
    this.initTemplate();
    props.dispatch({type: "home/getData"});

    this.templateData = [];
    templateConfig.forEach((v, i)=>{
      this.templateData.push({
        id: i,
        name: "基础项目",
        createTime: "2019-03-03 00:00:00",
        template: v
      });
    })
  }

  componentDidMount() {
    //Store.clear();
    //this.init();
    //Toast.info('测试toast提示框');
    //Toast.info({msg: '测试toast提示框', duration: 3000, onDismiss: ()=>{Toast.info('toast提示框')}});
    //Toast.loading({msg: "加载中"});
  }

    renderItem(item, index) {
      console.log(123);
        return(
            <TouchableOpacity
                key={item.id}
                activeOpacity={1}
                onPress={() => {
                    console.log(item);
                    this.props.dispatch({type: "edit/setData", data: item});
                    Router.editJS(item);
                }}
                style={[styles.itemBox]}
            >
                <View style={[styles.rowCenter, styles.item]}>
                    <View style={styles.f1}>
                        <Text style={[styles.fs16, styles.mainColor]}>{item.name} <Text style={[styles.fs12, styles.assistColor1]}>{item.template}</Text></Text>
                        <Text style={[styles.fs12, styles.assistColor]}>{item.createTime}</Text>
                    </View>
                    <Icon name={"chevron-small-right"} size={20} color={"#d9d9d9"} />
                </View>

            </TouchableOpacity>
        );
    }

  render() {
    let dataSource = this.props.dataSource.length ? this.templateData.concat(this.props.dataSource) : this.templateData;
      dataSource = dataSource && dataSource.reduce((a,b,i)=>{
          return [...a, {...b, key: i}]
      },[]);
    return (
        <SwipeListView
          useFlatList
          data={dataSource}
          renderItem={ (data) => this.renderItem(data.item, data.index)}
          renderHiddenItem={ (data) => (
              <View style={styles.rowBack}>
                  <TouchableOpacity
                      activeOpacity={1}
                      onPress={()=>{
                          console.log(data.item);
                          const item = data.item;
                          const newData = this.props.dataSource.filter((v)=>{
                          return v.id != item.id;
                      })
                          this.props.dispatch({type: "home/setData", data: {dataSource: newData}});
                      }

              }
                      style={[styles.delBtn]}
                  >
                      <Text style={styles.delTxt}>删除</Text>

                  </TouchableOpacity>
              </View>
          )}
          disableRightSwipe={true}
          rightOpenValue={-75}
          closeOnScroll={true}
          ItemSeparatorComponent={()=><View style={[styles.line, {marginLeft: 5}]} />}
      />
    );
  }
}
