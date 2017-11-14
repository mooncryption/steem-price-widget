Steem Price Widget is a flexible HTML/JavaScript widget for your website. The widget shows the current Steem Price up to three decimal points of precision, and updates real-time.

### Basic Usage
To include Steem Price Widget, simply add the following code anywhere in your website:
```javascript
<iframe src="https://mooncryption.github.io/steem-price-widget/widget.html" width="320px" height="180px" frameBorder="0"></iframe>
```
You may play around with the `width` and `height` parameters, as long as `width` is at least `320px` and `height` is at least `180px`. The `frameBorder` parameter can also be toggled, but `0` is the best-looking setting.

### Advanced Usage
In the `<iframe>` element, the `src` url can also have URL parameters. URL Parameters are in the form of a "suffix" at the end of the URL, such as:
<br><center>
<code>https://mooncryption.github.io/steem-price-widget/widget.html?border=true&background=false&bcolor=green</code>
</center><br>
In the above, everything after the `?` is a URL parameter. Specifically, the above URL, if used in the `<iframe>`'s `src` link, would turn off the background, and set the border color to `green`.

The options for these **URL Parameters** vary, and can be explored with our **[customization tool](https://mooncryption.github.io/steem-price-widget/customize)**!

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

##### Non-USD Base Currencies
We do support a few non-USD base currencies such as `BTC` (Bitcoin) and `SBD` (Steem Dollars). 

In any mode of the widget, simply clicking on the gray base currency (next to the given price value) will switch the base currency. You can do this until you get to your preferred base.

We also support a URL Parameter `base` to set the default base currency. If this parameter is not set, we default to `USD` but if you set it with `base=SBD` or `base=BTC` we'll default to those options instead.

When we calculate the value for a non-USD base currency, we use the same price algorithm to generate a USD value, then we divide that by the current price of Bitcoin or Steem Dollars. 

* We offer `USD` as a base currency as it's the main fiat type in America, and one of the most popular fiat currencies in the world.
* We also offer `BTC` as it's the top-ranked cryptocurrency, and because many exchanges only convert between `BTC` and `STEEM` without relying on `USD`.
* Lastly, we offer `SBD` as a base currency because it's Steem's version of the dollar. Exchanges such as Steem's internal decentralized market rely on SBD to STEEM conversions as well.

### Terms of Use
The Terms of Use goes into effect when you:
* use this widget on your website
* add this widget's code to your website's source code
* view this widget

These terms are available [here](https://mooncryption.github.io/steem-price-widget/terms.html).

#### Thank you!
Thank you for using the STEEM Price Widget and promoting Steem on your website. :)
