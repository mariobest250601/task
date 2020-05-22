// task database

taskdb = new Mongo.Collection('tasks');

taskdb.allow({
  insert: function(userId, doc) {
  if(doc.p1){
  	return true;
  }
  else if(userId, doc.p2) {
  		return true;
  }
  else{
   	return false	
   }

  },

  update:function(userId, doc) {
  	 if(doc.p1){
  	return true;
  }
  else if(userId, doc.p2) {
  		return true;
  }
  else{
   	return false	
   }

  },
     
  remove:function(userId, doc) {
   if(userId == doc.createdById){
   	return true;
   }
   else{
   	return false;
   }
    
  }
});