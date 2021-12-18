
import React from 'react'
import {FlatList} from 'react-native-gesture-handler'
import {Box, Cover, Text, Button, Spacer, Touchable} from '../../../styles'
import util from '../../../util'
import themes from '../../../styles/themes.json' 
import {useDispatch} from 'react-redux'
import { updateForm } from '../../../store/modules/salao/actions'

const Especialistas = ({colaboradores, agendamento}) => {
  
  const colaborador = colaboradores.filter((c) => c._id === agendamento.colaboradorId)[0]

  dispatch = useDispatch()

  return (
    <>
      <Text bold color="sidebarFntSel" align="flex-start" spacing="20px 20px 0 20px ">
        Gostaria de trocar de profissional?
      </Text>
      <Box hasPadding>
        <Box align="center">
          <Cover
            width="50px"
            height="50px"
            circle
            image={colaborador?.foto}
            border="1px"
          />
          <Text bold>{colaborador?.nome}</Text>
        </Box>
        <Box>
          <Touchable 
            onPress={() => dispatch(updateForm({modalEspecialista: true}))}
            spacing="10px 0 0 0"
          >         
            <Button
              icon="sync"
              uppercase={false}
              textColor="headerBg"
              background={util.toAlpha(themes.colors.headerFnt, 70)}
              mode="contained"
              block
            >
            Trocar de Especialista
          </Button>
          </Touchable>
        </Box>
      </Box>
    </>
    )
}

export default Especialistas