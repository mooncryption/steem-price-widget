In the tool below, edit your options by clicking on the various buttons and editing the height/width/etc. After editing, press enter or click outside to see how your options look on the right-hand side of the page.

Lastly, scroll to the bottom of your page to copy your unique HTML code, and paste it into your website!


## Use the STEEM Price Widget!
<div class="pull-right" id="widgetsample">
<em>...</em>
</div>

1. Default Base Currency: 
  * <input type="radio" onclick="compilewidget()" id="choiceuseusd" name="basecurrencychoice" checked> <b>&nbsp;Default to `USD`</b>
  * <input type="radio" onclick="compilewidget()" id="choiceusebtc" name="basecurrencychoice"> <b>&nbsp;Default to `BTC`</b>
  * <input type="radio" onclick="compilewidget()" id="choiceusesbd" name="basecurrencychoice"> <b>&nbsp;Default to `SBD`</b>
  * _Note:_ The above choices are only defaults. <br> Simply clicking on the gray base currency <br>option in the widget will swap between the options.
2. Background: 
  * <input type="checkbox" onclick="compilewidget()" id="choicenobg">&nbsp;<b>Use No Background</b>
3. Size:
  * **Width**: <input type="text" style="width:48px;" onchange="compilewidget()" id="choicewidth" name="choicewidth" value="320">px &nbsp;&nbsp;(at least 320)
  * **Height**: <input type="text" style="width:48px;" onchange="compilewidget()" id="choiceheight" name="choiceheight" value="180">px &nbsp;&nbsp;(at least 180)
4. Border: 
  * <input type="checkbox" onclick="compilewidget()" id="choicenoborder">&nbsp;<b>Use No Border</b>
  * <b> Border Color: </b> <input type="text" style="width:150px;" onchange="compilewidget()" id="choicebcolor" name="choicebcolor" value="steemblue"/> (examples: `purple`, `red`, `rgb(255,0,0)`)
<br><br>

### Copy your Source Code!
<code id="widgetcode" lang="html" language="html">
(loading)
</code>
<br>
<button onclick="getCodeAlert()" name="getCodeAlert" id="getCodeAlert"><b>Copy your Code!</b></button>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" async></script>
<script src="customize.js"></script>
