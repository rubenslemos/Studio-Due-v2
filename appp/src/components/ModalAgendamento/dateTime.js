import React from 'react'
import {FlatList} from 'react-native-gesture-handler'
import {Box, Titles, Text, Touchable, Spacer} from '../../styles'
import util from '../../util'
import themes from '../../styles/themes.json' 
import {useSelector, useDispatch} from 'react-redux'
import { updateAgendamento } from '../../store/modules/salao/actions'
import moment from 'moment/min/moment-with-locales';
moment.locale('pt-br');
const dateTime = ({
  servico,
  servicos,
  agendamento,
  agenda,
  dataSelecionada,
  horaSelecionada,
  horariosDisponiveis
}) => {
  const dispatch = useDispatch()

  const setAgendamentoData = (value, isTime=false) => {
    const {horariosDisponiveis} =util.selectAgendamento(
      agenda,
      isTime ? dataSelecionada : value
    )
    let data = !isTime
      ? `${value}T${horariosDisponiveis[0][0]}`
      : `${dataSelecionada}T${value}`
    dispatch(updateAgendamento({data}))
  }
  return (
    <>
      <Text bold color="sidebarFntSel" align="flex-start" hasPadding>Que dia gostaria de realizar o serviço? </Text>
      <FlatList
        styles={{margin: 20}}
        data={agenda}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingLeft: 20}}
        renderItem={({ item }) => {
          const date = moment(Object.keys(item)[0]);
          const dateISO = moment(date).format('YYYY-MM-DD');
          const selected = dateISO === dataSelecionada;          
          return (
          <Touchable
            key={dateISO}
            border="1px"
            width="70px"
            height="80px"
            spacing="0 10px 0 0"
            rounded="10px"
            direction="column"
            justify="center"
            align="center"
            background={selected ? util.toAlpha(themes.colors.headerFnt, 70) : "branco"}
            onPress={() => setAgendamentoData(dateISO)}
          >
            <Spacer/>
            <Spacer/>
            <Text small bold color={selected ? "branco" : undefined}>{util.diasSemana[date.day()]}</Text>
            <Spacer/>
            <Titles small bold color={selected ? "branco" : undefined}>{date.format('DD')}</Titles>
            <Spacer/>
            <Text small bold color={selected ? "branco" : undefined}>{date.format('MMMM')}</Text>
          </Touchable>
        )}}
        keyExtractor={(item, index)=>index.toString()}
      />
      <Text bold color="sidebarFntSel" align="flex-start" hasPadding>Qual horário? </Text>
      <FlatList
        data={horariosDisponiveis}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingLeft: 20}}
        renderItem={({ item, index}) =>(
          <Box direction="column" spacing="0 10px 0 0" justify="center" align="center">
            {
            item.map(horario => {
              const selected = horario === horaSelecionada
              return (
               <Touchable
                  key={horario}
                  width="90px"
                  height="35px"
                  spacing="0 0 5px 0"
                  background={selected ? util.toAlpha(themes.colors.headerFnt, 70) : "branco"}
                  rounded="10px"
                  border="1px"
                  direction="column"
                  justify="center"
                  align="center"
                  onPress={() => setAgendamentoData(horario, true)}
                  >
                  <Text 
                    bold 
                    align="center" 
                    spacing="8px 0 0 0" 
                    color={selected ? "branco" : undefined}
                    >
                    {horario}
                  </Text>
                </Touchable>
              )
            })
          }
          </Box>
        )}
        keyExtractor={(item, index)=>index.toString()}
      />
    </>
  )
}

export default dateTime