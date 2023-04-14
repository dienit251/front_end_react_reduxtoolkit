export const barChartOptions = () => {
    return {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            },
        }
    }
}

export const doughnutChartOptions = () => {
    return {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right'
            },
        }
    }
}

export const buildDataChart = (arrayData, arrayLabel) => {
    return {
        datasets: [{
            data: arrayData,
            backgroundColor: ['rgb(43, 120, 228)', 'rgb(255, 140, 0)']
        }],
        labels: arrayLabel,
    }
}

export const buildDataColumnChart = (arrayData, arrayLabel) => {
    return {
        datasets: [{
            data: arrayData,
            backgroundColor: 'rgb(43, 120, 228)',
            label: 'Contract visited'
        }],
        labels: arrayLabel
    }
}