import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import Header from '../../components/Header';
import '../../config/reactotron';
import Servico from '../../components/Servico'
import ModalAgendamento from '../../components/ModalAgendamento';
import {useDispatch} from 'react-redux'
import {getSalao} from '../../store/modules/salao/actions'
const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSalao())
  },[])

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
