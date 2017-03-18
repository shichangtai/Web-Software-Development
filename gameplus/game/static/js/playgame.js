$(document).ready(function () {
    'use strict';
    $.expr[":"].contains = $.expr.createPseudo(function (arg) {
        return function (elem) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });
    $("#search").keyup(function () {
        var text = $("#search").val();
        $('.single-game').hide();
        $("h5:contains(" + text + ")").closest('.single-game').show();
        $("h3:contains(" + text + ")").closest('.single-game').show();

    });
    var game_state;

    $(window).on('message', function (evt) {
        //Note that messages from all origins are accepted

        //Get data from sent message
        var data = evt.originalEvent.data;

        if (data.messageType.localeCompare("SAVE") == 0) {
            $("#error_message").text("");
            game_state = data.gameState;
            var jsonData = JSON.stringify(game_state);

            $('#id_game_state').val(jsonData);
            $('#state_form').submit();

            //console.log("items: "+data.gameState.playerItems);
            //console.log("score: "+data.gameState.score);
            //var formData = JSON.stringify($("#play_form").serializeArray());
            console.log(data.gameState);

        } else if (data.messageType.localeCompare("LOAD_REQUEST") == 0) {
            $("#error_message").text("");

            game_state = data.gameState;
            var jsonData = JSON.stringify(game_state);

            $('#id_game_state').val(jsonData);
            $('#load_state').submit();

        } else if (data.messageType.localeCompare("SCORE") == 0) {
            $('#id_score').val(data.score);
            $('#play_form').submit();
        }
        else if (data.messageType.localeCompare("SETTING") == 0) {
            $("#error_message").text("");
            document.getElementById("iframe1").height = (data.options.height) + "px";
            document.getElementById("iframe1").width = (data.options.width) + "px";
        }
        else if (data.messageType.localeCompare("ERROR") == 0) {
            $("#error_message").text(data.info);
        }

    });
});

var play_frm = $('#play_form');
play_frm.submit(function (e) {
    $.ajax({
        type: play_frm.attr('method'),
        url: play_frm.attr('action'),
        data: play_frm.serialize(),

        success: function (data) {
            //console.log(data['last_round']);
            $('#last_round').text(Number(data['last_round']).toFixed(2))
            //console.log(data);
            $('#personal_high').text(Number(data['personal_high']).toFixed(2))
        },
        error: function (data) {
            alert("Score submission went wrong. Try again");
        }
    });
    e.preventDefault();
});

var state_frm = $('#state_form');
state_frm.submit(function (e) {
    $.ajax({
        type: state_frm.attr('method'),
        url: state_frm.attr('action'),
        data: state_frm.serialize(),

        success: function (data) {
            console.log(data)
            console.log(data['score']);
            console.log(data['playerItems']);
        },
        error: function (data) {
            alert("Save went wrong. Try again");
        }
    });
    e.preventDefault()
});

var load_frm = $('#load_state');
load_frm.submit(function (e) {
    $.ajax({
        type: load_frm.attr('method'),
        url: load_frm.attr('action'),
        data: load_frm.serialize(),

        success: function (data) {
            var msg = {
                "messageType": "LOAD",
                "gameState": data
            };
            window.frames[0].postMessage(msg, "*");
        },
        error: function (data) {
            alert("load went wrong. Try again");
        }
    });
    e.preventDefault()
});
