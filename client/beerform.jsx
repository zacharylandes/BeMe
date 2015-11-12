ActivityForm = React.createClass({
  handleChange: function(e) {
    e.preventDefault();
    var pleasure = ReactDOM.findDOMNode(this.refs.pleasure).value;
    var achievement = ReactDOM.findDOMNode(this.refs.achievement).value;
    var cat = ReactDOM.findDOMNode(this.refs.cats).value;
    var add = {cat: cat, add: parseInt(pleasure)+parseInt(achievement)};


    Meteor.call("insertActivity", pleasure, achievement, cat, add, function(e, r) {
      if (e) alert(e.reason)
    });
    console.log(pleasure)
    console.log(cat)
    console.log(add)

  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Actividados</h3>
          <select ref = "cats">
            <option value="Social">Social</option>
            <option value="Work">Work</option>
            <option value="Recreation">Recreation</option>
            <option value="Wellbeing">Wellbeing</option>
             <option value="Daily">Daily</option>
          </select>
        </div>
        <div className="panel-body">
          <form  onChange={this.handleChange}>
            <div>
              <input type="range"
                   ref="pleasure" min ='1' max= '10' defaultvalue= '5'/>
            </div>
            <div >
              <input type="range"
                   ref="achievement" min ='1' max= '10' defaultvalue= '5' />
            </div>
          </form>
          <div className="form-group">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary btn-block">Add</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
})
