$(document).ready(function () {

    $("#btnRefresh").jqxButton({ theme: 'bootstrap' });
    $("#dateSel").jqxDateTimeInput({ width: '170px', height: '25px', culture: 'ru-RU', formatString: 'dd.MM.yyyy', showTimeButton: false });
});

function refresh() {
    //  
    var dateSel = $("#dateSel").val();
    var Curr = $("#CurrSel").val();

    //  DataQ32(DateTime dateTime, string Curr)
    $.get("/Reports/DataQ32", { dateTime: dateSel, Curr: Curr }, null, "json").done(function (data) {

        var table32 = document.getElementById('TabReport32');
        table32.innerHTML = "";

        var table33 = document.getElementById('TabReport33');
        table33.innerHTML = "";

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
            //   DataQ33(int regn, string Curr)
            $.get("/Reports/DataQ33", { regn: regn, Curr: Curr }, null, "json").done(function (data) {

                var table33 = document.getElementById('TabReport33');
                table33.innerHTML = "";

                for (var i = 0; i < data.length; i++) {

                    var newRow = table33.insertRow(-1);

                    for (var j = 0; j < data[i].length - 1; j++) {

                        var newCell = newRow.insertCell(-1);
                        newCell.innerText = data[i][j];
                        newCell.setAttribute("style", "text-align: center;");

                    }
                }

            });



        }
    }
}