$(document).ready(function () {



    //var sourceCountry = {
    //    datatype: "json",
    //    datafields: [
    //        { name: 'id', type: 'int' },
    //        { name: 'countryName', type: 'string' }
    //    ],
    //    id: 'id',
    //    url: '/Country/GetData'
    //};

    //string decade { get; set; }
    //decimal RAte { get; set; }
    //DateTime dataRes { get; set; }

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

    //console.log(dataAdapter.records);
    //debugger;

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
            baseUnit: 'month',
            valuesOnTicks: true,
            minValue: "01.01.2018",
            maxValue: "01.01.2020",
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
            }
        },
        valueAxis:
        {
            visible: true,
            title: { text: 'рублей' },
            tickMarks: { color: '#BCBCBC' }
        },
        colorScheme: 'scheme04',
        seriesGroups:
            [
                {
                    type: 'line',
                    series: [
                        { dataField: 'rAte', displayText: "RAte" }
                    ]
                }
            ]
    };

    $('#chartContainer').jqxChart(settings);

});

