import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Text, Box, Spacer, Touchable, Button} from '../../styles'
import {View, Image, Dimensions} from 'react-native'
import util from '../../util'
import themes from '../../styles/themes.json'

const Payment = () => {
 return (
   <>
    <Text spacing="0 20px 0 20px " align="flex-start" bold>
      Forma de Pagamento:
    </Text>
    <Box hasPadding direction="column">
    <Touchable width={(Dimensions.get('window').width-20)+"px"}>  
      <Box border={`1px solid ${themes.colors.cinzaClaro}`} spacing="0 20px 10px 0" align="center" rounded="5px">
        <Image
          source={{
            uri:'https://www.uniprimebr.com.br/imagens/artigos/capas/2018.01.25-13.39.41.png'
          }}
          style={{
            width:80,
            height:30,
            marginRight: 10,
            marginTop: 5,
            marginBottom: 5
          }}
        />
        <Text align="center" spacing="10px"> **** ****  **** **** 4587</Text>
        <Text align="center" justify="flex-end" spacing="10px 10px 10px 80px"><Icon name="cog" color={themes.colors.headerFnt} size={25} /></Text>
        
      </Box>
    </Touchable>    
    <Touchable width={(Dimensions.get('window').width-20)+"px"}>  
      <Box border={`1px solid ${themes.colors.cinzaClaro}`} spacing="0 20px 10px 0" align="center" rounded="5px">
        <Image
          source={{
            uri:'https://www.uniprimebr.com.br/imagens/artigos/capas/2018.01.25-13.39.41.png'
          }}
          style={{
            width:80,
            height:30,
            marginRight: 10,
            marginTop: 5,
            marginBottom: 5
          }}
        />
        <Text align="center" spacing="10px"> **** ****  **** **** 4587</Text>
        <Text align="center" justify="flex-end" spacing="10px 10px 10px 80px"><Icon name="cog" color={themes.colors.headerFnt} size={25} /></Text>
        
      </Box>
    </Touchable>    
    <Touchable direction="column" width={(Dimensions.get('window').width-40)+"px"}>  
      <Box border={`1px solid ${themes.colors.cinzaClaro}`} spacing="0 20px 0 0" align="center" rounded="5px">
        <Image
          source={{
            uri:'https://www.uniprimebr.com.br/imagens/artigos/capas/2018.01.25-13.39.41.png'
          }}
          style={{
            width:80,
            height:30,
            marginRight: 10,
            marginTop: 5,
            marginBottom: 5
          }}
        />
        <Text align="center" spacing="10px"> **** **** **** **** 4587</Text>
        <Text align="center" justify="flex-end" spacing="10px 10px 10px 80px"><Icon name="cog" color={themes.colors.headerFnt} size={25} /></Text>
        
      </Box>
      <Spacer/>
      <Spacer/>
          <Button
            icon="check-bold"
            uppercase={false}
            textColor="headerBg"
            background={util.toAlpha(themes.colors.headerFnt, 70)}
            mode="contained"
            block
          >
            Confirmar Agendamento
          </Button>
    </Touchable>
    </Box>
   </>
 )
}

export default Payment