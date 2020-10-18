
//checck connection firebase 
//console.log(firebase)


//database connection firebase
//console.log(firebase.database)

var mytext=prompt("Enter Your Name!")

function sendMessage(){

    var message=document.getElementById("message").value;
    firebase.database().ref("messages").push().set({
        "sender":mytext,
        "message":message

    });
    return false;
}

//Listen for incoming messages
firebase.database().ref("messages").on("child_added",function(snapshot){
    var html="";
    //give message a unique id

    html+="<li  id='message-"+snapshot.key+"'>";

    if(snapshot.val().sender==mytext){
        html+="<button  data-id='" +snapshot.key +"' onclick='deleteMessage(this);'>";
        html+="Delete "
        html+="</button >";
    }
    html+=snapshot.val().sender+":"+snapshot.val().message;
    html+="</li>"

    document.getElementById("messages").innerHTML+=html;

});

function deleteMessage(self){
    //get MessageId
    var messageId=self.getAttribute("data-id");
    //delete message
    firebase.database().ref("messages").child(messageId).remove();
}
//attach listener for delete message
firebase.database().ref("messages").on("child_removed",function(snapshot){
    //remove message node
    document.getElementById("message-" +snapshot.key).innerHTML="This message has been deleted!";


})