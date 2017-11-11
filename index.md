Steem Price Widget is a flexible HTML/JavaScript widget for your website. The widget shows the current Steem Price up to three decimal points of precision, and updates real-time.

### Basic Usage
To include Steem Price Widget, simply add the following code anywhere in your website:
```javascript
<iframe src="https://mooncryption.github.io/steem-price-widget/widget.html" width="240px" height="180px" frameBorder="0"></iframe>
```
You may play around with the `width` and `height` parameters, as long as `width` is at least `240px` and `height` is at least `180px`. The `frameBorder` parameter can also be toggled, but `0` is the best-looking setting.

### Advanced Usage
In the `<iframe>` element, the `src` url can also have URL parameters. URL Parameters are in the form of a "suffix" at the end of the URL, such as:
<br><center>
<code>https://mooncryption.github.io/steem-price-widget/widget.html?border=false&background=false</code>
</center><br>
In the above, everything after the `?` is a URL parameter. Specifically, the above URL, if used in the `<iframe>`'s `src` link, would turn off the border and background.
##### URL Parameter Options
Here are the possible URL parameters:
- **`border`** [default: `true`]:
    * `true` keeps the default dark-blue border surrounding the widget.
    * `false` turns off the border.
- **`background`** [default: `true`]:
    * `true` keeps the STEEM logo background
    * `false` turns off the background (plain white)
- **`text`** [default: `true`]:
    * `true` keeps the header and sources text
    * `false` removes all text except for the price itself, and increases the price's font size

### Price Calculation Algorithm
Our widget uses three sources for price data, all with equal weight:
* [Bittrex.com](https://bittrex.com) (1/3 Weight)
* [Poloniex.com](https://poloniex.com) (1/3 Weight)
* [CoinMarketCap.com](https://coinmarketcap.com) (1/3 Weight)

Bittrex and Poloniex are the top two exchanges for STEEM. If one of these exchanges' STEEM price goes through a larger sway or some market manipulation, we _do_ want that to show up in the final price.

Additionally, CoinMarketCap.com gives an aggregate/average price for STEEM throughout many exchanges, including unpopular ones. This helps judge the overall STEEM price as well.

The price calculation works as follows. Let `STEEM(b)` be Bittrex's STEEM price in BTC, and `BTC(b)` be Bittrex's BTC price in USD. Then, let `STEEM(p)` be Poloniex's STEEM price in BTC, and `BTC(p)` be Poloniex's BTC price in USD. Lastly, let `c` be CoinMarketCap's STEEM price in USD.

The price shown in the widget is an **unweighted average** of the exchange STEEM prices in USD for Bittrex, Poloniex, and CoinMarketCap, which is approximately equal to:
<center><img src="https://i.imgur.com/hoWrGRj.png" alt="(BTC(b) * STEEM(b) + BTC(p) * STEEM(p) + c) / 3.0"></center>

However, the end price *does* get slightly rounded. The final price shown is rounded to **3 decimal points** of precision. 

### Terms of Use
The Terms of Use goes into effect when you:
* use this widget on your website
* add this widget's code to your website's source code
* view this widget

These terms are available [here](https://mooncryption.github.io/steem-price-widget/terms.html).



