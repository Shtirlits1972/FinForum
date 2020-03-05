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
        displayMember: 'orgName', selectedIndex: 725
    });

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
        displayMember: 'dT101', selectedIndex: 4
    });

});

function refresh() {

    var id_M = $("#dateStart").val();
    var id_regn = $("#BankSel").val();

    $.get("/Reports/GetDataQ8", { id_M: id_M, id_regn: id_regn }, null, "json").done(function (data) {

        var arrA1 = [];
        var arrP1 = [];

        var arrA2 = [];
        var arrP2 = [];

        var SumA1 = 0;
        var SumA2 = 0;

        var SumP1 = 0;
        var SumP2 = 0;

        for (var i = 0; i < data.length; i++) {

            if (i > 0) {

                var tmp = {
                    nameArticle: data[i][2],
                    valueOf: Number(data[i][3])
                };

                if (data[i][4] === "107") {

                    if (data[i][1] === "1") {
                        arrA1.push(tmp);
                        SumA1 += tmp.valueOf;
                    }
                    else {
                        arrA2.push(tmp);
                        SumA2 += tmp.valueOf;
                    }
                }
                else if (data[i][4] === "210") {

                    if (data[i][1] === "1") {
                        arrP1.push(tmp);
                        SumP1 += tmp.valueOf;
                    }
                    else {
                        arrP2.push(tmp);
                        SumP2 += tmp.valueOf;
                    }
                }
            }
        }

        for (var a = 0; a < arrA1.length; a++) {
            arrA1[a].valueOf = (arrA1[a].valueOf/SumA1) * 100;
        }

        for (var a2 = 0; a2 < arrA2.length; a2++) {
            arrA2[a2].valueOf = (arrA2[a2].valueOf / SumA2) * 100;
        }

        for (var a3 = 0; a3 < arrP1.length; a3++) {
            arrP1[a3].valueOf = (arrP1[a3].valueOf / SumP1) * 100;
        }

        for (var a4 = 0; a4 < arrP2.length; a4++) {
            arrP2[a4].valueOf = (arrP2[a4].valueOf / SumP2) * 100;
        }

        PaintChart(arrA1, arrA2, arrP1, arrP2);

    }).fail(function () { alert('Ошибка!'); });
}


function PaintChart(arrA1, arrA2, arrP1, arrP2) {

    var sourceA1 =
    {
        localdata: arrA1,
        datatype: "array",
        datafields:
            [
                { name: 'nameArticle', type: 'string' },
                { name: 'valueOf', type: 'number' }
            ]
    };

    var dataAdapterA1 = new $.jqx.dataAdapter(sourceA1, { autoBind: true });

    var sourceA2 =
    {
        localdata: arrA2,
        datatype: "array",
        datafields:
            [
                { name: 'nameArticle', type: 'string' },
                { name: 'valueOf', type: 'number' }
            ]
    };

    var dataAdapterA2 = new $.jqx.dataAdapter(sourceA2, { autoBind: true });

    var sourceP1 =
    {
        localdata: arrP1,
        datatype: "array",
        datafields:
            [
                { name: 'nameArticle', type: 'string' },
                { name: 'valueOf', type: 'number' }
            ]
    };

    var dataAdapterP1 = new $.jqx.dataAdapter(sourceP1, { autoBind: true });

    var sourceP2 =
    {
        localdata: arrP2,
        datatype: "array",
        datafields:
            [
                { name: 'nameArticle', type: 'string' },
                { name: 'valueOf', type: 'number' }
            ]
    };

    var dataAdapterP2 = new $.jqx.dataAdapter(sourceP2, { autoBind: true });

    var settingsA = {
        title: "Отчёт Q8",
        description: "Активы",
        enableAnimations: true,
        showLegend: true,
        showBorderLine: true,
        legendLayout: { left: 520, top: 170, width: 300, height: 200, flow: 'vertical' },
        padding: { left: 5, top: 5, right: 5, bottom: 5 },
        titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
        seriesGroups:
            [
                {
                    type: 'donut',
                    //showLabels: true,
                    offsetX: 250,
                    source: dataAdapterA1,
                    xAxis:
                    {
                        formatSettings: { prefix: 'основные ' }
                    },
                    series:
                        [
                            {
                                dataField: 'valueOf',
                                displayText: 'nameArticle',
                                labelRadius: 120,
                                initialAngle: 0,
                                radius: 110,
                                innerRadius: 30,
                                centerOffset: 0,
                                formatSettings: { decimalPlaces: 0 }
                            }
                        ]
                },
                {
                    type: 'donut',
                    offsetX: 250,
                    //showLabels: true,
                    source: dataAdapterA2,
                    xAxis:
                    {
                        formatSettings: { prefix: 'расшифровка ' }
                    },
                    series:
                        [
                            {
                                dataField: 'valueOf',
                                displayText: 'nameArticle',
                                labelRadius: 120,
                                initialAngle: 0,
                                radius: 130,
                                innerRadius: 120,
                                centerOffset: 0,
                                formatSettings: { decimalPlaces: 0 }
                            }
                        ]
                }
            ]
    };

    $('#chartContainerA').jqxChart(settingsA);

    var settingsP = {
        title: "Отчёт Q8",
        description: "Пассивы",
        enableAnimations: true,
        showLegend: true,
        showBorderLine: true,
        legendLayout: { left: 520, top: 170, width: 300, height: 200, flow: 'vertical' },
        padding: { left: 5, top: 5, right: 5, bottom: 5 },
        titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
        seriesGroups:
            [
                {
                    type: 'donut',
                    //showLabels: true,
                    offsetX: 250,
                    source: dataAdapterP1,
                    xAxis:
                    {
                        formatSettings: { prefix: 'основные ' }
                    },
                    series:
                        [
                            {
                                dataField: 'valueOf',
                                displayText: 'nameArticle',
                                labelRadius: 120,
                                initialAngle: 0,
                                radius: 110,
                                innerRadius: 30,
                                centerOffset: 0,
                                formatSettings: { decimalPlaces: 0 }
                            }
                        ]
                },
                {
                    type: 'donut',
                    //showLabels: true,
                    offsetX: 250,
                    source: dataAdapterP2,
                    xAxis:
                    {
                        formatSettings: { prefix: 'расшифровка ' }
                    },
                    series:
                        [
                            {
                                dataField: 'valueOf',
                                displayText: 'nameArticle',
                                labelRadius: 120,
                                initialAngle: 0,
                                radius: 130,
                                innerRadius: 120,
                                centerOffset: 0,
                                formatSettings: { decimalPlaces: 0 }
                            }
                        ]
                }
            ]
    };

    $('#chartContainerP').jqxChart(settingsP);
}