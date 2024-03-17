$(document).ready(function () {
    var code;
    var container;
    var content;
    var container_code;
    var content_code;
    var table_name;
    var process;

    $("#login").click(function () {
        uname = $('#user_id').val();
        pass = $('#pass').val();
        if (uname || pass) {
            $.post("", {
                uname: uname,
                pass: pass,
                login: ''
            }, function (data) {
                if (data != "OK") {
                    alert("Wrong User ID or Password");
                } else {
                    $(".login").addClass("d-none");
                    $(".first").removeClass("d-none");
                }
            });
        }

    });

    $("#process").on("click", ".process", function () {
        process = $(this).attr("id").split(",");
        $("#inner_content").val(process[0]);
        $("#inner_content_status").val(process[1]);

        $("#content").val(process[2]);
        $("#content_status").val(process[3]);
        $("#content_scanned_by").val(process[4]);
        $("#content_scanned_time").val(process[5]);

        $("#container").val(process[6]);
        $("#container_status").val(process[7]);
        $("#container_scanned_by").val(process[8]);
        $("#container_scanned_time").val(process[9]);

        $(".second").addClass("d-none");
        $(".third").removeClass("d-none");
        $("#taintext").html("SCAN " + process[4] + " NO");
        $("#tentext").html("SCAN " + process[2] + " NO");
        $("#container_code").focus();
    });

    $("#tbl_smt").click(function () {
        table_name = $('#tbl').find(":selected").val();
        if (table_name) {
            $(".first").addClass("d-none");
            $(".second").removeClass("d-none");

            $.post("", {
                tbl: table_name
            }, function (data) {
                $("#process").append(data);
            });
        }

    });

    $("#back").click(function () {
        $(".five").addClass("d-none");
        $(".fourth").removeClass("d-none");
        $("#content_code").focus();
    });

    $('#container_code').keypress(function (event) {
        if (event.which == 13) {
            if ($(this).val()) {
                $.post("", {
                    container: $("#container").val(),
                    table_name: $('#tbl').find(":selected").val(),
                    container_code: $("#container_code").val(),
                    content: $("#content").val(),
                    content_status: $("#content_status").val(),
                    inner_content: $("#inner_content").val(),
                    inner_content_status: $("#inner_content_status").val(),
                    box: ''
                }, function (data) {
                    if (data != "No Data Found") {
                        $(".third").addClass("d-none");
                        $(".fourth").removeClass("d-none");
                        $("#content_code").focus();
                        $("#detail").append(data);
                    } else {
                        alert(data);
                    }
                });
            }
        }
    });

    $('#content_code').keypress(function (event) {
        if (event.which == 13) {
            if ($(this).val()) {
                if ($("#status" + $("#content_code").val()).parent().attr('class') == 'bg-danger') {
                    alert("Incomplete " + $("#inner_content").val());
                    return;
                } else if ($("#status" + $("#content_code").val()).parent().attr('class') == 'bg-success') {
                    //alert($(this).val() + " Already Scanned");
                    $(".msg").html($(this).val() + " Already Scanned");
                    $("#content_code").val("");
                    $(".fourth").addClass("d-none");
                    $(".five").removeClass("d-none");
                    var win = new Audio("alert.wav");
                    //win.onload = setTimeout(function () {
                    //alert(data);
                    //}, 1000);
                    win.play();
                    return;
                }
                $.post("", {
                    container: $("#container").val(),
                    container_status: $("#container_status").val(),
                    container_scanned_by: $("#container_scanned_by").val(),
                    container_scanned_time: $("#container_scanned_time").val(),
                    table_name: $('#tbl').find(":selected").val(),
                    container_code: $("#container_code").val(),
                    content: $("#content").val(),
                    content_code: $("#content_code").val(),
                    content_status: $("#content_status").val(),
                    content_scanned_by: $("#content_scanned_by").val(),
                    content_scanned_time: $("#content_scanned_time").val(),
                    inner_content: $("#inner_content").val(),
                    inner_content_status: $("#inner_content_status").val(),
                    user: $("#user_id").val(),
                    env: ''
                }, function (data) {
                    if (data == "Done") {
                        $("#status" + $("#content_code").val()).text("C");
                        var rem = $("#status" + $("#content_code").val()).parent();
                        $("#status" + $("#content_code").val()).parent().appendTo("#tbldetail tbody");//prependTo("#tbldetail tbody")
                        $("#status" + $("#content_code").val()).parent().addClass("bg-success");
                        rem.remove();
                        $('#scanned').text(parseInt($("#scanned").text()) + 1);
                        $('#balance').text(parseInt($("#balance").text()) - 1);
                        var win = new Audio("beep.mp3");
                        win.play();
                        $("#content_code").val("");
                        $("#content_code").focus();
                    } else if (data == "OK") {

                        $("#content_code").val("");
                        $("#detail").empty();
                        $(".fourth").addClass("d-none");
                        $(".third").removeClass("d-none");
                        $("#container_code").val("");
                        $("#container_code").focus();
                    } else {
                        $("#content_code").val("");
                        $(".fourth").addClass("d-none");
                        $(".five").removeClass("d-none");
                        $(".msg").html(data);
                        var win = new Audio("alert.wav");
                        //win.onload = setTimeout(function () {
                        //alert(data);
                        //}, 1000);
                        win.play();
                        //alert(data);
                    }
                });
            }
        }
    });
});