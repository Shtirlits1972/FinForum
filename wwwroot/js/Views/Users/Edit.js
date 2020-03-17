$(document).ready(function () {

    $("#popupWindow").jqxWindow({
        width: 300, height: 300, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01
    });

    $("#Cancel").jqxButton({ theme: 'bootstrap' });
    $("#Save").jqxButton({ theme: 'bootstrap' });

    $("#Save").click(function () {

        var Id = 0;

        if (window.IsEdit === true) {
            var selectedrowindex = $("#tabUsers").jqxGrid('getselectedrowindex');
            Id = $("#tabUsers").jqxGrid('getrowid', selectedrowindex);
        }

        var isBannedLabel = '\u2610';

        if ($("#isBannedE").jqxCheckBox('checked') === true) {
            isBannedLabel = '\u2714';
        }

        var model =
        {
            'id': Id
            , 'email': $("#EmailE").val()
            , 'pass': $("#PassE").val()
            , 'role': $("#RoleE").val()
            , 'userFio': $("#UserFioE").val()
            , 'isBanned': $("#isBannedE").jqxCheckBox('checked') 
            , 'boolValue': isBannedLabel
        };

        if (window.IsEdit === true) {

            $('#tabUsers').jqxGrid('updaterow', Id, model);
        }
        else {
            $.post("/Users/Add", { model: model }, null, "json").done(function (data) {
                var commit = $("#tabUsers").jqxGrid('addrow', null, data, "first");
            }).fail(function () {
                alert('Error!');
            });
        }
        Clear();
        $("#popupWindow").jqxWindow('hide');
    });

    var sourceRole = ["Юзер", "Админ" ];

    $("#RoleE").jqxComboBox({ source: sourceRole, width: '170px', height: '25px' });
    $("#RoleE").jqxComboBox('selectIndex', 0);

    $("#isBannedE").jqxCheckBox({ width: 30, height: 25, checked: false });

});

function Clear() {

    $("#EmailE").val('');
    $("#PassE").val('');
    $("#RoleE").jqxComboBox('selectIndex', 0);
    $("#UserFioE").val('');
    $("#isBannedE").val(false);
}