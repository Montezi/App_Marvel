import React, { useState, useEffect } from 'react';

import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  Button,
} from 'react-native';
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  const [totalComics, setTotalComics] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState([]);
  const [totalSeries, setTotalSeries] = useState(0);
  const [loadingSeries, setLoadingSeries] = useState(false);
  const [offsetSeries, setOffsetSeries] = useState(0);
  const [stories, setStories] = useState([]);
  const [totalStories, setTotalStories] = useState(0);
  const [loadingStories, setLoadingStories] = useState(false);
  const [offsetStories, setOffsetStories] = useState(0);
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [offsetEvents, setOffsetEvents] = useState(0);

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

  useEffect(() => {
    setLoading(true);
    async function loadComics() {
      await api
        .get(
          `characters/${characterId}/comics?limit=5&offset=${offset}&ts=${timeStamp}&apikey=${auth.API_KEY_PUBLIC}&hash=${md5Hash}`
        )
        .then(response => {
          setComics([...comics, ...response.data.data.results]);
          setTotalComics(response.data.data.total);
          setLoading(false);
        })
        .catch(err => {
          throw err;
        });
    }
    loadComics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  useEffect(() => {
    setLoadingSeries(true);

    async function loadSeries() {
      await api
        .get(
          `characters/${characterId}/series?limit=5&offset=${offsetSeries}&ts=${timeStamp}&apikey=${auth.API_KEY_PUBLIC}&hash=${md5Hash}`
        )
        .then(response => {
          setSeries([...series, ...response.data.data.results]);
          setTotalSeries(response.data.data.total);
          setLoadingSeries(false);
        })
        .catch(err => {
          throw err;
        });
    }
    loadSeries();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetSeries]);

  useEffect(() => {
    setLoadingStories(true);
    async function loadStories() {
      await api
        .get(
          `characters/${characterId}/stories?limit=5&offset=${offsetStories}&ts=${timeStamp}&apikey=${auth.API_KEY_PUBLIC}&hash=${md5Hash}`
        )
        .then(response => {
          setStories([...stories, ...response.data.data.results]);
          setTotalStories(response.data.data.total);
          setLoadingStories(false);
        })
        .catch(err => {
          throw err;
        });
    }

    loadStories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetStories]);

  useEffect(() => {
    setLoadingEvents(true);
    async function loadEvents() {
      await api
        .get(
          `characters/${characterId}/events?limit=5&offset=${offsetEvents}&ts=${timeStamp}&apikey=${auth.API_KEY_PUBLIC}&hash=${md5Hash}`
        )
        .then(response => {
          setEvents([...events, ...response.data.data.results]);
          setTotalEvents(response.data.data.total);
          setLoadingEvents(false);
        })
        .catch(err => {
          throw err;
        });
    }

    loadEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetEvents]);

  function loadMore() {
    setOffset(offset + 5);
  }

  function loadMoreSeries() {
    setOffsetSeries(offsetSeries + 5);
  }

  function loadMoreStories() {
    setOffsetStories(offsetStories + 5);
  }

  function loadMoreEvents() {
    setOffsetEvents(offsetEvents + 5);
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
            ListFooterComponent={
              loading ? (
                <View style={styles.loading}>
                  <ActivityIndicator />
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 200,
                  }}
                >
                  {totalComics > offset && (
                    <Button
                      title="Load More"
                      onPress={loadMore}
                      color="#22262a"
                    />
                  )}
                </View>
              )
            }
            keyExtractor={(item, index) => String(index)}
          />
        </List>
        <List>
          <Title>SÉRIES</Title>
          <FlatList
            horizontal
            pagingEnabled
            data={series}
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
            ListFooterComponent={
              loadingSeries ? (
                <View style={styles.loading}>
                  <ActivityIndicator />
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 200,
                  }}
                >
                  {totalSeries >= offsetSeries && (
                    <Button
                      title="Load More"
                      onPress={loadMoreSeries}
                      color="#22262a"
                    />
                  )}
                </View>
              )
            }
            keyExtractor={(item, index) => String(index)}
          />
        </List>
        <List>
          <Title>HISTÓRIAS</Title>
          <FlatList
            horizontal
            pagingEnabled
            data={stories}
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
            ListFooterComponent={
              loadingStories ? (
                <View style={styles.loading}>
                  <ActivityIndicator />
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 200,
                  }}
                >
                  {totalStories >= offsetStories && (
                    <Button
                      title="Load More"
                      onPress={loadMoreStories}
                      color="#22262a"
                    />
                  )}
                </View>
              )
            }
            keyExtractor={(item, index) => String(index)}
          />
        </List>
        {events.length > 0 && (
          <List>
            <Title>EVENTOS</Title>
            <FlatList
              horizontal
              pagingEnabled
              data={events}
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
              ListFooterComponent={
                loadingEvents ? (
                  <View style={styles.loading}>
                    <ActivityIndicator />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 200,
                    }}
                  >
                    {totalEvents >= offsetEvents && (
                      <Button
                        title="Load More"
                        onPress={loadMoreEvents}
                        color="#22262a"
                      />
                    )}
                  </View>
                )
              }
              keyExtractor={(item, index) => String(index)}
            />
          </List>
        )}
      </Container>
    </LinearGradient>
  );
}
