// eslint-disable-next-line import/no-anonymous-default-export
export default{
  hourToMinutes: (hourMinute) => {
  //1:30
  const [hour, minutes] = hourMinute.split(':')
  return parseInt(parseInt(hour) * 60 + parseInt(minutes))
}}