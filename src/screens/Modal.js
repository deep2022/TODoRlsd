import React, {useContext, useState} from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import {Field, reduxForm, change} from 'redux-form';
import {Calendar} from 'react-native-calendars';
import {useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import {Mode} from '../components/DarkMode';
import I18n from '../components/I18n';
import { FlatList } from 'react-native-gesture-handler';

let theme;
// Modal screen to add new Task with added language property
const renderInput = ({input}) => {
  return (
    <View>
    <Text style={{fontWeight:'bold', fontSize:20}}>Text</Text>
      <TextInput
        style={
          theme === 'light' ? {width: '95%', fontWeight:'bold', fontSize:18} : {color: 'white', width: '95%'}
        }
        onChangeText={e => {
          input.onChange(e);
        }}
        onBlur={() => Keyboard.dismiss()}
      />
      <Icon
        style={{left: 330, marginTop: 12, position: 'absolute'}}
        name="list"
        size={20}
        color="black"
      />
    <View
  style={{
    borderBottomColor: 'grey',
    borderBottomWidth: 1.2,
    marginRight: 10
  }}
/>
    </View>
  );
};
const Form = props => {
  const [open, setOpen] = useState(false);
  const {handleSubmit, navigation} = props;
  const {dark} = useContext(Mode);
  theme = dark;
  const data = [{color: 'red'},{color: 'blue'},{color: 'green'},{color: 'black'},{color: 'magenta'},{color: 'purple'},{color: 'pink'},{color: 'violet'}]
  const onSubmit = values => {
    return navigation.navigate('List');
  };
  const renderDatePicker = ({
    input,
    label,
    meta: {touched, error},
    ...custom
  }) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 8,
          }}>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => setOpen(open => !open)}>
            <Text style={{fontWeight:'bold', fontSize:20}}>Deadline</Text>
            <TextInput
              style={dark === 'light' ? {color: 'black', fontSize:20, fontWeight:'bold'} : {color: 'white'}}
              editable={false}
              value={input.value.toString()}
            />
            <Icon
              style={{left: 330, marginTop: 12, position: 'absolute'}}
              name="calendar"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {open && (
          <Calendar
            {...input}
            {...custom}
            onDayPress={day => {
              setOpen(false), input.onChange(day.dateString);
            }}
            monthFormat={'MMM yyyy'}
            hideExtraDays={true}
            disableMonthChange={false}
            firstDay={1}
            hideDayNames={false}
            showWeekNumbers={true}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            disableAllTouchEventsForDisabledDays={true}
          />
        )}
        <View
  style={{
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginRight: 10
  }}
/>
      </View>
    );
  };
  const openGallery = props => {
    const {input} = props;
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      let source = '';
      if (response.error) {
      } else if (response.didCancel) {
      } else {
        // You can also display the image using data:
        source = response.assets[0];
        input.onChange(source.uri);
      }
    });
  };
  const renderImage = ({input, label, meta: {touched, error}, ...custom}) => {
    return (
      <View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          marginBottom: 8,
        }}>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => openGallery({input})}>
          <Text style={{fontWeight:'bold', fontSize:20}}>Image</Text>
          <TextInput
            style={dark === 'light' ? {color: 'black', fontSize:20, fontWeight:'bold'} : {color: 'white'}}
            editable={false}
            value={input.value.toString()}
          />
          <Icon
            style={{left: 330, marginTop: 12, position: 'absolute'}}
            name="image"
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View
  style={{
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginRight: 10
  }}
/>
      </View>
    );
  };
  const renderLocation = ({
    input,
    label,
    meta: {touched, error},
    ...custom
  }) => {
    let lat = '';
    let long = '';
    if (
      input.value.latitude === undefined &&
      input.value.longitude === undefined &&
      lat === '' &&
      long === ''
    ) {
      lat = '';
      long = '';
    } else {
      lat = input.value.latitude.toString();
      long = input.value.longitude.toString();
    }
    return (
      <View style={{flex:1}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
        </View>
        <TouchableOpacity style={{backgroundColor:'green',width:'100%', borderRadius:20, paddingVertical:15}} onPress={e =>
            Geolocation.getCurrentPosition(
              position => {
                const initialPosition = position.coords;
                input.onChange(initialPosition);
              },
              error => Alert.alert('Error', JSON.stringify(error)),
              {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
            )}>
          <View style={{flexDirection:'row', alignSelf:'center'}}>
          <Icon name={'document'} size={20} color={'white'} />
          <Text style={{color:'white', fontSize:18, fontWeight:'bold',textAlign:'center'}}>Attach File</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderColor = ({input,label,meta: {touched, error},...custom}) => {
    return (
      <View>
        <FlatList 
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item})=> (
          <TouchableOpacity style={{backgroundColor:item.color, width:30, height:30, marginBottom:30, borderRadius:20, alignItems:'center', justifyContent:'center'}} onPress={()=> input.onChange(item.color)} >
           {(item.color === input.value) && <Text style={{color:'white'}}>Hi</Text> }
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={()=> (
          <View style={{paddingHorizontal:15}}></View>
        )}
        />
        
        <View
  style={{
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginRight: 10,
    marginBottom:10
  }}
/>
      </View>
    )
  }
  return (
    <View
      style={
        dark == 'dark'
          ? [styles.root, {backgroundColor: 'black'}]
          : [styles.root, {backgroundColor: 'white'}]
      }>
      <View style={{flexDirection:'row',marginBottom:20}}>
        <Icon name = {'arrow-back'} size={32} onPress={()=> navigation.navigate('List')} />
        <Text style={{alignSelf:'center',textAlign:'center',fontWeight:'bold',color:'black', fontSize:20, marginBottom:20, marginHorizontal:115}}>Edit Task</Text>
      </View>
      <Text style = {{fontWeight:'bold',fontSize:20,marginBottom:30}}>Color Task</Text>
      {/* <View style={{flexDirection:'row',marginBottom:25}}>
      {data.map(item => <View onPress={()=> console.log('pressed')} style={{backgroundColor:item, width:25,height:25, borderRadius:20,marginHorizontal:10}} /> )}
      </View> */}
      <Field name={'Color'} component={renderColor} />
      <Field name={'Task'} component={renderInput} />
      <Field name={'Date'} component={renderDatePicker} />
      <Field name={'Image'} component={renderImage} />
      <Field name={'Location'} component={renderLocation} />
      <TouchableOpacity style = {{bottom:10,borderRadius:20,backgroundColor:'black',width:'100%'}} onPress={handleSubmit(onSubmit)}>
        <Text style={{color:'white',textAlign:'center',fontWeight:'bold',padding:10}}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  input: {
    marginBottom: 8,
    width: '100%',
    marginTop: 10,
  },
});

export default reduxForm({form: 'inputForm', destroyOnUnmount: false})(Form);
