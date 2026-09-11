import { useEffect, useState, useRef } from 'react'
import './style.css'
import api from '../../services/api'

function Categoria() {

  const [categorias, setCategorias] = useState([])
  const [categoriaEditando, setCategoriaEditando] = useState(null);

  //let categorias = []

  const inputName = useRef()
  const inputTipo = useRef()

  async function getCategorias() {
    const categoriaFromApi = await api.get('/api/v1/categoria')

    setCategorias(categoriaFromApi.data.categoria);
    // console.log(categoriaFromApi.data.categoria);

  }


  async function createCategorias() {

    const dados = {
      nome: inputName.current.value,
      tipo: inputTipo.current.value,
      ativo: "true"
    };

    try {

    if (categoriaEditando) {
      // EDITAR
      await api.put(`/api/v1/categoria/${categoriaEditando}`, dados);

    } else {
      // CRIAR
      await api.post('/api/v1/categoria', dados);

    }

    await getCategorias();

    inputName.current.value = "";
    inputTipo.current.value = "";

    setCategoriaEditando(null);

  } catch (error) {
    console.error("Erro ao salvar categoria:", error);
  }


  }

   async function editCategorias(categoria) {
    setCategoriaEditando(categoria.id);

    inputName.current.value = categoria.nome;
    inputTipo.current.value = categoria.tipo;
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
            <button type='button' onClick={createCategorias}>
               {categoriaEditando ? 'Atualizar categoria' : 'Salvar categoria'}
            </button>
          </form>


          {categorias.map( categoria => (
            
            <div key= {categoria.id} className='card'>
              <div>
                <p>Nome: <span>{categoria.nome}</span></p>
                <p>Tipo: <span>{categoria.tipo}</span></p>
              </div>
              <div className='buttonCard'>
                <button type="button" onClick={() => editCategorias(categoria)}>
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
