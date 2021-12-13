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
import { useSelector } from 'react-redux';
const Header = () => {

  const {salao} = useSelector((state) => state.salao)
  console.log("SALAO: ",salao)
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
          <Badge bold color="success">Aberto</Badge>
          <Title
            image="https://salao-studio-due.s3.sa-east-1.amazonaws.com/servicos/61607e0ec1bb4c1e46cc5830/studio-due-logo-transparent.png"
            justifyContent="center"
            colors
          />
          <Text
            spacing="8px"
            bold 
            color="branco"
          >
            • Rua Orenoco 137 loja 4 Carmo-Sion BH
          </Text>
        </GradientView>
      </Cover>
      <Box hasPadding
        backgroundColor="branco" width="100%"
      >
        <Box justify="space-between">
        <Touchable width="62px" direction="column" align="center">
            <Icon name="whatsapp" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">WhatsApp</Text>
          </Touchable>
          <Touchable width="62px" direction="column" align="center">
            <Icon name="instagram" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">Instagram</Text>
          </Touchable>
          <Touchable width="62px" direction="column" align="center">
            <Icon name="cellphone-basic" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">Ligar</Text>
          </Touchable>          
          <Touchable width="62px" direction="column" align="center">
            <Icon name="share-variant" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">Compartilhar</Text>
          </Touchable>
        </Box>
          <Box direction="column" justify="flex-end" spacing="0 0 0 125px">
            <Button  icon="clock-check-outline" background="sidebarBg" mode="contained" uppercase={false} style={{width: 132 }}>Agendar Agora</Button>
            <Text small spacing="10px 0 0">Horários Livres</Text>
          </Box>
      </Box>
      <Box direction="column" align="center" hasPadding>
        <Titles small>
          Serviços (5)
        </Titles>
        <TextInput 
          placeholder="Digite o nome do serviço ..."
          activeOutlineColor= {themes.colors.CinzaChumbo}
        />
      </Box>  
    </>
  );
};

export default Header;
