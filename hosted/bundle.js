"use strict";

var handleWatch = function handleWatch(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#watchTitle").val() == '') {
    handleError("Tite is required");
    return false;
  }

  sendAjax('POST', $("#makerForm").attr("action"), $("#makerForm").serialize(), function () {
    loadWatchlistFromServer();
  });
  return false;
};

var handleChange = function handleChange(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("RAWR! Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#settingsForm").attr("action"), $("#settingsForm").serialize(), redirect);
  return false;
};

var SettingsWindow = function SettingsWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "settingsForm",
    name: "settingsForm",
    onSubmit: handleChange,
    action: "/updateAccount",
    method: "POST",
    className: "updateAccountForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass2"
  }, "Re-type Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass2",
    type: "password",
    name: "pass2",
    placeholder: "retype password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Sign Up"
  }));
};

var createSettingsWindow = function createSettingsWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SettingsWindow, {
    csrf: csrf
  }), document.querySelector("#watchlist"));
};

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
  }, "URL (Optional): "), /*#__PURE__*/React.createElement("input", {
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
};

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
      }, " Title: ", watch.title, " "), /*#__PURE__*/React.createElement("h3", {
        className: "watchLink"
      }, " Link: ", watch.link, " "));
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
      }, " Title: ", watch.title, " "), /*#__PURE__*/React.createElement("h3", {
        className: "watchLink"
      }, " Link: ", watch.link, " "));
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
      }, " Title: ", watch.title, " "), /*#__PURE__*/React.createElement("h3", {
        className: "watchLink"
      }, " Link: ", watch.link, " "));
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "watchList"
  }, watchNodes);
};

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
      }, " Title: ", watch.title, " "), /*#__PURE__*/React.createElement("h3", {
        className: "watchLink"
      }, " Link: ", watch.link, " "));
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "watchList"
  }, watchNodes);
}; //const createMoviesWindow = (csrf) => {
////    ReactDOM.render(
////        <MoviesList csrf={csrf} />, document.querySelector("#watchlist")
////    );
//    
//    ReactDOM.render(
//        <MoviesList watchlist={[]} />, document.querySelector("#watchlist")
//    );
//};


var loadWatchlistFromServer = function loadWatchlistFromServer() {
  sendAjax('GET', '/getWatchlist', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(WatchList, {
      watchlist: data.watchlist
    }), document.querySelector("#watchlist"));
  });
};

var loadMovieListFromServer = function loadMovieListFromServer() {
  sendAjax('GET', '/getWatchlist', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(MovieList, {
      watchlist: data.watchlist
    }), document.querySelector("#watchlist"));
  });
};

var setup = function setup(csrf) {
  var settingsButton = document.querySelector("#settingsButton");
  var moviesButton = document.querySelector("#moviesButton");
  var allButton = document.querySelector("#allButton"); //SETTINGS BUTTON

  settingsButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSettingsWindow(csrf);
    return false;
    loadWatchlistFromServer();
  }); //MOVIES BUTTON

  moviesButton.addEventListener("click", function (e) {
    ReactDOM.render( /*#__PURE__*/React.createElement(MakerForm, {
      csrf: csrf
    }), document.querySelector("#makeWatch"));
    ReactDOM.render( /*#__PURE__*/React.createElement(MovieList, {
      watchlist: []
    }), document.querySelector("#watchlist"));
    loadMovieListFromServer();
  }); //ALL BUTTON

  allButton.addEventListener("click", function (e) {
    ReactDOM.render( /*#__PURE__*/React.createElement(MakerForm, {
      csrf: csrf
    }), document.querySelector("#makeWatch"));
    ReactDOM.render( /*#__PURE__*/React.createElement(WatchList, {
      watchlist: []
    }), document.querySelector("#watchlist"));
    loadWatchlistFromServer();
  }); //DEFAULT

  ReactDOM.render( /*#__PURE__*/React.createElement(MakerForm, {
    csrf: csrf
  }), document.querySelector("#makeWatch"));
  ReactDOM.render( /*#__PURE__*/React.createElement(WatchList, {
    watchlist: []
  }), document.querySelector("#watchlist"));
  loadWatchlistFromServer();
};

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
  $("#domoMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({
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
