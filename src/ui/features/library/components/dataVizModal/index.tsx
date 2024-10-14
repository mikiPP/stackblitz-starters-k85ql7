import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ModalContent } from '@/src/ui/components/modal';
import { forwardRef } from 'react';
import { useUiProvider } from '@/src/ui/providers/ui.provider';
import removeIcon from '@/public/images/remove.png';
import { useKpisProvider } from '../../providers/kpi.provider';
import getAllKpisUseCase from '@/src/core/kpi/useCases/getAllKpisUseCase';
import { KpiModel } from '@/src/core/kpi/models/kpiModel';
import { Time, timeOptions } from '@/src/ui/utils/timeRange';
import LinearChart from '@/src/ui/components/linearChart';
import PieChart from '@/src/ui/components/pieChart';
import DoughnutChart from '@/src/ui/components/doughnutChart';
import { LayoutPage } from '../../viewModels/page';

function getChart(selectedKpi: KpiModel, chart: string, time: Time) {
  const datasets = ['asset1', 'asset2', 'asset3'];

  if (chart === 'line') {
    return <LinearChart time={time} chartTitle={selectedKpi.name} datasets={datasets} />;
  }
  if (chart === 'pie') {
    return <PieChart time={time} chartTitle={selectedKpi.name} labels={datasets} />;
  }
  if (chart === 'doughnut') {
    return <DoughnutChart time={time} chartTitle={selectedKpi.name} labels={datasets} />;
  }

  return null;
}

interface DataVizModalProps {
  onSubmit: (page: LayoutPage) => void;
}

export const DataVizModal = forwardRef<HTMLDivElement, DataVizModalProps>(({ onSubmit }, ref) => {
  const hideModal = useUiProvider((state) => state.hideModal);
  const kpis = useKpisProvider((state) => state.kpis);
  const setKpis = useKpisProvider((state) => state.setKpis);
  const [selectedKpi, setSelectedKpi] = useState<KpiModel>();
  const [chart, setSelectedChart] = useState<string>();
  const [time, setSelectedTime] = useState<Time>();

  useEffect(() => {
    const getKpis = async () => {
      const kpisFromBack = await getAllKpisUseCase();
      setKpis(kpisFromBack);
      setSelectedKpi(kpisFromBack[0] as KpiModel);
      setSelectedChart(kpisFromBack[0].visuals[0]);
      setSelectedTime(timeOptions[0] as Time);
    };
    getKpis();
  }, [setKpis, getAllKpisUseCase]);

  return (
    <ModalContent className="w-full max-w-3xl overflow-y-scroll md:w-full" ref={ref}>
      <div className="absolute flex gap-4 right-4 top-4">
        <button onClick={() => hideModal()} className="h-3 w-3">
          <span>
            <Image src={removeIcon} alt="close" sizes="cover" />
          </span>
        </button>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (!selectedKpi || !chart || !time) return;
          const graph = getChart(selectedKpi, chart, time);
          if (!graph) return;

          onSubmit({ time, chart: chart as string, kpi: selectedKpi, graph });
          hideModal();
        }}
      >
        <div className="flex gap-6 pt-12 pb-4 px-4 w-full bg-backgroud-color-500 border-b shadow-md">
          {kpis.length ? (
            <div>
              <label className="font-semibold" htmlFor="kpis">
                Kpis:
              </label>
              <select
                className="bg-backgroud-color-500"
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
            </div>
          ) : (
            <p> There is not any kpi at the moment</p>
          )}

          {selectedKpi && (
            <div>
              <label className="font-semibold" htmlFor="chat">
                Chart:
              </label>
              <select
                className="bg-backgroud-color-500"
                name="chart"
                id="chart"
                onChange={(event) => {
                  setSelectedChart(event.target.value);
                }}
              >
                {selectedKpi.visuals.map((visual) => (
                  <option className="capitalize" key={visual} value={visual}>
                    {visual}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="font-semibold" htmlFor="time">
              Time:
            </label>
            <select
              className="bg-backgroud-color-500"
              name="time"
              id="time"
              onChange={(event) => {
                setSelectedTime(event.target.value as Time);
              }}
            >
              {timeOptions.map((time) => (
                <option className="capitalize" key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="py-4 px-4 bg-backgroud-color-400 ">
          <h3 className="subtitle">Preview:</h3>
          <div>{selectedKpi && chart && time && getChart(selectedKpi, chart, time)}</div>
        </div>
        <div className="py-4 px-4">
          <button role="submit" className="rounded-md w-full bg-black text-white py-2">
            <span>Add to the layout</span>
          </button>
        </div>
      </form>
    </ModalContent>
  );
});
