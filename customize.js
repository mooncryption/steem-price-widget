// customize.js
// created by @mooncryption on STEEM

var code = "<h3>loading...</h3>";
var minWidth = 320, maxWidth = 480;
var minHeight = 180, maxHeight = 240;
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function compilewidget() {

    var choiceWidth = parseFloat(document.getElementById("choicewidth").value);
    var choiceHeight = parseFloat(document.getElementById("choiceheight").value);
    if (choiceWidth < minWidth || choiceWidth > maxWidth || !(isNumeric(choiceWidth))) {
        var widthDirections = "Remember that your width must be a decimal between " + minWidth + " and " + maxWidth + ".";
        if (!(isNumeric(choiceWidth))) {
            alert("Your width value is not a valid number. " + widthDirections);
        } else if (choiceWidth < minWidth) {
            alert("Your width value is too small. " + widthDirections);
        } else if (choiceWidth > maxWidth) {
            alert("Your width value is too large. " + widthDirections);
        }
        choiceWidth = minWidth;
        document.getElementById("choicewidth").value = minWidth;
    }
    if (choiceHeight < minHeight || choiceHeight > maxHeight || !(isNumeric(choiceHeight))) {
        var heightDirections = "Remember that your height must be a decimal between " + minHeight + " and " + maxHeight + ".";
        if (!(isNumeric(choiceHeight))) {
            alert("Your width value is not a valid number. " + heightDirections);
        } else if (choiceHeight < minHeight) {
            alert("Your width value is too small. " + heightDirections);
        } else if (choiceHeight > maxHeight) {
            alert("Your width value is too large. " + heightDirections);
        }
        choiceHeight = minHeight;
        document.getElementById("choiceheight").value = minHeight;
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
    if ((document.getElementById("choiceusesbd").checked) == true) {
        choiceBase = "SBD";
    }
    if (choiceBorder == "false") {
        document.getElementById("choicebcolor").style.opacity = "0.2";
    } else {
        document.getElementById("choicebcolor").style.opacity = "1.0";
    }
    var choicebcolor = "default";
    choicebcolor = (document.getElementById("choicebcolor").value);
    var params = "background=" + choiceBG + "&border=" + choiceBorder + "&base=" + choiceBase + "&bcolor=" + choicebcolor + "&src=customizationv1";
    console.log("USING PARAMS: " + params);
    code = "<iframe src=\"https://mooncryption.github.io/steem-price-widget/widget.html?" + params + "\" width=\"" + choiceWidth + "\" height=\"" + choiceHeight + "\" frameBorder=\"0\"></iframe>";
    var wcode = "&lt;iframe src=\"https://mooncryption.github.io/steem-price-widget/widget.html?" + params + "\" width=\"" + choiceWidth + "\" height=\"" + choiceHeight + "\" frameBorder=\"0\"&gt;&lt;/iframe&gt;";
    console.log("USING CODE: " + code);
    document.getElementById("widgetsample").innerHTML = code;
    document.getElementById("widgetcode").innerHTML = wcode;
}

function getCodeAlert() {
    compilewidget();
    var codeprompt = prompt("Please copy your code below, and paste it into your website:", code);
}

window.onload = function () {
    setTimeout(compilewidget, 100);
    // setInterval(compilewidget, 1000);
}