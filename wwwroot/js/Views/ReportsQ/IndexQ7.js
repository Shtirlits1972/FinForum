﻿$(document).ready(function () {

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

    $("#dateStart").jqxComboBox({
        source: dataAdapterDT, width: '175px', height: '25px', promptText: "Выбирай: ", valueMember: 'id_mes',
        displayMember: 'dT101', selectedIndex: 179
    });

    $("#dateEnd").jqxComboBox({
        source: dataAdapterDT, width: '175px', height: '25px', promptText: "Выбирай: ", valueMember: 'id_mes',
        displayMember: 'dT101', selectedIndex: 191
    });

    var sourceSysT = {
        datatype: "json",
        datafields: [
            { name: 'id', type: 'int' },
            { name: 'web_Friendly', type: 'string' }
        ],
        id: 'id',
        url: '/Reports/GetSysT'
    };

    var dataAdapterSysT = new $.jqx.dataAdapter(sourceSysT, {
        contentType: 'application/json; charset=utf-8',
        autoBind: true,
        downloadComplete: function (data, textStatus, jqXHR) {
            return data;
        }
    });

    $("#SysTsel").jqxComboBox({
        source: dataAdapterSysT, width: '175px', height: '25px', promptText: "Выбирай: ", valueMember: 'id',
        displayMember: 'web_Friendly', selectedIndex: 0
    });

});

function refresh() {

    var id_mes1 = $("#dateStart").val();
    var id_mes2 = $("#dateEnd").val();
    var sysT = $("#SysTsel").val();

    $.get("/Reports/GetDataQ7", { id_mes1: id_mes1, id_mes2: id_mes2, sysT: sysT }, null, "json").done(function (data) {

        var table = document.getElementById('TabReportQ7');
        table.innerHTML = "";

        var table2 = document.getElementById('TabSpec');
        table2.innerHTML = "";

        for (var i = 0; i < data.length; i++) {

            var newRow = table.insertRow(-1);
            newRow.id = "TR" + i;
            newRow.setAttribute("onclick", "PaintChart('TR" + i + "')");

            for (var j = 0; j < data[i].length; j++) {

                if (sysT === 2) {
                    if (j !== 2 && j !== 3) {
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
                if (sysT === 8) {

                        var newCell3 = newRow.insertCell(-1);
                        newCell3.innerText = data[i][j];

                    if (i === 0) {
                        newCell3.setAttribute("style", "text-align: center;");
                    }
                    else {
                            newCell3.setAttribute("style", "text-align: center;");                       
                    }
                   
                }
            }
        }
    }).fail(function () { alert('Ошибка!'); });
}

function PaintChart(id) {

            if (id !== "TR0") {

                var TabReportQ6 = document.getElementById("TabReportQ7").getElementsByTagName("td");

                for (var i = 0; i < TabReportQ6.length; i++) {
                    TabReportQ6[i].style.background = "white";
                }

                if (id !== 0) {

                    var sysT2 = $("#SysTsel").val();
                    if (sysT2 === 8) {
                        Ranking_on_DT(sysT2, id);
                    }

                    var els = document.getElementById(id).getElementsByTagName("td");

                    for (var j = 0; j < els.length; j++) {
                        els[j].style.background = "lightgray";
                    }

                    var title = document.getElementById("TR0").getElementsByTagName("td");

                    var dataMin = title[2].innerText;
                    var dataMax = title[title.length - 1].innerText;

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
                        description: "Все банки",
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
                                        { dataField: 'ValueRub', displayText: "Все банки" }
                                    ]
                                }
                            ]
                    };
                    $('#chartContainer').jqxChart(settings);
                }
            }
}

function Ranking_on_DT(sysT21, trId) {
    var tdList = document.getElementById(trId).getElementsByTagName("td");

    var id_mes = $("#dateEnd").val();
    var kod = tdList[0].innerText;

    $.get("/Reports/Ranking_on_DT", { id_pr: sysT21, id_mes: id_mes, kod: kod }, null, "json").done(function (data) {

        var table = document.getElementById('TabSpec');
        table.innerHTML = "";

        for (var i = 0; i < data.length; i++) {

            var newRow = table.insertRow(-1);

            for (var j = 0; j < data[i].length; j++) {

                    var newCell = newRow.insertCell(-1);
                    newCell.innerText = data[i][j];

                    if (i === 0) {
                        newCell.setAttribute("style", "text-align: center;");
                    }
                    else {
                        if (j === 3) {
                            newCell.setAttribute("style", "padding-left: 10px;");
                        }
                        else {
                            newCell.setAttribute("style", "text-align: center;");
                        }
                    }             
            }
        }
    }).fail(function () { alert('Ошибка!'); });

}