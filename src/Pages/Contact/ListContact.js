import React, {Component, useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { Container, Content, Grid, Col, Card} from 'native-base';
import {RFValue, RFPercentage } from "react-native-responsive-fontsize";
import  Modal,{ ModalContent,  ScaleAnimation, ModalFooter, ModalButton, ModalTitle, SlideAnimation } from 'react-native-modals';
import { useDispatch, useSelector } from 'react-redux';
import { AddContact, search, dropDown, person }  from '../../Assets/Images/index';
import {setSearchName, setModalVisible, setNameAZ, setNameZA, setSortYoung, setSortOld, getContactList} from '../../redux';

const ListContact = ({navigation}) => {

  const {Contact, searchName, isLoading, modalVisible, namaAZ, namaZA, sortYoung, sortOld} = useSelector(state => state.listContactReducer)
  const dispatch = useDispatch();
  
  
  const handleChange = (e) => {
    dispatch(setSearchName(e))
    };

  const cekAZ = () => {
    return namaAZ ?  (
      <View style={[styles.radioButtonInner]} />
    ) : null
  };
  const cekZA = () => {
    return namaZA ?  (
      <View style={[styles.radioButtonInner]} />
    ) : null
  };
  const cekYoungest = () => {
    return sortYoung ?  (
      <View style={[styles.radioButtonInner]} />
    ) : null
  };
  const cekOldest = () => {
    return sortOld ?  (
      <View style={[styles.radioButtonInner]} />
    ) : null
  };

  const sortAZ = () => {
    Contact.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1)
    dispatch(setModalVisible(false))
    dispatch((setNameAZ(true)))
    dispatch((setNameZA(false)))
    dispatch((setSortYoung(false)))
    dispatch((setSortOld(false)))
  };
  const sortZA = () => {
    Contact.sort((a, b) => (b.firstName > a.firstName) ? 1 : -1)
    dispatch(setModalVisible(false))
    dispatch((setNameAZ(false)))
    dispatch((setNameZA(true)))
    dispatch((setSortYoung(false)))
    dispatch((setSortOld(false)))
  };
  const sortTermuda = () => {
    Contact.sort((a, b) => (a.age > b.age) ? 1 : -1)
    dispatch(setModalVisible(false))
    dispatch((setNameAZ(false)))
    dispatch((setNameZA(false)))
    dispatch((setSortYoung(true)))
    dispatch((setSortOld(false)))
  };
  const sortTertua = () => {
    Contact.sort((a, b) => (b.age > a.age) ? 1 : -1)
    dispatch(setModalVisible(false))
    dispatch((setNameAZ(false)))
    dispatch((setNameZA(false)))
    dispatch((setSortYoung(false)))
    dispatch((setSortOld(true)))
  };

  useEffect(() => {
    dispatch(getContactList())
  },[dispatch]);

    return (
      <SafeAreaView style={styles.container}>
          <Content style={styles.Box} >
            <Col style={{ marginVertical:'5%', alignItems:'center',}}>
                <View style={styles.SearchBar}>
                  <Image source={search} style={{alignItems: 'center',
                                                  justifyContent: 'center',
                                                  width: RFPercentage(3),
                                                  height: RFPercentage(3)}}/>
                    <TextInput
                        style={{ width:'80%', marginLeft:10 }}
                        placeholder="Search Contact"
                        placeholderTextColor="#B5B5B5"
                        fontFamily="Avenir Next"
                        fontSize={16}
                        fontWeight={'500'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={handleChange}
                    />
                </View>
            </Col> 

            <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth:1, borderColor:'#C5C5C5' }}>
                  <View style={{ borderRadius:8, alignItems:'center', justifyContent:'center'  }}>
                      <Text style={styles.SortingText}> 
                        CONTACT {Object.keys(Contact).length}
                      </Text>
                  </View>
                  <TouchableOpacity style={{  flexDirection:'row', justifyContent:'flex-end', borderRadius:5,   }} 
                                      onPress={() =>  dispatch(setModalVisible(true)) }>
                          <Text style={styles.SortingText}> 
                            SORT
                          </Text>
                          <Image source={dropDown} style={{alignItems: 'center',
                                                  justifyContent: 'center',
                                                  width: RFPercentage(3),
                                                  height: RFPercentage(4)}}/>                   
                  </TouchableOpacity>
            </View>
            { isLoading ? 
              <View style={styles.indicator}>
                <ActivityIndicator size="large" color='black'/>
              </View>
              :
                Contact.filter (value => {
                  if (searchName === "") {
                    return value
                  } 
                  else if (value.firstName.toString().toLowerCase().includes(searchName)){
                    return value
                  }
                  else if (value.lastName.toString().toLowerCase().includes(searchName)){
                    return value
                  }
                  else if (value.age.toString().includes(searchName)){
                    return value
                  }
                }).map((value) => (
                  <View key={value.id} style={{ borderBottomWidth:1, borderColor:'#C5C5C5'}}>
                      <TouchableOpacity style={{ marginVertical: 14 }}  key={value.id} onPress={() => navigation.navigate('ContactDetails', {id: value.id,})}>
                        
                            <Col style={{ flex:3.5, flexDirection:'row'}}>
                                <Col style={{ flex:0.5, alignSelf:'center', marginLeft: 10}}> 
                                  <Image source={value.photo !== "N/A" ? { uri: value.photo } : person } style={{ alignItems: 'center',
                                                          justifyContent: 'center',
                                                          width: RFPercentage(5),
                                                          height: RFPercentage(5)}} />
                                </Col>
                                <Col style={{flex:5, justifyContent:'center', marginLeft:'5%', }}>  

                                    <Text style={styles.ListText}> Name : {value.firstName} {value.lastName} </Text>
                                    <Text style={styles.ListText}> Age    : {value.age} </Text>

                                </Col>
                            </Col>
                        
                      </TouchableOpacity>
                  </View>
                ))
            }
            <Modal visible={ modalVisible }
                      onTouchOutside={() =>  dispatch(setModalVisible(false))} 
                      swipeDirection={['up', 'down']} 
                      swipeThreshold={200} 
                      onSwipeOut={() =>  dispatch(setModalVisible(false)) }
                      modalAnimation={new SlideAnimation({slideFrom: 'bottom', initialValue: 0, useNativeDriver: (true) })}
                      >
                <ModalContent style={{ backgroundColor: 'white' }} >

                    <Col style={{width:RFPercentage(35), height:RFPercentage(30), justifyContent:'center'}}>
                      <TouchableOpacity style={styles.mainContainer} onPress={ (sortAZ)}>
                        <View style={[styles.radioButtonIcon]}>
                          {cekAZ()}
                        </View>
                        <View style={[styles.radioButtonTextContainer]}>
                          <Text style={styles.SortText}>Name A - Z</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.mainContainer} onPress={ (sortZA)}>
                        <View style={[styles.radioButtonIcon]}>
                          {cekZA()}
                        </View>
                        <View style={[styles.radioButtonTextContainer]}>
                          <Text style={styles.SortText}>Name Z - A</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.mainContainer} onPress={ (sortTermuda)}>
                        <View style={[styles.radioButtonIcon]}>
                          {cekYoungest()}
                        </View>
                        <View style={[styles.radioButtonTextContainer]}>
                          <Text style={styles.SortText}>Youngest</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.mainContainer} onPress={ (sortTertua)}>
                        <View style={[styles.radioButtonIcon]}>
                          {cekOldest()}
                        </View>
                        <View style={[styles.radioButtonTextContainer]}>
                          <Text style={styles.SortText}>Oldest</Text>
                        </View>
                      </TouchableOpacity>
                    </Col>       
                </ModalContent>
            </Modal> 
          </Content>

          <TouchableOpacity style={styles.AddContact} onPress={()=>navigation.navigate('AddContact')} >
              <Image source={AddContact} style={{ alignItems: 'center',
                                                justifyContent: 'center',
                                                width: RFPercentage(4),
                                                height: RFPercentage(4)}} />
                  <Text style={styles.AddContactText}>
                    Add Contact
                  </Text>                             
          </TouchableOpacity>  
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent:'center',
    },

  Box: {
    width: '100%',
    height: '100%',
    padding: 5,
  },

  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },

  SearchBar: {
    width: '100%',
    height:RFPercentage(5.5),
    alignSelf:'center',
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center', 
    borderRadius: 8,
    borderWidth:1,
    borderColor:'#C5C5C5',
    backgroundColor: "white",
    flexDirection: "row",
  },

  ListText:{
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    fontSize: RFValue(14, 680),
    color:'black',
    justifyContent:'center'
  },

  SortingText:{
    fontFamily: 'Avenir Next',
    fontSize: RFValue(12, 680),
    color:'black',
    alignSelf:'center',
    paddingLeft:8
  },

  AddContact: {
    width: "90%",
    height: RFPercentage(6),
    backgroundColor: '#B4D3B2',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    borderRadius: 50,
    marginVertical: '5%',
},

AddContactText:{
  fontFamily: 'Avenir Next',
  fontWeight: '500',
  fontSize: RFValue(14, 680),
  color:'black',
  justifyContent:'center',
  marginLeft:5
},

mainContainer: {
  height: RFPercentage(6),
  width: '100%',
  justifyContent: "flex-start",
  flexDirection: "row",
  alignItems: "center",
  marginVertical:'3%',
},
radioButtonIcon: {
  backgroundColor: "white",
  borderWidth: 3,
  borderColor: '#AFB2B5',
  height: RFPercentage(4),
  width: RFPercentage(4),
  borderRadius: 20,
  marginRight: '5%',
  alignItems: "center",
  justifyContent: "center",
},
radioButtonInner: {
  height: RFPercentage(2.5),
  width: RFPercentage(2.5),
  backgroundColor:'#AFB2B5',
  borderRadius: 10,
  borderWidth: 3,
  borderColor: "white",
},

});

export default ListContact;