import { useEffect, useState, useRef } from 'react'
import './style.css'
import api from '../../services/api'

function Categoria() {

  const [categorias, setCategorias] = useState([])
  //let categorias = []

  const inputName = useRef()
  const inputTipo = useRef()

  async function getCategorias() {
    const categoriaFromApi = await api.get('/api/v1/categoria')

    setCategorias(categoriaFromApi.data.categoria);
    // console.log(categoriaFromApi.data.categoria);

  }


  async function createCategorias() {
    await api.post('/api/v1/categoria', {
      nome: inputName.current.value,
      tipo: inputTipo.current.value
    })

    // console.log(inputName);
    getCategorias()
    inputName.current.value = ""
    inputTipo.current.value = ""

  }

   async function editCategorias(id) {
     nome: inputName.current.value,
     tipo: inputTipo.current.value

    // await api.post(`/api/v1/categoria/${id}`, {    })

    // console.log(inputName);
    // getCategorias()

  }


  async function deleteCategorias(id) {
    await api.delete(`/api/v1/categoria/${id}`)

    getCategorias()

  }



  useEffect(() => {
    getCategorias()
  },[])
 

  return (
     
        <div className='container'>
          <form action="">
            <h1>Cadastro de categoria</h1>
            <input placeholder="Nome da categoria" type="text" name='nome' ref={inputName}/>
            <input placeholder="Tipo da categoria" type="text" name='tipo' ref={inputTipo}/>
            <button type='button' onClick={createCategorias}>Salvar</button>
          </form>


          {categorias.map( categoria => (
            
            <div key= {categoria.id} className='card'>
              <div>
                <p>Nome: <span>{categoria.nome}</span></p>
                <p>Tipo: <span>{categoria.tipo}</span></p>
              </div>
              <div className='buttonCard'>
                <button type="button" onClick={() => editCategorias(categoria.id)}>
                  ✏️
                </button>
              </div>
              <div className='buttonCard'>
                <button type="button" onClick={() => deleteCategorias(categoria.id)}>
                  🗑️
                </button>
              </div>
            </div>

          ))}

          
        
        </div>
  )
}

export default Categoria
