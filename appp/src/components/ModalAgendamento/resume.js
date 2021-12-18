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
import util from "../../util";
import moment from "moment"
import consts from "../../consts"
const resume = ({servico}) => {
  
  return(
    <Box 
    height='100px'
    hasPadding 
    background='branco'
    spacing="20px 0 0"
    >
        <ImageList  
          image={`${consts.bucketUrl}/${servico?.arquivo[0]?.caminho}`}
        />
      
      <Box direction="column">
        <Titles width='100%' align="center" bold color="CinzaChumbo" >
          {servico?.titulo}
        </Titles>
        <Spacer/>
        <Spacer/>
        <Spacer/>
        <Text width='100%' align="center" color="headerFnt" >
          R$ {servico?.preco.toFixed(2)} • Duração: {moment(servico?.duracao).format('HH:mm')}min
        </Text>
      </Box>
    </Box>
  )
}

export default resume