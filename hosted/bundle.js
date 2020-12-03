"use strict";

//handleWatch sends a POST request that allows user to create a watchlist object
var handleWatch = function handleWatch(e) {
  e.preventDefault();
  $("#errMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#watchTitle").val() == '') {
    handleError("Title is required");
    return false;
  }

  sendAjax('POST', $("#makerForm").attr("action"), $("#makerForm").serialize(), function () {
    loadWatchlistFromServer();
  });
  return false;
}; //handleChange sends a POST request that allows user to update their username and password information


var handleChange = function handleChange(e) {
  e.preventDefault();
  $("#errMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#settingsForm").attr("action"), $("#settingsForm").serialize(), redirect);
  return false;
}; //html structure of settings window


var SettingsWindow = function SettingsWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "settingsForm",
    name: "settingsForm",
    onSubmit: handleChange,
    action: "/updateAccount",
    method: "POST",
    className: "updateAccountForm"
  }, /*#__PURE__*/React.createElement("div", {
    id: "div1"
  }, /*#__PURE__*/React.createElement("label", {
    id: "user1Label",
    htmlFor: "username1"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "user1",
    type: "text",
    name: "username1",
    placeholder: "username"
  })), /*#__PURE__*/React.createElement("div", {
    id: "div2"
  }, /*#__PURE__*/React.createElement("label", {
    id: "pass1Label",
    htmlFor: "pass1"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass1",
    type: "password",
    name: "pass1",
    placeholder: "password"
  })), /*#__PURE__*/React.createElement("div", {
    id: "div3"
  }, /*#__PURE__*/React.createElement("label", {
    id: "pass12Label",
    htmlFor: "pass12"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass12",
    type: "password",
    name: "pass12",
    placeholder: "re-type password"
  })), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Save"
  }));
}; //render the settings window


var createSettingsWindow = function createSettingsWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SettingsWindow, {
    csrf: csrf
  }), document.querySelector("#watchlist"));
}; //Form that lets user create watchlist object


var MakerForm = function MakerForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "makerForm",
    onSubmit: handleWatch,
    name: "makerForm",
    action: "/maker",
    method: "POST",
    className: "makerForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "watchType"
  }, "Type: "), /*#__PURE__*/React.createElement("select", {
    name: "watchType",
    id: "watchType"
  }, /*#__PURE__*/React.createElement("option", {
    value: "movie"
  }, "Movie"), /*#__PURE__*/React.createElement("option", {
    value: "show"
  }, "Show"), /*#__PURE__*/React.createElement("option", {
    value: "other"
  }, "(other)")), /*#__PURE__*/React.createElement("label", {
    htmlFor: "title"
  }, "Title: "), /*#__PURE__*/React.createElement("input", {
    id: "watchTitle",
    type: "text",
    name: "title",
    placeholder: "Title"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "link"
  }, "URL: "), /*#__PURE__*/React.createElement("input", {
    id: "watchLink",
    type: "text",
    name: "link",
    placeholder: "URL"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeWatchSubmit",
    type: "submit",
    value: "Create"
  }));
}; //html skeleton of watchlist


