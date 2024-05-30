import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput, Alert} from 'react-native';
import { Card, Content, Container, Text, Form, View, Textarea, Picker, Col, Icon, Input, Header, Footer} from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ImagePicker from 'react-native-image-crop-picker';
import { camera, person }  from '../../Assets/Images/index';
import { useDispatch, useSelector } from 'react-redux';
import { setAddContact } from '../../redux';


const AddContact = ({ navigation }) => {

    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState();
    const [photo, setPhoto] = useState(null);

    const postContact = () => {
        if (firstName == '') {
            alert('Please input First Name.')
        } else if ( lastName == '') {
            alert('Please input Last Name.')
        } else if ( age == '') {
            alert('Please input Age.')
        } else if (isNaN(age)) {
            alert('Age must be a numeric value.')
        } else {
            const finalPhoto = (photo == null || photo === '') ? 'N/A' : photo
            dispatch(setAddContact(firstName, lastName, age, finalPhoto, navigation))
        }
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
            return <Image
            style={{width: RFPercentage(15), height: RFPercentage(15)}}
            source={{uri: fileUri}}
          />
    }

  return (
    
    <Container style={styles.container}>
        <Content scrollEnabled ={false} 
                contentContainerStyle = {{ height:'100%', justifyContent:'center'}}>
            <Col style={{justifyContent:'center'}}>

                <View style={{ marginTop:20, flex:0.1, height:'10%',alignItems:'center', justifyContent:'center' }}>
                    <Text style={styles.AddContactText}>
                            Add New Contact
                    </Text>   
                </View>

                <View style={{ marginTop:10, flex:2, alignItems:'center'}}>
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
                                    value={(age)}
                                    onChangeText={(value)=>setAge(value)}
                                    />
                    </View>
                    
                    <TouchableOpacity   style={styles.formInputPhoto}
                                        onPress={openGallery}>
                           
                        { photo == null ? 
                            
                            <View style={{flexDirection:'row', alignItems:'center' }}>
                                <Image source={camera} style={{width: RFPercentage(4),height: RFPercentage(4)}} />
                                <Text style={styles.AddPhotoText}>
                                    Upload Photo
                                </Text>   
                            </View>
                           
                        : 
                            renderFileUri(photo)
                        }                        
                    </TouchableOpacity>

                           
                            
                </View>

                <TouchableOpacity style={styles.button} onPress={postContact}>
                        <View>
                            <Text style={styles.buttonText}>Add Contact</Text>
                        </View>
                </TouchableOpacity>
            </Col>
        </Content>
    </Container>

  );
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection:'column',
        height:'100%',
        backgroundColor: 'white',
    },

    AddContactText: {
        fontFamily: 'Avenir Next',
        fontSize: RFValue(18, 680),
        fontWeight:'600',
        color: 'black',
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

    UserTextInput: {
        width: RFPercentage(38),
        fontFamily: 'Avenir Next',
        fontSize: RFValue(12, 680),
        color: 'black',
        marginLeft:'5%'
        // opacity:0.8
    },

    AddPhotoText: {
        width: RFPercentage(38),
        fontFamily: 'Avenir Next',
        fontSize: RFValue(12, 680),
        color: 'black',
        paddingLeft:5
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
        position:'absolute',
        bottom:2,
        width: "90%",
        height: RFPercentage(6),
        backgroundColor: '#B4D3B2',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderRadius: 50,
        marginVertical: '5%',
    },

    buttonText: {
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        fontSize: RFValue(14, 680),
        color:'black',
        justifyContent:'center'
    },
});
export default AddContact;