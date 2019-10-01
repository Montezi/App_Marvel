import React, { useState, useEffect } from 'react';

import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import md5 from 'js-md5';
import LinearGradient from 'react-native-linear-gradient';
import auth from '../../config/auth';
import api from '../../services/api';

import {
  Container,
  CharacterContainer,
  AvatarContainer,
  AvatarCharacter,
  NameCharacter,
  Description,
  Title,
  Content,
  List,
  ListItem,
  ImageComic,
  TitleComic,
} from './styles';

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    // alignSelf: 'center',
    marginVertical: 20,
  },
});

export default function Character({ navigation }) {
  Character.propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  const timeStamp = new Date().getTime();
  const md5Hash = md5.create();
  md5Hash.update(timeStamp + auth.API_KEY_PRIVATE + auth.API_KEY_PUBLIC);

  const [character, setCharacter] = useState([]);
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState([]);
  const [loadingSeries, setLoadingSeries] = useState(false);
  const [offsetSeries, setOffsetSeries] = useState(0);
  const [stories, setStories] = useState([]);
  const [loadingStories, setLoadingStories] = useState(false);
  const [offsetStories, setOffsetStories] = useState(0);

  const characterId = navigation.getParam('characterId');

  useEffect(() => {
    async function loadCharacter() {
      await api
        .get(
          `characters/${characterId}?ts=${timeStamp}&apikey=${auth.API_KEY_PUBLIC}&hash=${md5Hash}`
        )
        .then(response => {
          setCharacter(response.data.data.results);
        })
        .catch(err => {
          throw err;
        });
    }
    loadCharacter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadComics() {
    setLoading(true);
    await api
      .get(
        `characters/${characterId}/comics?limit=5&offset=${offset}&ts=${timeStamp}&apikey=${auth.API_KEY_PUBLIC}&hash=${md5Hash}`
      )
      .then(response => {
        setComics([...comics, ...response.data.data.results]);
        setLoading(false);
      })
      .catch(err => {
        throw err;
      });
  }

  async function loadSeries() {
    setLoadingSeries(true);
    await api
      .get(
        `characters/${characterId}/series?limit=5&offset=${offsetSeries}&ts=${timeStamp}&apikey=${auth.API_KEY_PUBLIC}&hash=${md5Hash}`
      )
      .then(response => {
        setSeries([...series, ...response.data.data.results]);
        setLoadingSeries(false);
      })
      .catch(err => {
        throw err;
      });
  }

  async function loadStories() {
    setLoadingStories(true);
    await api
      .get(
        `characters/${characterId}/stories?limit=5&offset=${offsetStories}&ts=${timeStamp}&apikey=${auth.API_KEY_PUBLIC}&hash=${md5Hash}`
      )
      .then(response => {
        setStories([...stories, ...response.data.data.results]);
        setLoadingStories(false);
      })
      .catch(err => {
        throw err;
      });
  }

  useEffect(() => {
    const abortController = new AbortController();

    loadComics();

    return function cleanup() {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    loadSeries();

    return function cleanup() {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    loadStories();

    return function cleanup() {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadMore() {
    setOffset(offset + 5);
    loadComics();
  }

  function renderFooter() {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  function loadMoreSeries() {
    setOffsetSeries(offsetSeries + 5);
    loadSeries();
  }

  function renderFooterSeries() {
    if (!loadingSeries) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  function loadMoreStories() {
    setOffsetStories(offsetStories + 5);
    loadStories();
  }

  function renderFooterStories() {
    if (!loadingStories) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#000', '#EC1D24', '#000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <Container>
        {character.map(characterItem => (
          <CharacterContainer key={characterItem.id}>
            <AvatarContainer>
              <AvatarCharacter
                source={{
                  uri: `${characterItem.thumbnail.path}.${characterItem.thumbnail.extension}`,
                }}
              />
              <NameCharacter>{characterItem.name}</NameCharacter>
            </AvatarContainer>
            {characterItem.description !== '' && (
              <Description>
                <Title>DESCRIÇÃO</Title>
                <Content>{characterItem.description}</Content>
              </Description>
            )}
          </CharacterContainer>
        ))}
        <List>
          <Title>QUADRINHOS</Title>
          <FlatList
            horizontal
            pagingEnabled
            data={comics}
            onEndReached={loadMore}
            onEndReachedThreshold={0.2}
            ListFooterComponent={renderFooter}
            renderItem={({ item }) => (
              <ListItem>
                <ImageComic
                  source={{
                    uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                  }}
                />
                <TitleComic>{item.title}</TitleComic>
              </ListItem>
            )}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: '100%',
                    width: 10,
                  }}
                />
              );
            }}
            keyExtractor={(item, index) => String(index)}
          />
        </List>
        <List>
          <Title>SÉRIES</Title>
          <FlatList
            horizontal
            pagingEnabled
            data={series}
            onEndReached={loadMoreSeries}
            onEndReachedThreshold={0.2}
            ListFooterComponent={renderFooterSeries}
            renderItem={({ item }) => (
              <ListItem>
                <ImageComic
                  source={{
                    uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                  }}
                />
                <TitleComic>{item.title}</TitleComic>
              </ListItem>
            )}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: '100%',
                    width: 10,
                  }}
                />
              );
            }}
            keyExtractor={(item, index) => String(index)}
          />
        </List>
        <List>
          <Title>HISTÓRIAS</Title>
          <FlatList
            horizontal
            pagingEnabled
            data={stories}
            onEndReached={loadMoreStories}
            onEndReachedThreshold={0.2}
            ListFooterComponent={renderFooterStories}
            renderItem={({ item }) => (
              <ListItem>
                {item.thumbnail !== null ? (
                  <ImageComic
                    source={{
                      uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                    }}
                  />
                ) : (
                  <ImageComic
                    source={{
                      uri:
                        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
                    }}
                  />
                )}
                <TitleComic>{item.title}</TitleComic>
              </ListItem>
            )}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: '100%',
                    width: 10,
                  }}
                />
              );
            }}
            keyExtractor={(item, index) => String(index)}
          />
        </List>
      </Container>
    </LinearGradient>
  );
}
