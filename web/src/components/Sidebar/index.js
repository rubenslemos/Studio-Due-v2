import logo from '../../assets/Titulo.jpg'
import { Link, withRouter } from 'react-router-dom'
const Sidebar = ({location}) => {
  return (
    <sidebar className="col-2 h-100">
    <img src={logo} alt={'Titulo'} className="img-fluid px-4 py-5"/>
    <ul>
    <Link to="/" className="text-decoration-none">
      <li className={location.pathname === '/' ? 'active' : ''}>
        <span className="mdi mdi-calendar-multiple-check"></span>
        <text>Agendamento</text>
      </li>
    </Link>
    <Link to="/clientes" className="text-decoration-none">
      <li className={location.pathname === '/clientes' ? 'active' : ''}>
        <span className="mdi mdi-account"></span>
        <text>Clientes</text>
      </li>
    </Link>
    <Link to="/colaboradores" className="text-decoration-none">
      <li className={location.pathname === '/colaboradores' ? 'active' : ''}>
        <span className="mdi mdi-card-account-details-outline"></span>
        <text>Colaboradores</text>
      </li>
    </Link>
    <Link to="/servicos" className="text-decoration-none">
      <li className={location.pathname === '/servicos' ? 'active' : ''}>
        <span className="mdi mdi-server"></span>
        <text>Serviços</text>
      </li>
    </Link>
    <Link to="/horarios" className="text-decoration-none">
      <li className={location.pathname === '/horarios' ? 'active' : ''}>
        <span className="mdi mdi-calendar-clock"></span>
        <text>Horários</text>
      </li>
    </Link>
    </ul>
    </sidebar>
  );
}

export default withRouter(Sidebar)