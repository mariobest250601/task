import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor
import './main.html';
import '../lib/collection.js';

Meteor.subscribe('tasks');

Template.start.events({
'click .js-Show'(event, instance){
		//console.log("Adding Image");
	},


'click .js-close'(event, instance){
		//console.log("closing ");

	},	

'click .js-save'(event,instance){
 	// saving the path,title and description	
		var theName= $("#Name").val();
		var theTask= $("#Task").val();
		var myst1= $("#p1:checked").val();		
		var myst2= $("#p2:checked").val();	
		 //console.log("saving Image with title: "+theTitle+"and its path is: "+thePath+"and its description "+theDesc);
		taskdb.insert({
   		
   		"Name": theName,
   		"Task": theTask,
   		"completed": false,
   		"createdBy": Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address,
   		"createdById":Meteor.userId()
   		
   		
   	  });
		// saving and closing modal
		console.log("saving...");
		  $('#Addtk').modal('hide');
		  var theName= $("#Name").val("");
		  var theTask= $("#Task").val("");
		  
	}

});

Template.myTask.events({
'click .js-delete'(event, instance)  {
		var myID= this._id;
	$("#"+this._id).fadeOut('slow',function(){
		taskdb.remove({_id:myID});
		console.log(myID);
		});
	},



'change [type=checkbox]': function(){
	var myID= this._id;
	var myCompleted = this.completed;
	if(myCompleted){
		taskdb.update({_id:myID},
			{$set:{
				"completed":false
			
			}});
			console.log("task marked as incomplete: "+myID);
		
	}else{
		taskdb.update({_id:myID},
			{$set:{
				"completed":true
			
			}});
		console.log("task marked as complete: "+myID);
		
		}

	}		
});





Template.myTask.helpers({

	allTask(){
		return taskdb.find();

	},

	checked:function(){
		var myCompleted= this.completed;
		if(myCompleted){
			return "checked";
		}else{
			return"";
		}
	}


});

Template.mainBody.helpers({
tasks(){
	return taskdb.find();
		}
});