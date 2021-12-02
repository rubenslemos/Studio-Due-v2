import React from 'react';
import {FlatList} from 'react-native';
import Header from '../../components/Header';
import '../../config/reactotron';
import Servico from '../../components/Servico'
import ModalAgendamento from '../../components/ModalAgendamento';
const Home = () => {
  return(
   <>
      <FlatList 
        ListHeaderComponent={Header} 
        data={['a', 'b','c', 'd', 'e']}
        renderItem={({item})=>(<Servico key={item}/>)} 
        keyExtractor={(item) => item}
      />
      <ModalAgendamento/>
    </>
  )
};

export default Home;
