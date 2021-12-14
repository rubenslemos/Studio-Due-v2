import React from "react";
import { 
  Text, 
  Box, 
  Touchable,
  Cover,
  ImageList,
  Spacer,
  Titles
} from '../../styles'

const resume = ({Servicos, agendamento}) => {
  const servico = Servicos?.filter((s)=> s._id === agendamento.servicoId)[0]
  return(
    <Box 
      height='100px'
      hasPadding 

      background='branco'
    >
        <ImageList 
          image="https://blog.beautyclass.tv/wp-content/uploads/2019/07/t%C3%A9cnicas-de-corte-de-cabelo-profissionais.jpg-768x469.jpg"
        />
      
      <Box direction="column">
        <Titles width='100%' align="center" bold color="CinzaChumbo" >
          Corte cabelo feminino
        </Titles>
        <Spacer/>
        <Spacer/>
        <Spacer/>
        <Text width='100%' align="center" color="headerFnt" >
          R$ 200,00 • Tempo med: 40min
        </Text>
      </Box>
    </Box>
  )
}

export default resume