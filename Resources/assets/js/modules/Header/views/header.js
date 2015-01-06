define([
  'app',
  'config',
  'tpl!../templates/header.ejs'], function(App, Config, headerTemplate){

  return App.module('Header', function(Header, App, Backbone, Marionette, $, _){

    Header.startWithParent = false;

    Header.View = Marionette.ItemView.extend({
      template: headerTemplate,
      className: 'container',

      initialize: function(){
        this.baseUrl = Config.baseUrl;
        this.basePath = Config.basePath;
      },

      serializeData: function(){
        return {
          baseUrl: this.baseUrl,
          basePath: this.basePath
        };
      },

      events : {
        "click .js-create-ticket" : "createTicketHandler"
      },

      createTicketHandler : function(e){
        e.preventDefault();
        App.trigger('ticket:create');
      }
    });

  });


});