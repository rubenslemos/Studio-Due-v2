import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import Header from '../../components/Header';
import '../../config/reactotron';
import Servico from '../../components/Servico'
import ModalAgendamento from '../../components/ModalAgendamento';
import {useDispatch,  useSelector} from 'react-redux'
import {getSalao, allServicos} from '../../store/modules/salao/actions'
const Home = () => {

  const dispatch = useDispatch()
  const {Servicos, form} = useSelector((state) => state.salao);

  const finalServicos =
    form.inputFiltro.length > 0
      ? Servicos.filter((s) => {
          const titulo = s.titulo.toLowerCase().trim();
          const arrSearch = form.inputFiltro.toLowerCase().trim().split(' ');
          return arrSearch.every((w) => titulo.search(w) !== -1);
        })
      : Servicos;
  useEffect(() => {
    dispatch(getSalao())
    dispatch(allServicos())
  },[])

  return(
   <>
      <FlatList 
        ListHeaderComponent={Header} 
        data={finalServicos}
        renderItem={({item})=>(<Servico key={item._id} item={item}/>)} 
        keyExtractor={(item) => item._id}
      />
      <ModalAgendamento/>
    </>
  )
};

export default Home;
