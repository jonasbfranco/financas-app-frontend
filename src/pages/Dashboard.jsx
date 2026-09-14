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
    saldo: "-",
    despesas_pendentes: "-",
    receitas_pendentes: "-",
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
        <StatCard label="Saldo" value={stats.saldo ?? 0} icon={Users} hint="Saldo disponível" />
        <StatCard label="Despesas Previstos" value={stats.despesas_previstas ?? 0} icon={BanknoteArrowDown} hint="Despesas previstas" />
        <StatCard label="Receitas Previstas" value={stats.receitas_previstas ?? 0} icon={BanknoteArrowUp} hint="Receitas previstas" />
        <StatCard label="Despesas" value={stats.despesas ?? 0} icon={UserCheck} hint="Despesas" />
        <StatCard label="Receitas" value={stats.receitas ?? 0} icon={UserCheck} hint="Receitas" />
        <StatCard label="Transações" value={stats.numero_transacoes ?? 0} icon={ShieldCheck} hint="Número de transações" />
        <StatCard label="Módulos" value={stats.modulos ?? 0} icon={Blocks} hint="Módulos disponíveis" />
      </div>


      {/* <section className="flex flex-col justify-center items-start">
        <div className="w-96 h-40">
          <div className="text-xl mb-4 text-gray-700 items-center">Bem vindo a Dashboard</div>
          <Link to="/home"><button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 cursor-pointer">
            Home
          </button></Link>
        </div>
      </section> */}
    </div>
  )
};

export default Dashboard;
