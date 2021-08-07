import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput,} from 'react-native';
import { Card, Content, Container, Text, Form, View, Textarea, Picker, Col, Icon, Input, Header, Footer} from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import { CommonActions } from '@react-navigation/native';
import axios from "axios";

const AddContact = ({ navigation }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [photo, setPhoto] = useState("N/A");
    const [filePath, setFilePath] = useState({});

    const postContact = () => {

    axios({
        method: 'post',
        url: 'https://simple-contact-crud.herokuapp.com/contact',
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
        setFirstName("");
        setLastName("");
        setAge("");
        setPhoto(null)
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                { name: 'ListContact' },
                ],
            })
            );
          alert('Contact Added !!')
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
            setPhoto(response.path);
          })
          .catch(err => {
            // alert('errfoto');
          });
      };
      
    const renderFileUri = (fileUri) => {
        if ( fileUri === "N/A") {
          return <Text> Not Found </Text>
        } 
        else {
            return <Image
            style={{width: RFPercentage(30), height: RFPercentage(30)}}
            source={{uri: photo}}
          />
        }
    }
    

  return (
    
    <Container style={styles.container}>
        <Content scrollEnabled ={false} 
                contentContainerStyle = {{ height:'100%', justifyContent:'center'}}>
            {/* <Col style={{flex:1, width:"100%", height:'40%', justifyContent:'center' , marginTop:'1%',    }}>
            </Col> */}
            <Col style={{flex:1, width:"100%", height:'100%', justifyContent:'center'   }}>

                <View style={{ alignItems:'center', }}>
                    <View style={styles.formInput}>
                        <TextInput  style={styles.UserTextInput}
                                    placeholder="First Name"
                                    placeholderTextColor = "#000000"
                                    selectionColor="#000000"
                                    spellCheck={false}
                                    autoCorrect={false}
                                    value={firstName}
                                    onChangeText={(value)=>setFirstName(value)}
                                    />
                    </View>
                    <View style={styles.formInput}>
                        <TextInput  style={styles.UserTextInput}
                                    placeholder="Last Name"
                                    placeholderTextColor = "#000000"
                                    selectionColor="#000000"
                                    spellCheck={false}
                                    autoCorrect={false}
                                    value={lastName}
                                    onChangeText={(value)=>setLastName(value)}
                                    />
                    </View>
                    <View style={styles.formInput}>
                        <TextInput  style={styles.UserTextInput}
                                    placeholder="Age"
                                    keyboardType='number-pad'
                                    placeholderTextColor = "#000000"
                                    selectionColor="#000000"
                                    value={age}
                                    onChangeText={(value)=>setAge(value)}
                                    />
                    </View>
                    
                    <TouchableOpacity style={{ width: RFPercentage(20), height: RFPercentage(7), alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'#000000', backgroundColor:'white', borderRadius: 15, marginVertical: '3%' }} onPress={openGallery}>
                        <Text style={styles.AddPhotoText}>
                            Add Photo
                        </Text>   
                    </TouchableOpacity>

                            <View>
                                {renderFileUri (photo)}
                            </View> 
                            
                </View>
            
                <TouchableOpacity style={styles.button} onPress={postContact}>
                    <LinearGradient useAngle={true}
                                    angle={100}
                                    colors={['#20a4dc', 'skyblue']}
                                    locations={[0,1]}
                                    start={{x: 1, y: 0}} end={{x: 1, y: 0}}
                                    style={styles.button}>    
                        
                        <View>
                            <Text style={styles.buttonText}>Add Contact</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </Col>
        </Content>
    </Container>

  );
}



const styles = StyleSheet.create({

    container: {
        flex: 0,
        flexDirection:'column',
        height:'100%',
        backgroundColor: '#DCECF6',
    },

    backgroundImage: {
        flex: 0,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
        
    logoStyle: {
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: RFPercentage(40),
        height: RFPercentage(11),
        marginVertical:'10%',
        },
        
    WelcomeText: {
        fontFamily: 'Avenir Next',
        fontWeight:'500',
        fontSize: RFValue(40, 680),
        display:'flex',
        color: 'white',
        textAlign: 'center',
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
        marginLeft:'5%'
        // opacity:0.8
    },

    AddPhotoText: {
        width: RFPercentage(38),
        fontFamily: 'Avenir Next',
        fontSize: RFValue(16, 680),
        color: 'black',
        textAlign:'center',
        justifyContent:'center',
    },

    photoStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    margin: 5,
    resizeMode: 'cover',
    backgroundColor:'red'
    },


    button: {
        width: RFPercentage(42),
        height: RFPercentage(7),
        backgroundColor: 'transparent',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'grey',
        alignSelf:'center',
        borderRadius: 15,
        marginVertical: '10%',
    },

    buttonText: {
        fontFamily: 'Avenir Next',
        fontSize: RFValue(16, 680),
        color: 'white',
    },
});
export default AddContact;