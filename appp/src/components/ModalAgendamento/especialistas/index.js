
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
            image="https://salao-studio-due.s3.sa-east-1.amazonaws.com/servicos/61607e0ec1bb4c1e46cc5830/1638576785730.png"
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