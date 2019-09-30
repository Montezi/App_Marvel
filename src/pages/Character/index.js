import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default function Character({ navigation }) {
  Character.propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };
  return (
    <View>
      <Text>Character - {navigation.getParam('character').id}</Text>
    </View>
  );
}
