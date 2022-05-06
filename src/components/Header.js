import React from 'react'
import {View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
const Header = (props) => {
    return(
    <View>
    <View style={[props.style,{flexDirection:'row'}]}>
        <Icon name = {'grid'} size={28} style={{position:'absolute',left:0}} />
        <Text style={{textAlign:'center',marginHorizontal:120, color:'black',fontWeight:'bold', fontSize:18}}>Task Manager</Text>
        <Icon name = {'notifications'} size={28} />
    </View>
    <View style={{flexDirection:'row',marginTop:30, width:'100%'}}>
            <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:20}}>Welcome back!</Text>
            <Text style={{fontWeight:'bold', fontSize:24}}>Here is Update Today!</Text>
            </View>
            <Icon name={'search'} size={50} style={{marginLeft:80}}/>
        </View>
    </View>
    )
}

export default Header