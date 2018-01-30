/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    NativeModules,
    ImageBackground,
    DeviceEventEmitter
} from 'react-native';
import PullList from '../pull/PullList'
let rowData = ['1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8'];
export default class App extends Component {
    static navigationOptions = ({navigation})=> ({
        header:(<View style={{ height:SCALE(80),flexDirection:'row',justifyContent:'space-between',backgroundColor: Color.C5995f5, borderWidth:0, borderBottomWidth:0,}}>
            <TouchableOpacity activeOpacity={1} onPress={()=>{
                navigation.goBack(null)
            }}>
                <View style={{paddingLeft:SCALE(30),paddingRight:SCALE(40)}}>
                    <Image
                        source={AppImages.Home.back}
                        style={{width:SCALE(20),height:SCALE(37)}}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={navigation.state.params&&navigation.state.params.ClickRefresh}>
                <Text style={{fontSize: FONT(17), color: 'white', alignSelf: 'center',marginRight:SCALE(40)}}>
                    刷新
                </Text>

            </TouchableOpacity>
        </View>),
        tabBarLabel:'第二页',
        tabBarIcon: ({ tintColor,focused }) => (
            <Image style={{width:38,height:40}}
                   source={focused?AppImages.tab.project_active:AppImages.tab.project_unactive}/>
        ),
    });

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.navigation.setParams({ClickRefresh:this.ClickRefresh})
        // this.subscription = DeviceEventEmitter.addListener('Two',this.update)
    }

    componentWillUnmount() {
        this.subscription&&this.subscription.remove();
        this.clickRefresh&& clearTimeout(this.clickRefresh);
        this.NoDatarefresh&& clearTimeout(this.NoDatarefresh);
        this.pullrefresh&&clearTimeout(this.pullrefresh);
    }

    // update =()=>{
    //     this.pullList&&this.pullList.refresh();
    // }

    onPullRelease =  (resolve) => {
        console.log('this.props.navigation.state.params&&this.props.navigation.state.params.data',this.props.navigation.state.params&&this.props.navigation.state.params.data)
        if(this.props.navigation.state.params&&this.props.navigation.state.params.data){
            this.pullrefresh = setTimeout(()=>{
                this.pullList && this.pullList.setData(["a","c","d","e","f","g","a","c","d","e","f","g","a","c","d","e","f","g","a","c","d","e","f","g"]);
                resolve&&resolve();
                this.refresh = 2;
            },2000)

        }else{
           this.NoDatarefresh = setTimeout(()=>{
                this.pullList && this.pullList.setData([]);
                resolve&&resolve();
                this.refresh = 3;
            },300)
        }

    };


    loadMore = async(page)=>{
        setTimeout(()=>{
            this.pullList && this.pullList.addData(rowData);
        },2000)
    };

    renderRowView = ({item, index, separators})=>{
        return (<View style={styles.Item}><Text>{item}</Text></View>);
    };

    ClickRefresh = ()=>{
        this.pullList&&this.pullList.refresh();
        this.pullList&&this.pullList.BeginRefresh();
        this.clickRefresh = setTimeout(()=>{
            this.pullList&&this.pullList.StopRefresh();
        },2000);
    };

    render() {
        return (
            <PullList
                style={{height:HEIGHT}}
                ref={(list)=> this.pullList = list}
                onPullRelease={this.onPullRelease}
                onEndReached={this.loadMore}
                renderItem={this.renderRowView}
                numColumns={1}
                initialNumToRender={5}
                key={'list'}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hello: {
        marginTop:20,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    Item:{
        backgroundColor:'gray',
        width:WIDTH,
        height:SCALE(100),
        margin:SCALE(10),
        justifyContent:'center',
        alignItems:'center'
    }
});
