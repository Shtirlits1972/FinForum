var topicIndex = 1;
var topicCount = 1;

$(document).ready(function () {

    getTopicByNum(1);

    $("#popupWindow").jqxWindow({
        width: 350, height: 800, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01
    });

    $("#AddComment").jqxWindow({
        width: 350, height: 600, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#CancelComment"), modalOpacity: 0.01
    });

    $("#Cancel").jqxButton({ theme: 'bootstrap' });
    $("#Save").jqxButton({ theme: 'bootstrap' });

    $("#CancelComment").jqxButton({ theme: 'bootstrap' });
    $("#SaveComment").jqxButton({ theme: 'bootstrap' });

    $("#SaveComment").click(function () {

        var Text = $("#TextComment").val();

        var addTopicId = $('#TopicId').val();
        var addMessageId = $('#MessagesId').val();

        $.post("/Home/AddMessagess", { TopicId: addTopicId, MessagesId: addMessageId, TextMess: Text }, null, "json").done(function (data) {

            var NewComment = buildCommentElem(data, addTopicId, null);
            var divTmp = document.createElement('div');
            divTmp.innerHTML = NewComment;

            var nComments = divTmp.firstChild;
            
            if (addMessageId > 0 && addMessageId !== undefined && addMessageId !== null) {
                var divCommentParent = document.getElementById('divChildComment' + addMessageId);
                divCommentParent.appendChild(nComments);
            }
            else if (addMessageId == 0 && addMessageId !== undefined && addMessageId !== null) {
                var fieldsetComment = document.getElementById('fieldset' + addTopicId);
                fieldsetComment.appendChild(nComments);
            }

        }).fail(function () {
            alert('Error!');
        });

        $("#AddComment").jqxWindow('hide');
        ClearComment();
    });

    $("#CancelComment").click(function () {
        ClearComment();
    });

    $("#Save").click(function () {

        var Title = $("#Title").val();
        var Text = $("#Text").val();
        var ForumPart = $("#ForumSel").val();

        var ForumPart2 = $("#ForumPart").val();                  //  

        debugger;

        $.post("/Home/AddTopic", { Title: Title, Text: Text, ForumPart: ForumPart }, null, "json").done(function (data) {

            if (ForumPart === ForumPart2) {

                var Topic = buildTopicElem(data);

                var RowCount = tbody.rows.length;

                if (RowCount === 5) {
                    tbody.deleteRow(4);
                }

                row = tbody.insertRow(0);
                cell = row.insertCell();
                cell.innerHTML = Topic;

            }

            }).fail(function () {
                alert('Error!');
            });

        $("#popupWindow").jqxWindow('hide');
        ClearTopic();
    });

    $("#Cancel").click(function () {
        ClearTopic();
    });

    $('#Text').jqxTextArea({ width: 250, height: 200, placeHolder: 'Содержание...' });

    $('#TextComment').jqxTextArea({ width: 250, height: 200, placeHolder: 'Комментарий...' });

    var sourceF = {
        datatype: "json",
        datafields: [
            { name: 'values', type: 'string' }
        ],
        url: '/Home/GetForumList'
    };

    var dataAdapterF = new $.jqx.dataAdapter(sourceF);

    $("#ForumSel").jqxComboBox({
        source: dataAdapterF, width: '175px', height: '25px', valueMember: 'values',
        displayMember: 'values', selectedIndex: 0
    });

});

function AddNewMessage(TopicId, MessageId) {

    $('#TopicId').val(TopicId);
    $('#MessagesId').val(MessageId);

    $("#AddComment").jqxWindow('open');
}

