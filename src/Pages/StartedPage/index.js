import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Card, CardItem, Container, Text, Form, View, Textarea, Picker, Col, Icon, Button} from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {Pokeball} from '../../Assets/Images/index';

const StartedPage = ({ navigation }) => {

  return (
    
    <Container style={styles.container}>
        <Col style={{  justifyContent:'center', alignItems:'center',  }}>  
                <TouchableOpacity onPress={()=>navigation.navigate('Pokelist')}>
                    <Image style={styles.logoStyle} source={Pokeball} />
                    <Text style={styles.buttonText}>
                        Getting Started
                    </Text>
                </TouchableOpacity>     
        </Col>
    </Container>
  );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },

    logoStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: RFPercentage(26),
        height: RFPercentage(26),
        },

    buttonText: {
        fontFamily: 'Avenir Next',
        fontSize: RFValue(22, 680),
        color: 'red',
        textAlign: 'center',
    },
});


export default StartedPage;