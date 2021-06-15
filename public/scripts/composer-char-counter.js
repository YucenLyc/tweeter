//this file is responsible for the character count of the web app

$(document).ready(function() {
  // --- our code goes here ---
  //console.log("imma working hard here");
  $( "#tweet-text" ).keyup(function(event) {
    let tweetlength = event.target.value.length;
    console.log(tweetlength);
    $(".counter").text (140 - tweetlength);
    if (tweetlength > 140 ) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "gray");
    }
    console.log(this);
  });
});