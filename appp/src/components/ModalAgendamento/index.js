import React, {useEffect} from "react"
import BottomSheet from 'reanimated-bottom-sheet'
import {Dimensions, ActivityIndicator} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import ModalHeader from './header'
import Resume from './resume'
import DateTime from './dateTime'
import Especialistas from './especialistas/index'
import EspModal from './especialistas/modal'
import Payment from './payment'
import {useSelector, useDispatch} from 'react-redux';
import {updateForm, saveAgendamento} from '../../store/modules/salao/actions';
import themes from '../../styles/themes.json';

import moment from 'moment';
import util from '../../util';
const ModalAgendamento = () => {
  const dispatch = useDispatch();

  const {form, servicos, agendamento, agenda, colaboradores} = useSelector(
    (state) => state.salao,
  );

  const servico = servicos.filter((s) => s._id === agendamento.servicoId)[0];
  const dataSelecionada = moment(agendamento.data).format('YYYY-MM-DD');
  const horaSelecionada = moment(agendamento.data).format('HH:mm');

  const {horariosDisponiveis, colaboradoresDia} = util.selectAgendamento(
    agenda,
    dataSelecionada,
    agendamento.colaboradorId,
  );

  const sheetRef = React.useRef(null);
  const setSnap = (snapIndex) => {
    sheetRef.current.snapTo(snapIndex);
  };

  useEffect(() => {
    setSnap(form.inputFiltroFoco ? 0 : form.modalAgendamento);
  }, [form.modalAgendamento, form.inputFiltroFoco]);

  return (
    <BottomSheet
<<<<<<< HEAD
      ref={sheetRef}
=======
      initialSnap={2}
>>>>>>> parent of 2f146e3 (erro pra pegar infos do salao)
      snapPoints={[0,70, Dimensions.get('window').height-20]}
      enabledBottomClamp
      enabledContentTapInteraction={false}
      onCloseEnd={() => {
      dispatch(
        updateForm(
          'modalAgendamento',
          form.modalAgendamento !== 0 ? form.modalAgendamento : 0,
        ),
      );
      }}
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
            <Resume  servicos={servicos} agendamento={agendamento} />
            <DateTime
              servico={servico}
              servicos={servicos}
              agendamento={agendamento}
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
