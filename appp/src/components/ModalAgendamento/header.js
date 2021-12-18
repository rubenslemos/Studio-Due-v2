import React from 'react'
import {Touchable, GradientView, Text, Box, Titles, Spacer} from '../../styles'
import {View, StyleSheet} from 'react-native'
import themes from '../../styles/themes.json'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const ModalHeader = ({onPress = () => {}, form}) => {
  return (
    <View style={styles.headerContainer}>
      <GradientView 
        colors={[ themes.colors.sidebarFntSel, themes.colors.headerBg ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      >
        <Box>
          <Touchable onPress={onPress} hasPadding align="center">
            <Icon 
              name="chevron-left"
              color={themes.colors.branco}
              size={30}
            />
            <View style={{marginLeft: 5}}>
              <Titles small color="branco">Finalizar agendamento</Titles>
              <Spacer/>
              <Text small align='flex-start' color="branco">Horário, pagamento, especialista</Text>
            </View> 
          </Touchable>
        </Box>
      </GradientView>
    </View>
  ) 
}
const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 70,
  }
})
export default ModalHeader