import ApexCharts from 'apexcharts'

// Déffinir un nouveau graphique.
let chartApexObj = null;
createChart();

// Création d'un nouveau graphique avec chaques fonctions.
function createChart() {
    const datasets = createDatasets();
    const options = createOptions(datasets);
    //Nouveau graphique avec mise à jours des données à chaque intervale.
    chartApexObj = new ApexCharts(document.querySelector("#chart-apex"), options);
    chartApexObj.render().then((res) => {
        setInterval(() => {
            updateDataset();
        }, 5000)
    });
}

// Création du tableau contenant les légendes (labels) et les données (totalValues) contenu dans datasets.
function createDatasets() {
    const datasets = [];
    for (let j = 0; j < labels.length; j++) {
        datasets.push({
            name: labels[j],
            data: totalValues[j],
        })
    }
    return datasets;
}

// Options du graphique.
function createOptions(datasets) {
    const options = {
        series: datasets,
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Météo avec Apex.js',
            align: 'center'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // Ce tableau est répété sur les colonnes.
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['lun.', 'mar.', 'merc.', 'jeu.', 'vend.', 'sam.', 'dim.'],
            tickAmount: 'dataPoints',
            tickPlacement: 'between',
        }
    };
    return options;
}

// On boucle sur le graphique "chartApexObj", pour passer la fonction "popAndAddRand" au tableau "modifedTemps".
// On passe à l'objet "chartApexObj" la fonction "updateSeries" qui permet de le mettre à jours après modifications.
function updateDataset() {
    let modifedTemps = [];
    chartApexObj.series.w.config.series.forEach(uneSerie => {
        const res = popAndAddRand(uneSerie.data);
        modifedTemps.push({data: res});
    });
    chartApexObj.updateSeries(modifedTemps);
}

// On retire le premier élément du tableau dans "firstElement", puis on l'ajoute à la fin du tableau existant.
function popAndAddRand(tableau) {
    const firstElement = tableau.shift();
    tableau.push(firstElement);
    return tableau;
}
