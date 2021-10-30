import Tabela from '../../components/Table/index'
import 'rsuite/dist/rsuite.css'
const Clientes = () => {
  return (
    <div className="col p-5 overflow-auto h-100">
    <div className="row">
      <div className="col-12">
        <div className="w-100 d-flex justify-content-between">
          <h2 className="mb-4 mt-0">Clientes</h2>
          <div>
            <button className="btn btn-primary">
              <span className="mdi mdi-account-plus-outline"> Novo Cliente</span>
            </button>
          </div>
        </div>
        <Tabela/>
      </div>
    </div>
  </div>
  )
}

export default Clientes