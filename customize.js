

function compilewidget() {
    var choiceWidth = parseFloat(document.getElementById("choicewidth").value);
    var choiceHeight = parseFloat(document.getElementById("choiceheight").value);
    var choiceBG = !(document.getElementById("choicenobg").checked);
    var choiceBorder = !(document.getElementById("choicenoborder").checked);
    var choiceBase = "USD";
    if ((document.getElementById("choiceusebtc").checked)) {
        choiceBase = "BTC";
    }
    var params = "background=" + toString(choiceBG) + "&border=" + toString(choiceBorder) + "&base=" + toString(choiceBase);
    var code = "<iframe src=\"https://mooncryption.github.io/steem-price-widget/widget.html?" + params + "\"width=\"" + choiceWidth + "\" height=\"" + choiceHeight + "\" frameBorder=\"0\"></iframe>";
    console.log("USING CODE: " + code);
    document.getElementById("widgetsample").innerHTML = code;
}

window.onload = function() {
    setTimeout(compilewidget, 100);
    // setInterval(compilewidget, 1000);
}
