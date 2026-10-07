import ReactApexChart from "react-apexcharts";
//Gráfico de barras das tarefas canceladas, finalizadas e pendentes
export default function StatusChart({ todos }) {
  const situacoes = ["PENDENTE", "CONCLUIDA", "CANCELADA"];
  const nomes = ["Pendentes", "Concluídas", "Canceladas"];

  const quantidadePorSituacao = situacoes.map(
    (situacao) => todos.filter((todo) => todo.situacao === situacao).length
  );

  const series = [
    {
      name: "Tarefas",
      data: quantidadePorSituacao,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: nomes,
      title: {
        text: "Situação",
      },
    },
    yaxis: {
      min: 0,
      forceNiceScale: true,
      title: {
        text: "Quantidade",
      },
    },
    legend: {
      show: false,
    },
    noData: {
      text: "Nenhuma tarefa encontrada",
    },
  };

  return (
    <div className="mb-6 p-5 border border-gray-200 rounded-xl bg-gray-50">
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        Tarefas por situação
      </h3>

      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={300}
        width="100%"
      />
    </div>
  );
}
