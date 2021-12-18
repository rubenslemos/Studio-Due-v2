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
  // let colaboradoresIdsDisponiveis =[]
  // for(let colaboradorId of Object.keys(colaboradoresDia)) {
  //   let horarios = colaboradoresDia[colaboradorId].flat(2)
  //   if (horarios.includes(horaSelecionada)){
  //     colaboradoresDisponiveis.push(colaboradorId)
  //   }
  // }
  // const colaboradoresDisponiveis = colaboradores.filter((c) => colaboradoresDisponiveis.includes(c._id))

  return(
    <Modal
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
          <Text bold color="sidebarFntSel" align="flex-start" spacing="20px 0 0 20px">Corte de Cabelo Feminino</Text>
          <Spacer/>
          <Spacer/>
          <Text small color="headerFnt" align="flex-start"spacing="0 0 0 20px">Disponíveis em 19/04/2022 (Dom) às 11:30</Text>
        </Box>
        <Box wrap='wrap' spacing="10px 0 0" direction="row" hasPadding>
           {[1,2,3,4,5,6,7,8,9,10,11,12].map(colaborador=>(
             <Touchable 
              direction="column"
              height="70px"
              width={Math.floor((Dimensions.get('screen').width-100)/4)+"px"}
              spacing="0 0 10px 0"
              key={colaborador}
            >
               <Cover
                align="center" 
                height="50px" 
                width="50px" 
                circle 
                border={colaborador === 1? "2px" : "1px"}
                spacing="0 0 5px 8px"
                image="https://salao-studio-due.s3.sa-east-1.amazonaws.com/servicos/61607e0ec1bb4c1e46cc5830/1638576785730.png"/>
               <Text 
                small 
                bold
                align="flex-start" 
                color={colaborador === 1 ? "Black" : "headerFnt"}
                
                >
                  Flavia Lemos
                </Text>
          
             </Touchable>
           ))}
        </Box>
      </ScrollView>
    </Modal>
  )
}

export default EspecialistasModal