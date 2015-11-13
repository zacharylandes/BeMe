
App = React.createClass({
  mixins: [ReactMeteorData],

 getMeteorData() {
      return {
        activites: Activities.find({}).fetch()
      }
    },


    mapData: function() {

  sums = [[],[],[],[],[]];
  sumies = [];
  for(var i = 10;i<=35;i++){
    var raw = Activities.find({}).fetch();
    var score = raw[i].activity.score;
    var cat =raw[i].activity.cat;
    if(cat==="Social"){
   sums[0].push(score);
    }
    else if(cat==="Work"){
   sums[1].push(score);
    }
    else if(cat==="Wellbeing"){
   sums[2].push(score);
    }
   else if(cat==="Recreation"){
   sums[3].push(score);
    }
    else{
   sums[4].push(score);
    }
   }

  for(var i in sums){

   sumies.push(_.reduce(sums[i], function(a,b){return a+b},0));
  }
    console.log(sumies)


// console.log(Activities.find({}).count())
// console.log(Activities.find({add:social}).fetch())

      var data = [
        { qty: sumies[0], xLabel: "Social" },
        { qty: sumies[1], xLabel: "Work" },
        { qty: sumies[2], xLabel: "Wellbeing" },
        { qty: sumies[3], xLabel: "Recteation" },
        { qty: sumies[4], xLabel: "Daily" },
           ];
         return data;
    },

  render: function() {




    return (
      <div>
        <div className="page-header">
          <center>
            <h1>
            <img src = "noun_12489"/> Actividados
      </h1>
          </center>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <ActivityForm />
              <ActivityList data={this.data.activites}/>
          </div>
          <div className="col-md-offset-2 col-md-6">
            <BarChart data={this.mapData()} width="480" height="320"/>
          </div>

          <div className="col-md-offset-2 col-md-6">
          </div>
        </div>
      </div>
      </div>
    );
  }
});
