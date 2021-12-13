import React from "react";
import { 
  Text, 
  Box, 
  Touchable,
  Cover,
  Titles,
  Button,
  ImageList
} from '../../styles'

const servico = () => {
  return(
    <Touchable 
      height='100px'
      hasPadding 
      align='center'
      background='branco'
      width='100%'
    >
        <ImageList 
          image="https://blog.beautyclass.tv/wp-content/uploads/2019/07/t%C3%A9cnicas-de-corte-de-cabelo-profissionais.jpg-768x469.jpg"
        />
      
      <Box direction="column">
        <Text width='100%' align="flex-start" bold color="CinzaChumbo">
          Corte feminino
        </Text>
        <Text width='100%' align="flex-start" small color="headerFnt">
          R$ 200,00 • Tempo med: 40min
        </Text>
      </Box>
      <Box direction="column" align="flex-end" width='25%'>
            <Button icon="clock-check-outline" background="sidebarBg" mode="contained" uppercase={false} style={{width: 100 }}>Agendar</Button>
          </Box>
    </Touchable>
  )
}

export default servico