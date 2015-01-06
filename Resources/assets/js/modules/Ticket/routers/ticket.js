define(['app'], function(App){

  return App.module('Ticket', function(Ticket, App, Backbone, Marionette, $, _){

    Ticket.startWithParent = false;

    Ticket.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "tickets" : "listTickets",
        "tickets/create" : "createTicket",
        "tickets/:id" : "viewTicket",
        "tickets/:id/edit" : "editTicket"
      }
    });

    var API = {
      listTickets: function(){
        require(['Ticket/controllers/list'], function(List){
          List.Controller();
        });
      },
      viewTicket: function(id){
        require(['Ticket/controllers/view'], function(View){
          View.Controller(id);
        });
      },
      createTicket: function(){
        require(['Ticket/controllers/create'], function(Create){
          Create.Controller();
        });
      },
      editTicket: function(id){
        require(['Ticket/controllers/edit'], function(Edit){
          Edit.Controller(id);
        });
      }
    };

    App.on('ticket:list', function(){
      App.debug('info', 'Event "ticket:list" fired');
      App.navigate("tickets");
      API.listTickets();
    });

    App.on('ticket:view', function(id){
      App.debug('info', 'Event "ticket:view" fired');
      App.navigate("tickets/" + id);
      API.viewTicket(id);
    });

    App.on('ticket:create', function(){
      App.debug('info', 'Event "ticket:create" fired');
      App.navigate("tickets/create");
      API.createTicket();
    });

    App.on('ticket:edit', function(id){
      App.debug('info', 'Event "ticket:edit" fired');
      App.navigate("tickets/"+ id + "/edit");
      API.editTicket(id);
    });

    Ticket.addInitializer(function(){
      new Ticket.Router({
        controller: API
      });
    });

  });

});