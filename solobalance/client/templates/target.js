  Template.body.onRendered(function(){
   var dataArray = [100,80,40,20];
   var width = 1400;
  var  height = 1400;
  var  widthScale = d3.scale.linear()
                    .domain([0,100])
                    .range([0,width]);
   var color = d3.scale.linear()
                    .domain([0,60])
                    .range([getRandomColor(3),getRandomColor(5)]);
var   axis =d3.svg.axis()
          .scale(widthScale);


var   canvas = d3.select('body')
      .append('svg')
      .attr("width",width)
      .attr("height",height)
      .append('g')
      //.attr('transform',"translate(100,50)")

 var  circle =canvas.selectAll("circle")
      .data(dataArray)
      .enter()
        .append('circle')
        .attr('fill',function(d){return color(d);})
        .attr('r',function(d){return d/1; })
        .attr('cy',function(d,i){return widthScale(d)})
        .attr('cx',function(d,i){return widthScale(d)});

 circle.transition()
      .attr('cy',240)
      .attr('cx',240)
      .attr('r',function(d){return d/3; })
      .duration(1000)
      .transition()
      .attr('r',function(d){return d/1; })
      .duration(1000)
      .each("end", function(){d3.select(this).attr('fill',getRandomColor(3))})
function getRandomColor(brightness){
    //6 levels of brightness from 0 to 5, 0 being the darkest
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return "rgb(" + mixedrgb.join(",") + ")";
  }
})
