import { Link } from "react-router";
import { BanknoteArrowDown, BanknoteArrowUp, Blocks, ShieldCheck, UserCheck, UserLockIcon, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../services/api";
import PageTitle from "../components/PageTitle";
import StatCard from "../components/StatCard";
import { getCurrentUser } from "../utils/auth";



const Dashboard = () => {

  const user = getCurrentUser();
  const [mesSelecionado, setMesSelecionado] = useState(() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; });
  const [stats, setStats] = useState({
    saldo: "-",
    despesas_previstas: "-",
    despesas_pagas: "-",
    despesas: "-",
    receitas_previstas: "-",
    receitass_pagas: "-",
    receita: "-",
    numero_transacoes: "-"

    //perfis: "-",
    //modulos: "-"
  });

useEffect(() => {
    api.get(`api/v1/dashboard/stats?mes=${mesSelecionado}`)
      .then(({ data }) => setStats(data))
      .catch(() => {});
  }, [mesSelecionado]);

  function navegarMes(delta) {
    const [ano, mes] = mesSelecionado.split("-").map(Number);
    const d = new Date(ano, mes - 1 + delta, 1);
    setMesSelecionado(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`);
  }
  const [anoMesAno, anoMesMes] = mesSelecionado.split("-").map(Number);
  const nomesMeses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

  return (

    <div className="mx-auto max-w-7xl">
      <PageTitle
        title={`Olá, ${user?.nome?.split(" ")[0] || user?.login}`}
        description="Visão geral financeira."
      />

      <div className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 w-fit">
        <CalendarDays className="h-4 w-4 text-slate-500" />
        <span className="text-xs font-bold text-slate-700">{nomesMeses[anoMesMes - 1]} {anoMesAno}</span>
        <button type="button" onClick={() => navegarMes(-1)} aria-label="Mês anterior" className="rounded-lg p-1 hover:bg-slate-100"><ChevronLeft className="h-5 w-5" /></button>
        <button type="button" onClick={() => navegarMes(1)} aria-label="Próximo mês" className="rounded-lg p-1 hover:bg-slate-100"><ChevronRight className="h-5 w-5" /></button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        
        <StatCard label="Saldo" value={stats.saldo ?? 0} icon={Users} hint="Saldo disponível" />
        <StatCard label="Total de Despesas" value={stats.despesas ?? 0} icon={UserCheck} hint="Todas as Despesas" />
        <StatCard label="Total de Receitas" value={stats.receitas ?? 0} icon={UserCheck} hint="Todas as Receitas" />
        <StatCard label="Despesas Previstas" value={stats.despesas_previstas ?? 0} icon={BanknoteArrowDown} hint="Despesas a pagar" />
        <StatCard label="Receitas Previstas" value={stats.receitas_previstas ?? 0} icon={BanknoteArrowUp} hint="Receitas previstas" />
        <StatCard label="Receitas Pagas" value={stats.receitas_pagas ?? 0} icon={BanknoteArrowUp} hint="Receitas pagas" />
        <StatCard label="Despesas Pagas" value={stats.despesas_pagas ?? 0} icon={BanknoteArrowUp} hint="Despesas pagas" />
        <StatCard label="Transações" value={stats.numero_transacoes ?? 0} icon={ShieldCheck} hint="Número de transações" />
        <StatCard label="Módulos" value={stats.modulos ?? 0} icon={Blocks} hint="Módulos disponíveis" />
      </div>

    </div>
  )
};

export default Dashboard;
