import React from "react"
import { ScrollView } from "react-native-gesture-handler"
import {Dimensions} from 'react-native'
import Modal from 'react-native-simple-modal'
import {useDispatch} from 'react-redux'
import { updateForm, updateAgendamento } from "../../../store/modules/salao/actions"
import {Text, Cover, Box, Touchable, Spacer} from '../../../styles'
import themes from '../../../styles/themes.json'
import util from '../../../util'
import moment from 'moment/min/moment-with-locales'
moment.locale('pt-br')
const EspecialistasModal = ({
  form,
  colaboradores,
  agendamento,
  servicos,
  servico,
  colaboradoresDia,
  horaSelecionada
}) => {
  const dispatch = useDispatch()
  let colaboradoresIdsDisponiveis =[]
  for(let colaboradorId of Object.keys(colaboradoresDia)) {
    let horarios = colaboradoresDia[colaboradorId].flat(2)
    if (horarios.includes(horaSelecionada)){
      colaboradoresIdsDisponiveis.push(colaboradorId)
    }
  }
  const colaboradoresDisponiveis = colaboradores.filter((c) => colaboradoresIdsDisponiveis.includes(c._id))

  return(
    <Modal
      offset={-750}
      open={form.modalEspecialista}
      close={form.modalEspecial}
      modalDidClose={() => dispatch(updateForm({modalEspecialista: false}))}
      closeOnTouchOutside={() => dispatch(updateForm({modalEspecialista: false}))}
      modalStyle={{
        borderRadius: 20
      }}
    >
      <ScrollView>
        <Box direction="column">
          <Text bold big color="sidebarFntSel" align="flex-start" spacing="20px 0 0 20px">{servico?.titulo}</Text>
          <Spacer/>
          <Spacer/>
          <Text small color="headerFnt" align="flex-start"spacing="0 0 0 20px">Disponíveis em {moment(agendamento?.data).format('DD/MM/YYYY [às] HH:mm')}</Text>
        </Box>
        <Box wrap='wrap' spacing="10px 0 0" direction="row" hasPadding>
           {colaboradoresDisponiveis.map(colaborador=>(
             <Touchable 
              direction="column"
              height="70px"
              width={Math.floor((Dimensions.get('screen').width-100)/4)+"px"}
              spacing="0 0 10px 0"
              key={colaborador}
              onPress={() => {
                dispatch(updateAgendamento({colaboradorId: colaborador._id}))
                dispatch(updateForm({modalEspecialista: false}))
              }}
            >
               <Cover
                align="center" 
                height="50px" 
                width="50px" 
                circle 
                border={colaborador._id === agendamento.colaboradorId ? "2.5px" : "1px"}
                spacing="0 0 5px 8px"
                image={colaborador?.foto}/>
               <Text 
                bold
                align="center"
                spacing="0 15px 0 0"
                color={colaborador._id === agendamento.colaboradorId ? "Black" : "headerFnt"}
                
                >
                  {colaborador?.nome}
                </Text>
          
             </Touchable>
           ))}
        </Box>
      </ScrollView>
    </Modal>
  )
}

export default EspecialistasModal