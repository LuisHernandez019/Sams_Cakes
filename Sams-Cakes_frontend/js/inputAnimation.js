$(".txtfield input").on("focus", function () { $(this).addClass("focus"); });

$(".txtfield input").on("blur", function () {
    if ($(this).val() == "")
        $(this).removeClass("focus");
});