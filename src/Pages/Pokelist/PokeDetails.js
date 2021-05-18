import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Container, Content, Grid, Col, Card, Icon} from 'native-base';
import {RFValue, RFPercentage } from "react-native-responsive-fontsize";
import LinearGradient from 'react-native-linear-gradient';

const PokeDetails = ({route, navigation: { goBack  }}) => {

    const [pokedetails, setPokeDetails] = useState([]);
 
    const PokemonDetails = () => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
        .then(res => res.json())
        .then(pokedetails => setPokeDetails(pokedetails));

        console.log(pokedetails)
    };

    useEffect(() => {
      PokemonDetails();
    }, []);
  
  return pokedetails.name ? (
    <View style={styles.container}>
        <Col style={styles.Box} >
            <LinearGradient useAngle={true}
                            angle={136}
                            colors={['#D6F5F0' , '#63C0AF',]}
                            locations={[0,0.9831]}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            style={styles.CardDetail}>

                          <View style={{marginLeft:'3%', height:'15%', flexDirection:'row',  alignItems:'center',     }}>
                            <Text style={styles.TitleText}>Pokémon Details </Text>

                            <TouchableOpacity style={{flex:1, alignItems:'center'}} onPress={() => goBack()}>
                                <Text style={styles.CloseText}>
                                  Go Back
                                </Text>
                            </TouchableOpacity>
                          </View>

                          <View style={{flex: 1, alignItems: 'center'}}>
                                  <Image
                                      style={{width: RFPercentage(30),height: RFPercentage(30)}}
                                      source={{
                                      uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${
                                          pokedetails.name
                                      }.png`,
                                      }}
                                  />
                                  <Text style={styles.ListText}>Name: {pokedetails.name} </Text>
                                  <Text style={styles.ListText}>Height: {pokedetails.height} </Text>
                                  <Text style={styles.ListText}>Weight: {pokedetails.weight} </Text>
                                  <Text style={styles.ListText}>
                                      Ability: {pokedetails.abilities[0].ability.name}
                                  </Text>
                                  <Text style={styles.ListText}>Type: {pokedetails.types[0].type.name}</Text>
                          </View>
            </LinearGradient>
        </Col>          
    </View>
    
) : (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="#E63F34"  />
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
  height: RFPercentage(80),
  marginTop:'15%', 
  alignSelf:'center',
  borderRadius:8, 
  borderWidth:1,
  borderColor:'rgba(104, 148, 181, 0.5)', 
},

TitleText:{
  fontFamily: 'Avenir Next',
  fontWeight:'bold',
  flex:2,
  fontSize: RFValue(22,680),
  color:'black',
},

ListText:{
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    fontSize: RFValue(20, 680),
    color:'black',
    marginTop:'5%',
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

export default PokeDetails;