function refresh() {

    var id_mes = $("#dateReport").val();

    var kodX = $("#kodX").val();
    var kodY = $("#kodY").val();
    var kodZ = $("#kodZ").val();

    var kod = kodX + ';' + kodY + ';' + kodZ;

    $.get("/Reports/Bubble_Chart", { id_mes: id_mes, kod: kod }, null, "json").done(function (data) {

        if (data.length > 1) {

            var bubbleArr = [];

            var minVal = 0;
            var maxVal = Number(data[1][3].toString().replace(',', '.'));

            for (var i = 1; i < data.length; i++) {

                if (Number(data[i][3].replace(',', '.')) > maxVal) {
                    maxVal = Number(data[i][3].replace(',', '.'));
                }

                if (Number(data[i][4].replace(',', '.')) > maxVal) {
                    maxVal = Number(data[i][4].replace(',', '.'));
                }

                if (Number(data[i][3].replace(',', '.')) < minVal) {
                    minVal = Number(data[i][3].replace(',', '.'));
                }

                if (Number(data[i][4].replace(',', '.')) < minVal) {
                    minVal = Number(data[i][4].replace(',', '.'));
                }

                var tmp = {
                    'orgName': data[i][2],
                    'X': Number(data[i][3].replace(',', '.')),
                    'Y': Number(data[i][4].replace(',', '.')),
                    'Z': Number(data[i][5].replace(',', '.'))
                };

                bubbleArr.push(tmp);
            }

            var InterVal = Number(maxVal.toString().replace(',', '.')) - Number(minVal.toString().replace(',', '.'));
            var newInt = getInterval(InterVal);

            debugger;

            var settings = {
                title: "Bubble Chart",
                description: "Описание",
                enableAnimations: true,
                showLegend: true,
                padding: { left: 5, top: 5, right: 5, bottom: 5 },
                titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
                source: bubbleArr,
                colorScheme: 'scheme04',
                xAxis:
                {
                    dataField: 'orgName',
                    valuesOnTicks: false
                },
                valueAxis:
                {
                    unitInterval: newInt,
                    minValue: minVal,
                    maxValue: maxVal,
                    title: { text: 'Показатель ($)<br>' },
                    labels: {
                        formatSettings: { prefix: '$', thousandsSeparator: ' ' },
                        horizontalAlignment: 'right'
                    }
                },
                seriesGroups:
                    [
                        {
                            type: 'bubble',
                            series: [
                                { dataField: 'X', radiusDataField: 'Z', minRadius: 5, maxRadius: 100, displayText: 'X' },
                                { dataField: 'Y', radiusDataField: 'Z', minRadius: 5, maxRadius: 100, displayText: 'Y' }
                            ]
                        }
                    ]
            };

            debugger;
            // setup the chart
            $('#chartContainer').jqxChart(settings);
        }

    }).fail(function () {
        alert('Ошибка!');
    });
}

function getInterval(numInput) {

    var intOut = 1;

    try {
        if (numInput > 1) {
            var lenInput = numInput.toString().length - 1;
            for (var i = 0; i < lenInput; i++) {
                intOut = intOut * 10;
            }
        }
        else {
            intOut = 0.1;
        }
    }
    catch(except)
    {
        var Error = except.val;
    }

    return intOut;
}

$(document).ready(function () {

    $("#btnRefresh").jqxButton({ theme: 'bootstrap' });

    var sourceDT = {
        datatype: "json",
        datafields: [
            { name: 'id_mes', type: 'int' },
            { name: 'dT101', type: 'string' }
        ],
        id: 'id_mes',
        url: '/Reports/GetDT'
    };

    var dataAdapterDT = new $.jqx.dataAdapter(sourceDT, {
        contentType: 'application/json; charset=utf-8',
        autoBind: true,
        downloadComplete: function (data, textStatus, jqXHR) {
            return data;
        }
    });

    $("#dateReport").jqxComboBox({
        source: dataAdapterDT, width: '175px', height: '25px', promptText: "Выбирай: ", valueMember: 'id_mes',
        displayMember: 'dT101', selectedIndex: 12
    });

    var sourceNormals = {
        datatype: "json",
        datafields: [
            { name: 'cod', type: 'int' },
            { name: 'namePok', type: 'string' }
        ],
        id: 'coeff',
        url: '/Reports/GetX_Rank_us_guide_bko'
    };

    var dataAdapterNormals = new $.jqx.dataAdapter(sourceNormals, {
        contentType: 'application/json; charset=utf-8',
        autoBind: true,
        downloadComplete: function (data, textStatus, jqXHR) {
            return data;
        }
    });

    $("#kodX").jqxComboBox({
        source: dataAdapterNormals, width: '175px', height: '25px', promptText: "Выбирай: ", valueMember: 'cod',
        displayMember: 'namePok', selectedIndex: 0
    });

    $("#kodY").jqxComboBox({
        source: dataAdapterNormals, width: '175px', height: '25px', promptText: "Выбирай: ", valueMember: 'cod',
        displayMember: 'namePok', selectedIndex: 0
    });

    $("#kodZ").jqxComboBox({
        source: dataAdapterNormals, width: '175px', height: '25px', promptText: "Выбирай: ", valueMember: 'cod',
        displayMember: 'namePok', selectedIndex: 0
    });


    $(document).ready(function () {
        // prepare chart data as an array
        //var sampleData = [
        //    { City: 'New York', SalesQ1: 310500, SalesQ2: 210500, YoYGrowthQ1: 1.05, YoYGrowthQ2: 1.25 },
        //    { City: 'London', SalesQ1: 120000, SalesQ2: 169000, YoYGrowthQ1: 1.15, YoYGrowthQ2: 0.95 },
        //    { City: 'Paris', SalesQ1: 205000, SalesQ2: 275500, YoYGrowthQ1: 1.45, YoYGrowthQ2: 1.15 },
        //    { City: 'Tokyo', SalesQ1: 187000, SalesQ2: 130100, YoYGrowthQ1: 0.45, YoYGrowthQ2: 0.55 },
        //    { City: 'Berlin', SalesQ1: 187000, SalesQ2: 113000, YoYGrowthQ1: 1.65, YoYGrowthQ2: 1.05 },
        //    { City: 'San Francisco', SalesQ1: 142000, SalesQ2: 102000, YoYGrowthQ1: 0.75, YoYGrowthQ2: 0.15 },
        //    { City: 'Chicago', SalesQ1: 171000, SalesQ2: 124000, YoYGrowthQ1: 0.75, YoYGrowthQ2: 0.65 }
        //];
        // prepare jqxChart settings


    });
});