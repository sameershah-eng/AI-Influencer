import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bot, 
  Cpu, 
  ShieldCheck, 
  Check, 
  RotateCw, 
  Zap, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Sliders,
  Activity
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AgentConfig } from '../types';

export const AgentsAutomation: React.FC = () => {
  const { agents, updateAgent, agentLogs, addToast } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleToggleActive = (agent: AgentConfig) => {
    updateAgent(agent.id, { isActive: !agent.isActive });
    addToast({
      title: agent.isActive ? `${agent.name} Paused` : `${agent.name} Activated`,
      type: agent.isActive ? 'warning' : 'success'
    });
  };

  const handleToggleApproval = (agent: AgentConfig) => {
    updateAgent(agent.id, { requiresHumanApproval: !agent.requiresHumanApproval });
    addToast({
      title: `Governance Updated: ${agent.name}`,
      message: !agent.requiresHumanApproval
        ? 'Now requires human sign-off before proceeding.'
        : 'Running in fully autonomous mode.',
      type: 'info'
    });
  };

  const filteredLogs = agentLogs.filter(log => {
    if (filterStatus === 'all') return true;
    return log.status === filterStatus;
  });

  return (
    <div className="space-y-8 pb-16 max-w-6xl">
      {/* Header Banner */}
      <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#E65100]" />
            <h2 className="font-editorial text-xl font-bold text-[#16141F]">
              Autonomous Agent Orchestration Chain
            </h2>
          </div>
          <p className="text-xs text-[#6E687A] max-w-2xl leading-relaxed">
            The multi-agent pipeline executing trend analysis, script synthesis, visual prompt locking, vocal generation, and performance learning.
            <strong className="text-[#16141F] font-semibold ml-1">
              Toggle human approval checkpoints below.
            </strong>
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] text-xs font-semibold text-[#16141F]">
          <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>Agent Chain: Active (6 Nodes)</span>
        </div>
      </div>

      {/* Visual Workflow Flowchart (DAG Strip) */}
      <div className="p-6 rounded-[24px] bg-white border border-[#E8E2D8] card-shadow space-y-4 overflow-x-auto">
        <h3 className="font-editorial text-base font-semibold text-[#16141F]">
          Production Pipeline DAG Sequence
        </h3>

        <div className="flex items-center gap-3 min-w-[880px] py-2">
          {agents.map((agent, idx) => (
            <React.Fragment key={agent.id}>
              <div className="flex-1 p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#E65100]">
                    0{idx + 1}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${agent.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                </div>
                <div className="font-editorial text-xs font-bold text-[#16141F] truncate">
                  {agent.name}
                </div>
                <div className="text-[10px] text-[#7A7585] truncate">
                  {agent.role}
                </div>
              </div>

              {idx < agents.length - 1 && (
                <ArrowRight className="w-4 h-4 text-[#C8C2B5] shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Agent Cards Grid with Control Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`p-5 rounded-[22px] border card-shadow transition-all space-y-4 ${
              agent.isActive ? 'bg-white border-[#E8E2D8]' : 'bg-[#FAF8F5] border-[#E8E2D8] opacity-75'
            }`}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C05621] block">
                  {agent.role}
                </span>
                <h4 className="font-editorial text-lg font-bold text-[#16141F] mt-0.5">
                  {agent.name}
                </h4>
              </div>

              {/* On/Off Toggle Button */}
              <button
                onClick={() => handleToggleActive(agent)}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  agent.isActive ? 'text-emerald-600 hover:bg-emerald-50' : 'text-[#8C8797] hover:bg-[#EFEBE4]'
                }`}
                title={agent.isActive ? 'Pause Agent' : 'Activate Agent'}
              >
                {agent.isActive ? (
                  <ToggleRight className="w-6 h-6" />
                ) : (
                  <ToggleLeft className="w-6 h-6" />
                )}
              </button>
            </div>

            <p className="text-xs text-[#5C5666] leading-relaxed">
              {agent.description}
            </p>

            {/* Model & Latency Telemetry */}
            <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#ECE5D8] text-[11px] space-y-1">
              <div className="flex items-center justify-between text-[#7A7585]">
                <span>Engine / Model:</span>
                <strong className="text-[#16141F] font-semibold">{agent.model}</strong>
              </div>
              <div className="flex items-center justify-between text-[#7A7585]">
                <span>Average Latency:</span>
                <span className="font-mono text-[#16141F]">{agent.latencyMs}ms</span>
              </div>
              <div className="flex items-center justify-between text-[#7A7585]">
                <span>Last Execution:</span>
                <span className="text-[#16141F]">{agent.lastRunTime}</span>
              </div>
            </div>

            {/* Requires Human Approval Toggle */}
            <div className="pt-2 border-t border-[#F2ECE1] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[#4A4553] font-medium">
                <ShieldCheck className={`w-3.5 h-3.5 ${agent.requiresHumanApproval ? 'text-[#D81B60]' : 'text-[#9892A2]'}`} />
                <span>Require Human Sign-Off</span>
              </div>

              <input
                type="checkbox"
                checked={agent.requiresHumanApproval}
                onChange={() => handleToggleApproval(agent)}
                className="w-4 h-4 accent-[#FF8A65] cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Agent Execution Audit Log */}
      <div className="p-6 rounded-[24px] bg-white border border-[#E8E2D8] card-shadow space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-editorial text-lg font-bold text-[#16141F]">
              Live Agent Execution Audit Trail
            </h3>
            <p className="text-xs text-[#7A7585]">
              Real-time traces of prompt dispatches, API calls, and validation checkpoints
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F3] border border-[#E5DFD4]">
            {['all', 'success', 'warning', 'error'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 text-xs rounded-lg font-medium capitalize cursor-pointer ${
                  filterStatus === st ? 'bg-white shadow-xs font-semibold text-[#16141F]' : 'text-[#7A7585]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {filteredLogs.map(log => {
            const statusBadges = {
              success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
              warning: 'bg-amber-50 text-amber-800 border-amber-200',
              error: 'bg-rose-50 text-rose-800 border-rose-200',
              in_progress: 'bg-indigo-50 text-indigo-800 border-indigo-200'
            };

            return (
              <div
                key={log.id}
                className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0 ${statusBadges[log.status]}`}>
                    {log.status}
                  </span>
                  <div>
                    <div className="font-semibold text-[#16141F] flex items-center gap-2">
                      <span>{log.agentName}</span>
                      <span className="text-[#8C8797] font-normal">• {log.action}</span>
                    </div>
                    <p className="text-[#5C5666] mt-0.5 leading-snug">
                      {log.detail}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-[#8C8797] shrink-0">
                  {log.timestamp}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