function getTopicByNum(index) {

    var strLike = $("#inputSearch").val();

    if (strLike === undefined || strLike === null) {
        strLike = "";
    }

    var ForumPart = $("#ForumPart").val();
    if (ForumPart === undefined || ForumPart === null) {
        ForumPart = "Главный";
    }

    $.get("/Home/GetData", { page: index, take: 5, strLike: strLike, ForumPart: ForumPart }, null, "json").done(function (data) {
        debugger;
        buildPaginator(data.intLength);

        topicIndex = index;
        var tbody = document.getElementById('tbody'), n, row, cell;

        tbody.innerHTML = "";

        for (var i = 0; i < data.list.length; i++) {

            var Topic = buildTopicElem(data.list[i]);

            row = tbody.insertRow();
            cell = row.insertCell();
            cell.innerHTML = Topic;
        }
    }).fail(function () {
        alert('Error!');
    });
}

function prev() {

    if (topicIndex >= 2) {
        topicIndex--;
    }

    getTopicByNum(topicIndex);
}

function next() {

    if (topicIndex < topicCount) {
        topicIndex++;
    }
    else if (topicIndex === topicCount) {
        topicIndex = topicCount;
    }

    getTopicByNum(topicIndex);
}

function openDiv(divId) {

    var div = document.getElementById("divMiddle" + divId);
    var openHref = document.getElementById('openHref' + divId);
    var hrefText = openHref.innerText;

    if (hrefText === "развернуть") {
        div.setAttribute("style", "height: auto; overflow: visible;");
        openHref.innerText = "свернуть";
    }
    else if (hrefText === "свернуть") {
        div.setAttribute("style", "height: 100px; overflow: hidden;");
        openHref.innerText = "развернуть";
    }
}

function AddTheme() {

    $("#popupWindow").jqxWindow('open');
}

function getChildMessages(MessagesId, ListMessages) {

    var childMessages = [];

    for (var i = 0; i < ListMessages.length; i++) {
        if (ListMessages[i].parentMessageId === MessagesId) {
            childMessages.push(ListMessages[i]);
        }
    }

    return childMessages;
}
function getUserId() {

    var UserId = 0;
    UserId = $("#hiddenUserId").val();
    return UserId;

}

function buildTopicElem(topicInput) {
    var dataCreate = ConvertStringData(topicInput.dataCreate);

    var strComment = '';
    //var UserId = getUserId();

    //var strbtnComment = "";
    //if (UserId > 0) {
      var strbtnComment = '<a href="#" class="btn btn-outline-info btn-xs py-0" onclick="AddNewMessage(' + topicInput.id + ', 0 )">комментировать</a>';
    //}

    for (var j = 0; j < topicInput.listMessages.length; j++) {

        if (topicInput.listMessages[j].parentMessageId === 0) {

            strComment += buildCommentElem(topicInput.listMessages[j], topicInput.id, topicInput.listMessages);
        }
    }

    var topicOut = '<table class="table table-bordered table-compressed" style="margin-bottom: 0rem;">' +
        '<tr style="background-color: #eee;">' +
        '<td  style="padding: 0px;">' + topicInput.title +
        '&nbsp;&nbsp;  <a href="#"  style="font-size: small;" id="openHref' + topicInput.id + '" onclick="openDiv(' + topicInput.id + ')">развернуть</a>' +
        '</td>' +
        '<td  style="padding: 0px; width: 100px;">' + topicInput.userFio + '</td>' +
        '<td  style="padding: 0px; width: 100px; text-align:center; ">' + dataCreate + '</td>' +
        '</tr>' +
        '<tr style="height: 100px; max-height: 100px;"><td colspan="3">' +

        '<div id="divMiddle' + topicInput.id + '" style="height: 100px; overflow: hidden;">' +
        topicInput.text +


        '<fieldset id="fieldset' + topicInput.id + '" class="border p-2">' +
        '<legend id="legendComment' + topicInput.id + '" class="w-auto">Комментарии</legend>' +

        strbtnComment +
        strComment +
        // comment
        ' </fieldset>' +

        '</div></td></tr>' +
        '</table>';

    return topicOut;
}

