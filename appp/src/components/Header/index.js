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
const Header = () => {
<<<<<<< HEAD

  const {salao, servicos, form} = useSelector((state) => state.salao)
  console.log("Salao", salao)
  const openGps = (coords) => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${coords[0]},${coords[1]}`,
    );
  };
=======
>>>>>>> parent of 2f146e3 (erro pra pegar infos do salao)
  return (
    <>
      <Cover
        image="https://salao-studio-due.s3.sa-east-1.amazonaws.com/servicos/61607e0ec1bb4c1e46cc5830/1638284426667.jpg"
        width="100%"
        height="150px">
        <GradientView
          colors={['#21232f33', '#21232fe6']}
          hasPadding
          justify="flex-end">
          <Badge bold color="success">Aberto</Badge>
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
            Rua {salao.endereco.rua} {salao.endereco.numero} {salao.endereco.complemento} {salao.endereco.bairro} {salao.endereco.cidade} • {salao.endereco.distance} Km
          </Text>
        </GradientView>
      </Cover>
      <Box hasPadding
        backgroundColor="branco" width="100%"
      >
        <Box justify="space-between">
        <Touchable width="62px" direction="column" align="center" onPress={() => Linking.openURL('api.whatsapp.com/send?phone5531984609002')}>
            <Icon name="whatsapp" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">WhatsApp</Text>
          </Touchable>
          <Touchable width="62px" direction="column" align="center" onPress={() => Linking.openURL('https://www.instagram.com/_studiodue_/')}>
            <Icon name="instagram" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">Instagram</Text>
          </Touchable>
          <Touchable width="62px" direction="column" align="center" onPress={() => Linking.openURL(`tel:${salao.telefone}`)}>
            <Icon name="cellphone-basic" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">Ligar</Text>
          </Touchable>          
          <Touchable width="62px" direction="column" align="center" onPress={() => Share.share({message: `${salao.nome} @_studiodue_`})}>
            <Icon name="share-variant" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">Compartilhar</Text>
          </Touchable>          
          <Touchable width="62px" direction="column" align="center "onPress={() => openGps(salao?.geo?.coordinates)}>
            <Icon name="map-marker" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">Chegar</Text>
          </Touchable>
        </Box>
          <Box direction="column" justify="flex-end" spacing="0 0 0 125px">
            <Button  icon="clock-check-outline" background="sidebarBg" mode="contained" uppercase={false} style={{width: 132 }}>Agendar Agora</Button>
            <Text small spacing="10px 0 0">Horários Livres</Text>
          </Box>
      </Box>
      <Box direction="column" align="center" hasPadding>
        <Titles small>
          Serviços ({servicos.length})
        </Titles>
        <TextInput 
          placeholder="Digite o nome do serviço ..."
          onChangeText={(value) => dispatch(updateForm('inputFiltro', value))}
          onFocus={() => dispatch(updateForm('inputFiltroFoco', true))}
          onBlur={() => dispatch(updateForm('inputFiltroFoco', false))}
          activeOutlineColor= {themes.colors.CinzaChumbo}
        />
      </Box>  
    </>
  );
};

export default Header;
