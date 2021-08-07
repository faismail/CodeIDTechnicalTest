import React, {Component, useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, } from 'react-native';
import { Container, Content, Grid, Col, Card, Icon, Input} from 'native-base';
import {RFValue, RFPercentage } from "react-native-responsive-fontsize";
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import { CommonActions } from '@react-navigation/native';
import axios from "axios";

const ContactDetails = ({route, navigation: { goBack  }, navigation}) => {

    const [contactdetails, setContactDetails] = useState([]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [photo, setPhoto] = useState(null);
    
 
    const getContactDetails = () => {
      axios({
        method: 'get',
        url: `https://simple-contact-crud.herokuapp.com/contact/${route.params.id}`,
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
      })
      .then(res => {
        setContactDetails(res.data.data);
        setFirstName(res.data.data.firstName);
        setLastName(res.data.data.lastName);
        setAge(res.data.data.age);
        setPhoto(res.data.data.photo);
      })
      .catch((error) => {
        // console.error(error);
      });
    };

    const DeleteContact = () => {
      axios({
          method: 'delete',
          url: `https://simple-contact-crud.herokuapp.com/contact/${route.params.id}`,
          headers:{
              Accept:'application/json',
              'Content-Type':'application/json',
          },
      })
      .then(res => {
        navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [
              { name: 'ListContact' },
              ],
          })
          );
        alert('Contact Deleted !!')
      })
      .catch(function(error) {
          // console.log(error)
          if ( error.response.status == 400 ) {
              alert(error.response.data.message)
          }
          else {
              alert("Something Wrong")
          }
      });
      };

    const updateContact = () => {
    axios({
        method: 'put',
        url: `https://simple-contact-crud.herokuapp.com/contact/${route.params.id}`,
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
        },
        data: {
            firstName: firstName,
            lastName: lastName,
            age: age,
            photo: photo
        }
    })
    .then(res => {
        // console.log(res.data.message)
        navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [
              { name: 'ListContact' },
              ],
          })
          );
        alert('Contact Updated !!')
    })
    .catch(function(error) {
        console.log(error)
        if ( error.response.status == 400 ) {
            alert(error.response.data.message)
        }
        else {
            alert("Something Wrong")
        }
    });
    }

    const openGallery = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
      })
        .then(response => {
          // console.log(response.sourceURL);
          setPhoto(response.path);
        })
        .catch(err => {
          // alert('errfoto');
        });
    };

    
    useEffect(() => {
      getContactDetails();
    },[]);
  
  return contactdetails.id ? (
    <View style={styles.container}>
        <Col style={styles.Box} >
            <LinearGradient useAngle={true}
                            angle={200}
                            colors={['#20a4dc', 'skyblue']}
                            locations={[0,1]}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            style={styles.CardDetail}>

                          <View style={{marginLeft:'3%', height:'15%', flexDirection:'row',  alignItems:'center',     }}>

                            <Text style={styles.TitleText}> Contact Details </Text>

                            <TouchableOpacity key={contactdetails.id} style={{ alignItems:'center'}} onPress={ updateContact }>
                              <Icon type='FontAwesome5' name="edit" style={{fontSize:RFValue(22, 680), alignSelf:'center', color:'white' }}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignItems:'center', justifyContent:'center', marginHorizontal:'5%', }} onPress={DeleteContact}>
                              <Icon type='FontAwesome5' name="trash" style={{fontSize:RFValue(22, 680), alignSelf:'center', color:'black', }}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flex:1, alignItems:'center'}} onPress={() => goBack()}>
                                <Text style={styles.CloseText}>
                                  Go Back
                                </Text>
                            </TouchableOpacity>
                          </View>

                          <View style={{ alignSelf:'center', }}>
                            
                                <Text style={styles.ListText}>ID: {contactdetails.id} </Text>
                                <Text style={styles.ListText}> First Name :  </Text>
                                <View style={styles.formInput}>
                                  <TextInput  style={styles.UserTextInput}
                                              placeholder="Change Your First Name"
                                              placeholderTextColor = "#000000"
                                              selectionColor="#000000"
                                              spellCheck={false}
                                              autoCorrect={false}
                                              value={firstName}
                                              onChangeText={(value)=>setFirstName(value)}
                                              />
                                </View>
                                <Text style={styles.ListText}> Last Name : </Text>
                                <View style={styles.formInput}>
                                  <TextInput  style={styles.UserTextInput}
                                              placeholder="Change Your Last Name"
                                              placeholderTextColor = "#000000"
                                              selectionColor="#000000"
                                              spellCheck={false}
                                              autoCorrect={false}
                                              value={lastName}
                                              onChangeText={(value)=>setLastName(value)}
                                              />
                                </View>
                                <Text style={styles.ListText}> Age : </Text>
                                <View style={styles.formInput}>
                                  <Input  style={styles.UserTextInput}
                                              placeholder="Change Your Age"
                                              keyboardType='number-pad'
                                              placeholderTextColor = "#000000"
                                              selectionColor="#000000"
                                              value={String(age)}
                                              onChangeText={(text)=>setAge(text)}
                                              >
                                  </Input>
                                </View>
                                <View style={styles.formInput}>
                                  <TextInput  style={styles.UserTextInput}
                                              placeholder="Change Your Photo"
                                              placeholderTextColor = "#000000"
                                              selectionColor="#000000"
                                              spellCheck={false}
                                              autoCorrect={false}
                                              value={photo}
                                              onChangeText={(value)=>setPhoto(value)}
                                              />
                                  <TouchableOpacity onPress={openGallery}>
                                    <Icon type='FontAwesome5' name="camera" style={{fontSize:RFValue(25, 680),  color:'#000000',  }}/>
                                  </TouchableOpacity>
                                </View>
                                <Image
                                    source={{ uri: `${contactdetails.photo}` }}
                                    style={{width: RFPercentage(15),height: RFPercentage(15), alignSelf:'center', marginTop:'2%' , resizeMode: 'cover',}}
                                />
                          </View>
            </LinearGradient>
        </Col>          
    </View>
    
) : (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="#20a4dc"  />
    </View>
  );
};

const styles = StyleSheet.create({

container: {
  flex: 1,
  padding: 5,
  backgroundColor: '#DCECF6',
  },

Box: {
  width: '100%',
  height: '100%',
  padding: 5,
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
  height: RFPercentage(7),
  alignItems:'center',
  flexDirection:'row',
  borderWidth:1,
  borderColor:'#000000',
  backgroundColor:'white',
  // opacity:0.5,
  borderRadius: 15,
  marginVertical: '3%',
},

UserTextInput: {
  width: RFPercentage(38),
  fontFamily: 'Avenir Next',
  fontSize: RFValue(16, 680),
  color: 'black',
  marginLeft:'3%'
  // opacity:0.8
},

TitleText:{
  fontFamily: 'Avenir Next',
  fontWeight:'bold',
  flex:3,
  fontSize: RFValue(20,680),
  color:'black',
},

ListText:{
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    fontSize: RFValue(16, 680),
    textAlign:'left',
    color:'black',
    marginLeft:'2.5%',
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
  backgroundColor: '#DCECF6',
  alignItems: 'center',
  justifyContent: 'center',
},
});

export default ContactDetails;