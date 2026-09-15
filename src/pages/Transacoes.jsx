import { useEffect, useState, useRef } from 'react'
//import './index.css'
import api from '../services/api'
import PageTitle from "../components/PageTitle";
import { LockKeyhole, LogIn, Search, UserRound } from "lucide-react";


function Transacoes() {

  const [transacoes, setTransacoes] = useState([])
  const [transacoesEditando, setTransacoesEditando] = useState(null);

  

  const inputName = useRef()
  const inputTipo = useRef()

  async function getTransacoes() {
    const transacoesFromApi = await api.get('/api/v1/transactions')

    setTransacoes(transacoesFromApi.data.transacao);
    console.log(transacoesFromApi.data.transacao);

  }


  async function createTransacoes() {

    const dados = {
      nome: inputName.current.value,
      tipo: inputTipo.current.value,
      ativo: "true"
    };

    try {

    if (transacoesEditando) {
      // EDITAR
      await api.put(`/api/v1/transactions/${transacoesEditando}`, dados);

    } else {
      // CRIAR
      await api.post('/api/v1/transactions', dados);

    }

    await getTransacoes();

    inputName.current.value = "";
    inputTipo.current.value = "";

    setTransacoesEditando(null);

  } catch (error) {
    console.error("Erro ao salvar categoria:", error);
  }


  }

   async function editTransacoes(categoria) {
    setTransacoesEditando(categoria.id);

    inputName.current.value = categoria.nome;
    inputTipo.current.value = categoria.tipo;
  }


  async function deleteTransacoes(id) {
    await api.delete(`/api/v1/transactions/${id}`)

    getTransacoes()

  }



  useEffect(() => {
    getTransacoes()
  },[])
 
  const inputClass = "h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";



  return (

     
      <div className="mx-auto min-w-0 w-full max-w-7xl overflow-x-hidden">
        
          <PageTitle
              title="Cadastro de Transações"
              description="Cadastre todas as Transações de Receitas e Despesas para gerenciar seu orçamento."
          />

          <div className="w-full max-w-full">

            
            <section className="flex flex-col justify-center items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-700">Nova transação</h2>
                <p className="text-sm text-slate-500">Registre uma receita ou despesa.</p>
              </div>
            </section>



              <form action="" className="flex mb-4 w-full">

                <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 mt-4">

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

                    <div>
                      <label
                        for="tipo"
                        className="mb-1.5 block text-sm font-semibold text-slate-900"
                      >
                        Tipo <span>*</span>
                      </label>

                      <select
                        id="tipo"
                        className={inputClass}
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="RECEITA">Receita</option>
                        <option value="DESPESA">Despesa</option>
                      </select>
                    </div>

                  
                    <div>
                      <label
                        for="categoria"
                        className="mb-1.5 block text-sm font-semibold text-slate-900"
                      >
                        Categoria <span>*</span>
                      </label>

                      <select
                        id="categoria"
                        disabled
                        className={inputClass}
                      >
                        <option value="">Selecione o tipo primeiro</option>
                      </select>
                    </div>

                  
                    <div className="lg:col-span-1">
                      <label
                        for="descricao"
                        className="mb-1.5 block text-sm font-semibold text-slate-900"
                      >
                        Descrição <span>*</span>
                      </label>

                      <input
                        id="descricao"
                        type="text"
                        placeholder="Ex.: Salário, supermercado, aluguel..."
                        className={inputClass}
                      />
                    </div>

                  
                    <div>
                      <label
                        for="valor"
                        className="mb-1.5 block text-sm font-semibold text-slate-900"
                      >
                        Valor <span>*</span>
                      </label>

                      <div
                        className="flex h-11 overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
                      >
                        <span
                          className="flex w-11 shrink-0 items-center justify-center border-r border-slate-200 bg-slate-50 text-sm text-slate-500"
                        >
                          R$
                        </span>

                        <input
                          id="valor"
                          type="text"
                          placeholder="0,00"
                          className="min-w-0 flex-1 border-0 px-3.5 text-base text-slate-900 outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>


                    <div>
                      <label
                        for="tipodepagamento"
                        className="mb-1.5 block text-sm font-semibold text-slate-900"
                      >
                        Tipo <span>*</span>
                      </label>

                      <select
                        id="tipodepagamento"
                        className={inputClass}
                      >
                        <option value="">Selecione</option>
                        <option value="PIX">Pix</option>
                        <option value="CREDITO">Credito</option>
                        <option value="DEBITO">Debito</option>
                        <option value="DEBITO CC">Debito C. Corrente</option>
                        <option value="VALE REFEICAO">Vale Refeição</option>
                      </select>
                    </div>


                    <div>
                      <label
                        for="data"
                        className="mb-1.5 block text-sm font-semibold text-slate-900"
                      >
                        Data <span>*</span>
                      </label>

                      <input
                        id="data"
                        type="date"
                        className={inputClass}
                      />
                    </div>


                    <div>
                      <label
                        for="status"
                        className="mb-1.5 block text-sm font-semibold text-slate-900"
                      >
                        Status <span>*</span>
                      </label>

                      <select
                        id="status"
                        className={inputClass}
                      >
                        <option value="PENDENTE">Pendente</option>
                        <option value="PAGO">Pago</option>
                        <option value="CANCELADO">Cancelado</option>
                      </select>
                    </div>

                  </div>


                  <div
                    className="mt-8 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end"
                  >
                    <button
                      type="reset"
                      className="h-11 rounded-lg bg-slate-100 px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
                    >
                      Limpar
                    </button>

                    <button
                      type="submit"
                      className="h-11 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Salvar transação
                    </button>
                  </div>

                </div>


              </form>

            </div>



          {/* PESQUISA */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/3 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input placeholder="Digite o texto para buscar" type="text" name='tipo' 
                  className="mb-4 w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
            </div>
          </div>





         <div className="w-full min-w-0 max-w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">

  {/* Cabeçalho */}
  <div className="hidden bg-slate-50 px-3 py-3 text-xs font-semibold uppercase text-slate-600 lg:grid lg:grid-cols-12">

    <div className="min-w-0 lg:col-span-1">
      Data
    </div>

    <div className="min-w-0 lg:col-span-1">
      Tipo
    </div>

    <div className="min-w-0 lg:col-span-1">
      Categoria
    </div>

    <div className="min-w-0 lg:col-span-5">
      Descrição
    </div>

    <div className="min-w-0 lg:col-span-1">
      Valor
    </div>

    <div className="min-w-0 lg:col-span-1">
      Status
    </div>

    <div className="min-w-0 lg:col-span-2">
      Ações
    </div>

  </div>


  {/* Transações */}
  {transacoes.map((transacao) => (

    <div
      key={transacao.id}
      className="grid min-w-0 grid-cols-2 gap-y-4 border-b border-slate-200 px-3 py-4 lg:grid-cols-12 lg:items-center lg:gap-y-0"
    >

      {/* DATA */}
      <div className="min-w-0 lg:col-span-1">
        <p className="text-xs font-semibold uppercase text-slate-500 lg:hidden">
          Data
        </p>

        <span className="text-sm text-slate-900">
          {new Date(transacao.data).toLocaleDateString("pt-BR")}
        </span>
      </div>


      {/* TIPO */}
      <div className="min-w-0 lg:col-span-1">
        <p className="text-xs font-semibold uppercase text-slate-500 lg:hidden">
          Tipo
        </p>

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            transacao.tipo === "RECEITA"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {transacao.tipo}
        </span>
      </div>


      {/* CATEGORIA */}
      <div className="min-w-0 lg:col-span-1">
        <p className="text-xs font-semibold uppercase text-slate-500 lg:hidden">
          Categoria
        </p>

        <span className="text-sm text-slate-900">
          {transacao.categoria_id}
        </span>
      </div>


      {/* DESCRIÇÃO */}
      <div className="col-span-2 min-w-0 lg:col-span-5">
        <p className="text-xs font-semibold uppercase text-slate-500 lg:hidden">
          Descrição
        </p>

        <span className="block min-w-0 max-w-full truncate text-sm text-slate-900">
          {transacao.descricao}
        </span>
      </div>


      {/* VALOR */}
      <div className="min-w-0 lg:col-span-1">
        <p className="text-xs font-semibold uppercase text-slate-500 lg:hidden">
          Valor
        </p>

        <span
          className={`text-sm font-semibold ${
            transacao.tipo === "RECEITA"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {transacao.tipo === "RECEITA" ? "+" : "-"} R${" "}
          {Number(transacao.valor).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </span>
      </div>


      {/* STATUS */}
      <div className="min-w-0 lg:col-span-1">
        <p className="text-xs font-semibold uppercase text-slate-500 lg:hidden">
          Status
        </p>

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            transacao.status === "PAGO"
              ? "bg-green-100 text-green-700"
              : transacao.status === "PENDENTE"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {transacao.status}
        </span>
      </div>


      {/* AÇÕES */}
      <div className="col-span-2 min-w-0 lg:col-span-2">
        <p className="mb-2 text-xs font-semibold uppercase text-slate-500 lg:hidden">
          Ações
        </p>

        <div className="flex flex-wrap gap-2">

          <button
            type="button"
            onClick={() => editTransacoes(transacao)}
            className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Editar
          </button>

          <button
            type="button"
            onClick={() => deleteTransacoes(transacao.id)}
            className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
          >
            Excluir
          </button>

        </div>
      </div>

    </div>

  ))}

</div>






        </div>

  )
}

export default Transacoes
