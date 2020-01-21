async function getData() {
    const xAxis = [];
    const yAxis = [];

    const moedaAlvo = form.exPara.value;
    const response = await fetch('./data/historicalSeries.csv');
    const data = await response.text();
    
    const rows = data.split('\n');
    const title = rows.shift();
    const currency = title.split(',');
    const index = currency.indexOf(moedaAlvo);
    
    rows.forEach(row => {
        const columns = row.split(',');
        const periodoTempo = columns[0];

        xAxis.unshift(periodoTempo);
        yAxis.unshift(columns[index]);
    });
    
    return { xAxis, yAxis, moedaAlvo }
}

/* timeSeries(); / getData(); */
createChart();

async function createChart() {

    const dataset = await getData();

    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dataset.xAxis,
        datasets: [{
            label: "Cotação com base no Euro",
            data: dataset.yAxis,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: '#00ADB5',
            borderWidth: 1,
            fill: false,
            pointRadius: 0,
            lineTension: 0,
            responsive: true,
        }]
    },
    options: {
        legend: {
            position: 'top',
            align: 'end',
            labels: {
                boxWidth: 20,
                fontSize: 9,
            }
        },
        events: [],
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    callback: function(value, index, values) {
                        return value.toLocaleString('pt-BR', { style : 'currency', currency: dataset.moedaAlvo });;
                    }
                }
            }]
        }
    }
});
}