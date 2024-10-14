'use client';

import { useEffect } from 'react';
import { getAllKpis } from '@/src/core/kpi/repository/kpiRepository';
import { useKpisProvider } from '../../providers/kpi.provider';
import Chip from '@/src/ui/components/chip';
import QuestionCard from '../../../../components/questionCard';
import LinearChart from '@/src/ui/components/linearChart';
import PieChart from '@/src/ui/components/pieChart';
import DoughnutChart from '@/src/ui/components/doughnutChart';
import getAllKpisUseCase from '@/src/core/kpi/useCases/getAllKpisUseCase';

export default function Kpi() {
  const kpis = useKpisProvider((state) => state.kpis);
  const setKpis = useKpisProvider((state) => state.setKpis);
  const setSelectedKpi = useKpisProvider((state) => state.setSelectedKpi);
  const selectedKpi = useKpisProvider((state) => state.selectedKpi);

  useEffect(() => {
    const getKpis = async () => {
      const kpisFromBack = await getAllKpisUseCase();
      setKpis(kpisFromBack);
      setSelectedKpi(kpisFromBack[0]);
    };
    getKpis();
  }, [getAllKpisUseCase]);

  return (
    <>
      <div>
        <h1 className="subtitle">Kpis</h1>
        <p className="description">Select a Kpi to see more information about it.</p>
      </div>
      <div className="mt-4">
        {kpis.length ? (
          <>
            <label htmlFor="kpis">Kpis: </label>
            <select
              name="kpis"
              id="kpis"
              onChange={(event) => {
                const kpi = kpis.find((kpi) => kpi.id === Number(event.target.value));
                if (!kpi) return;
                setSelectedKpi(kpi);
              }}
            >
              {kpis.map((kpi) => (
                <option key={kpi.id} value={kpi.id}>
                  {kpi.name}
                </option>
              ))}
            </select>
          </>
        ) : (
          <p> There is not any kpi at the moment</p>
        )}
      </div>
      {selectedKpi ? (
        <div className="py-8">
          <h3 className="subtitle">{selectedKpi.name}</h3>
          <p className="description">{selectedKpi.description}</p>
          <div className="mt-4 gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Metric Ids </h3>
              <div className="flex gap-1 mt-2">
                {selectedKpi.metricIds.map((metriciD) => (
                  <Chip key={metriciD} text={metriciD} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Affiliate Applicability</h3>
              <div className="flex gap-1 mt-2">
                {selectedKpi.affiliateApplicability.map((affilated) => (
                  <Chip key={affilated} text={affilated} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="subtitle">Business Questions</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2">
              {selectedKpi.businesQuestions.map((businesQuestion) => (
                <QuestionCard
                  key={businesQuestion.id}
                  question={businesQuestion.question}
                  answer={businesQuestion.answer}
                />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="subtitle">Calculation</h3>
            {selectedKpi.calculations.map((calculation) => (
              <div key={calculation.name}>
                <span>{calculation.name}</span>
                <span className="text-sm font-bold"> - {calculation.formula}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="subtitle">Visuals</h3>
            <div className="flex gap-1 mt-2">
              {selectedKpi.visuals.map((visual) => (
                <Chip key={visual} text={visual} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
