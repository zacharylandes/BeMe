ActivityForm = React.createClass({

  handleSubmit: function(e){
    e.preventDefault();
    var pleasure = 0;
    var achievement = 0;
    pleasure = parseInt(ReactDOM.findDOMNode(this.refs.pleasure).value);
    achievement = parseInt(ReactDOM.findDOMNode(this.refs.achievement).value);
    var cat = ReactDOM.findDOMNode(this.refs.cats).value;
    var name = ReactDOM.findDOMNode(this.refs.name).value;
    var score = pleasure +achievement;
     score += score;
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
    console.log(activity)
  },

  render: function() {

    return (
    <form className="col s12"onSubmit={this.handleSubmit} >
      <div className="sidenav">
        <div >
          <h3 >Actividados</h3>
          <select className = "styled-select" ref = "cats">
            <option value="Social">Social</option>
            <option value="Work">Work</option>
            <option value="Recreation">Recreation</option>
            <option value="Wellbeing">Wellbeing</option>
             <option value="Daily">Daily</option>
          </select>
        </div>
            <div className="panel-body">
                  <div className="form-group">
            <div className="col-sm-10">
              <input type="text" className="form-control" id="input"
                  placeholder="Enterle los actividados" ref="name" />
            </div>
          </div>
        <div className="panel-body">
            <div>
            <label>Pleasure Score</label>
              <input type="range" className="range"
                   ref="pleasure" min ='1' max= '10' defaultvalue= '1'/>
            </div>
            <div >
            <label>Achievement Score</label>
              <input type="range" className="range"
                   ref="achievement" min ='1' max= '10' defaultvalue= '1' />
            </div>

          <div className="btn-group">

            <div >
              <button type="submit" className= "add">Add</button>
            </div>
          </div>

          </div>

        </div>
      </div>
    </form>
    );
  }
})