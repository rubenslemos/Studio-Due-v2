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

const resume = () => {
  return(
    <Touchable 
      height='90px'
      hasPadding 
      align='center'
      background='branco'
    >
        <ImageList 
          image="https://blog.beautyclass.tv/wp-content/uploads/2019/07/t%C3%A9cnicas-de-corte-de-cabelo-profissionais.jpg-768x469.jpg"
        />
      
      <Box direction="column" hasPadding>
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
    </Touchable>
  )
}

export default resume