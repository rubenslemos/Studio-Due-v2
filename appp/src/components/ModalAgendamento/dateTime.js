import React from 'react'
import {FlatList} from 'react-native-gesture-handler'
import {Box, Titles, Text, Touchable, Spacer} from '../../styles'
import util from '../../util'
import themes from '../../styles/themes.json' 
const dateTime = () => {
  return (
    <>
      <Text bold color="sidebarFntSel" align="flex-start" hasPadding>Que dia gostaria de realizar o serviço? </Text>
      <FlatList
        styles={{margin: 20}}
        data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item)=> item.toString()}
        contentContainerStyle={{paddingLeft: 20}}
        renderItem={({ item }) => (
          <Touchable
            key={item}
            border="1px"
            width="70px"
            height="80px"
            spacing="0 10px 0 0"
            rounded="10px"
            direction="column"
            justify="center"
            align="center"
            background={item === 'c' ? util.toAlpha(themes.colors.headerFnt, 70) : "branco"}
          >
            <Spacer/>
            <Spacer/>
            <Text small color={item === 'c' ? "branco" : undefined}>Dom</Text>
            <Spacer/>
            <Titles small color={item === 'c' ? "branco" : undefined}>19</Titles>
            <Spacer/>
            <Text small color={item === 'c' ? "branco" : undefined}>Abril</Text>
          </Touchable>
        )}
      />
      <Text bold color="sidebarFntSel" align="flex-start" hasPadding>Qual horário? </Text>
      <FlatList
        data={[
          ["10:00","10:30"],
          ["11:00","11:30"],
          ["12:00","12:30"],
          ["13:00","13:30"],
          ["14:00","14:30"],
          ["15:00","15:30"],
          ["16:00","16:30"]
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingLeft: 20}}
        keyExtractor={(item)=> item.toString()}
        renderItem={({ item}) =>(
          <Box direction="column" spacing="0 10px 0 0" justify="center" align="center">
            {
            item.map(horario => (
              <Touchable
                key={horario}
                keyExtractor={(horario)=>horario.toString()}
                width="90px"
                height="35px"
                spacing="0 0 5px 0"
                background={horario === '12:00' ? util.toAlpha(themes.colors.headerFnt, 70) : "branco"}
                rounded="10px"
                border="1px"
                direction="column"
                justify="center"
                align="center"
              >
                <Text 
                  bold 
                  align="center" 
                  spacing="8px 0 0 0" 
                  color={horario === '12:00' ? "branco" : undefined}
                >
                  {horario}
                </Text>
              </Touchable>
            ))
            }
          </Box>
        )}
      />
    </>
  )
}

export default dateTime