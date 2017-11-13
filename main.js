
var prices = { "bittrex": 0, "poloniex": 0, "coinMC": 0 };
var basecur = 0; var numbasecurs = 3; var change24 = "";
var curtostring = ["USD", "BTC", "SBD"];
var btcpricesum = 1; var btcbittrex = 1; var btcpoloniex = 1;
var sbdpricesum = 1;
var previouslySetPrice = 0;
var textlessWidget = 0;
function roundTo(n, digits) {
    if (digits === undefined) {
        digits = 0;
    }

    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    var test = (Math.round(n) / multiplicator);
    return +(test.toFixed(digits));
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function bittrexPrice() {
    var bittrexSrc = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%20%3D%20%27https%3A%2F%2Fbittrex.com%2Fapi%2Fv1.1%2Fpublic%2Fgetticker%3Fmarket%3DBTC-STEEM%27&format=json&callback=";
    var btcSrc = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%20%3D%20%27https%3A%2F%2Fbittrex.com%2Fapi%2Fv1.1%2Fpublic%2Fgetticker%3Fmarket%3DUSDT-BTC%27&format=json&callback=";

    var bprice = 0;
    ($.get(bittrexSrc, function (response) {
        var bres = response["query"]["results"]["json"]["result"];
        bprice = (parseFloat(bres["Ask"])) + (parseFloat(bres["Bid"])) + (parseFloat(bres["Last"]));
        bprice = bprice / 3.0;
        var btcprice = 0;
        ($.get(btcSrc, function (response) {
            var btcres = response["query"]["results"]["json"]["result"];
            btcprice = (parseFloat(btcres["Ask"])) + (parseFloat(btcres["Bid"])) + (parseFloat(btcres["Last"]));
            btcprice = btcprice / 3.0;
            btcbittrex = btcprice;
            prices["bittrex".toString()] = roundTo(bprice * btcprice, 6);
        }));
    }));
}

function poloniexPrice() {
    var poloniexSrc = "https://poloniex.com/public?command=returnTicker";
    var pprice = 0;
    var pbtcprice = 0;

    ($.get(poloniexSrc, function (response) {
        var pres = response["BTC_STEEM"];
        pprice = (parseFloat(pres["highestBid"])) + (parseFloat(pres["lowestAsk"])) + (parseFloat(pres["last"]));
        pprice = pprice / 3.0;
        ($.get(poloniexSrc, function (response) {
            var pbtcres = response["USDT_BTC"];
            pbtcprice = (parseFloat(pbtcres["highestBid"])) + (parseFloat(pbtcres["lowestAsk"])) + (parseFloat(pbtcres["last"]));
            pbtcprice = pbtcprice / 3.0;
            btcpoloniex = pbtcprice;
            btcpricesum = (btcpoloniex + btcbittrex + 0.0) / (2.0);
            prices["poloniex"] = roundTo(pprice * pbtcprice, 6);
        }));
    }));
}

function coinMCPrice() {
    var coinSrc = "https://api.coinmarketcap.com/v1/ticker/steem/";
    ($.get(coinSrc, function (response) {
        priceC = parseFloat(response[0]["price_usd"]);
        var percentResponse = response[0]["percent_change_24h"];
        if (percentResponse.indexOf("-") <= -1) {
            percentResponse = "+" + percentResponse;
        }
        change24 = " (" + percentResponse + "%)";
        prices["coinMC"] = roundTo(priceC, 6);
    }));
    var sbdSrc = "https://api.coinmarketcap.com/v1/ticker/steem-dollars/";
    ($.get(sbdSrc, function (response) {
        sbdpricesum = parseFloat(response[0]["price_usd"]);
    }));
}

function steemPrice() {
    bittrexPrice();
    poloniexPrice();
    coinMCPrice();
    var prB = prices["bittrex"]
    var prP = prices["poloniex"]
    var prC = prices["coinMC"]
    if (prB == 0) {
        if (prP != 0) {
            prB = prP;
        } else {
            prB = prC;
        }
    }
    if (prC == 0 && prB != 0) {
        prC = prB;
    }
    if (prP == 0 && prB != 0) {
        prP = prB;
    }
    var total = prB + prP + prC;
    total = roundTo((total / 3.0), 3)
    if (basecur == 1) {
        total = (total + 0.0) / (btcpricesum);
        total = roundTo(total, 6);
    } else if (basecur == 2) {
        total = (total + 0.0) / (sbdpricesum);
        total = roundTo(total, 3);
    }
    
    var xstr = total.toString();
    if (xstr.indexOf(".") <= -1) {
        xstr = xstr + ".00";
    }
    precision = (xstr.length - xstr.indexOf(".")) - 1;
    if (precision < 3) {
        while (precision < 3) {
            if (precision >= 3) {
                break;
            }
            xstr = xstr + "0";
            precision = (xstr.length - xstr.indexOf(".")) - 1;
        }
    }
    if (total == 0) {
        if (previouslySetPrice == 0) {
            xstr = "<span class=\"loading\"><span class=\"invisible\">......</span></span>";
        } else {
            xstr = document.getElementById("steemprice").innerHTML;
        }
    } else {
        if (basecur == 0) {
            xstr = "<span id=\"price\"><b>$</b>&#8239;" + xstr + "</span>";
        } else {
            xstr = "<span id=\"price\">&#8239;" + xstr + "</span>";
        }
        previouslySetPrice = 1;
    }
    // console.log("Current Average STEEM Price: " + xstr)
    document.getElementById("steemprice").innerHTML = xstr;
    document.getElementById("24change").innerHTML = change24;
    var basecurstring = "0";
    if (basecur == 1) {
        basecurstring = "1";
    } else if (basecur == 2) {
        basecurstring = "0";
    }
    if (change24.indexOf("-") != -1) {
        document.getElementById("24change").className = "negativechange" + basecurstring;
    } else {
        document.getElementById("24change").className = "positivechange" + basecurstring;
    }
    if ((textlessWidget == 1) && (previouslySetPrice == 1)) {
        document.getElementById("price").style.fontSize = "300%";
    }
    basestr = curtostring[basecur];
    document.getElementById("basecurrency1").innerHTML = basestr;
    // document.getElementById("basecurrency2").innerHTML = basestr;
    // document.getElementById("basecurrency3").innerHTML = basestr;
    document.getElementsByClassName("basecurrency").innerHTML = basestr;
    return total;
}

function useQueryVars() {
    if ((getParameterByName("border") == "false") || (getParameterByName("border") == "0") || (getParameterByName("border") == "False")) {
        console.log("URL VARS | activating border false");
        document.getElementById("main").style.borderRadius = "0px";
        document.getElementById("main").style.border = "0px";
        document.getElementById("main").style.borderColor = "white";
    }
    if ((getParameterByName("bcolor") != "") || (getParameterByName("bcolor") != "0") || (getParameterByName("bcolor") != "false")) {
        var chosenbordercolor = getParameterByName("bcolor");
        console.log("URL VARS | activating border color: " + chosenbordercolor);
        if ((chosenbordercolor == "steem") || (chosenbordercolor == "Steem") || (chosenbordercolor == "steemblue") || (chosenbordercolor == "default")) {
            chosenbordercolor = "rgb(10, 195, 241)";
        }
        document.getElementById("main").style.borderColor = chosenbordercolor;
    }
    if ((getParameterByName("bradius") != "") || (parseFloat(getParameterByName("bradius")) > 0) || (getParameterByName("bradius") != "false")) {
        var chosenbradius = (getParameterByName("bradius"));
        console.log("URL VARS | activating border radius: " + chosenbradius);
        if (chosenbradius > -1) {
            var chosenbstring = chosenbradius + "px";
            document.getElementById("main").style.setProperty("border-radius", chosenbstring, "important");
            document.getElementById("mainpanelheading").style.setProperty("border-radius", chosenbstring, "important");
        }
    }
    if ((getParameterByName("background") == "false") || (getParameterByName("background") == "0") || (getParameterByName("background") == "False")) {
        console.log("URL VARS | activating background false");
        document.getElementById("main").style.background = "";
        document.getElementById("main").style.backgroundImage = "";
        document.getElementById("main").style.backgroundSize = "0";
    }
    if ((getParameterByName("text") == "false") || (getParameterByName("text") == "0") || (getParameterByName("text") == "False")) {
        console.log("URL VARS | activating text false");
        document.getElementById("pricetitle").style.display = "none";
        document.getElementById("bottomtext").style.display = "none";
        document.getElementById("invisibleBreak1").innerHTML = "<br>";
        textlessWidget = 1;
    }
    if ((getParameterByName("base") == "BTC") || (getParameterByName("base") == "1") || (getParameterByName("base") == "btc")) {
        console.log("URL VARS | activating basecurrency BTC");
        basecur = 1;
        steemPrice();
    }
    if ((getParameterByName("base") == "SBD") || (getParameterByName("base") == "2") || (getParameterByName("base") == "sbd")) {
        console.log("URL VARS | activating basecurrency SBD");
        basecur = 2;
        steemPrice();
    }
} 

window.onload = function () {
    useQueryVars();
    setTimeout(steemPrice, 500);
    setTimeout(useQueryVars, 1000);
    setTimeout(steemPrice, 1500);
    setTimeout(steemPrice, 3000);
    $("body").click(function () {
        console.log("Triggering price update...")
        steemPrice();
    });
    $(".basecurrency").click(function () {
        console.log("base currency clicked");
        basecur = (basecur+1) % numbasecurs;
        var basestring = curtostring(basecur);
        document.getElementById("basecurrency1").innerHTML = basestring;
        // document.getElementById("basecurrency2").innerHTML = basestr;
        // document.getElementById("basecurrency3").innerHTML = basestr;
        document.getElementsByClassName("basecurrency").innerHTML = basestring;
    });
    setInterval(steemPrice, 4000);
}
