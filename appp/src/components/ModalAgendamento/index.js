import React, { useEffect }from "react"
import BottomSheet from 'reanimated-bottom-sheet'
import {Dimensions, ActivityIndicator} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import ModalHeader from './header'
import Resume from './resume'
import DateTime from './dateTime'
import Especialistas from './especialistas/index'
import EspModal from './especialistas/modal'
import Payment from './payment'
import {useSelector, useDispatch} from 'react-redux'
import {saveAgendamento, updateForm} from '../../store/modules/salao/actions'
import {Text, Box, Spacer, Touchable, Button, Titles} from '../../styles'
import themes from '../../styles/themes.json'
import util from '../../util'
import moment from "moment"
const ModalAgendamento = () => {
  const dispatch = useDispatch()
  const {form, agendamento, servicos, agenda, colaboradores} = useSelector((state) => state.salao)
  
  const servico = servicos.filter ((s) => s._id === agendamento.servicoId)[0]
  const dataSelecionada = moment(agendamento.data).format('YYYY-MM-DD')
  const horaSelecionada = moment(agendamento.data).format('HH:mm')

  const {horariosDisponiveis, colaboradoresDia} = util.selectAgendamento(
    agenda,
    dataSelecionada,
    agendamento.colaboradorId
  )

  const sheetRef = React.useRef(null)
  const setSnap = (snapIndex) => {
    sheetRef.current.snapTo(snapIndex)
  }
  useEffect(() => {
    if(form.modalAgendamento){
    setSnap(form.modalAgendamento)
  }
  }, [form.modalAgendamento])
  return (
    <BottomSheet
      ref={sheetRef}
      initialSnap={0}
      snapPoints={[0,70, Dimensions.get('window').height-20]}
      renderContent={ ()=>(
        <>
          <ScrollView 
            stickyHeaderIndices={[0]}
            style={{backgroundColor: '#fff', height: "100%"}}>
            <ModalHeader/>
            <Resume servico={servico}/>
            {agenda.length > 0 &&(
              <>
                <DateTime 
                  servico={servico}
                  servicos={servicos}
                  agendamento={agendamento}
                  agenda={agenda}
                  dataSelecionada={dataSelecionada}
                  horaSelecionada={horaSelecionada}
                  horariosDisponiveis={horariosDisponiveis}
                />
                <Especialistas
                  colaboradores={colaboradores}
                  agendamento={agendamento}
                />
                <Payment/>
                <Touchable onPress={() => dispatch(saveAgendamento())}>
                  <Box spacing='0 20px 10px 20px' removePaddingBottom>
                    <Button
                      loading={form.agendamentoLoading}
                      disabled={form.agendamentoLoading}
                      icon="check-bold"
                      uppercase={false}
                      textColor="headerBg"
                      background={util.toAlpha(themes.colors.headerFnt, 70)}
                      mode="contained"
                      block
                    >
                      Confirmar Agendamento
                    </Button>
                  </Box>
                </Touchable>
              </>
            )}
            {agenda.length === 0 &&(
              <Box
                background="branco"
                direction="column"
                height={Dimensions.get('window').height - 200 + 'px'}
                hasPadding
                justify="center"
                align="center">
                <ActivityIndicator
                  size="large"
                  color={themes.colors.CinzaChumbo}
                />
                <Spacer />
                <Titles align="center">Só um instante...</Titles>
                <Text align="center" small>
                  Estamos buscando o melhor horário pra você...
                </Text>
              </Box>
            )}
          </ScrollView>
          <EspModal
            form={form}
            colaboradores={colaboradores}
            agendamento={agendamento}
            servicos={servicos}
            servico={servico}
            horaSelecionada={horaSelecionada}
            colaboradoresDia={colaboradoresDia}
          />
        </>      
      )}
    />
  )
}

export default ModalAgendamento
