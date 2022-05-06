import React, { useContext, useEffect } from 'react'
import { connect,useDispatch, useSelector } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { Text, TouchableOpacity, View, FlatList, Image, ActivityIndicator } from 'react-native'
import {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Button, Card} from 'react-native-paper'
import { reset } from 'redux-form'
import {useIsFocused} from '@react-navigation/native'
import SearchBar from '../components/SearchBar'
import { Mode } from '../components/DarkMode'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchDetails } from './Login/actions';
import Header from '../components/Header'
// Main UI component with flatlist added and searchbar component
// AsyncStorage functionality added for offline working of the data
let List = (props) => {
    const [items, setItem] = useState([])
    const { data,navigation } = props
    const [refresh, setRefresh] = useState(false)
    const [text, setText] = useState('')
    const [filter, setFilter] = useState([])
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const userEmail = useSelector(state => state)
    const obj1 = {
      token: userEmail.Auth.token,
      entityId: userEmail.Auth.id,
      entityType: userEmail.Auth.user
  }
    useEffect(()=> {
        async function storeToken(){
            await AsyncStorage.setItem('Token', JSON.stringify(obj1))
        }
        storeToken()

    },[userEmail.Auth.id])
    useEffect(()=> {
      async function fetch(){
      const localdata = await AsyncStorage.getItem('Item')
      if(JSON.parse(localdata) !== null){
      setItem(JSON.parse(localdata))
      setFilter(JSON.parse(localdata))
      }
      }
      fetch()
    },[])
    useEffect(()=> {
      if(isFocused){
      renderSubmittedData()
      }
    },[isFocused])
    useEffect(()=> {
      filterData();
    },[text])
    const {dark} = useContext(Mode)
    // function used to update ui with submitted data in the form
    const renderSubmittedData = async () => {
        setRefresh(true)
        const obj = {Date: data.Date, Task: data.Task, Image: data.Image, Location: data.Location, Color: data.Color}
        if(obj.Date === undefined || obj.Task === undefined || obj.Image === undefined){
            setTimeout(()=> console.log("Data fields are Empty"),2000)
            setRefresh(false)
        }
        else{
        console.log(JSON.stringify(obj))
        setItem(i => [...i,obj])
        setRefresh(false)
        dispatch(reset('inputForm'))
        setFilter(i => [...i,obj])
        await AsyncStorage.getItem('Item')
    }
    }
    const filterData = ()=> {
      let data = []
      if(text !== ''){
      data = items.filter((i)=> i.Task.toLowerCase().includes(text.toLocaleLowerCase()))
      setFilter(data)
    }
    else{
      setFilter(items)
    }
    }
    const reachedData = () => {
        {refresh ? <ActivityIndicator size="large" color={'blue'} /> : <View></View>}
    }
    return (
      <View style={dark === 'light' ? {backgroundColor: 'white',flex: 1,alignItems: 'center'} : {backgroundColor: 'black',flex: 1,alignItems: 'center'}}>
        {/* {userEmail.Auth.data.length !== 0 ?
        <Text style={dark === 'light'? {color: 'black', paddingTop: 10}: {color:'white', paddingTop: 10}}>Payment count {userEmail.Auth.data[0]} and Total amount Payment {userEmail.Auth.data[1]}</Text>
        :
        <Text style={dark === 'light'? {color: 'black', paddingTop: 10}: {color:'white', paddingTop: 10}}>No Data fetched from the server</Text>
        }
        {userEmail.Auth.loading ? <ActivityIndicator size="large" color={'blue'} /> : <Button style={{backgroundColor: 'blue' , alignSelf:'center',marginTop: '5%'}} color={'white'} onPress={()=> dispatch(fetchDetails(obj1)) }>Fetch data</Button>}
        <Button title="Video" color={'green'} onPress={()=> navigation.navigate('Video')}>Press for Video</Button>
      <Text style={dark === 'light'? {color: 'black', paddingTop: 10}: {color:'white', paddingTop: 10}}>Hi! {userEmail.Auth.id}</Text> */}
      <Header style={{marginTop: 30} }/>
      {items && (
      <FlatList 
        style = {{top: 10, padding: 5, width: '95%'}}
        data = {filter}
        renderItem = {({item})=>(
            <View style={{flex: 1, flexDirection: 'row',paddingVertical: 10, height:200}}>
                <Card style={{margin: 5, elevation: 5, width: '95%', height:180, backgroundColor:item.Color}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                <Image source={{uri: item.Image}} resizeMethod={'auto'} resizeMode={'contain'} style={{width: 100, height: 100}}/>
                <View style={{flexDirection: 'column-reverse'}}>
                <Text style={{fontWeight:'bold',marginTop: 10, marginBottom: 10}}>{item.Date}</Text>
                <Text style={{fontWeight:'bold', marginBottom: 10,marginTop: 10}}> {item.Task}</Text> 
                <Text style={{fontWeight:'bold', marginBottom: 10,marginTop: 10}}> {item.Location.latitude} , {item.Location.longitude} </Text> 
                </View>
                </View>
                </Card>
            </View>
        )}
        onRefresh={() => renderSubmittedData()}
        refreshing={refresh}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <SearchBar onSearchEnter={(t)=> setText(t)} />
        }
        ListHeaderComponentStyle={{top: 10, marginBottom: 20}}
      />
      
      )
      }
      <View style={{position: 'absolute', top: '30%', left: '1%'}}>
      </View>
      <TouchableOpacity style = {{color:'white',top: '85%',right: '5%',position: 'absolute'}} onPress={() => navigation.navigate('Modal')}><Ionicons name="add-circle-sharp" size={72} color={'blue'}/></TouchableOpacity>
      <Ionicons style={{position: 'absolute',left: '90%', alignItems: 'flex-start'}} name="settings" size={36} color={dark==='dark' ? 'white': 'black'} onPress={() => navigation.navigate('Settings')}/>
    </View>
    )
    }

const selector = formValueSelector('inputForm')

List = connect(state => {
    const data = selector(state,'Date','Task','Image','Location','Color')
    return {data}
})(List)

export default List
