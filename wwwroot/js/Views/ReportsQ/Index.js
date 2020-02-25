$(document).ready(function () {

    $("#btnRefresh").jqxButton({ theme: 'bootstrap' });


    var sourceBank = {
        datatype: "json",
        datafields: [
            { name: 'regNumber', type: 'int' },
            { name: 'orgName', type: 'string' }
        ],
        id: 'regNumber',
        url: '/Reports/GetBanks'
    };

    var dataAdapterBank = new $.jqx.dataAdapter(sourceBank, {
        contentType: 'application/json; charset=utf-8',
        autoBind: true,
        downloadComplete: function (data, textStatus, jqXHR) {
            return data;
        }
    });

    $("#BankSel").jqxComboBox({
        source: dataAdapterBank, width: '175px', height: '25px', promptText: "Выбирай: ", valueMember: 'regNumber',
        displayMember: 'orgName', selectedIndex: 0
    });



    var sourceKlassificators = {
        datatype: "json",
        datafields: [
            { name: 'code', type: 'int' },
            { name: 'name1', type: 'string' }
        ],
        id: 'name1',
        url: '/Reports/GetKlassificators'
    };

    var dataAdapterKlassificators = new $.jqx.dataAdapter(sourceKlassificators, {
        contentType: 'application/json; charset=utf-8',
        autoBind: true,
        downloadComplete: function (data, textStatus, jqXHR) {
            return data;
        }
    });

    $("#KlassificatorsSel").jqxComboBox({
        source: dataAdapterKlassificators, width: '175px', height: '25px', promptText: "Выбирай: ", valueMember: 'code',
        displayMember: 'name1', selectedIndex: 0
    });

    $("#dateStart").jqxDateTimeInput({ width: '170px', height: '25px', culture: 'ru-RU', formatString: 'dd.MM.yyyy', showTimeButton: false });

    $("#dateEnd").jqxDateTimeInput({ width: '170px', height: '25px', culture: 'ru-RU', formatString: 'dd.MM.yyyy', showTimeButton: false });
});

function PaintChart(id) {

    if (id !== "TR0") {

        var TabReportQ6 = document.getElementById("TabReportQ6").getElementsByTagName("td");

        for (var i = 0; i < TabReportQ6.length; i++) {
            TabReportQ6[i].style.background = "white";
        }

        if (id !== 0) {
            var els = document.getElementById(id).getElementsByTagName("td");

            for (var j = 0; j < els.length; j++) {
                els[j].style.background = "lightgray";
            }

            var title = document.getElementById("TR0").getElementsByTagName("td");

            var chartTitle = els[1].innerText;
            var dataMin = title[2].innerText;
            var dataMax = title[title.length-1].innerText;

            var dataArr = [];

            for (var r = 2; r < els.length; r++) {
                var row =
                {
                    DateTime: title[r].innerText,
                    ValueRub: els[r].innerText
                };

                dataArr.push(row);
            }

            var source =
            {
                localdata: dataArr,
                datatype: "array",
                datafields:
                    [
                        { name: 'DateTime', type: 'date', format: 'dd.MM.yyyy' },
                        { name: 'ValueRub', type: 'number' }
                    ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source, { autoBind: true });
            var months = ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

            var settings = {
                title: "Заголовок отчёта",
                description: chartTitle,
                enableAnimations: true,
                showLegend: true,
                padding: { left: 10, top: 5, right: 10, bottom: 5 },
                titlePadding: { left: 50, top: 0, right: 0, bottom: 10 },
                source: dataAdapter,
                xAxis:
                {
                    dataField: 'DateTime',
                    formatFunction: function (value) {
                        return value.getDate() + '.' + months[value.getMonth()] + '.' + value.getFullYear();
                    },
                    type: 'date',
                    baseUnit: 'month',
                    valuesOnTicks: true,
                    minValue: dataMin,
                    maxValue: dataMax,
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
                                { dataField: 'ValueRub', displayText: chartTitle }
                            ]
                        }
                    ]
            };
            $('#chartContainer').jqxChart(settings);
        }
    }
}

function GetDataReportQ6() {

            //, 'birthday': $("#birthdayE").val()
    //  DateTime data1, DateTime data2, int id_kl=1, int RegNumberOfKO=1000, int id_priz=1, int i=1

    var data1 = $("#dateStart").val();
    var data2 = $("#dateEnd").val();

    var id_priz = 1;
    var i = 1;

    console.log(data2);
    debugger;

    var id_k = $("#KlassificatorsSel").val();
    var RegNumberOfKO = $("#BankSel").val();

    $.get("/Reports/GetData", { strData1: data1, strData2: data2, id_k: id_k, RegNumberOfKO: RegNumberOfKO, id_priz: id_priz, i: i  }, null, "json").done(function (data) {

        var table = document.getElementById('TabReportQ6');

        table.innerHTML = ""; 
        for (var i = 0; i < data.length; i++) {

            var newRow = table.insertRow(-1);
            newRow.id = "TR" + i;
            newRow.setAttribute("onclick", "PaintChart('TR" + i + "')");

            for (var j = 0; j < data[i].length; j++) {

                if (j !== 2 && j !== 3 ) {
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
        }
    }).fail(function () { alert('Ошибка!'); });
}