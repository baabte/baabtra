!function(a){"use strict";function b(a,b,c,d,e,f,g){var h,i,j,k,l,m,n,o,p=Math.pow,q=Math.sqrt;return h=q(p(c-a,2)+p(d-b,2)),i=q(p(e-c,2)+p(f-d,2)),j=g*h/(h+i),k=g-j,l=c+j*(a-e),m=d+j*(b-f),n=c-k*(a-e),o=d-k*(b-f),[l,m,n,o]}function c(b,c,d,e,f){var g=a.color.parse(f);g.a="number"==typeof e?e:.3,g.normalize(),g=g.toString(),c.beginPath(),c.moveTo(b[0][0],b[0][1]);for(var h=b.length,i=0;h>i;i++)c[b[i][3]].apply(c,b[i][2]);c.stroke(),c.lineWidth=0,c.lineTo(b[h-1][0],d),c.lineTo(b[0][0],d),c.closePath(),e!==!1&&(c.fillStyle=g,c.fill())}function d(a,b,c,d){(void 0===b||"bezier"!==b&&"quadratic"!==b)&&(b="quadratic"),b+="CurveTo",0==f.length?f.push([c[0],c[1],d.concat(c.slice(2)),b]):"quadraticCurveTo"==b&&2==c.length?(d=d.slice(0,2).concat(c),f.push([c[0],c[1],d,b])):f.push([c[2],c[3],d.concat(c.slice(2)),b])}function e(e,g,h){if(h.splines.show===!0){var i,j,k,l=[],m=h.splines.tension||.5,n=h.datapoints.points,o=h.datapoints.pointsize,p=e.getPlotOffset(),q=n.length,r=[];if(f=[],4>q/o)return void a.extend(h.lines,h.splines);for(i=0;q>i;i+=o)j=n[i],k=n[i+1],null==j||j<h.xaxis.min||j>h.xaxis.max||k<h.yaxis.min||k>h.yaxis.max||r.push(h.xaxis.p2c(j)+p.left,h.yaxis.p2c(k)+p.top);for(q=r.length,i=0;q-2>i;i+=2)l=l.concat(b.apply(this,r.slice(i,i+6).concat([m])));for(g.save(),g.strokeStyle=h.color,g.lineWidth=h.splines.lineWidth,d(g,"quadratic",r.slice(0,4),l.slice(0,2)),i=2;q-3>i;i+=2)d(g,"bezier",r.slice(i,i+4),l.slice(2*i-2,2*i+2));d(g,"quadratic",r.slice(q-2,q),[l[2*q-10],l[2*q-9],r[q-4],r[q-3]]),c(f,g,e.height()+10,h.splines.fill,h.color),g.restore()}}var f=[];a.plot.plugins.push({init:function(a){a.hooks.drawSeries.push(e)},options:{series:{splines:{show:!1,lineWidth:2,tension:.5,fill:!1}}},name:"spline",version:"0.8.2"})}(jQuery);