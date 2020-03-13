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

    $("#dateSel").jqxComboBox({
        source: dataAdapterDT, width: '175px', height: '25px', promptText: "Выбирай: ", valueMember: 'id_mes',
        displayMember: 'dT101', selectedIndex: 0
    });
});

function refresh() {
    //  
    var id_mes = $("#dateSel").val();
    var Curr = $("#CurrSel").val();

    $.get("/Reports/DataQ32", { id_mes: id_mes, Curr: Curr }, null, "json").done(function (data) {

        var table32 = document.getElementById('TabReport32');
        table32.innerHTML = "";

        for (var i = 0; i < data.length; i++) {

            var newRow = table32.insertRow(-1);
            newRow.id = "TR" + i;
            newRow.setAttribute("onclick", "Detaliz('TR" + i + "')");

            for (var j = 0; j < data[i].length - 1; j++) {


                var newCell = newRow.insertCell(-1);
                newCell.innerText = data[i][j];

                if (i === 0) {
                    newCell.setAttribute("style", "text-align: center;");
                }
                else {
                    if (j === 1) {
                        newCell.setAttribute("style", "padding-left: 10px;");
                    }
                    else {
                        newCell.setAttribute("style", "text-align: center;");
                    }
                }
            }
        }

    });

}


function Detaliz(TrId) {

    if (TrId !== "TR0") {

        if (TrId !== 0) {
            var TabReport32 = document.getElementById("TabReport32").getElementsByTagName("td");

            for (var i = 0; i < TabReport32.length; i++) {
                TabReport32[i].style.background = "white";
            }

            var els = document.getElementById(TrId).getElementsByTagName("td");

            

            for (var j = 0; j < els.length; j++) {
                els[j].style.background = "lightgray";
            }

            var regn = els[0].innerText;
            var Curr = $("#CurrSel").val();
            var titleBank = els[1].innerText;

            $.get("/Reports/DataQ33", { regn: regn }, null, "json").done(function (data) {

                var months = ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

                var dataUSD = [];
               
                

                for (var i = 0; i < data.listUSD.length; i++) {

                    var tmp = {
                        'dataOne': data.listUSD[i][0],
                        'Curr': data.listUSD[i][1],
                        'PostRest': data.listUSD[i][2],
                        'Day90': data.listUSD[i][3],
                        'Day180': data.listUSD[i][4],
                        'Up1year': data.listUSD[i][5],
                        'Over1year': data.listUSD[i][6]
                    };
                    dataUSD.push(tmp);
                }

                var sourceUSD =
                {
                    localdata: dataUSD,
                    datatype: "array",
                    datafields:
                        [
                            { name: 'dataOne', type: 'date', format: 'dd.MM.yyyy' },
                            { name: 'Curr', type: 'string' },
                            { name: 'PostRest', type: 'number' },
                            { name: 'Day90', type: 'number' },
                            { name: 'Day180', type: 'number' },
                            { name: 'Up1year', type: 'number' },
                            { name: 'Over1year', type: 'number' }
                        ]
                };
                var dataAdapterUSD = new $.jqx.dataAdapter(sourceUSD, { autoBind: true });
                
                var settingsUSD = {
                    title: titleBank,
                    description: "USD",
                    enableAnimations: true,
                    showLegend: true,
                    padding: { left: 10, top: 5, right: 10, bottom: 5 },
                    titlePadding: { left: 50, top: 0, right: 0, bottom: 10 },
                    source: dataAdapterUSD,
                    xAxis:
                    {
                        dataField: 'dataOne',
                        formatFunction: function (value) {
                            return value.getDate() + '.' + months[value.getMonth()] + '.' + value.getFullYear();
                        },
                        type: 'date',
                        baseUnit: 'month',
                        valuesOnTicks: true,
                        minValue: '01.01.2019',
                        maxValue: '01.12.2019',
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
                        title: { text: '%' },
                        tickMarks: { color: '#BCBCBC' }
                    },
                    colorScheme: 'scheme04',
                    seriesGroups:
                        [
                            {
                                type: 'line',

                                series: [
                                    { dataField: 'PostRest', displayText: "До востребования" },
                                    { dataField: 'Day90', displayText: "до 90 дней" },
                                    { dataField: 'Day180', displayText: "от 91 до 180 дней" },
                                    { dataField: 'Up1year', displayText: "от 181 до 1 года" },
                                    { dataField: 'Over1year', displayText: "свыше 1 года" }

                                ]
                            }
                        ]
                };

                $('#chartContainerUSD').jqxChart(settingsUSD);

                var dataEUR = [];

                for (var j = 0; j < data.listEUR.length; j++) {

                    var tmp1 = {
                        'dataOne': data.listEUR[j][0],
                        'Curr': data.listEUR[j][1],
                        'PostRest': data.listEUR[j][2],
                        'Day90': data.listEUR[j][3],
                        'Day180': data.listEUR[j][4],
                        'Up1year': data.listEUR[j][5],
                        'Over1year': data.listEUR[j][6]
                    };
                    dataEUR.push(tmp1);
                }

                var sourceEUR =
                {
                    localdata: dataEUR,
                    datatype: "array",
                    datafields:
                        [
                            { name: 'dataOne', type: 'date', format: 'dd.MM.yyyy' },
                            { name: 'Curr', type: 'string' },
                            { name: 'PostRest', type: 'number' },
                            { name: 'Day90', type: 'number' },
                            { name: 'Day180', type: 'number' },
                            { name: 'Up1year', type: 'number' },
                            { name: 'Over1year', type: 'number' }
                        ]
                };
                var dataAdapterEUR = new $.jqx.dataAdapter(sourceEUR, { autoBind: true });

                var settingsEUR = {
                    title: titleBank,
                    description: "EUR",
                    enableAnimations: true,
                    showLegend: true,
                    padding: { left: 10, top: 5, right: 10, bottom: 5 },
                    titlePadding: { left: 50, top: 0, right: 0, bottom: 10 },
                    source: dataAdapterEUR,
                    xAxis:
                    {
                        dataField: 'dataOne',
                        formatFunction: function (value) {
                            return value.getDate() + '.' + months[value.getMonth()] + '.' + value.getFullYear();
                        },
                        type: 'date',
                        baseUnit: 'month',
                        valuesOnTicks: true,
                        minValue: '01.01.2019',
                        maxValue: '01.12.2019',
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
                        title: { text: '%' },
                        tickMarks: { color: '#BCBCBC' }
                    },
                    colorScheme: 'scheme04',
                    seriesGroups:
                        [
                            {
                                type: 'line',

                                series: [
                                    { dataField: 'PostRest', displayText: "До востребования" },
                                    { dataField: 'Day90', displayText: "до 90 дней" },
                                    { dataField: 'Day180', displayText: "от 91 до 180 дней" },
                                    { dataField: 'Up1year', displayText: "от 181 до 1 года" },
                                    { dataField: 'Over1year', displayText: "свыше 1 года" }

                                ]
                            }
                        ]
                };

                $('#chartContainerEUR').jqxChart(settingsEUR);

                var dataRUB = [];

                for (var k = 0; k < data.listRUB.length; k++) {

                    var tmp2 = {
                        'dataOne': data.listRUB[k][0],
                        'Curr': data.listRUB[k][1],
                        'PostRest': data.listRUB[k][2],
                        'Day90': data.listRUB[k][3],
                        'Day180': data.listRUB[k][4],
                        'Up1year': data.listRUB[k][5],
                        'Over1year': data.listRUB[k][6]
                    };
                    dataRUB.push(tmp2);
                }

                var sourceRUB =
                {
                    localdata: dataRUB,
                    datatype: "array",
                    datafields:
                        [
                            { name: 'dataOne', type: 'date', format: 'dd.MM.yyyy' },
                            { name: 'Curr', type: 'string' },
                            { name: 'PostRest', type: 'number' },
                            { name: 'Day90', type: 'number' },
                            { name: 'Day180', type: 'number' },
                            { name: 'Up1year', type: 'number' },
                            { name: 'Over1year', type: 'number' }
                        ]
                };
                var dataAdapterRUB = new $.jqx.dataAdapter(sourceRUB, { autoBind: true });

                var settingsRUB = {
                    title: titleBank,
                    description: "RUB",
                    enableAnimations: true,
                    showLegend: true,
                    padding: { left: 10, top: 5, right: 10, bottom: 5 },
                    titlePadding: { left: 50, top: 0, right: 0, bottom: 10 },
                    source: dataAdapterRUB,
                    xAxis:
                    {
                        dataField: 'dataOne',
                        formatFunction: function (value) {
                            return value.getDate() + '.' + months[value.getMonth()] + '.' + value.getFullYear();
                        },
                        type: 'date',
                        baseUnit: 'month',
                        valuesOnTicks: true,
                        minValue: '01.01.2019',
                        maxValue: '01.12.2019',
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
                        title: { text: '%' },
                        tickMarks: { color: '#BCBCBC' }
                    },
                    colorScheme: 'scheme04',
                    seriesGroups:
                        [
                            {
                                type: 'line',

                                series: [
                                    { dataField: 'PostRest', displayText: "До востребования" },
                                    { dataField: 'Day90', displayText: "до 90 дней" },
                                    { dataField: 'Day180', displayText: "от 91 до 180 дней" },
                                    { dataField: 'Up1year', displayText: "от 181 до 1 года" },
                                    { dataField: 'Over1year', displayText: "свыше 1 года" }

                                ]
                            }
                        ]
                };

                $('#chartContainerRUB').jqxChart(settingsRUB);


            });



        }
    }
}