import React, {useEffect} from "react"
import BottomSheet from 'reanimated-bottom-sheet'
import {Dimensions} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import ModalHeader from './header'
import Resume from './resume'
import DateTime from './dateTime'
import Especialistas from './especialistas/index'
import EspModal from './especialistas/modal'
import Payment from './payment'
import {useSelector, useDispatch} from 'react-redux'
import {updateForm} from '../../store/modules/salao/actions'
import util from '../../util'
import moment from 'moment'
const ModalAgendamento = () => {
  const dispatch = useDispatch()

  const {form, agendamento, servicos, agenda} = useSelector((state) => state.salao)

  const servico = servicos.filter((s)=> s._id === agendamento.servicoId)[0]
  const dataSelecionada = moment(agendamento.data).format('YYYY-MM-DD')
  const horaSelecionada = moment(agendamento.data).format("HH:mm")
  
  const {horariosDisponiveis, colaboradoresDia} = util.selectAgendamento(agenda, dataSelecionada, agendamento.colaboradorId)
  
  const sheetRef = React.useRef(null);
  const setSnap = (snapIndex) => {
    sheetRef.current.snapTo(snapIndex)
  }
  useEffect(() => {
    if(form.modalAgendamento){
      setSnap(form.inputFiltroFoco ? 0 : form.modalAgendamento)
    }
  }, [form.modalAgendamento, form.inputFiltroFoco])

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[0,70, Dimensions.get('window').height-20]}
      renderContent={ ()=>(
        <>
          <ScrollView 
            stickyHeaderIndices={[0]}
            style={{backgroundColor: '#fff', height: "100%"}}>
            <ModalHeader
              form={form}
              onPress={() => {
                dispatch(
                  updateForm(
                    'modalAgendamento',
                    form.modalAgendamento === 1 ? 2 : 1,
                  ),
                );
              }}
            />
            <Resume servico={servico}/>
            <DateTime 
              servico={servico} 
              agenda={agenda}
              dataSelecionada={dataSelecionada}
              horaSelecionada={horaSelecionada}
              horariosDisponiveis={horariosDisponiveis}
            />
            <Especialistas/>
            <Payment/>
          </ScrollView>
          <EspModal/>
        </>      
      )}
    />
  )
}

export default ModalAgendamento
