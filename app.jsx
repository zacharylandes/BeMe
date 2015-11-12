// App component - represents the whole app
App = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
    activities: Activities.find({}, {sort: {createdAt: -1}}).fetch(),

    }
  },

  renderActivities() {
    // Get tasks from this.data.tasks
    return this.data.activities.map((activity) => {
      return <Activity key={activity._id} activity={activity} />;
    });
  },

 handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var name = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Activities.insert({
      name:name,
      createdAt: new Date(),
          owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username // current time
    });
        console.log(name)


    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  },

 handleChange(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var pleasure = ReactDOM.findDOMNode(this.refs.prange).value;
    var achievement = ReactDOM.findDOMNode(this.refs.arange).value;

    Activities.insert({
      pleasure:pleasure,
      achievement:achievement,
      createdAt: new Date(),
          owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username  // current time
    });
    console.log(pleasure)
    console.log(achievement)


   //  // Clear form
   // ReactDOM.findDOMNode(this.refs.prange).value= '1';
   // ReactDOM.findDOMNode(this.refs.arange).value= '1';

  },




  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
          <AccountsUIWrapper />
          <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks" />
          </form>
          <form className="new-task" onChange={this.handleChange} >
            <input
              type="range"
              ref="prange"
             min = '1' max = '10' defaultvalue='1'/>
          </form>
           <form className="new-task" onChange={this.handleChange} >
            <input
              type="range"
              ref="arange"
             min = '1' max = '10' defaultvalue='1'/>
          </form>
        </header>

        <ul>
          {this.renderActivities()}
        </ul>
    </div>
      );
      }
});



var Chart = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object
  },

  componentDidMount: function() {
    var el = this.getDOMNode();
    d3Chart.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());
  },

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    d3Chart.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  },

  componentWillUnmount: function() {
    var el = this.getDOMNode();
    d3Chart.destroy(el);
  },

  render: function() {
    return (
      <div className="Chart"></div>
    );
  }
});

var sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9},
  // ...
];

var App = React.createClass({
  getInitialState: function() {
    return {
      data: sampleData,
      domain: {x: [0, 30], y: [0, 100]}
    };
  },

  render: function() {
    return (
      <div className="App">
        <Chart
          data={this.state.data}
          domain={this.state.domain} />
      </div>
    );
  }
});

React.renderComponent(App(), document.body);
