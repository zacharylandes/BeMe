
App = React.createClass({
  mixins: [ReactMeteorData],

 getMeteorData() {
      return {
        beers: Beers.find({}).fetch()
      }
    },

    mapData: function() {
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
            <i src="../../../desktop/noun_12489"></i> Beer
            <small> Dashboard</small></h1>
          </center>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <BeerForm />
              <BeerList data={this.data.beers}/>
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
