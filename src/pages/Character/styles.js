import styled from 'styled-components/native';

// import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px 20px 0px 20px;
`;

export const CharacterContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const AvatarContainer = styled.View`
  height: 180px;
  align-items: center;
`;

export const AvatarCharacter = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`;

export const NameCharacter = styled.Text`
  font-weight: bold;
  font-size: 20px;
  padding-top: 10px;
  color: #fff;
`;

export const Description = styled.View`
  /* align-items: center; */
  margin-top: 10px;
`;
export const Title = styled.Text`
  color: #22262a;
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  margin-bottom: 5px;
`;
export const Content = styled.Text`
  color: #fff;
  font-size: 12px;
  text-align: justify;
`;
export const List = styled.View`
  margin-top: 10px;
  flex-direction: column;
`;

export const ListItem = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 150px;
  height: 260px;
  padding-bottom: 5px;
  /* margin: 4px; */
`;
export const ImageComic = styled.Image`
  height: 210px;
  width: 100%;
`;
export const TitleComic = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;
