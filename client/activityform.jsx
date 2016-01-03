ActivityForm = React.createClass({
  //retrieving data from user
  handleSubmit: function(e){
    e.preventDefault();
    var pleasure = parseInt(ReactDOM.findDOMNode(this.refs.pleasure).value);
    var achievement = parseInt(ReactDOM.findDOMNode(this.refs.achievement).value);
    var cat = ReactDOM.findDOMNode(this.refs.cats).value;
    var name = ReactDOM.findDOMNode(this.refs.name).value;
    var score = pleasure+achievement;
    var activity = {
      score: score,
      pleasure: pleasure,
      achievement: achievement,
      cat:cat,
      name: name
    }
    Meteor.call("insertActivity", activity, function(e, r) {
      if (e) alert(e.reason)
    });
  },
  render: function() {
   return (
     <form className="col s12" onSubmit={this.handleSubmit}>
      <div className="sidenav">
        <div>
          <h3 >Weekly Activities</h3>
          <p id = "actdesc">Enter some of your weekly activities and ascribe them a category to visualize the balance in your life. The categories closer to the center hold more value to you. The circles will balance when you are balanced.
          </p>
          <select className = "styled-select" ref = "cats">
            <option value="Social">Social</option>
            <option value="Work">Work</option>
            <option value="Recreation">Recreation</option>
            <option value="Wellbeing">Wellbeing</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
        <div className="panel-body">
          <div className="col-sm-10">
           <input type="text" className="form-control" id="input"
            placeholder="" ref="name" />
          </div>
        </div>
        <div className="panel-body">
          <div>
            <label>Pleasure Score for this activity </label>
           <input type="range" className="range"
                   ref="pleasure" min ='1' max= '10' defaultvalue= '1'/>
          </div>
          <div>
            <label>Achievement Score for this activity</label>
              <input type="range" className="range"
                   ref="achievement" min ='1' max= '10' defaultvalue= '1' />
          </div>
          <div className="btn-group">
            <div>
              <button type="submit" className= "add">Add</button>
            </div>
          </div>
        </div>
       </div>
     </form>
    );
  }
})