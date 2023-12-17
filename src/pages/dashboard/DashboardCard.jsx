import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

import logo from "assets/img/logo_sem_fundo.png";
import ContentPage from "layouts/content/ContentPage";

function DashboardCard() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: "60%",
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div>
      <ContentPage title="Dashboard" defaultCollapsed>
        <img
          src={logo}
          alt="Dispo"
          height={300}
          style={{ marginLeft: "40%" }}
        />
      </ContentPage>
      <ContentPage>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              height: "150px",
              border: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              backgroundColor: "#3B82F6",
              borderColor: "#3B82F6",
            }}
          >
            <div style={{ fontSize: "16px", color: "#fff" }}>
              Produtos com estoque alto: 5
            </div>
          </div>
          <div
            style={{
              width: "300px",
              height: "150px",
              border: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              backgroundColor: "#EAB308",
              borderColor: "#EAB308",
            }}
          >
            <div style={{ fontSize: "16px", color: "#fff" }}>
              Produtos com estoque baixo: 10
            </div>
          </div>
          <div
            style={{
              width: "300px",
              height: "150px",
              border: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              backgroundColor: "#22C55E",
              borderColor: "#22C55E",
            }}
          >
            <div style={{ fontSize: "16px", color: "#fff" }}>
              Valor do estoque: R$ 1400
            </div>
            <div style={{ fontSize: "16px", color: "#fff" }}>
              Valor de venda previsto: R$ 5000
            </div>
          </div>
        </div>
      </ContentPage>
      <ContentPage>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ height: "500px", width: "500px" }}>
            <Chart
              type="pie"
              data={chartData}
              options={chartOptions}
              className="w-full md:w-30rem"
            />
          </div>
          <div style={{ height: "200px", width: "500px" }}>
            <Chart
              type="bar"
              data={chartData}
              options={chartOptions}
              className="w-full md:w-30rem"
            />
          </div>
        </div>
      </ContentPage>
    </div>
  );
}

export default DashboardCard;