var WatchList = function WatchList(props) {
  if (props.watchlist.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "watchList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyWatch"
    }, "There is nothing here..."));
  }

  var watchNodes = props.watchlist.map(function (watch) {
    var movieIcon = "/assets/img/movie.png";
    var showIcon = "/assets/img/show.png";
    var videoIcon = "/assets/img/video.png";

    if (watch.watchType === "movie") {
      return /*#__PURE__*/React.createElement("div", {
        key: watch._id,
        className: "watch"
      }, /*#__PURE__*/React.createElement("img", {
        src: movieIcon,
        alt: "movie icon",
        className: "icon"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "watchTitle"
      }, " ", watch.title, " "), /*#__PURE__*/React.createElement("h3", {
        className: "watchLink"
      }, /*#__PURE__*/React.createElement("a", {
        href: watch.link
      }, "Link")));
    } else if (watch.watchType === "show") {
      return /*#__PURE__*/React.createElement("div", {
        key: watch._id,
        className: "watch"
      }, /*#__PURE__*/React.createElement("img", {
        src: showIcon,
        alt: "show icon",
        className: "icon"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "watchTitle"
      }, " ", watch.title, " "), /*#__PURE__*/React.createElement("h3", {
        className: "watchLink"
      }, /*#__PURE__*/React.createElement("a", {
        href: watch.link
      }, "Link")));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        key: watch._id,
        className: "watch"
      }, /*#__PURE__*/React.createElement("img", {
        src: videoIcon,
        alt: "video icon",
        className: "icon"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "watchTitle"
      }, " ", watch.title, " "), /*#__PURE__*/React.createElement("h3", {
        className: "watchLink"
      }, /*#__PURE__*/React.createElement("a", {
        href: watch.link
      }, "Link")));
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "watchList"
  }, watchNodes);
}; //html skeleton of movieList


var MovieList = function MovieList(props) {
  if (props.watchlist.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "watchList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyWatch"
    }, "There is nothing here..."));
  }

  var watchNodes = props.watchlist.map(function (watch) {
    var movieIcon = "/assets/img/movie.png";

    if (watch.watchType === "movie") {
      return /*#__PURE__*/React.createElement("div", {
        key: watch._id,
        className: "watch"
      }, /*#__PURE__*/React.createElement("img", {
        src: movieIcon,
        alt: "movie icon",
        className: "icon"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "watchTitle"
      }, " ", watch.title, " "), /*#__PURE__*/React.createElement("h3", {
        className: "watchLink"
      }, /*#__PURE__*/React.createElement("a", {
        href: watch.link
      }, "Link")));
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "watchList"
  }, watchNodes);
}; //html skeleton of ShowList


var ShowList = function ShowList(props) {
  if (props.watchlist.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "watchList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyWatch"
    }, "There is nothing here..."));
  }

  var watchNodes = props.watchlist.map(function (watch) {
    var showIcon = "/assets/img/show.png";

    if (watch.watchType === "show") {
      return /*#__PURE__*/React.createElement("div", {
        key: watch._id,
        className: "watch"
      }, /*#__PURE__*/React.createElement("img", {
        src: showIcon,
        alt: "show icon",
        className: "icon"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "watchTitle"
      }, " ", watch.title, " "), /*#__PURE__*/React.createElement("h3", {
        className: "watchLink"
      }, /*#__PURE__*/React.createElement("a", {
        href: watch.link
      }, "Link")));
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "watchList"
  }, watchNodes);
}; //html skeleton of VideosList


var VideosList = function VideosList(props) {
  if (props.watchlist.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "watchList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyWatch"
    }, "There is nothing here..."));
  }

  var watchNodes = props.watchlist.map(function (watch) {
    var videoIcon = "/assets/img/video.png";

    if (watch.watchType === "other") {
      return /*#__PURE__*/React.createElement("div", {
        key: watch._id,
        className: "watch"
      }, /*#__PURE__*/React.createElement("img", {
        src: videoIcon,
        alt: "video icon",
        className: "icon"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "watchTitle"
      }, " ", watch.title, " "), /*#__PURE__*/React.createElement("h3", {
        className: "watchLink"
      }, /*#__PURE__*/React.createElement("a", {
        href: watch.link
      }, "Link")));
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "watchList"
  }, watchNodes);
}; //GET request to get watchlist data


var loadWatchlistFromServer = function loadWatchlistFromServer() {
  sendAjax('GET', '/getWatchlist', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(WatchList, {
      watchlist: data.watchlist
    }), document.querySelector("#watchlist"));
  });
}; //GET request to get movie list data


var loadMovieListFromServer = function loadMovieListFromServer() {
  sendAjax('GET', '/getWatchlist', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(MovieList, {
      watchlist: data.watchlist
    }), document.querySelector("#watchlist"));
  });
}; //GET request to get show list data


