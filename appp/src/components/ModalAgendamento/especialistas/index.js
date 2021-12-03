
import React from 'react'
import {FlatList} from 'react-native-gesture-handler'
import {Box, Cover, Text, Button, Spacer} from '../../../styles'
import util from '../../../util'
import themes from '../../../styles/themes.json' 

const especialistas = () => {
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
            image="https://i.pinimg.com/originals/18/d7/ce/18d7ce992955c2e6138c05998cb0ad34.png"
            border="1px"
          />
          <Text bold small>Flávia Lemos</Text>
        </Box>
        <Box>
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
        </Box>
      </Box>
    </>
    )
}

export default especialistas