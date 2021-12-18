import React, { useEffect }from "react"
import BottomSheet from 'reanimated-bottom-sheet'
import {Dimensions} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import ModalHeader from './header'
import Resume from './resume'
import DateTime from './dateTime'
import Especialistas from './especialistas/index'
import EspModal from './especialistas/modal'
import Payment from './payment'
import {useSelector} from 'react-redux'
import util from '../../util'
import moment from "moment"
const ModalAgendamento = () => {
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
