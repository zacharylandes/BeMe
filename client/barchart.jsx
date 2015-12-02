BarChart = React.createClass({

  componentDidMount: function() {
      var el = ReactDOM.findDOMNode(this);
      var svg = d3.select(el)
          .append("svg")
          .attr("width", this.props.width)
          .attr("height", this.props.height);
      this.updateChart(this.props);
  },

  componentWillUpdate: function(nextProps) {
      this.updateChart(nextProps);
  },

  getDefaultProps: function() {
      return {
        width: 940,
        height: 880
      }
  },
  render: function() {
        return (
          <div className="circle"></div>
        );
  },
  updateChart: function(props) {
    var data = props.data;
    data = data.sort(function(a,b) {
      return(b.totalScore - a.totalScore)
      });
     console.log('data in  barchart', data)
    var svg = d3.select("svg");
    d3.selectAll("svg > *").remove();
    var circle = svg.selectAll("circle")
          .data(data)
    circle.enter()
      .append("circle")
      .style("fill", function(d,i) {
        if(d.cat==='Social'){return "rgb(42,57,61)"}
        else if(d.cat==='Recreation'){return "rgb(124,90,51)"}
        else if(d.cat==='Wellbeing'){return "rgb(110,118,101)"}
        else if(d.cat==='Daily'){return "rgb(52,61,36)"}
        else {return "rgb(37,107,142)"}
      })
      .attr("r", function(d,i) {
        console.log(d,i)
        if(i===4){return 160}
        else if(i===3){return 130}
        else if(i===2){return 120}
        else if(i===1){return 110}
        else {return 90}
      })
       .attr("cx", function(d,i) {
        return 10/(i+1)*20
      })
      .attr("cy", 100);

    var text = svg.selectAll("text")
               .data(data)
               .enter()
               .append("text");

    var textLabels = text
                   .attr("x", 100)
                   .attr("y", 100)
                   .text( function (d) { return d.cat; })
                   .attr("font-family", "Fugaz One")
                   .attr("font-size", "20px")
                   .attr("fill", "black");

      textLabels.transition()
         .duration(3000)
          .attr("x", 50)
          .attr("y", function(d,i) {
              if(i===0){ return 50 }
              else if(i===1){ return 100 }
              else if(i===2){ return 150 }
              else if(i===3){ return 200 }
              else { return 250 }
                  });
      circle.transition()
       .duration(1000)
       .attr("r", function(d,i) {
              if(i===0){ return 100 }
              else if(i===1){ return 200 }
              else if(i===2){ return 300 }
              else if(i===3){ return 400 }
              else { return 500 }
            })
       .attr("cx", 400)
       .attr("cy", 400);

      circle.transition()
         .duration(2000)
         .attr("r", function(d,i) {
              console.log(d,i)
              if(i===4){return 40}
              else if(i===3){return 70}
              else if(i===2){return 100}
              else if(i===1){return 130}
              else {return 160}
            })
         .attr("cx", 200)
         .attr("cy", 200);


        circle.exit()
            .remove();

}
});
