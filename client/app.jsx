
App = React.createClass({
  mixins: [ReactMeteorData],

 getMeteorData() {
      return {
        activites: Activities.find({}).fetch()
      }
    },


    mapData: function() {

    var raw = Activities.find({}).fetch();
    var score = _.last(raw).activity.score;
    var cat = _.last(raw).activity.cat


//         activites: Activities.find({}).fetch()
    console.log(score, cat)

// console.log(Activities.find({add:social}).fetch())

      var data = [
        { qty: 60, xLabel: "Social" },
        { qty: 50, xLabel: "Work" },
        { qty: 40, xLabel: "Wellbeing" },
        { qty: 30, xLabel: "Recteation" },
        { qty: 20, xLabel: "Daily" },
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