function buildCommentElem(comment, topicId, ListComment) {

    var dataComment = ConvertStringData(comment.dataMess);

    //var strButtonComments = '';
    //var UserId = getUserId();

    //if (UserId > 0 && UserId !== undefined && UserId !== null) {
    var strButtonComments = '<button class="btn btn-link btn-sm" onclick="AddNewMessage(' + topicId + ', ' + comment.id + ' )">ответить</button> ';
    //}

    var strClildComments = '';

    if ( ListComment !== null && ListComment !== undefined) {  
        for (var i = 0; i < ListComment.length; i++) {

            if (ListComment[i].parentMessageId === comment.id) {
                strClildComments += buildCommentElem(ListComment[i], topicId, ListComment);
            }
        }
    }

    var strComment = '<div id="divComment" style="border: solid; border-width:thin; border-color: lightgray; margin-left: 20px;">' +
        '<div style="height: 7px;">' +
        '<span>&nbsp;&nbsp;' + comment.userFio + '&nbsp;</span> ' +

        strButtonComments +

        '<span style="float:right; font-size: small; ">' + dataComment + ' &nbsp;</span>' +
        '</div>' +
        '<hr />' +
        '<div id="divComment' + comment.id + '" style="vertical-align: top; padding: 5px; border-radius: 10px;">' +
           comment.text +
        '</div>' +
        '<div id="divChildComment' + comment.id + '">' +
        strClildComments + 
        '</div>' +
        '</div></br>';

       return strComment;
}

function ClearTopic() {
    $('#Title').val('');
    $('#Text').val('');
}

function ClearComment() {
    $('#TextComment').val('');
}

function SearchTopic() {
    getTopicByNum(1);
}

function buildPaginator(intLength) {

    topicCount = intLength / 5;

    if (intLength % 5 !== 0) {
        topicCount++;
    }

    var btnQty = intLength / 5;
    if (intLength % 5 !== 0) {
        btnQty++;
    }

    var paginationUL = document.getElementById('paginationUL');

    paginationUL.innerHTML = "";

    var prev = document.createElement("li");
    prev.setAttribute('data-page', 'prev');
    prev.setAttribute('onclick', 'prev()');
    prev.innerHTML = '<span> &lt; <span class="sr-only">(current)</span></span>';

    paginationUL.appendChild(prev);

    for (var i = 1; i <= btnQty; i++) {
        var li = document.createElement("li");
        li.setAttribute('data-page', i);

        li.setAttribute('onclick', 'getTopicByNum(' + i + ')');

        li.innerHTML = '<span>' + i + '<span class="sr-only">(current)</span></span>';
        paginationUL.appendChild(li);
    }

    var next = document.createElement("li");
    next.setAttribute('data-page', 'next');
    next.setAttribute('onclick', 'next()');
    next.setAttribute('id', 'prev');
    next.setAttribute('style', 'display: inline;');
    next.innerHTML = '<span> &gt; <span class="sr-only">(current)</span></span>';

    paginationUL.appendChild(next);

}

function AddTopicLink() {
    var linkAdressTopic = $("#linkAdressTopic").val(); // адрес ссылки
    var linkTextTopic = $("#linkTextTopic").val();     // текст ссылки

    var Link = '<a href="' + linkAdressTopic + '">' + linkTextTopic + '</a>';

    var Text = $("#Text");
    Text.val(Text.val() + Link);
}

function AddTopicImg() {

    var imgAdressTopic = $("#imgAdressTopic").val(); 
    var Text = $("#Text");
    Text.val(Text.val() + '<img src="' +  imgAdressTopic + '">');

}

function AddCommentLink() {

    var linkAdress = $("#linkAdressComment").val(); // адрес ссылки
    var linkText = $("#linkTextComment").val();     // текст ссылки

    if (linkText.length === 0) {
        linkText = 'ссылка';
    }

    var Link = '<a href="' + linkAdress + '">' + linkText + '</a>';

    var TextComment = $("#TextComment");
    TextComment.val(TextComment.val() + Link);

}

function AddCommentImg() {

    var imgAdress = $("#imgAdressComment").val();
    var Text = $("#TextComment");
    Text.val(Text.val() + '<img src="' + imgAdress + '">');

}