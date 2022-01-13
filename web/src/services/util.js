/* eslint-disable import/no-anonymous-default-export */
export default {
  validateEmail: (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  },
  allFields: (obj, keys) => {
    for (let key of keys) {
      if (!obj[key] || obj[key] === '' || obj[key].length === 0) {
        return false
      }
    }
    return true
  },
  selectAgendamento: (agenda, data : null, colaboradorId : null) => {
    let horariosDisponiveis = [];
    let colaboradoresDia = [];
  
    if (agenda.length > 0) {
      data = data || Object.keys(agenda?.[0])?.[0];
      const dia = agenda.filter((a) => Object.keys(a)[0] === data)?.[0];
      const diaObject = dia?.[data];
      if (diaObject) {
        colaboradorId = colaboradorId || Object.keys(diaObject)?.[0];
        colaboradoresDia = diaObject;
        horariosDisponiveis = diaObject?.[colaboradorId];
      }
    } 
    return {horariosDisponiveis, data, colaboradoresDia, colaboradorId};
  
  }
}