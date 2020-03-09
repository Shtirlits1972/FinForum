$(document).ready(function () {

    var source =
    {
        url: '/Reports/GetDataQ31',
        datatype: "json",
        datafields:
            [
                { name: 'decade', type: 'string' },
                { name: 'rAte', type: 'number' },
                { name: 'dataRes', type: 'date', format: 'dd.MM.yyyy' }
            ],
        id: 'decade'
    };

    var dataAdapter = new $.jqx.dataAdapter(source, { autoBind: true });
    var months = ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];


    var settings = {
        title: "Заголовок отчёта",
        description: "описание",
        enableAnimations: true,
        showLegend: true,
        padding: { left: 10, top: 5, right: 10, bottom: 5 },
        titlePadding: { left: 50, top: 0, right: 0, bottom: 10 },
        source: dataAdapter,
        xAxis:
        {
            dataField: 'dataRes',
            formatFunction: function (value) {
                return value.getDate() + '.' + months[value.getMonth()] + '.' + value.getFullYear();

            },
            type: 'date',
            baseUnit: 'year',
            valuesOnTicks: true,

            minValue: "01.01.2010",
            //maxValue: "01.01.2021",
            tickMarks: {
                visible: true,
                interval: 1,
                color: '#BCBCBC'
            },
            unitInterval: 1,
            gridLines: {
                visible: true,
                interval: 3,
                color: '#BCBCBC'
            },
            labels: {
                angle: -45,
                rotationPoint: 'topright',
                offset: { x: 0, y: -25 }
            },
            rangeSelector: {
                // Uncomment the line below to render the selector in a separate container 
                //renderTo: $('#selectorContainer'),
                size: 80,
                padding: { /*left: 0, right: 0,*/top: 0, bottom: 0 },
                minValue: "01.01.2010",
                backgroundColor: 'white',
                dataField: 'rAte',
                baseUnit: 'year',
                gridLines: { visible: false },
                serieType: 'area',
                labels: {
                    formatFunction: function (value) {
                        return months[value.getMonth()] + '\'' + value.getFullYear().toString();
                    }
                }
            }
        },
        valueAxis:
        {
            visible: true,
            title: { text: '%' },
            tickMarks: { color: '#BCBCBC' }
        },
        colorScheme: 'scheme04',
        seriesGroups:
            [
                {
                    type: 'stepline',
                    series: [
                        { dataField: 'rAte', displayText: "Ставка" }
                    ]
                }
            ]
    };

    $('#chartContainer').jqxChart(settings);

});

