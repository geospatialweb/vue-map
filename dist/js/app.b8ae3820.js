(function(e){function t(t){for(var s,i,o=t[0],l=t[1],c=t[2],p=0,m=[];p<o.length;p++)i=o[p],r[i]&&m.push(r[i][0]),r[i]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);u&&u(t);while(m.length)m.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],s=!0,o=1;o<a.length;o++){var l=a[o];0!==r[l]&&(s=!1)}s&&(n.splice(t--,1),e=i(i.s=a[0]))}return e}var s={},r={app:0},n=[];function i(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=s,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(a,s,function(t){return e[t]}.bind(null,s));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var u=l;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"02e5":function(e,t,a){"use strict";var s=a("d4bb"),r=a.n(s);r.a},"0f19":function(e,t,a){"use strict";var s=a("2c91"),r=a.n(s);r.a},"164b":function(e,t,a){"use strict";var s=a("c56d"),r=a.n(s);r.a},"2c91":function(e,t,a){},"2f92":function(e,t,a){},"3ac4":function(e,t,a){},"49b8":function(e,t,a){"use strict";var s=a("5428"),r=a.n(s);r.a},5428:function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("097d");var s=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("Header"),a("Canvas")],1)},n=[],i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mapContainer"},[a("div",{attrs:{id:e.canvas.container}}),a("Splash"),a("Layers"),a("Trails")],1)},o=[],l={accessToken:"pk.eyJ1IjoiZ2Vvc3BhdGlhbHdlYiIsImEiOiJ6WGdOUFRvIn0.GoVRwZq5EfVsLNGyCqgZTw",center:[-76.3,44.45],container:"canvas",zoom:9},c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("ul",{staticClass:"layers"},e._l(e.layers,function(t){return a("LayerElements",{key:t.class,attrs:{el:t},on:{click:e.selectLayer}})}),1),e._l(e.icons,function(t){return a("LayerIcons",{key:t.class,attrs:{icon:t},on:{click:e.selectLayer}})})],2)},u=[],p=(a("20d6"),[{active:!1,class:"aerial",name:"Aerial View"},{active:!0,class:"biosphere",icon:"biosphere-icon",name:"Biosphere",src:"../assets/biosphere.png",height:"18",width:"18"},{active:!1,class:"office",icon:"office-icon",name:"Office",src:"../assets/office.png",height:"20",width:"18"},{active:!1,class:"places",icon:"places-icon",name:"Places",src:"../assets/places.png",height:"20",width:"18"},{active:!1,class:"trails",icon:"trails-icon",name:"Trails",src:"../assets/trails.png",height:"20",width:"18"},{class:"reset",name:"Reset Map"}]),m={state:{layers:p},setLayerActive:function(e){Object.prototype.hasOwnProperty.call(m.state.layers[e],"active")&&(this.state.layers[e].active=!this.state.layers[e].active)}},d={layerStyles:[],layerStylesHash:{},createLayerStylesHash:function(){var e=this;this.layerStyles.map(function(t,a){return e.layerStylesHash[t.id]=a,!0})},pushLayerStyle:function(e){this.layerStyles.push(e)}},h=(a("ac6a"),a("456d"),a("e192")),y=a.n(h),f={id:"hillshading",index:"waterway-river-canal-shadow",layer:{type:"raster-dem",url:"mapbox://mapbox.terrain-rgb"},source:"dem",type:"hillshade"},v={biosphere:{name:"biosphere",fields:"name, description, ST_AsGeoJSON(geom)",layer:{id:"biosphere",type:"fill",source:{type:"geojson"},layout:{visibility:"visible"},paint:{"fill-color":"#090","fill-opacity":.3,"fill-outline-color":"#000"}}},trails:{name:"trails",fields:"name, description, lat, lng, ST_AsGeoJSON(geom)",layer:{id:"trails",type:"line",source:{type:"geojson"},layout:{visibility:"none"},paint:{"line-color":"#900","line-width":2}}}},b={navigationControl:{position:"top-left"}},g={outdoors:"mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g",satellite:"mapbox://styles/mapbox/satellite-v9"},S={office:{name:"office",fields:"name, description, ST_AsGeoJSON(geom)"},places:{name:"places",fields:"name, description, ST_AsGeoJSON(geom)"},trails:{name:"trails",fields:"name, description, lat, lng, ST_AsGeoJSON(geom)"}},k={splashElement:{active:!0,class:"splash",selector:"div.splash.active"}},L=(a("7f7f"),a("2317")),_={route:"/data"},w=(a("a481"),{markers:[],markersHash:{},createMarkersHash:function(){var e=this;this.markers.map(function(t,a){var s=t[0].getElement().classList[0].replace("-marker","");return e.markersHash[s]=a,!0})},setMarkers:function(e,t){var a=[];t.features.map(function(t){var s=document.createElement("div");s.className="".concat(e,"-marker");var r=new y.a.Popup({closeButton:!1,offset:15});return"office"===e||"places"===e?(s.addEventListener("mouseenter",function(){r.setLngLat(t.geometry.coordinates).setHTML("<b>".concat(t.properties.name,"</b><br>").concat(t.properties.description)).addTo(j.map)}),s.addEventListener("mouseleave",function(){r.remove()}),a.push(new y.a.Marker(s).setLngLat(t.geometry.coordinates))):"trails"===e&&(s.addEventListener("mouseenter",function(){r.setLngLat([t.properties.lng,t.properties.lat]).setHTML("<b>".concat(t.properties.name,"</b><br>").concat(t.properties.description)).addTo(j.map)}),s.addEventListener("mouseleave",function(){r.remove()}),a.push(new y.a.Marker(s).setLngLat([t.properties.lng,t.properties.lat]))),!0}),this.markers.push(a)}}),M={route:_.route,layerStyles:v,markers:S,getLayerStyles:function(){var e=this;Object.keys(this.layerStyles).forEach(function(t){var a={fields:e.layerStyles[t].fields,table:e.layerStyles[t].name},s=L["Axios"].get(e.route,{params:a}).subscribe(function(a){if(a.data){var s=e.layerStyles[t].layer;s.source.data=a.data,d.pushLayerStyle(s),j.addLayerStyle(s)}else console.error("Data Error:\n",a.data)},function(e){console.error("Query Failed:\n",e.error)},function(){d.layerStyles.length===Object.keys(e.layerStyles).length&&d.createLayerStylesHash(),s.unsubscribe()})})},getMarkers:function(){var e=this;Object.keys(this.markers).forEach(function(t){var a={fields:e.markers[t].fields,table:e.markers[t].name},s=L["Axios"].get(e.route,{params:a}).subscribe(function(a){a.data?w.setMarkers(e.markers[t].name,a.data):console.error("Data Error:\n",a.data)},function(e){console.error("Query Failed:\n",e.error)},function(){w.markers.length===Object.keys(e.markers).length&&w.createMarkersHash(),s.unsubscribe()})})}},O={state:{splash:k},setLayerActive:function(){this.state.splash.splashElement.active=!this.state.splash.splashElement.active}},T={splashStore:O,hideSplash:function(){this.splashStore.setLayerActive()}},E=[{name:"Select Trail"},{name:"Blue Mountain",center:[-76.04,44.508],zoom:11},{name:"Charleston Lake",center:[-76.04,44.508],zoom:11},{name:"Lemoine Point",center:[-76.61,44.223],zoom:14},{name:"Lyn Valley",center:[-75.75,44.575],zoom:11},{name:"Mac Johnson",center:[-75.75,44.575],zoom:11},{name:"Seeley's Bay",center:[-76.22,44.485],zoom:11}],x={trails:E,trailsHash:{},createTrailsHash:function(){var e=this;this.trails.filter(function(e,t){return t>0}).map(function(t,a){return e.trailsHash[t.name]=a+1,!0})},setTrail:function(e){e.stopPropagation();var t=e.target.value;t!==this.trails[0].name&&j.map.flyTo({center:this.trails[this.trailsHash[t]].center,zoom:this.trails[this.trailsHash[t]].zoom})}},j={accessToken:l.accessToken,hillshade:f,layerStyles:v,mapControls:b,mapOptions:{container:l.container,style:g.outdoors,center:l.center,zoom:l.zoom},mapStyle:g.outdoors,mapStyles:g,markers:S,splash:k,loadMap:function(){var e,t=this;y.a.accessToken=this.accessToken,this.map=new y.a.Map(this.mapOptions).addControl(new y.a.NavigationControl,this.mapControls.navigationControl.position).on("styledata",function(){w.markers.length===Object.keys(t.markers).length&&d.layerStyles.length===Object.keys(t.layerStyles).length&&e.className==="".concat(t.splash.splashElement.class," active")&&T.hideSplash()}).on("load",function(){t.map.addSource(t.hillshade.source,t.hillshade.layer),t.addLayerStyle(t.hillshade,t.hillshade.index),e=document.querySelector("".concat(t.splash.splashElement.selector)),M.getMarkers(),M.getLayerStyles(),x.createTrailsHash()})},addLayerStyle:function(e,t){this.map.addLayer(e,t)},setMapStyle:function(){var e=this;this.mapStyle===this.mapStyles.outdoors?this.mapStyle=this.mapStyles.satellite:this.mapStyle=this.mapStyles.outdoors,this.map.setStyle(this.mapStyle),setTimeout(function(){e.mapStyle===e.mapStyles.outdoors&&(e.map.addSource(e.hillshade.source,e.hillshade.layer),e.addLayerStyle(e.hillshade,e.hillshade.index)),d.layerStyles.map(function(t){return e.map.addLayer(t),"visible"===t.layout.visibility&&e.map.setLayoutProperty(t.id,"visibility","visible"),!0})},1e3)}},H={addMarkers:function(e){w.markers[w.markersHash[e]].map(function(e){return e.addTo(j.map)})},removeMarkers:function(e){w.markers[w.markersHash[e]].map(function(e){return e.remove()})},hideMarkers:function(){var e=this;w.markers.map(function(t){var a=t[0].getElement().classList[0].replace("-marker",""),s=document.querySelector("div.".concat(a,"-marker"));return s&&(e.removeMarkers(a),t.hidden=!0),!0})},showMarkers:function(){var e=this;w.markers.map(function(t){if(t.hidden){var a=t[0].getElement().classList[0].replace("-marker","");e.addMarkers(a),t.hidden=!1}return!0})}},C={layersStore:m,setLayer:function(e,t){if("reset"===e)window.location.reload(!0);else{var a=this.layersStore.state.layers;"aerial"===e?(H.hideMarkers(),j.setMapStyle(),setTimeout(function(){return H.showMarkers()},1200)):"biosphere"===e||"trails"===e?a[t].active?(d.layerStyles[d.layerStylesHash[e]].layout.visibility="visible",j.map.setLayoutProperty(e,"visibility","visible"),"trails"===e&&H.addMarkers(e)):(d.layerStyles[d.layerStylesHash[e]].layout.visibility="none",j.map.setLayoutProperty(e,"visibility","none"),"trails"===e&&H.removeMarkers(e)):"office"!==e&&"places"!==e||(a[t].active?H.addMarkers(e):H.removeMarkers(e))}}},A=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",[a("div",{class:[e.el.class,{active:e.el.active}],on:{click:e.selectLayer}},[e._v(e._s(e.el.name))])])},P=[],G={name:"LayerElements",props:["el"],methods:{selectLayer:function(e){var t=e.target.classList[0],a=m.state.layers.findIndex(function(e){return e.class===t});m.setLayerActive(a),C.setLayer(t,a)}}},I=G,z=(a("164b"),a("2877")),J=Object(z["a"])(I,A,P,!1,null,"38f28368",null);J.options.__file="LayerElements.component.vue";var N=J.exports,$=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:e.icon.icon,attrs:{height:e.icon.height,width:e.icon.width}},[a("img",{class:e.icon.class,attrs:{src:e.icon.src,height:e.icon.height,width:e.icon.width},on:{click:e.selectLayer}})])},V=[],B={name:"LayerIcons",props:["icon"],methods:{selectLayer:function(e){var t=e.target.classList[0],a=m.state.layers.findIndex(function(e){return e.class===t});m.setLayerActive(a),C.setLayer(t,a)}}},q=B,R=(a("6a44"),Object(z["a"])(q,$,V,!1,null,"1c6a056a",null));R.options.__file="LayerIcons.component.vue";var D=R.exports,F={name:"Layers",components:{LayerElements:N,LayerIcons:D},data:function(){return{layers:m.state.layers}},computed:{icons:function(){return m.state.layers.filter(function(e){return e.icon})}},methods:{selectLayer:function(e){var t=e.target.classList[0],a=m.state.layers.findIndex(function(e){return e.class===t});m.setLayerActive(a),C.setLayer(t,a)}}},Z=F,Q=(a("b8fa"),Object(z["a"])(Z,c,u,!1,null,null,null));Q.options.__file="Layers.component.vue";var W=Q.exports,U=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:[e.splash.splashElement.class,{active:e.splash.splashElement.active}]})},Y=[],K={name:"Splash",data:function(){return{splash:O.state.splash}}},X=K,ee=(a("0f19"),Object(z["a"])(X,U,Y,!1,null,"603b7f07",null));ee.options.__file="Splash.component.vue";var te=ee.exports,ae=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("select",{staticClass:"selectTrail",on:{change:e.selectTrail}},e._l(e.trails,function(t){return a("option",{key:t.name},[e._v(e._s(t.name))])}))},se=[],re={name:"Trails",data:function(){return{trails:E}},methods:{selectTrail:function(e){return x.setTrail(e)}}},ne=re,ie=(a("02e5"),Object(z["a"])(ne,ae,se,!1,null,"2553d89a",null));ie.options.__file="Trails.component.vue";var oe=ie.exports,le={name:"Canvas",data:function(){return{canvas:l}},components:{Layers:W,Splash:te,Trails:oe}},ce=le,ue=(a("dbb1"),Object(z["a"])(ce,i,o,!1,null,"34763afa",null));ue.options.__file="Canvas.component.vue";var pe=ue.exports,me=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"headerContainer"},[a("img",{staticClass:"logo",attrs:{src:e.header.logo.src,alt:e.header.company.name}}),a("div",{staticClass:"company"},[e._v(e._s(e.header.company.name))]),a("div",{staticClass:"title"},[e._v(e._s(e.header.title.name))]),a("a",{staticClass:"repo",attrs:{href:e.header.repo.src,target:"_blank"}},[e._v(e._s(e.header.repo.name))])])},de=[],he={company:{name:"Geospatial Web"},logo:{src:"../assets/logo.png"},repo:{name:"GitHub Repository",src:"https://github.com/geospatialweb/vue-map"},title:{name:"Node | Express | Vue | Mapbox GL | PostGIS | Docker"}},ye={name:"Header",data:function(){return{header:he}}},fe=ye,ve=(a("49b8"),Object(z["a"])(fe,me,de,!1,null,"0f8a1aac",null));ve.options.__file="Header.component.vue";var be=ve.exports,ge={name:"App",components:{Canvas:pe,Header:be}},Se=ge,ke=(a("98c8"),Object(z["a"])(Se,r,n,!1,null,null,null));ke.options.__file="App.component.vue";var Le=ke.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(e){return e(Le)}}).$mount("#app"),j.loadMap()},"6a44":function(e,t,a){"use strict";var s=a("2f92"),r=a.n(s);r.a},"98c8":function(e,t,a){"use strict";var s=a("d68d"),r=a.n(s);r.a},afa3:function(e,t,a){},b8fa:function(e,t,a){"use strict";var s=a("3ac4"),r=a.n(s);r.a},c56d:function(e,t,a){},d4bb:function(e,t,a){},d68d:function(e,t,a){},dbb1:function(e,t,a){"use strict";var s=a("afa3"),r=a.n(s);r.a}});
//# sourceMappingURL=app.b8ae3820.js.map