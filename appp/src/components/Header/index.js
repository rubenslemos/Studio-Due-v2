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
            image="https://salao-studio-due.s3.sa-east-1.amazonaws.com/servicos/61607e0ec1bb4c1e46cc5830/studio-due-logo-transparent.png"
            justifyContent="center"
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
        <Touchable width="65px" direction="column" align="center">
            <Icon name="whatsapp" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">WhatsApp</Text>
          </Touchable>
          <Touchable width="65px" direction="column" align="center">
            <Icon name="instagram" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">Instagram</Text>
          </Touchable>
          <Touchable width="65px" direction="column" align="center">
            <Icon name="cellphone-basic" size={30} color={themes.colors.headerFnt}/>
            <Text small spacing="10px 0 0">Ligar</Text>
          </Touchable>
        </Box>
          <Box direction="column" align="center" justify="" >
            <Button icon="clock-check-outline" background="success" mode="contained" uppercase={false} style={{width: 150 }}>Agendar Agora</Button>
            <Text small>Horários Disponiveis</Text>
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