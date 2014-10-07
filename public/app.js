App = Ember.Application.create({
  ready: function() {
    this.devTools.globalize();
  }
});

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    //return this.store.find('post', 1);
    return this.store.createRecord('post');
  },
  afterModel: function(model) {
    return model.get('comments').then(function() {
      this.store.createRecord('comment', {
        post: model
      });
    }.bind(this));
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('users', this.get('users'));
  }
});

App.IndexView = Ember.View.extend({
  didInsertElement: function() {
  }
});

App.PostModel = DS.Model.extend({
  comments: DS.hasMany('comment', {async: true}),
  user: DS.belongsTo('user')
});
App.CommentModel = DS.Model.extend({
  post: DS.belongsTo('post')
});
App.UserModel = DS.Model.extend({
});

$.mockjax({
  url: '/posts/1',
  type: 'GET',
  responseText: {
    post: {
      id: 1,
      comments: [1]
    },
    comments: [
      {id: 1},
      {id: 2}
    ]
  }
});

$.mockjax({
  url: '/users',
  type: 'GET',
  responseText: {
    users: [
      {id: 1},
      {id: 2}
    ]
  }
});
