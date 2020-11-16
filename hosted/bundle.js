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
}; //const MakerForm = (props) => {
//    return (
//        <form id="makerForm"
//                onSubmit={handleDomo}
//                name="makerForm"
//                action="/maker"
//                method="POST"
//                className="makerForm"
//        >
//            <label htmlFor="type">Type: </label>
//            <select name="type" id="type">
//                <option value="movie">Movie</option>
//                <option value="show">Show</option>
//                <option value="other">(other)</option>
//            </select>
//                
//            <label htmlFor="name">Name: </label>
//            <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
//
//            <label htmlFor="age">Age: </label>
//            <input id="domoAge" type="text" name="age" placeholder="Domo Age"/>
//
//            <label htmlFor="level">Level: </label>
//            <input id="domoLevel" type="text" name="level" placeholder="Domo Level"/>
//
//            <input type="hidden" name="_csrf" value={props.csrf} />
//            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
//        </form>
//    );
//};


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

var loadWatchlistFromServer = function loadWatchlistFromServer() {
  sendAjax('GET', '/getWatchlist', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(WatchList, {
      watchlist: data.watchlist
    }), document.querySelector("#watchlist"));
  });
};

var setup = function setup(csrf) {
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