var loadShowListFromServer = function loadShowListFromServer() {
  sendAjax('GET', '/getWatchlist', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ShowList, {
      watchlist: data.watchlist
    }), document.querySelector("#watchlist"));
  });
}; //GET request to get video list data


var loadVideoListFromServer = function loadVideoListFromServer() {
  sendAjax('GET', '/getWatchlist', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(VideosList, {
      watchlist: data.watchlist
    }), document.querySelector("#watchlist"));
  });
}; //setup calls previous functions based on what tab the user clicks on


var setup = function setup(csrf) {
  var settingsButton = document.querySelector("#settingsButton");
  var moviesButton = document.querySelector("#moviesButton");
  var showsButton = document.querySelector("#showsButton");
  var videosButton = document.querySelector("#videosButton");
  var allButton = document.querySelector("#allButton");
  var subscribeButton = document.querySelector("#subscribeButton");
  var moviesSpan = document.querySelector("#moviesSpan");
  var showsSpan = document.querySelector("#showsSpan");
  var videosSpan = document.querySelector("#videosSpan");
  moviesSpan.style.display = "none";
  showsSpan.style.display = "none";
  videosSpan.style.display = "none";
  subscribeButton.addEventListener("click", function (e) {
    moviesSpan.style.display = "block";
    showsSpan.style.display = "block";
    videosSpan.style.display = "block";
    subscribeButton.disabled = true;
  }); //SETTINGS BUTTON

  settingsButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSettingsWindow(csrf);
    return false;
    loadWatchlistFromServer();
  }); //MOVIES BUTTON

  moviesButton.addEventListener("click", function (e) {
    e.preventDefault();
    ReactDOM.render( /*#__PURE__*/React.createElement(MakerForm, {
      csrf: csrf
    }), document.querySelector("#makeWatch"));
    ReactDOM.render( /*#__PURE__*/React.createElement(MovieList, {
      watchlist: []
    }), document.querySelector("#watchlist"));
    loadMovieListFromServer();
    return false;
  }); //SHOW BUTTON

  showsButton.addEventListener("click", function (e) {
    e.preventDefault();
    ReactDOM.render( /*#__PURE__*/React.createElement(MakerForm, {
      csrf: csrf
    }), document.querySelector("#makeWatch"));
    ReactDOM.render( /*#__PURE__*/React.createElement(ShowList, {
      watchlist: []
    }), document.querySelector("#watchlist"));
    loadShowListFromServer();
    return false;
  }); //VIDEOS BUTTON

  videosButton.addEventListener("click", function (e) {
    e.preventDefault();
    ReactDOM.render( /*#__PURE__*/React.createElement(MakerForm, {
      csrf: csrf
    }), document.querySelector("#makeWatch"));
    ReactDOM.render( /*#__PURE__*/React.createElement(VideosList, {
      watchlist: []
    }), document.querySelector("#watchlist"));
    loadVideoListFromServer();
    return false;
  }); //ALL BUTTON

  allButton.addEventListener("click", function (e) {
    e.preventDefault();
    ReactDOM.render( /*#__PURE__*/React.createElement(MakerForm, {
      csrf: csrf
    }), document.querySelector("#makeWatch"));
    ReactDOM.render( /*#__PURE__*/React.createElement(WatchList, {
      watchlist: []
    }), document.querySelector("#watchlist"));
    loadWatchlistFromServer();
    return false;
  }); //DEFAULT

  ReactDOM.render( /*#__PURE__*/React.createElement(MakerForm, {
    csrf: csrf
  }), document.querySelector("#makeWatch"));
  ReactDOM.render( /*#__PURE__*/React.createElement(WatchList, {
    watchlist: []
  }), document.querySelector("#watchlist"));
  loadWatchlistFromServer();
}; //get csrf token


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#errMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#errMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
