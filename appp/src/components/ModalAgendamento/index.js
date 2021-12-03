import React from "react"
import BottomSheet from 'reanimated-bottom-sheet'
import {Dimensions} from 'react-native'
import ModalHeader from './header'
import Resume from './resume'
import DateTime from './dateTime'
import Especialistas from './especialistas/index'
import {ScrollView} from 'react-native-gesture-handler'
const ModalAgendamento = () => {
  return (
    <BottomSheet
      initialSnap={2}
      snapPoints={[0,70, Dimensions.get('window').height-20]}
      renderContent={ ()=>(      
        <ScrollView 
          stickyHeaderIndices={[0]}
          style={{backgroundColor: '#fff', height: "100%"}}>
          <ModalHeader/>
          <Resume/>
          <DateTime/>
          <Especialistas/>
        </ScrollView>
      )}
    />
  )
}

export default ModalAgendamento
