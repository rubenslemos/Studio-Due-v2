import React from "react"
import { ScrollView } from "react-native-gesture-handler"
import Modal from 'react-native-simple-modal'
import {Text, Cover, Box, Touchable, Spacer} from '../../../styles'
import themes from '../../../styles/themes.json'
import util from '../../../util'
import {Dimensions} from 'react-native'
const EspecialistasModal = () => {
  return(
    <Modal
      open={false}
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