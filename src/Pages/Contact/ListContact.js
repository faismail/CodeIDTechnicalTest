import React, {Component, useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Container, Content, Grid, Col, Card, Icon,} from 'native-base';
import {RFValue, RFPercentage } from "react-native-responsive-fontsize";
import  Modal,{ ModalContent,  ScaleAnimation, ModalFooter, ModalButton, ModalTitle, SlideAnimation } from 'react-native-modals';
import axios from "axios";

const ListContact = ({navigation}) => {

  const [Contact, setContact] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [NamaAZ, setNamaAZ] = useState(false);
  const [NamaZA, setNamaZA] = useState(false);
  const [Termuda, setTermuda] = useState(false);
  const [Tertua, setTertua] = useState(false);
  
  const handleChange = (e) => {
      setSearchName(e);
    };

  const cekAZ = () => {
    return NamaAZ ?  (
      <View style={[styles.radioButtonInner]} />
    ) : null
  };
  const cekZA = () => {
    return NamaZA ?  (
      <View style={[styles.radioButtonInner]} />
    ) : null
  };
  const cekYoungest = () => {
    return Termuda ?  (
      <View style={[styles.radioButtonInner]} />
    ) : null
  };
  const cekOldest = () => {
    return Tertua ?  (
      <View style={[styles.radioButtonInner]} />
    ) : null
  };

  const sortAZ = () => {
    Contact.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1)
    setModalVisible(false)
    setNamaAZ(true), setNamaZA(false), setTermuda(false), setTertua(false)
  };
  const sortZA = () => {
    Contact.sort((a, b) => (b.firstName > a.firstName) ? 1 : -1)
    setModalVisible(false)
    setNamaAZ(false), setNamaZA(true), setTermuda(false), setTertua(false)
  };
  const sortTermuda = () => {
    Contact.sort((a, b) => (a.age > b.age) ? 1 : -1)
    setModalVisible(false)
    setNamaAZ(false), setNamaZA(false), setTermuda(true), setTertua(false)
  };
  const sortTertua = () => {
    Contact.sort((a, b) => (b.age > a.age) ? 1 : -1)
    setModalVisible(false)
    setNamaAZ(false), setNamaZA(false), setTermuda(false), setTertua(true)
  };

  const getContactList = () => {
    setIsLoading(true)
    axios({
      method: 'get',
      url: 'https://simple-contact-crud.herokuapp.com/contact',
      headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
      }
    })
    .then(res => {
      setContact(res.data.data);
      setIsLoading(false)
    })
    .catch((error) => {
      setIsLoading(false)
      console.error(error);
    });
  };

  useEffect(() => {
    getContactList()
  },[]);

    return (
      <SafeAreaView style={styles.container}>
          <Content style={styles.Box} >
            <Col style={{ marginVertical:'5%', alignItems:'center',}}>
                <View style={styles.SearchBar}>
                  <Icon type="FontAwesome" name="search" style={{justifyContent:'center', marginHorizontal:'2%',  fontSize:RFValue(25, 680),  color:'black' }}/>
                    <TextInput
                        style={{ width:'60%',  }}
                        placeholder="Search Contact"
                        placeholderTextColor="grey"
                        fontFamily="Avenir Next"
                        fontSize={16}
                        fontWeight={'500'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={handleChange}
                    />
                    <TouchableOpacity style={{ width:'20%', flexDirection:'row',  }} 
                                      onPress={() => setModalVisible (true) }>
                          <Text style={styles.SortingText}> 
                            SORTING
                          </Text>
                          <Icon type="FontAwesome" name="caret-down" style={{ marginHorizontal:'5%',  fontSize:RFValue(18, 680),  color:'orange' }}/>
                    </TouchableOpacity>
                </View>
            </Col>

            <Modal visible={ modalVisible }
                      onTouchOutside={() => setModalVisible (false) } 
                      swipeDirection={['up', 'down']} 
                      swipeThreshold={200} 
                      onSwipeOut={() => setModalVisible (false) }
                      modalAnimation={new SlideAnimation({slideFrom: 'bottom', initialValue: 0, useNativeDriver: (true) })}
                      >
                <ModalContent style={{ backgroundColor: 'white' }} >

                    <Col style={{width:RFPercentage(35), height:RFPercentage(30), justifyContent:'center'}}>
                      <TouchableOpacity style={styles.mainContainer} onPress={ (sortAZ)}>
                        <View style={[styles.radioButtonIcon]}>
                          {cekAZ()}
                        </View>
                        <View style={[styles.radioButtonTextContainer]}>
                          <Text style={styles.SortText}>Nama A - Z</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.mainContainer} onPress={ (sortZA)}>
                        <View style={[styles.radioButtonIcon]}>
                          {cekZA()}
                        </View>
                        <View style={[styles.radioButtonTextContainer]}>
                          <Text style={styles.SortText}>Nama Z - A</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.mainContainer} onPress={ (sortTermuda)}>
                        <View style={[styles.radioButtonIcon]}>
                          {cekYoungest()}
                        </View>
                        <View style={[styles.radioButtonTextContainer]}>
                          <Text style={styles.SortText}>Umur Termuda</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.mainContainer} onPress={ (sortTertua)}>
                        <View style={[styles.radioButtonIcon]}>
                          {cekOldest()}
                        </View>
                        <View style={[styles.radioButtonTextContainer]}>
                          <Text style={styles.SortText}>Umur Tertua</Text>
                        </View>
                      </TouchableOpacity>
                    </Col>       
                </ModalContent>
              </Modal>
            { 
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
                <View key={value.id} style={{ marginVertical:'1%' , }}>
                    <TouchableOpacity  key={value.id} onPress={() => navigation.navigate('ContactDetails', {id: value.id,})}>
                      <Card  style={styles.CardList}>
                          <Col style={{ flex:1, flexDirection:'row'}}>
                              <Col style={{flex:2, justifyContent:'center', marginLeft:'5%', }}>  

                                  <Text style={styles.ListText}> Name : {value.firstName} {value.lastName} </Text>
                                  <Text style={styles.ListText}> Age     : {value.age} </Text>

                              </Col>
                          </Col>
                      </Card>
                    </TouchableOpacity>
                </View>
                ))
            }
               
          </Content>

                <TouchableOpacity style={styles.AddContact} onPress={()=>navigation.navigate('AddContact')} >
                    <Icon type='FontAwesome5' name="plus" style={{fontSize:RFValue(20, 680), marginLeft:'5%', marginRight:'5%', alignSelf:'center', color:'white' }}/>
                    {/* <Text style={styles.buttonText}>
                        Tambah Kontak
                    </Text> */}
                </TouchableOpacity>  
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#DCECF6',
    alignItems:'center',
    justifyContent:'center',
    },

  Box: {
    width: '100%',
    height: '100%',
    padding: 5,
  },
  CardList: {
    width: '95%',
    height:RFPercentage(15),
    borderRadius:8, 
    flexDirection:'column',
    backgroundColor:'white',
    borderColor:'#CCCCCC',
    alignSelf:'center',
  },

  SearchBar: {
    width: '100%',
    height:RFPercentage(5.5),
    marginLeft:'2%',
    alignSelf:'center',
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center', 
    borderRadius: 8,
    backgroundColor: "white",
    flexDirection: "row",
  },

  ListText:{
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    fontSize: RFValue(18, 680),
    color:'black',
    justifyContent:'center'
  },

  AddContact: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    backgroundColor: '#E47A2E',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    borderRadius: 50,
    marginVertical: '5%',
},

buttonText: {
  fontFamily: 'Avenir Next',
  fontSize: RFValue(14, 680),
  fontWeight: '500',
  color: 'white',
  textAlign: 'center',
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
  borderColor: '#fd6542',
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
  backgroundColor:'#fd6542',
  borderRadius: 10,
  borderWidth: 3,
  borderColor: "white",
},

});

export default ListContact;