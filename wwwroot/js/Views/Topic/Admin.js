$(document).ready(function () {

    var IsEdit = false;

    var url = "/Home/GetData?page=1&take=100000&ForumPart=";

    var source = {
        datatype: "json",

        datafields: [
            { name: 'id', type: 'int' },
            { name: 'title', type: 'string' },
            { name: 'text', type: 'string' },
            { name: 'authorId', type: 'int' },
            { name: 'userFio', type: 'string' },
            { name: 'dataCreate', type: 'date' },
            { name: 'forumPart', type: 'string' }
        ],
        id: 'id',
        url: url
    };

    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#tabTopic").jqxGrid({
        autoloadstate: true,
        autosavestate: true,
        filterable: true,
        sortable: true,
        autoshowfiltericon: true,
        editable: false,
        editmode: 'dblclick',
        localization: getLocalization('ru'),
        showtoolbar: true,
        width: 800,
        source: dataAdapter,
        //filtermode: 'excel',
        columnsresize: true,
        pageable: true,
        pagesize: 10,
        pagesizeoptions: ['5', '10', '50', '100', '1000'],
        pagermode: "simple",  //  "pagesizeoptions",

        rendertoolbar: function (toolbar) {
            var me = this;
            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);

            container.append('<input style="margin-left: 5px;" id="btnDel" type="button" value="Удалить" />');
            container.append('<input style="margin-left: 5px;" id="btnClearFilter" type="button" value="Сброс" />');
            container.append('<input style="margin-left: 5px;" id="btnRefresh" type="button" value="Обновить" />');

            $("#btnDel").jqxButton({ theme: 'bootstrap' });

            $("#btnClearFilter").jqxButton({ theme: 'bootstrap' });
            $("#btnRefresh").jqxButton({ theme: 'bootstrap' });

            $('#btnRefresh').click(function () {
                $("#tabTopic").jqxGrid({ source: dataAdapter });
            });

            $('#btnClearFilter').click(function () {
                $("#tabTopic").jqxGrid('clearfilters');
            });

            $("#btnDel").on('click', function () {
                var selectedrowindex = $("#tabTopic").jqxGrid('getselectedrowindex');
                var rowscount = $("#tabTopic").jqxGrid('getdatainformation').rowscount;
                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                    var id = $("#tabTopic").jqxGrid('getrowid', selectedrowindex);
                    var r = confirm("Хотите удалить?!");
                    if (r === true) {
                        $.post("/Home/Del", { Id: id }, null, "text").done(function (data) {
                            var commit = $("#tabTopic").jqxGrid('deleterow', id);
                        }).fail(function () { alert('Ошибка!'); });
                    }
                }
                else {
                    alert('Выбеирте строку для удаления!');
                }
            });

        },

        columns: [
            { text: 'ИД', datafield: 'id', width: 50, editable: false, cellsalign: 'center', align: 'center' },
            { text: 'Название', datafield: 'title', align: 'center' },
            {
                text: 'Дата', datafield: 'dataCreate', width: 100, cellsalign: 'center', cellsformat: 'dd.MM.yyyy', filtertype: 'date',
                columntype: 'datetimeinput', align: 'center',
                createfilterwidget: function (column, columnElement, widget) {
                    widget.jqxDateTimeInput({ firstDayOfWeek: 1, culture: 'ru-RU', formatString: 'dd.MM.yyyy', showTimeButton: false });
                }
            },
            { text: 'Автор', datafield: 'userFio', filtertype: 'checkedlist', align: 'center' },
            { text: 'Раздел', datafield: 'forumPart', filtertype: 'checkedlist', align: 'center' }

        ]
    });
});