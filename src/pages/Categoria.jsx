import { useEffect, useMemo, useState } from "react";
import api from '../services/api'
import PageTitle from "../components/PageTitle";
import { Pencil, Plus, Search, Trash, UserCheck, Power } from "lucide-react";
import { getCurrentUser } from "../utils/auth";


  const emptyForm = {
    id: null,
    nome: "",
    tipo: ""
  };


export default function Categoria() {

  const user = getCurrentUser();
  const [categorias, setCategorias] = useState([])
  const [busca, setBusca] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("");


  async function carregar() {
    const c = await api.get("/api/v1/categoria");
    // return console.log(u.data.usuarios);
    setCategorias(c.data.categoria);
    //setPerfis(p.data);
  }


  useEffect(() => {
    carregar().catch(() => setStatus("Não foi possível carregar as categorias."));
  }, []);


    const filtrados = useMemo(() => {
      const q = busca.toLowerCase();
      return categorias.filter((c) =>
        [c.id, c.nome, c.tipo, c.ativo, c.criado_em, c.atualizado_em].some((v) =>
          String(v || "").toLowerCase().includes(q)
        )
      );
    }, [categorias, busca]);


  function novo() {
    setForm({
        ...emptyForm,
      });

      setShowForm(true);
      setStatus("");
    }


  function editar(categoria) {
    setForm({
      id: categoria.id,
      nome: categoria.nome,
      tipo: categoria.tipo,
      ativo: categoria.ativo
    });
    setShowForm(true);
    setStatus("");
  }
  


  async function salvar(e) {
    e.preventDefault();
    try {
      const payload = { ...form };
      // if (!payload.senha) delete payload.senha;
      // if (!payload.usuario_id) payload.user.id;

      if (form.id) {
        await api.put(`/api/v1/categoria/${form.id}`, payload);
        setStatus("Categoria atualizada com sucesso.");
      } else {
        await api.post("/api/v1/categoria", payload);
        setStatus("Categoria criada com sucesso.");
      }

      setShowForm(false);
      await carregar();
    } catch (error) {
      setStatus(error.response?.data?.message || "Erro ao salvar categoria.");
    }
  }




  async function excluir(categoria){
    try {
      await api.delete(`/api/v1/categoria/${categoria.id}`);
      await carregar();
      showForm(false);
    } catch (error) {
      setStatus(error.response?.data?.message || "Erro ao excluir categoria.");
    }
  }



  function limparFormulario() {
    setForm({
      ...emptyForm
    });
  }



  async function alternarAtivo(categoria) {
    try {
      await api.patch(`/api/v1/categoria/${categoria.id}/status`, { ativo: !categoria.ativo });
      await carregar();
    } catch (error) {
      setStatus(error.response?.data?.message || "Erro ao alterar status.");
    }
  }



 

  return (


      <div className="mx-auto max-w-7xl w-full min-w-0">

        <PageTitle
          title="Categorias"
          description="Cadastre, edite e controle as categorias."
          action={
            <button onClick={novo} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Nova categoria
            </button>
          }
        />

        {status && (
                <div className="mb-5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                  {status}
                </div>
              )}
        
              
        
              {showForm && (
                <form onSubmit={salvar} className="mb-6 w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div>
        
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">
                      {form.id ? "Editar categoria" : "Nova categoria"}
                    </h2>
                    <button type="button" onClick={() => setShowForm(false)} className="text-sm font-medium text-slate-500 hover:text-slate-900">
                      Cancelar
                    </button>
                  </div>
        
                  <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

                    <div>
                      <label htmlFor="nome" className="mb-1.5 block text-sm font-semibold text-slate-900"> Nome <span>*</span></label>
                        <input required placeholder="Ex.: Salário, Aluguel..." value={form.nome} onChange={(e) => setForm({...form, nome:e.target.value})} className="min-w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                    </div>
        
                    <div>
                      <label htmlFor="tipo" className="mb-1.5 block text-sm font-semibold text-slate-900"> Tipo <span>*</span></label>
                      <select value={form.tipo} onChange={(e) => setForm({...form, tipo:e.target.value})} className="min-w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                        <option value="">Selecione um tipo</option>
                          <option value="RECEITA">Receita</option>
                          <option value="DESPESA">Despesa</option>
                      </select>
                    </div>  

        
                  </div>

                    <div className="mt-8 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
                      <button onClick={limparFormulario} type="button" className="h-11 rounded-lg bg-slate-100 px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-200">
                        Limpar
                      </button>
        
                      <button type="submit" className="h-11 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700">
                        Salvar categoria
                      </button>
                    </div>
                    
                  </div>
                </form>
              )}
        
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-4">
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      placeholder="Buscar usuário..."
                      className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
        
                <div className="w-full min-w-0 overflow-x-auto">
                  <table className="w-full min-w-full]">
                    <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="uppercase text-xs text-center px-5 py-3">Data Criação</th>
                        <th className="uppercase text-xs text-center px-5 py-3">Nome</th>
                        <th className="uppercase text-xs text-center px-5 py-3">Tipo</th>
                        <th className="uppercase text-xs text-center px-5 py-3">Status</th>
                        <th className="uppercase text-xs text-center px-5 py-3">Data Atualização</th>
                        <th className="uppercase text-xs text-center px-0 py-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtrados.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50">
                          <td className="text-center text-xs font-semibold text-slate-500">{new Date(u.criado_em).toLocaleDateString("pt-BR")}</td>

                          <td className="text-center text-xs font-semibold text-slate-500">{u.nome}</td>


                          <td className="text-center font-semibold text-slate-500"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold 
                              ${u.tipo === "RECEITA"  ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{u.tipo}</span></td>
                          
                          {/* <td className="text-center text-xs font-semibold text-slate-500">{u.ativo ? "Ativo" : "Inativo"}</td> */}
                          
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${u.ativo ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                              {u.ativo ? <UserCheck className="h-3.5 w-3.5" /> : <UserX className="h-3.5 w-3.5" />}
                              {u.ativo ? "Ativo" : "Inativo"}
                            </span>
                          </td>
                          
                          <td className="text-center text-xs font-semibold text-slate-500">{new Date(u.atualizado_em).toLocaleDateString("pt-BR")}</td>
                           
                          
                          <td className="flex justify-center items-center text-xs font-semibold px-0 py-4">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => editar(u)} className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600" title="Editar">
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button onClick={() => alternarAtivo(u)} className={`rounded-lg p-2 ${u.ativo ? "text-slate-500 hover:bg-red-50 hover:text-red-600" : "text-emerald-600 hover:bg-emerald-50"}`} title={u.ativo ? "Inativar" : "Ativar"}>
                                <Power className="h-4 w-4" />
                              </button>
                              <button onClick={() => excluir(u)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" title="Excluir">
                                <Trash className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }
        


