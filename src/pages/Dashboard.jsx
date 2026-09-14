import { Link } from "react-router";
import { BanknoteArrowDown, BanknoteArrowUp, Blocks, ShieldCheck, UserCheck, UserLockIcon, Users } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api";
import PageTitle from "../components/PageTitle";
import StatCard from "../components/StatCard";
import { getCurrentUser } from "../utils/auth";



const Dashboard = () => {

  const user = getCurrentUser();
  const [stats, setStats] = useState({
    usuarios: "-",
    usuarios_ativos: "-",
    usuarios_inativos: "-",
    despesas_previstas: "-",
    receitas_previstas: "-"
    //perfis: "-",
    //modulos: "-"
  });

useEffect(() => {
    api.get("api/v1/dashboard/stats")
      .then(({ data }) => setStats(data))
      .catch(() => {});
  }, []);

  return (

    <div className="mx-auto max-w-7xl">
      <PageTitle
        title={`Olá, ${user?.nome?.split(" ")[0] || user?.login}`}
        description="Visão geral da administração e dos acessos ao portal."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Usuários cadastrados" value={stats.total_usuarios} icon={Users} hint="Total cadastrado" />
        <StatCard label="Usuários ativos" value={stats.usuarios_ativos} icon={UserCheck} hint="Com acesso liberado" />
        <StatCard label="Usuários inativos" value={stats.usuarios_inativos} icon={UserLockIcon} hint="Com acesso bloqueado" />
        <StatCard label="Perfis" value={stats.perfis} icon={ShieldCheck} hint="Perfis de acesso" />
        <StatCard label="Módulos" value={stats.modulos} icon={Blocks} hint="Módulos disponíveis" />
        <StatCard label="Despesas Previstos" value={stats.despesas_previstas} icon={BanknoteArrowDown} hint="Despesas previstas" />
        <StatCard label="Receitas Previstas" value={stats.receitas_previstas} icon={BanknoteArrowUp} hint="Receitas previstas" />
      </div>


      <section className="flex flex-col justify-center items-start">
        <div className="w-96 h-40">
          {/* <div className="text-xl mb-4 text-gray-700 items-center">Bem vindo a Dashboard</div> */}
          <Link to="/home"><button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 cursor-pointer">
            Home
          </button></Link>
        </div>
      </section>
    </div>
  )
};

export default Dashboard;
