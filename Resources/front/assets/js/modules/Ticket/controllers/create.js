define(['app'], function(App){

  return App.module('Ticket.Create', function(Create, App, Backbone, Marionette, $, _){

    Create.TicketController = function(){

      require(['modules/Ticket/models/ticket', 'modules/Ticket/views/create'], function(Models, CreateView){

        var isSuccess = false,
            newTicketModel = new Models.TicketModel(),
            newTicketView = new Create.ItemView({
              model: newTicketModel
            }),
            modalCreateView = new Create.ModalView({
              title: 'Add New Ticket'
            });

        modalCreateView.on('show', function(){
          this.$el.modal();
        });

        modalCreateView.on('modal:closed', function(){
          if(!isSuccess){
            Backbone.history.history.back();
          }
        });

        modalCreateView.on('modal:submit', function(data){
          data.branch = 3;
          data.status = 'open';
          data.source = 'phone';
          App.request("user:model:current").done(function(user){
            data.reporter = user.id;
            data.assignee = user.id;
            newTicketModel.save(data, {
              success : function(resultModel){
                isSuccess = true;
                App.trigger('ticket:view', resultModel.get('id'));
                modalCreateView.$el.modal('hide');
              }
            });
          });

        });

        App.DialogRegion.show(modalCreateView);
        modalCreateView.ModalBody.show(newTicketView);

      });

    };

  });

});