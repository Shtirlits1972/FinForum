function refresh() {

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
}

function drawChart() {
    var id_mes = $("#dateReport").val();

    var kodX = $("#kodX").val();
    var kodY = $("#kodY").val();
    var kodZ = $("#kodZ").val();

    var kod = kodX + ';' + kodY + ';' + kodZ;

    var listBanks = $("#bankSel").jqxComboBox('getCheckedItems');

    var strBankIds = "";

    for (var i = 0; i < listBanks.length; i++) {


        if (i === 0) {
            strBankIds += listBanks[i].value;
        }
        else if (i > 0) {
            strBankIds += "," + listBanks[i].value;
        }
    }

    $.get("/Reports/Bubble_Chart", { id_mes: id_mes, kod: kod, strBankIds: strBankIds }, null, "json").done(function (data) {

        if (data.length > 1) {

            var bubbleArr = [];

            var head = ['ID', 'X', 'Y','color', 'Z'];
            bubbleArr.push(head);

            for (var i = 1; i < data.length; i++) {

                var tmp = [
                    data[i][2],
                    Number(data[i][3].replace(',', '.')),
                    Number(data[i][4].replace(',', '.')),
                    data[i][2],
                    Number(data[i][5].replace(',', '.'))
                ];

                bubbleArr.push(tmp);
            }


            var dataChart = google.visualization.arrayToDataTable(bubbleArr);

            var options = {
                title: 'Заголовок',
                hAxis: { title: 'X' },
                vAxis: { title: 'Y' },
                bubble: { textStyle: { fontSize: 11 } }
                //colorAxis: { colors: ['yellow', 'red'] }
            };

            var chart = new google.visualization.BubbleChart(document.getElementById('chartContainer'));
            chart.draw(dataChart, options);

            //  DrawTable
            var table = document.getElementById('TabBubble');
            table.innerHTML = ""; 

            var header = table.createTHead();
            var headRow = header.insertRow(0); 

            for (var t = 0; t < 6;t++) {
                var th = document.createElement('th');
                th.setAttribute("style", "text-align: center; background-color:lightgray;");

                if (t === 0) {
                    th.innerText = "Дата";
                }
                else if (t===1) {
                    th.innerText = "Рег №";
                }
                else if (t === 2) {
                    th.innerText = "Название";
                }
                else if (t === 3) {
                    th.innerText = "X";
                }
                else if (t === 4) {
                    th.innerText = "Y";
                }
                else if (t === 5) {
                    th.innerText = "Z";
                }

                headRow.appendChild(th);
            }

            for (var k = 1; k < data.length; k++) {

                var newRow = table.insertRow(-1);
                for (var j = 0; j < data[k].length; j++) {

                    var newCell = newRow.insertCell(-1);
                    
                    if (j === 0) {
                        newCell.innerText = data[k][j].substring(0, 10);
                        newCell.setAttribute("style", "text-align: center;");
                    }
                    else {
                        newCell.innerText = data[k][j];

                        if (j !== 2) {
                            newCell.setAttribute("style", "text-align: center;");
                        }
                        else {
                            newCell.setAttribute("style", "padding-left: 10px;");
                        }
                    }
                }
            }
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

    $("#bankSel").jqxComboBox({
        source: dataAdapterBank, width: '200px', height: '25px', promptText: "Выбирай: ", valueMember: 'regNumber',
        displayMember: 'orgName', checkboxes: true, multiSelect: true
    });

    $("#bankSel").jqxComboBox('checkIndex', 0);
});
