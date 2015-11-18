ActivityForm = React.createClass({




  handleSubmit: function(e){
    e.preventDefault();
    var pleasure = parseInt(ReactDOM.findDOMNode(this.refs.pleasure).value);
    var achievement = parseInt(ReactDOM.findDOMNode(this.refs.achievement).value);
    var cat = ReactDOM.findDOMNode(this.refs.cats).value;
    var name = ReactDOM.findDOMNode(this.refs.name).value;
    var score = pleasure +achievement;
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
      <div >
        <div >
          <h3 >Actividados</h3>
          <select ref = "cats">
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
              <input type="text" className="form-control"
                  placeholder="Enterle los actividados" ref="name" />
            </div>
          </div>
        <div className="panel-body">
            <div>
              <input type="range" className="form-control"
                   ref="pleasure" min ='1' max= '10' defaultvalue= '1'/>
            </div>
            <div >
              <input type="range"
                   ref="achievement" min ='1' max= '10' defaultvalue= '1' />
            </div>

          <div className="form-group">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary btn-block">Add</button>
            </div>
          </div>

          </div>

        </div>
      </div>
    </form>
    );
  }
})
