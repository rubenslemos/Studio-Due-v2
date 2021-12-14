const moment = require('moment')

module.exports = {
    isOpened: async(horarios) => {
        const horariosDia = horarios.filter((h) => h.dias.includes(moment().day()));
    if (horariosDia.length > 0) {
      // VERIFICANDO HORARIOS
      for (let h of horariosDia) {
        const inicio = moment(moment(h.inicio).format('HH:mm'), 'HH:mm:ss');
        const fim = moment(moment(h.fim).format('HH:mm'), 'HH:mm:ss');
        if (moment().isBetween(inicio, fim)) {
          return true;
        }
      }
      return false;
    }
    return false;
    },
    toCents: (price) => {
        return parseInt(price.toString().replace('.', '').replace('.', ''))
    },
    hourToMinutes: (hourMinute) => {
        //1:30
        const [hour, minutes] = hourMinute.split(':')
        return parseInt(parseInt(hour) * 60 + parseInt(minutes))
    },
    sliceMinutes: (start, end, duration) => {
        const slices = []
        let count = 0
            // hora inicial ex: 1:30 = 90 minutos
        start = moment(start)
            // hora inicial + duracao ex: 1:30 + 1:30 = 3:00 ou 180 minutos  
        end = moment(end)
        while (end > start) {

            slices.push(start.format('HH:mm'))
                // incrementa hora inicial com duração até ficar maior q hora final
            start.add(duration, 'minutes')
                // incrementa contador
            count++
        }
        return slices
    },
    slotDuration: 30,
    mergeDateTime: (date, time) => {
        const merged = `${moment(date).format('YYYY-MM-DD')}T${moment(time).format('HH:mm')}`
        return merged
    },
    splitByValue: (array, value) => {
        let newArray = [
            []
        ]
        array.forEach((item) => {
            if (item != value) {
                newArray[newArray.length - 1].push(item)
            } else {
                newArray.push([])
            }
        })
        return newArray
    }
}