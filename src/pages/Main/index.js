import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';

import md5 from 'js-md5';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import auth from '../../config/auth';
import api from '../../services/api';

import {
  Container,
  ContainerInput,
  Input,
  Card,
  ImageCharacter,
  NameCharacter,
} from './styles';

const styles = StyleSheet.create({
  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default function Main({ navigation }) {
  Main.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  const timeStamp = new Date().getTime();
  const md5Hash = md5.create();
  md5Hash.update(timeStamp + auth.API_KEY_PRIVATE + auth.API_KEY_PUBLIC);

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [characterSearch, setCharacterSearch] = useState('');

  async function loadCharacters() {
    setLoading(true);
    await api
      .get(
        `characters?offset=${offset}&ts=${timeStamp}&apikey=${auth.API_KEY_PUBLIC}&hash=${md5Hash}`
      )
      .then(response => {
        setCharacters([...characters, ...response.data.data.results]);
        setLoading(false);
      })
      .catch(err => {
        throw err;
      });
  }

  useEffect(() => {
    if (characterSearch === '') {
      loadCharacters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadMore() {
    if (characterSearch === '') {
      setOffset(offset + 20);
      loadCharacters();
    }
  }

  function renderFooter() {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }
  async function searchCharacter() {
    characters.pop();
    setLoading(true);
    Keyboard.dismiss();
    try {
      const response = await api.get(
        `characters?name=${characterSearch}&ts=${timeStamp}&apikey=${auth.API_KEY_PUBLIC}&hash=${md5Hash}`
      );

      const characterValue = response.data.data.results;

      if (characterValue.length) {
        setCharacters(characterValue);
        setLoading(false);
      } else {
        Alert.alert('Atenção!', 'Personagem não encontrado');
        setCharacterSearch('');
        setOffset(0);
        loadCharacters();
      }
    } catch (err) {
      Alert.alert('Falha na Busca', 'Por favor verifique os dados informados');
    }
  }

  function handleNavigate(character) {
    navigation.navigate('Character', { character });
  }

  return (
    <LinearGradient
      colors={['#000', '#EC1D24', '#000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <Container>
        <ContainerInput>
          <Input
            placeholder="Busque o seu personagem…"
            value={characterSearch}
            onChangeText={setCharacterSearch}
          />
          <TouchableOpacity onPress={searchCharacter}>
            <Icon name="search" size={30} color="#EC1D24" />
          </TouchableOpacity>
        </ContainerInput>
        <FlatList
          data={characters}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleNavigate(item)}>
              <Card>
                <ImageCharacter
                  source={{
                    uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                  }}
                />
                <NameCharacter>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                    {item.name}
                  </Text>
                </NameCharacter>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => String(index)}
        />
      </Container>
    </LinearGradient>
  );
}
