import React from "react";
import { 
  Text, 
  Box, 
  Touchable,
  Cover,
  Titles,
  Button
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
      <Cover
        image="https://blog.beautyclass.tv/wp-content/uploads/2019/07/t%C3%A9cnicas-de-corte-de-cabelo-profissionais.jpg-768x469.jpg"
      />
      <Box direction="column">
        <Text width='100%' align="flex-start" bold color="CinzaChumbo">
          Corte feminino
        </Text>
        <Text width='100%' align="flex-start" small color="headerFnt">
          R$ 200,00 40min
        </Text>
      </Box>
      <Box direction="column" align="flex-end" width='25%'>
            <Button icon="clock-check-outline" background="success" mode="contained" uppercase={false} style={{width: 100 }}>Agendar</Button>
            <Text small>Horários Disponiveis</Text>
          </Box>
    </Touchable>
  )
}

export default servico