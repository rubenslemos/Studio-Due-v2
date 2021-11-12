import Tabela from '../../components/Table'
import 'rsuite/dist/rsuite.css'
import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RemindFillIcon from '@rsuite/icons/RemindFill'
import vinculo from '../../data/vinculo.json'
import consts from '../../consts'
import { 
  allServicos, 
  updateServico, 
  addServico, 
  resetServico,
  removeServico,
  removeArquivo
} from '../../store/modules/servico/actions'
import { 
  Drawer, 
  Modal, 
  Button,
  SelectPicker,
  DatePicker,
  Uploader 
} from 'rsuite'
const Servicos = () => {
  
  const dispatch = useDispatch()
  const { servico, servicos, form, behavior, components } = useSelector((state) => state.Servicos)

  const setComponent = (component, state) => {
    dispatch(updateServico({
      components: {
        ...components,
        [component]: state
      }
    }))
  }
  const setServico = (key, value) => {
    dispatch(updateServico({
      servico: {
        ...servico,
        [key]: value
      }
    }))
  }

  console.log ("servico: ", servico)
  console.log ("servicos: ", servicos)
  
  const onRowClick = (servico) => {
    dispatch(
      updateServico({
        behavior: 'update',
        servico,
      })
      );
      setComponent('drawer', true);
    };
    // const remove = () => {
    //   dispatch(removeServico(servico._id))
    // }
    const save = () => { 
      dispatch(addServico())
  }

    useEffect(() => {
      dispatch(allServicos())
    },[dispatch])
   return (
    <div className="col p-5 overflow-auto h-100">
      <Drawer 
      open={components.drawer} 
      onClose={() => setComponent('drawer', false)}
      size="sm"
      className="drawer" 
      >
        <Drawer.Body className="drawer">
          <h2>{behavior === 'create'  ? 'Cadastrar novo': 'Atualizar dados do'} Serviço</h2>
          <div className="row mt-3">
          <div className="form-group col-12 ">
            <p>Serviço</p>
            <div class="input-group ">
                <input
                  type="text"
                  class="form-control rounded-end"
                  placeholder={behavior === 'create' ? "Nome do Serviço" : servico.titulo}
                  
                  onChange={(e) => {
                    setServico('titulo', e.target.value);
                  }}
                  value={servico.titulo}
                  />
            </div>
          </div>
          <div className="col-4">
            <p>Duração</p>
              <DatePicker
                block
                format="HH:mm" 
                ranges={[]}
                hideMinutes={(min)=>![0, 30].includes(min)}
                value={moment(servico.duracao).toDate()}
                onChange={(e) => setServico('duracao', e)}
                />
          </div>
          <div className="form-group col-4">
          <p>Preço (R$)</p>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control"
                placeholder="Preço do serviço"
                value={servico.preco}
                onChange={(e) => setServico('preco', e.target.value)}
                />
            </div>
          </div>          
          <div className="form-group col-4">
          <p>Comissão (%)</p>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control"
                placeholder="Comissão do serviço"
                value={servico.comissao}
                onChange={(e) => setServico('comissao', e.target.value)}
                />
            </div>
          </div>
          <div className="form-group col-4">
          <p>Recorrência (dias)</p>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control"
                value={servico.recorrencia}
                onChange={(e) => setServico('recorrencia', e.target.value)}
                />
            </div>
          </div>
          <div className="form-group col-3">
            <p>Status</p>
            <SelectPicker
              block
              size='ml'
              data={vinculo}
              value={servico.status}
              onChange={(status) => setServico('status', status)}
            />
          </div>
          <div className="col-5">
            <p>Data Cadastro</p>
              <DatePicker
                block 
                disabled={true}
                value={moment(servico.dataCadastro).toDate()}
                onChange={(e) => setServico('dataCadastro', e.target.value)}
                />
          </div>          
          <div className="form-group col-12">
            <p>Descrição</p>
            <div className="input-group">
              <input 
                type="textarea" 
                className="form-control"
                placeholder="Descrição do serviço"
                value={servico.descricao}
                onChange={(e) => setServico('descricao', e.target.value)}
                />
            </div>
          </div>
          <div className="form-group col-12">
            <p>Imagens Do Serviço</p>
            <Uploader
            className="border-0" 
            multiple
            autoUpload={false}
            listType="picture"
            defaultFileList={servico.arquivo.map((servico, index)=> ({
              name: servico.caminho,
              fileKey: index,
              url:`${consts.bucketUrl}/${servico.caminho}`
            })
            )}
            onChange={(files) =>{
              const arquivos = files
              .filter((f)=> f.blobFile)
              .map((f)=> f.blobFile)
              setServico('arquivo', arquivos)
            }}
            onRemove={(files) => {
              if (behavior === 'update' && files.url){
                dispatch(removeArquivo(files.name))
              }
            }}
            >
              <button>
                <span className="mdi mdi-camera-outline"/>
              </button>
            </Uploader>
          </div>
          <div className="form-group col-12">
            <p></p>
            <button
              className='button mx-auto save'
              loading={form.saving}
              onClick={() => save()}
            >
              {behavior === 'create' ? "Salvar" : "Atualizar"} Serviço
            </button> 
            <p></p>
            {behavior ==='update' && (
            <button
            className="button mx-auto save"
            loading={form.saving}
            onClick={() => { setComponent('confirmDelete', true)}}
            >
            Remover Serviço
          </button>)}
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
      <Modal
        open={components.confirmDelete}
        onHide={() => setComponent('confirmDelete', false)}
        size="xs"
        >
        <Modal.Body
        style={{
          fontFamily: 'Ubuntu',
          fontSize: 15,
          fontWeight: '500'
        }}
        >
              <RemindFillIcon
              style={{
                color: '#d40000',
                fontSize: 25,
              }}
              />
            
            {'    '} &nbsp;Tem certeza que deseja excluir Serviço?<br/> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ação Irreversível!         
        </Modal.Body>
        <Modal.Footer>
            <Button
              loading={form.saving}
              onClick={() => dispatch(removeServico())}
              color="red"
              appearance="primary"
              style={{
                fontFamily: 'Ubuntu',
                fontSize: 16,
                fontWeight: '500'
              }}
              >
              Excluir Serviço
            </Button>
            <Button
              onClick={() => setComponent('confirmDelete', false)}
              appearance='subtle'
              style={{
                fontFamily: 'Ubuntu',
                fontSize: 16,
                fontWeight: '500'
              }}
              >
                Cancelar
            </Button>
        </Modal.Footer>
      </Modal>
    <div className="row">
      <div className="col-12">
        <div className="w-100 d-flex justify-content-between">
          <h2 className="mb-4 mt-0">Serviços</h2>
          <div>
            <button 
              className="button"
              onClick={() =>{
                dispatch(resetServico())
                dispatch(updateServico({
                  behavior: 'create',
                  components: {
                    ...components,
                    drawer: true,
                  }
                }))
              }}
              >
              <span className="mdi mdi-account-plus-outline"> Novo Serviço</span>
            </button>
          </div>
        </div>
        <Tabela
           loading={form.filtering}
           data={servicos}
           config={[
             { 
               label: 'Servico',
               key: 'titulo',
               width: 250,
               fixed: true,
              },
              { 
                label: 'Preço',
                key: 'preco',
               width: 100,
               fixed: true,
               content: (p) => `R$ ${p.preco.toFixed(2)}`
              },              
              { 
               label: 'Recorrência',
               key: 'recorrencia',
               width: 100,
               fixed: true,
               align: 'center',
               content: (r) => `   ${r.recorrencia} dias`
              },
              {
              label: 'Duração',
              key: 'duracao',
              width: 200,
              fixed: true,
              content: (h) => moment(h.duracao).format('HH:mm [Horas]')
            },
           {
            label: 'Descrição',
            key: 'descricao'
           },
           { 
             label: 'Status',
             key: 'status',
             width: 80,
             fixed: true,
             content: (e) => e.status === 'A' ? "Ativo" : "Inativo"
           },
             { 
               label: 'Data Cadastro',
               key: 'dataCadastro',
               width: 100,
               fixed: true,
               content: (servicos) => moment(servicos.dataCadastro).format('DD/MM/YYYY')
              }
          ]}
          actions={(Servicos) => (
            <button 
              className="button bt"
            >
              Mais Informações
            </button>
          )}
          onRowClick={(c) => onRowClick(c)}
          />
      </div>
    </div>
  </div>
  )
}

export default Servicos