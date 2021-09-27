(this["webpackJsonpstock-watcher"]=this["webpackJsonpstock-watcher"]||[]).push([[0],{12:function(t,e,n){t.exports={"stock-list-card":"StockListCard_stock-list-card__iScbZ","basic-info":"StockListCard_basic-info__3OPYz"}},13:function(t,e,n){t.exports={main:"App_main__3ZkGI","loading-spinner":"App_loading-spinner__bc1jS"}},23:function(t,e,n){t.exports={"search-form":"Search_search-form__1laBW"}},28:function(t,e,n){},50:function(t,e,n){},51:function(t,e,n){},52:function(t,e,n){"use strict";n.r(e);var c=n(1),r=n.n(c),o=n(22),s=n.n(o),a=(n(28),n(3)),i=n.n(a),u=n(9),d=n(4),l=n(7),f=n(6),j=n.n(f),b=n(23),k=n.n(b),p=n(0),h=function(t){var e=Object(c.useState)(),n=Object(l.a)(e,2),r=n[0],o=n[1],s=function(){var e=Object(d.a)(i.a.mark((function e(n){var c,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),!t.isLoading){e.next=3;break}return e.abrupt("return");case 3:return t.setLoading(!0),e.next=6,j.a.get("https://finnhub.io/api/v1/search?q=".concat(r,"&token=c14ongv48v6st2755it0"));case 6:return c=e.sent,e.next=9,j.a.get("https://finnhub.io/api/v1/quote?symbol=".concat(r,"&token=c14ongv48v6st2755it0"));case 9:o=e.sent,t.addStock({stockName:c.data.result[0],stockPrice:o.data}),t.setLoading(!1);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(p.jsx)("div",{className:k.a["search-form"],children:Object(p.jsxs)("form",{children:[Object(p.jsx)("input",{type:"text",onChange:function(t){return o(t.target.value)}}),Object(p.jsx)("button",{onClick:s,children:"Search"})]})})},m=n(12),v=n.n(m),O=function(t){return console.log(t),Object(p.jsxs)("li",{className:v.a["stock-list-card"],children:[Object(p.jsxs)("div",{className:v.a["basic-info"],children:[Object(p.jsx)("h2",{children:t.description}),"Open: ",t.stockPrice.o,Object(p.jsx)("br",{}),"High: ",t.stockPrice.h,Object(p.jsx)("br",{}),"Low: ",t.stockPrice.l,Object(p.jsx)("br",{})]}),Object(p.jsxs)("h3",{children:["Price: ",t.stockPrice.c]}),Object(p.jsx)("button",{onClick:function(){t.removeStock(t.id)},children:"Remove"})]})},g=(n(50),function(t){return Object(p.jsx)("div",{children:t.stockList.length>0&&Object(p.jsx)("ul",{children:t.stockList.map((function(e){return Object(p.jsx)(O,{description:e.stockName.description,stockPrice:e.stockPrice,stockName:e.stockName,removeStock:t.removeStock,id:e.stockName.description},e.stockName.description)}))})})}),x=(n(51),function(){return Object(p.jsx)("header",{children:Object(p.jsx)("h1",{children:"Stock Watcher"})})}),S=n(13),N=n.n(S),y=n.p+"static/media/loadingSpinner.c7d9f081.gif";var P=function(){var t=Object(c.useState)([]),e=Object(l.a)(t,2),n=e[0],r=e[1],o=Object(c.useState)(!1),s=Object(l.a)(o,2),a=s[0],f=s[1],b=new Date,k=b.getHours()+":"+b.getMinutes()+":"+b.getSeconds();Object(c.useEffect)((function(){var t=JSON.parse(localStorage.getItem("userStocks"));console.log(t),r(t)}),[]);var m=function(){var t=Object(d.a)(i.a.mark((function t(e){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n={stockName:e.stockName,stockPrice:e.stockPrice},r((function(t){var c=Object(u.a)(t);return c.some((function(t){return t.stockName.description===e.stockName.description}))?console.log("stock already added"):c.unshift(n),localStorage.setItem("userStocks",JSON.stringify(c)),c}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),v=function(){var t=Object(d.a)(i.a.mark((function t(e){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.log(n),r((function(t){var n=Object(u.a)(t);return n=n.filter((function(t){return t.stockName.description!==e})),localStorage.setItem("userStocks",JSON.stringify(n)),n}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),O=function(t,e){r((function(n){var c=Object(u.a)(n);return c[e].stockPrice=t.stockPrice,c}))};return Object(c.useEffect)((function(){var t=setInterval((function(){if(console.log("updating stocks..."),n.length>0){var t=function(){var t=Object(d.a)(i.a.mark((function t(e){var c,r,o;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j()("https://finnhub.io/api/v1/quote?symbol=".concat(e.stockName.displaySymbol,"&token=c14ongv48v6st2755it0"));case 2:c=t.sent,r={stockName:e.stockName,stockPrice:{c:c.data.c,h:c.data.h,l:c.data.l,o:c.data.o}},o=n.findIndex((function(t){return t.stockName.displaySymbol===r.stockName.displaySymbol})),O(r,o);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();n.forEach((function(e){return t(e)}))}}),1e4);return function(){clearInterval(t)}}),[n]),Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(x,{}),Object(p.jsxs)("div",{className:N.a.main,children:[Object(p.jsx)(h,{addStock:m,setLoading:f,isLoading:a}),"last updated at: ",k,a&&Object(p.jsx)("img",{className:N.a["loading-spinner"],src:y,alt:"loading"}),Object(p.jsx)(g,{stockList:n,removeStock:v})]})]})},_=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,53)).then((function(e){var n=e.getCLS,c=e.getFID,r=e.getFCP,o=e.getLCP,s=e.getTTFB;n(t),c(t),r(t),o(t),s(t)}))};s.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(P,{})}),document.getElementById("root")),_()}},[[52,1,2]]]);
//# sourceMappingURL=main.c2c0426c.chunk.js.map