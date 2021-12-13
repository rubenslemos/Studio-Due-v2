import React from 'react';
import {
  Cover, 
  GradientView,
  Title, 
  Text, 
  Badge,
  Box,
  Touchable,
  Button,
  Titles,
  TextInput
} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import themes from '../../styles/themes.json'
import { useSelector, useDispatch } from 'react-redux';
import {Linking, Share, TouchableOpacity} from 'react-native'
import {updateForm} from '../../store/modules/salao/actions'
const Header = () => {

  const dispatch = useDispatch()
  const {salao, servicos} = useSelector((state) => state.salao)
  const navegar = () => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${salao?.geo?.coordinates[0]},${salao?.geo?.coordinates[1]}`)
  }
  return (
    <>
      <Cover
        image={salao.capa}
        width="100%"
        height="150px">
        <GradientView
          colors={['#21232f33', '#21232fe6']}
          hasPadding
          justify="flex-end">
          <Badge bold color={salao.isOpened ? 'success' : 'fail'}>{salao.isOpened ? "ABERTO" : "FECHADO"}</Badge>
          <Title
            image={salao.foto}
            justifyContent="center"
            colors
          />
          <Text
            spacing="8px"
            bold 
            color="branco"
          >
            Rua {salao?.endereco?.rua} {salao?.endereco?.numero} {salao?.endereco?.complemento} {salao?.endereco?.bairro} {salao?.endereco?.cidade}  • {salao?.distance} Km
          </Text>
        </GradientView>
      </Cover>
      <Box hasPadding
        backgroundColor="branco" width="100%"
      >
        <Box justify="space-between">
        <Touchable width="58px" direction="column" align="center" onPress={() =>Linking.openURL(`tel:${salao.telefone}`)}>
            <Icon name="phone" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">Ligar</Text>
          </Touchable><Touchable width="58px" direction="column" align="center" onPress={() =>Linking.openURL('https://wa.me/5531984609002')}>
            <Icon name="whatsapp" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">WhatsApp</Text>
          </Touchable>
          <Touchable width="58px" direction="column" align="center" onPress={() =>Linking.openURL('https://www.instagram.com/_studiodue_/')}>
            <Icon name="instagram" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">Instagram</Text>
          </Touchable>
          <Touchable width="58px" direction="column" align="center" onPress={()=> navegar()}>
            <Icon name="map-marker" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">Chegar</Text>
          </Touchable>          
          <Touchable width="58px" direction="column" align="flex-start" onPress={() =>Share.share({
            message:`Salão Studio Due - Melhor salão de beleza da zona Sul de BH - https://www.instagram.com/_studiodue_/`
          })}>
            <Icon name="share-variant" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 28px 0 0">Enviar</Text>
          </Touchable>
        </Box>
          <Box direction="column" justify="flex-end" spacing="0 0 0 160px">
            <Button  icon="clock-check-outline" background="sidebarBg" mode="contained" uppercase={false} style={{width: 100 }}>Agendar</Button>
            <Text small spacing="10px 0 0">Horários Livres</Text>
          </Box>
      </Box>
      <Box direction="column" align="center" hasPadding>
        <Titles small>
          Serviços ({servicos.length})
        </Titles>
        <TextInput 
          placeholder="Digite o nome do serviço ..."
          activeOutlineColor= {themes.colors.CinzaChumbo}
          onChangeText={(value) => dispatch(updateForm({inputFiltro: value}))}
          onFocus={() => dispatch(updateForm({inputFiltroFoco: true}))}
          onBlur={() => dispatch(updateForm({inputFiltroFoco: false}))}
        />
      </Box>  
    </>
  );
};

export default Header;
