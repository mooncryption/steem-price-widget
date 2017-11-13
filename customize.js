var code = "<h3>Result here :) </h3>"
function compilewidget() {
    var choiceWidth = parseFloat(document.getElementById("choicewidth").value);
    var choiceHeight = parseFloat(document.getElementById("choiceheight").value);
    if (choiceWidth < 320) {
        choiceWidth = 320;
        document.getElementById("choicewidth").value = 320;
    }
    if (choiceHeight < 180) {
        choiceHeight = 280;
        document.getElementById("choiceheight").value = 280;
    }
    var prechoiceBG = !(document.getElementById("choicenobg").checked);
    var choiceBG = "false";
    if (prechoiceBG == true) {
        choiceBG = "true";
    }
    var prechoiceBorder = !(document.getElementById("choicenoborder").checked);
    var choiceBorder = "false";
    if (prechoiceBorder == true) {
        choiceBorder = "true";
    }
    var choiceBase = "USD";
    if ((document.getElementById("choiceusebtc").checked) == true) {
        choiceBase = "BTC";
    }
    var params = "background=" + choiceBG + "&border=" + choiceBorder + "&base=" + choiceBase;
    console.log("USING PARAMS: " + params);
    code = "<iframe src=\"https://mooncryption.github.io/steem-price-widget/widget.html?" + params + "\" width=\"" + choiceWidth + "\" height=\"" + choiceHeight + "\" frameBorder=\"0\"></iframe>";
    console.log("USING CODE: " + code);
    document.getElementById("widgetsample").innerHTML = code;
}

window.onload = function () {
    setTimeout(compilewidget, 100);
    // setInterval(compilewidget, 1000);
}