import React from "react";
import moment from "moment"
import { Text, Box, Touchable, Cover, Titles, Button, ImageList} from '../../styles'
import consts from '../../consts'
import {useDispatch} from 'react-redux'
import {updateAgendamento, filterAgenda} from '../../store/modules/salao/actions'
const Servico = ({servico}) => {
  dispatch = useDispatch()

  return(
    <Touchable 
      height='100px'
      hasPadding 
      align='center'
      background='branco'
      width='100%'
      onPress={()=> {
        dispatch(updateAgendamento({servicoId: servico._id}))
        dispatch(filterAgenda())
      }}
    >
        <ImageList 
          image={`${consts.bucketUrl}/${servico?.arquivo[0]?.caminho}`}
        />
      
      <Box direction="column">
        <Text width='100%' align="flex-start" bold color="CinzaChumbo">
          {servico?.titulo}
        </Text>
        <Text width='100%' align="flex-start" small color="headerFnt">
          R$= {servico?.preco},00 • Duração: {moment(servico?.duracao).format('HH:mm')} min
        </Text>
      </Box>
      <Box direction="column" align="flex-end">
            <Button icon="clock-check-outline" background="sidebarBg" mode="contained" uppercase={false} style={{width: 100 }}>Agendar</Button>
          </Box>
    </Touchable>
  )
}

export default Servico