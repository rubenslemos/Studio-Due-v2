import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import Header from '../../components/Header';
import '../../config/reactotron';
import Servico from '../../components/Servico'
import ModalAgendamento from '../../components/ModalAgendamento';
import {useDispatch, useSelector} from 'react-redux'
import {getSalao, allServicos} from '../../store/modules/salao/actions'
const Home = () => {

  const dispatch = useDispatch()
  const { servicos, form } = useSelector((state) => state.salao)
  const finalServicos = form.inputFiltro.length > 0 ? servicos.filter((s)=> {
    const titulo = s.titulo.toLowerCase().trim()
    const arrSearch = form.inputFiltro.toLowerCase().trim().split(' ')
    return arrSearch.every((w) => titulo.search(w) !== -1)
  }): servicos

  useEffect(() => {
    dispatch(getSalao())
    dispatch(allServicos())
  },[])

  return(
   <>
      <FlatList 
        ListHeaderComponent={Header} 
        data={finalServicos}
        renderItem={({item})=>(<Servico servico={item} key={item}/>)} 
        keyExtractor={(item) => item}
      />
      <ModalAgendamento/>
    </>
  )
};

export default Home;
