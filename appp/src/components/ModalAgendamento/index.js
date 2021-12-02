import React from "react"
import BottomSheet from 'reanimated-bottom-sheet'
import {ScrollView, Dimensions} from 'react-native'
import ModalHeader from './header'
import Resume from './resume'
const ModalAgendamento = () => {
  return (
    <BottomSheet
      initialSnap={2}
      snapPoints={[0,70, Dimensions.get('window').height-20]}
      renderContent={ ()=>(      
        <ScrollView style={{backgroundColor: '#fff', height: "100%"}}>
          <ModalHeader/>
          <Resume/>
        </ScrollView>
      )}
    />
  )
}

export default ModalAgendamento
