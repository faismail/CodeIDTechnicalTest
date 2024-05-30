import React, {Component, useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { Col } from 'native-base';
import {RFValue, RFPercentage } from "react-native-responsive-fontsize";
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { person }  from '../../Assets/Images/index';
import { getContactDetails, setFirstName, setLastName, setAge, setPhoto, deleteContact, setUpdateContact } from '../../redux';

const ContactDetails = ({route, navigation}) => {

    const {contactDetails, firstName, lastName, age, photo} = useSelector(state => state.contactDetailReducer)
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false)

    const handleDelete = () => {
      Alert.alert('Delete Contact', 'Are you sure want to delete this account ?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => dispatch(deleteContact((route.params.id)))},
      ]);
    }

    const updateContact = () => { 
      const { id } = route.params;
      if (isEdit == false) {
        setIsEdit(true)
      }
      else {
        if (firstName == '') {
          alert('Please input First Name.')
        } else if ( lastName == '') {
            alert('Please input Last Name.')
        } else if ( age == '') {
            alert('Please input Age.')
        }  else if (isNaN(age)) {
            alert('Age must be a numeric value.')
        } 
        dispatch(setUpdateContact( id, firstName, lastName, age, photo, navigation))
      }
    }

    const openGallery = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
      })
        .then(response => {
          // console.log(response.sourceURL);
          dispatch(setPhoto(response.path));
        })
        .catch(err => {
          // alert('errfoto');
        });
    };

    useEffect(() => {
      dispatch(getContactDetails(route.params.id));
    }, [dispatch, route.params]);
  
  return contactDetails.id ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
    >
    <View style={styles.container}>
        <Col style={styles.Box} >

          <View style={{marginLeft:10, height:'15%', flexDirection:'row',  alignItems:'center',     }}>
            <Text style={styles.TitleText}> Contact Details </Text>
          </View>

          <View style={{ alignSelf:'center', }}>
                <Text style={styles.ListText}> First Name :  </Text>
                  <TextInput  style={ isEdit ? styles.formInput : styles.TextInputDisable}
                              placeholder="Change Your First Name"
                              placeholderTextColor = "#000000"
                              selectionColor="#000000"
                              spellCheck={false}
                              autoCorrect={false}
                              value={firstName}
                              editable={isEdit}
                              onChangeText={(value)=>dispatch(setFirstName(value))}
                              />
                <Text style={styles.ListText}> Last Name : </Text>
                <TextInput  style={ isEdit ? styles.formInput : styles.TextInputDisable}
                              placeholder="Change Your Last Name"
                              placeholderTextColor = "#000000"
                              selectionColor="#000000"
                              spellCheck={false}
                              autoCorrect={false}
                              value={lastName}
                              editable={isEdit}
                              onChangeText={(value)=>dispatch(setLastName(value))}
                              />
                <Text style={styles.ListText}> Age : </Text>
                <TextInput  style={ isEdit ? styles.formInput : styles.TextInputDisable}
                              placeholder="Change Your Age"
                              keyboardType='number-pad'
                              placeholderTextColor = "#000000"
                              selectionColor="#000000"
                              value={String(age)}
                              editable={isEdit}
                              onChangeText={(value)=>dispatch(setAge(value))}
                              />
                  <TouchableOpacity style={styles.formInputPhoto}
                                    onPress={() => { isEdit == true ? openGallery() : "" }}
                                    activeOpacity={isEdit ? 0.5 : 1}
                                    pointerEvents={isEdit ? 'auto' : 'none'}
                  >
                    <Image source={ photo == "N/A" ? person : { uri: `${photo}` }} style={{ alignItems: 'center',
                                                justifyContent: 'center',
                                                width: RFPercentage(15),
                                                height: RFPercentage(15)}} />
                  </TouchableOpacity>
          </View>


          <TouchableOpacity style={styles.buttonEdit} onPress={updateContact}>
              <Text style={styles.buttonText}> {isEdit == true ? "Confirm" : "Edit Contact" }</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDelete} onPress={() => { isEdit == true ?  
                                                                          setIsEdit(false)
                                                                          :
                                                                          handleDelete();
                                                                        }}>
              <Text style={styles.buttonText}> { isEdit == true ? "Cancel" : "Delete Contact"}</Text>
          </TouchableOpacity>
            
        </Col>          
    </View>
   </KeyboardAvoidingView>
    
) : (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="#B4D3B2"  />
    </View>
  );
};

const styles = StyleSheet.create({

container: {
  flex: 1,
  padding: 5,
  backgroundColor: 'white',
  },

Box: {
  width: '100%',
  height: '100%',
  paddingTop:20,
  alignItems:'center',

},

CardDetail: {
  width: '100%',
  height: '90%',
  marginTop:'10%', 
  alignSelf:'center',
  borderRadius:8, 
  borderWidth:1,
  borderColor:'rgba(104, 148, 181, 0.5)', 
},

formInput:{
  width: RFPercentage(45),
  height: RFPercentage(6),
  alignItems:'center',
  flexDirection:'row',
  borderWidth:1,
  borderColor:'#C5C5C5',
  backgroundColor:'white',
  borderRadius: 10,
  marginVertical: 10,
  fontFamily: 'Avenir Next',
  fontSize: RFValue(12, 680),
  color: 'black',
},

formInputPhoto:{
  width: RFPercentage(45),
  height: RFPercentage(20),
  alignItems:'center',
  justifyContent: 'center',
  backgroundColor:'white',
  flexDirection:'row',
  borderWidth:1, 
  borderColor:'#C5C5C5', 
  borderStyle: 'dotted',
  borderRadius: 10,
  marginVertical: 10,
},

TextInputDisable: {
  width: RFPercentage(45),
  height: RFPercentage(6),
  alignItems:'center',
  flexDirection:'row',
  borderWidth:1,
  borderColor:'#C5C5C5',
  borderRadius: 10,
  marginVertical: 10,
  fontFamily: 'Avenir Next',
  fontSize: RFValue(12, 680),
  backgroundColor: '#eeeeee',
  color: '#a0a0a0',
},

TitleText:{
  fontFamily: 'Avenir Next',
  fontWeight:'600',
  fontSize: RFValue(20,680),
  color:'black',
},

ListText:{
    fontFamily: 'Avenir Next',
    fontSize: RFValue(14, 680),
    textAlign:'left',
    color:'black',
  },

CloseText:{
  fontFamily: 'Avenir Next',
  fontWeight: '600',
  fontSize: RFValue(15,680),
  color:'grey',
  alignSelf:'flex-end',
  marginHorizontal:'10%'
},

indicator: {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
},

buttonEdit: {
  bottom:30,
  position:'absolute',
  width: "90%",
  height: RFPercentage(5),
  backgroundColor: '#B4D3B2',
  justifyContent:'center',
  alignItems:'center',
  alignSelf:'center',
  borderRadius: 50,
  marginVertical: '20%',
},

buttonDelete: {
  bottom:1,
  position:'absolute',
  width: "90%",
  height: RFPercentage(6),
  backgroundColor: '#FAA0A0',
  justifyContent:'center',
  alignItems:'center',
  alignSelf:'center',
  borderRadius: 50,
  marginBottom:'10%'
},

buttonText: {
  fontFamily: 'Avenir Next',
  fontWeight: '500',
  fontSize: RFValue(14, 680),
  color:'black',
  justifyContent:'center'
},

});

export default ContactDetails;