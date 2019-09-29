import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const ContainerInput = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #22262a;
  /* margin-top: 5px; */
  margin-bottom: 30px;
  border-radius: 13px;
  height: 40px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#FFF',
  fontWeight: 'bold',
})`
  height: 40px;
  width: 255px;
  font-size: 16px;
  background: #22262a;
  color: #fff;
  border-radius: 13px;
  padding-left: 20px;
  padding-right: 10px;
`;

export const SearchButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  height:40px;
  border-radius: 13px;
  padding: 0 5px;
  /* opacity: ${props => (props.loading ? 0.7 : 1)}; */
`;

export const Card = styled.View`
  align-items: center;
  height: 200px;
  border-radius: 13px;
  margin-bottom: 15px;
`;

export const ImageCharacter = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 13px;
`;

export const NameCharacter = styled.View`
  position: absolute;
  top: 160px;
  background: #fff;
  padding: 5px 15px 5px 15px;
  border-radius: 4px;
  border: 1px solid #333;
`;
