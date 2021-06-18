/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//this function takes in a tweet object and is responsible for returning a tweet <article>
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },

  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1623728321503
  }

]


$(document).ready(function () {
  console.log("Loading DOM content");

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  function renderTweets(tweetData) {
    const container = $('#tweet-container');

    tweetData.forEach((tweet) => {
      const tweetElement = createTweetElement(tweet);
      container.prepend(tweetElement);
    })
  }

  function createTweetElement(tweetData) {
    const user = tweetData.user;

    const tweetElement = `
    <article class="tweet">
    <header>
      <div class="userData">
        <img class="avatar-guest" src=${user.avatars}>
        <div class="tweeterName">${user.name}</div>
      </div>
      <div class="tweeterHandle">${user.handle}</div>
    </header>
    <p class="tweetText">${escape(tweetData.content.text)}</p>
    <footer>
      <div>10 days ago</div>
      <div id="icon">
      <i class="fas fa-dog"></i>
      <i class="far fa-meh"></i>
      <i class="fas fa-bell"></i>
      </div>
    </footer>
  </article>
  `;

    return tweetElement;
  }


  //fetching tweets from the localhost page:
  function loadtweets() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "JSON"
    }).done(data => {
      renderTweets(data)
    })

  }
  loadtweets();


  $('#incoming-tweet').submit(function () {
    let $button = $("#tweet-button");

    event.preventDefault();
    console.log("Button clicked");
    // console.log(this);
    const textValue = $("#tweet-text").val();
    console.log(textValue);
    let textlength = textValue.length;
    if (textlength > 140 || textlength === 0) {

      $('#notification').removeClass("hidden");
      $('section.new-tweet textarea').focus();
      $('#notification').empty();
      $('#notification').append("<b>Error</b> Invalid Tweet.");
      setTimeout(() => {
        $('#notification').slideToggle();
      }, 2000);
    }  else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $("#incoming-tweet textarea").serialize(),
      })
        .then(function (successfulPost) {
          return $.ajax('/tweets', { method: "GET" })
        })
        .then(function (allTweets) {
          $('#incoming-tweet')[0].reset();
          const latestTweet = [allTweets[allTweets.length - 1]];
          renderTweets(latestTweet);
          $(".counter").val(140);
        });
    }
    
    })
  });

