import { useEffect, useState, useRef } from 'react'
//import './index.css'
import api from '../services/api'
import PageTitle from "../components/PageTitle";
import { LockKeyhole, LogIn, UserRound } from "lucide-react";


function Transacoes() {

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
     
      <div className="mx-auto max-w-7xl">
        
          <PageTitle
              title="Cadastro de Categorias - [ Receitas e Despesas ]"
              description="Cadastre as categorias de receitas e despesas para gerenciar seu orçamento."
          />

          <div className="w-full max-w-full">

            
            <section className="flex flex-col justify-center items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-700">Nova transação</h2>
                <p className="text-sm text-slate-500">Registre uma receita ou despesa.</p>
              </div>
            </section>


            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm mt-4">

              <form action="" className="flex mb-4 w-full">

                <div className="w-96 flex-1">
                  <label for="tipo" className="block text-sm font-bold text-slate-700 mb-1">
                    Tipo *
                  </label>
                  <select id="tipo" required className="rounded-xl border border-slate-300 bg-white py-3 px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                    <option value="">Selecione</option>
                    <option value="RECEITA">Receita</option>
                    <option value="DESPESA">Despesa</option>
                  </select>
                </div>

                <div className="w-64 flex-1">
                  <label for="categoria_id" className="block text-sm font-bold text-slate-700 mb-1">Categoria *</label>
                  <select id="categoria_id" required className="rounded-xl border border-slate-300 bg-white py-3 px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                    <option value="">Selecione o tipo primeiro</option>
                  </select>
                </div>

                <div className="w-64 flex-1">
                  <label for="descricao" className="block text-sm font-bold text-slate-700 mb-1">Descrição *</label>
                  <input
                    type="text"
                    id="descricao"
                    maxlength="150"
                    placeholder="Ex.: Salário, supermercado, aluguel..."
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="relative">
                  <UserRound className="absolute left-3 top-1/3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input placeholder="Nome da categoria" type="text" name='nome' ref={inputName}
                      className="mb-4 w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      
                      />
                </div>

              </form>

            </div>





          </div>
        
      </div>
  )
}

export default Transacoes
