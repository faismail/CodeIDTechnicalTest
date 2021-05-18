import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Container, Content, Grid, Col, Card, Icon,} from 'native-base';
import {RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { SafeAreaContext } from 'react-native-safe-area-context';

const Pokelist = ({navigation}) => {

  const [ListPokemon, setListPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const indexofLastPost = currentPage * itemsPerPage;
  const indexofFirstPost = indexofLastPost - itemsPerPage;
   
  const currentItems = ListPokemon.slice(indexofFirstPost, indexofLastPost);


  

  const pages = [];
  for (let i = 1; i <= Math.ceil  (ListPokemon.length/itemsPerPage); i++) (
    pages.push(i)
  );

  const handleCLick = (pages) => {
    setCurrentPage(pages)
    console.log(currentPage);
  }




  const renderPageNumbers = pages.map((number) => {
    return (

        <View style={{flex:1, flexDirection:'row',  }}>

          <TouchableOpacity key={number} style={{width:RFPercentage(5), height:RFPercentage(5), alignItems:'center', justifyContent:'center', borderWidth:2, borderColor:'black', backgroundColor:'white', borderRadius:10}} onPress={() => handleCLick(number)}>

              <Text style={styles.textFooter}>{number}</Text>

          </TouchableOpacity> 

        </View>
    )


  })

  const handleChange = (e) => {
      setSearchName(e);
      console.log(searchName);
    };

  const getPokemonList = async () => {

    setIsLoading(true)
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
    .then(response => response.json())
    .then(ListPokemon => {
    setListPokemon(ListPokemon.results);
    setIsLoading(false)
    console.log(ListPokemon)
    })
    .catch((error) => {
      setIsLoading(false)
      console.error(error);
    });
  };

  useEffect(() => {
    getPokemonList()
  }, []);

    
    return (
      <SafeAreaView style={styles.container}>
          <Content style={styles.Box}  >
            <Col style={{ marginVertical:'5%', marginBottom:'5%',}}>
                <View style={styles.SearchBar}>
                  <Icon type="FontAwesome" name="search" style={{justifyContent:'center', marginHorizontal:'2%',  fontSize:RFValue(25, 680),  color:'black' }}/>
                    <TextInput
                        style={{ width:'100%', alignItems:'center', }}
                        placeholder="Search Pokémon"
                        placeholderTextColor="grey"
                        fontFamily="Avenir Next"
                        fontSize={16}
                        fontWeight={'500'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={handleChange}
                    />
                </View>

                <View style={{width:'90%', flexDirection:'row', alignSelf:'center', marginTop:'7%',  }}>
                  {renderPageNumbers}
                </View>
            </Col>

            {
            currentItems.filter(pokemon =>
              pokemon.name.toLowerCase().includes(searchName.toLowerCase())

              ).map((pokemon, index) => (
                <View key={index} style={{ marginVertical:'1%'  }}>
                    <TouchableOpacity  key={index} onPress={() => navigation.navigate('PokeDetails', {id: pokemon.name,})}>
                    <Card  style={styles.CardList}>
                        <Col style={{ flex:1, flexDirection:'row'}}>
                            <Col style={{flex:2, justifyContent:'center', marginLeft:'5%', }}>         
                                <Text style={styles.ListText}>{pokemon.name} </Text>
                            </Col>
                            <Col style={{ alignItems:'center', justifyContent:'center',  }}>
                              <View style={{ width:'95%', height:'80%', borderRadius:8, alignItems:'center', justifyContent:'center' , marginRight:'30%'}}>
                                  <Image style={{width: RFPercentage(20),height: RFPercentage(20)}}
                                      source={{uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`,}}
                                  />
                              </View>
                            </Col>
                        </Col>
                    </Card>
                    </TouchableOpacity>
                </View>
                ))
            }
               
          </Content>
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
    flexWrap:'wrap'
    },
  inner: {
    flex: 1,
    backgroundColor: 'white',
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
    width:'90%',
    height:RFPercentage(6),
    alignSelf:'center',
    alignItems:'center',
    textAlign:'center', 
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 10,
    borderRadius: 8,
    backgroundColor: "white",
    flexDirection: "row",
  },

  ListText:{
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    fontSize: RFValue(22, 680),
    color:'black',
    justifyContent:'center'
  },

  textFooter:{
    color:'black',
    fontSize:RFValue(14, 680),
    textAlign:'center',
}

});

export default Pokelist;