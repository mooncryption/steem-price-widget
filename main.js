
var prices = { "bittrex": 0, "poloniex": 0, "coinMC": 0 };
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
            prices["poloniex"] = roundTo(pprice * pbtcprice, 6);
        }));
    }));
}

function coinMCPrice() {
    var coinSrc = "https://api.coinmarketcap.com/v1/ticker/steem/";
    ($.get(coinSrc, function (response) {
        priceC = parseFloat(response[0]["price_usd"]);
        prices["coinMC"] = roundTo(priceC, 6);
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
        xstr = "<span id=\"price\"><b>$</b>&#8239;" + xstr + "</span>";
        previouslySetPrice = 1;
    }
    // console.log("Current Average STEEM Price: " + xstr)
    document.getElementById("steemprice").innerHTML = xstr;
    if ((textlessWidget == 1) && (previouslySetPrice == 1)) {
        document.getElementById("price").style.fontSize = "300%";
    }
    return total;
}

function useQueryVars() {
    if ((getParameterByName("border") == "false") || (getParameterByName("border") == "0") || (getParameterByName("border") == "False")) {
        document.getElementById("main").style.borderRadius = "0px";
        document.getElementById("main").style.border = "0px";
        document.getElementById("main").style.borderColor = "white";
    }
    if ((getParameterByName("background") == "false") || (getParameterByName("background") == "0") || (getParameterByName("background") == "False")) {
        document.getElementById("main").style.background = "";
        document.getElementById("main").style.backgroundImage = "";
        document.getElementById("main").style.backgroundSize = "0";
    }
    if ((getParameterByName("text") == "false") || (getParameterByName("text") == "0") || (getParameterByName("text") == "False")) {
        document.getElementById("pricetitle").style.display = "none";
        document.getElementById("bottomtext").style.display = "none";
        document.getElementById("invisibleBreak1").innerHTML = "<br>";
        textlessWidget = 1;
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
    setInterval(steemPrice, 4000);
}