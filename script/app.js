
  var config = {
    apiKey: "AIzaSyCe-QjolI9UHSBtYoZOztBwYxRNIaVKEEM",
    authDomain: "test-project-1-3b4f2.firebaseapp.com",
    databaseURL: "https://test-project-1-3b4f2.firebaseio.com",
    projectId: "test-project-1-3b4f2",
    storageBucket: "test-project-1-3b4f2.appspot.com",
    messagingSenderId: "360243138523"
  };
  firebase.initializeApp(config);
  var dataRef = firebase.database();

$("#submit").on("click", function(){
	event.preventDefault();
	var trainName = $("#train-name").val().trim();
	var destination = $("#destination").val().trim();
	var tFrequency = $("#frequency").val().trim();
	var firstTime = $("#first-time").val().trim();

	dataRef.ref().push({
        
        trainName: trainName,
        destination: destination,
        tFrequency: tFrequency,
        firstTime: firstTime,
        
      });
});
	

	dataRef.ref().on("child_added", function(childSnapshot) {
		var tfrequency = childSnapshot.val().tFrequency;
		console.log(tfrequency);
		var convertedDate = moment(childSnapshot.val().firstTime, "hh:mm").subtract(1, "years");
		console.log(convertedDate);
		var firstTime = moment(convertedDate).format("hh:mm");
		console.log(firstTime);
		var currentTime = moment();
		console.log(currentTime);
		var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log(diffTime);
		var tRemainder = diffTime % tfrequency;
		console.log(tRemainder);
		var tMinutesTillTrain = tfrequency - tRemainder;
		console.log(tMinutesTillTrain);
		var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm")
		console.log(nextTrain);

	$("#schedule").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" +
		childSnapshot.val().destination + "</td><td>" + childSnapshot.val().tFrequency +
		"</td><td>" + firstTime + "</td><td>" + tMinutesTillTrain + "</td></tr>")
		});

	setInterval(function(){
		  location.reload();
		}, 60000)
	  