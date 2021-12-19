import styled from 'styled-components/native';
import themes from './themes.json';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler'
import util from '../util'
import {
  Text as TextPaper,
  Title as TitlePaper,
  Badge as BadgePaper,
  Button as ButtonPaper,
  TextInput as TextInputPaper,
} from 'react-native-paper';

export const Cover = styled.ImageBackground.attrs((props) => ({
  source: {
    uri: props.image,
  },
}))`
  width: ${(props) => props.width || '70px'};
  height: ${(props) => props.height || '70px'};
  margin: ${(props) => props.spacing || '0 10px 0  0'};
  border-radius: ${(props) => (props.circle ? props.width : '3px')};
  background-color: ${(props) => props.colors ? themes.colors.headerFnt : themes.colors.branco};
  border: ${(props) => props.border || 'none'};
  opacity: 0.7;
  padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
  overflow: hidden;
`;

export const GradientView = styled(LinearGradient).attrs((props) => ({
  colors: props.colors,
}))`
  flex: 1;
  padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
  justify-content: ${(props) => props.justify || 'flex-start'};
`;

export const Badge = styled(BadgePaper)`
  align-self: flex-end;
  font-size: 15px;
  font-family: ${(props) => (props.bold ? 'Ubuntu-Bold' : 'Ubuntu-Light')};
  width: auto;
  height: auto;
  padding: 2px 7px;
  margin-top: 5px;
  border-radius: 4px;
  background: ${(props) => themes.colors[props.color || 'fail']};
`;

export const Title = styled.ImageBackground.attrs((props) => ({
  source: {
    uri: props.image,
  },
}))`
  width: ${(props) => props.width || '70px'};
  height: ${(props) => props.height || '70px'};
  margin: ${(props) => props.spacing || '0 0 0 0'};
  background-color: ${(props) => props.colors ? themes.colors.headerFnt : themes.colors.branco};
  border: ${(props) => props.border || 'none'};
  border-radius: ${(props) => (props.rounded ? '0' : '100px')};
  align-self: ${(props) => props.align || 'center'};
`;

export const Text = styled(TextPaper)`
  color: ${(props) => themes.colors[props.color || 'headerFnt']};
  font-size: ${(props) => (props.small ? '13px' : props.big ?'20px' : '17px')};
  font-family: ${(props) => (props.bold ? 'Ubuntu-Bold' : 'Ubuntu-Light')};
  margin: ${(props) => props.spacing || 0};
  padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
  opacity: 1;
  align-self: ${(props) => props.align || 'center'};
  justify-content: ${(props) => props.justify || 'flex-start'};
`;

export const Box = styled.View`
flex: 1;
flex-wrap: ${(props) => props.wrap || 'nowrap'};
flex-direction: ${(props) => props.direction || 'row'};
justify-content: ${(props) => props.justify || 'flex-start'};
width: ${(props) => props.width || '100%'};
height:${(props) => props.height || 'auto'} ;
max-height: ${(props) => props.height || 'auto'};
padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
padding-bottom: ${(props) => props.removePaddingBottom ? '0' : props.hasPadding ? '20px' : '0px'};
margin: ${(props) => props.spacing || 0};
border-radius: ${(props) => props.rounded || '0px'};
border: ${(props) => props.border || 'none'};
background: ${(props) => themes.colors[props.background] || props.background || 'transparent'};
`;

export const Touchable = styled(TouchableOpacity)`
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.items|| 'flex-start'}; 
  align-items: ${(props) => props.align || 'flex-start'};
  width: ${(props) => props.width || '100%'};
  height:${(props) => props.height || 'auto'} ;
  padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
  margin: ${(props) => props.spacing || 0};
  border-radius: ${(props) => props.rounded || '0'};
  border: ${(props) => props.border || 'none'};
  background: ${(props) => themes.colors[props.background] || props.background || 'transparent'};
`;

export const Button = styled(ButtonPaper).attrs((props)=> ({
  color: themes.colors[props.background] || props.background,
  width: props.block ? '100%' : 'auto',
  padding: 0,
  margin: 0,
  labelStyle: {
    color: themes.colors.branco,
    letterSpacing: 0
  }
}))`
  align-self: ${(props) => props.align || 'center'};
`

export const Titles = styled(TitlePaper)`
  color: ${(props) => themes.colors[props.color || 'CinzaChumbo']};
  font-size: ${(props) => (props.small ? '22px' : '30px')};
  padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
  letter-spacing: -0.8px;
  line-height: ${(props) => (props.small ? '22px' : '30px')};
  text-align: ${(props) => props.align || 'left'};
  font-family: ${(props) => (props.bold ? 'Ubuntu-Bold' : 'Ubuntu-Regular')}
`

export const TextInput = styled(TextInputPaper).attrs({
  mode: 'outlined',
  themes:{
    colors: {
      placeholder: util.toAlpha(themes.colors.headerFnt, 30),
      outlineColor: themes.colors.CinzaChumbo
    }
  }
})`
  height: 45px;
  width: 100%;
  font-size: 15px;
  background: ${themes.colors.branco}
`
export const ImageList = styled.Image.attrs((props) => ({
  source: {
    uri: props.image,
  },
}))`
  width: ${(props) => props.width || '70px'};
  height: ${(props) => props.height || '70px'};
  margin: ${(props) => props.spacing || '0 10px 0  0'};
  border-radius: ${(props) => (props.circle ? props.width : '10px')};
  background-color: ${themes.colors.branco};
  opacity: 0.7;
`;

export const Spacer = styled.View`
  width: 100%;
  height: ${(props) => props.size || '5px'};
`