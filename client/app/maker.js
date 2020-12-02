const handleWatch = (e) => {
    e.preventDefault();
    
    $("#domoMessage").animate({width:'hide'},350);
    
    if($("#watchTitle").val() == '') {
        handleError("Tite is required");
        return false;
    }
    
    sendAjax('POST', $("#makerForm").attr("action"), $("#makerForm").serialize(), function() {
        loadWatchlistFromServer();
    });
    
    return false;
};

const handleChange = (e) => {
    e.preventDefault();
    
    $("#domoMessage").animate({width:'hide'},350);
    
    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }
    
    if($("#pass").val() !== $("#pass2").val()) {
        handleError("RAWR! Passwords do not match");
        return false;
    }
    
    sendAjax('POST', $("#settingsForm").attr("action"), $("#settingsForm").serialize(), redirect);
    
    return false;
}

const SettingsWindow = (props) => {
    return (
        <form id="settingsForm" name="settingsForm"
            onSubmit={handleChange}
            action="/updateAccount"
            method="POST"
            className="updateAccountForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <label htmlFor="pass2">Re-type Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
};

const createSettingsWindow = (csrf) => {
    ReactDOM.render(
        <SettingsWindow csrf={csrf} />, document.querySelector("#watchlist")
    );
};

const MakerForm = (props) => {
    return (
        <form id="makerForm"
                onSubmit={handleWatch}
                name="makerForm"
                action="/maker"
                method="POST"
                className="makerForm"
        >
            <label htmlFor="watchType">Type: </label>
            <select name="watchType" id="watchType">
                <option value="movie">Movie</option>
                <option value="show">Show</option>
                <option value="other">(other)</option>
            </select>
                
            <label htmlFor="title">Title: </label>
            <input id="watchTitle" type="text" name="title" placeholder="Title"/>
            
            <label htmlFor="link">URL (Optional): </label>
            <input id="watchLink" type="text" name="link" placeholder="URL"/>
            
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeWatchSubmit" type="submit" value="Create" />
        </form>
    );
};

const WatchList = function(props) {
    if (props.watchlist.length === 0) {
        return (
            <div className="watchList">
                <h3 className="emptyWatch">There is nothing here...</h3>
            </div>
        );
    }
    
    const watchNodes = props.watchlist.map(function(watch) {
        let movieIcon = "/assets/img/movie.png";
        let showIcon = "/assets/img/show.png";
        let videoIcon = "/assets/img/video.png";
        
        if (watch.watchType === "movie") {
            return (
                <div key={watch._id} className="watch">
                    <img src={movieIcon} alt="movie icon" className="icon" />
                    <h3 className="watchTitle"> Title: {watch.title} </h3>
                    <h3 className="watchLink"> Link: {watch.link} </h3>
                </div>
            );
        } else if (watch.watchType === "show") {
            return (
                <div key={watch._id} className="watch">
                    <img src={showIcon} alt="show icon" className="icon" />
                    <h3 className="watchTitle"> Title: {watch.title} </h3>
                    <h3 className="watchLink"> Link: {watch.link} </h3>
                </div>
            );
        } else {
            return (
                <div key={watch._id} className="watch">
                    <img src={videoIcon} alt="video icon" className="icon" />
                    <h3 className="watchTitle"> Title: {watch.title} </h3>
                    <h3 className="watchLink"> Link: {watch.link} </h3>
                </div>
            );
        }
    });
    
    return (
        <div className="watchList">
            {watchNodes}
        </div>
    );
};

const MovieList = (props) => {
    if (props.watchlist.length === 0) {
        return (
            <div className="watchList">
                <h3 className="emptyWatch">There is nothing here...</h3>
            </div>
        );
    }
    
    const watchNodes = props.watchlist.map(function(watch) {
        let movieIcon = "/assets/img/movie.png";
        
        if (watch.watchType === "movie") {
            return (
                <div key={watch._id} className="watch">
                    <img src={movieIcon} alt="movie icon" className="icon" />
                    <h3 className="watchTitle"> Title: {watch.title} </h3>
                    <h3 className="watchLink"> Link: {watch.link} </h3>
                </div>
            );
        }
    });
    
    return (
        <div className="watchList">
            {watchNodes}
        </div>
    );
};

//const createMoviesWindow = (csrf) => {
////    ReactDOM.render(
////        <MoviesList csrf={csrf} />, document.querySelector("#watchlist")
////    );
//    
//    ReactDOM.render(
//        <MoviesList watchlist={[]} />, document.querySelector("#watchlist")
//    );
//};

const loadWatchlistFromServer = () => {
    sendAjax('GET', '/getWatchlist', null, (data) => {
        ReactDOM.render(
            <WatchList watchlist={data.watchlist} />, document.querySelector("#watchlist")
        );
    });
};

const loadMovieListFromServer = () => {
    sendAjax('GET', '/getWatchlist', null, (data) => {
        ReactDOM.render(
            <MovieList watchlist={data.watchlist} />, document.querySelector("#watchlist")
        );
    });
};

const setup = function(csrf) {
    const settingsButton = document.querySelector("#settingsButton");
    const moviesButton = document.querySelector("#moviesButton");
    const allButton = document.querySelector("#allButton");
    
    //SETTINGS BUTTON
    settingsButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSettingsWindow(csrf);
        return false;
        
        loadWatchlistFromServer();
    });
    
    //MOVIES BUTTON
    moviesButton.addEventListener("click", (e) => {
        ReactDOM.render(
            <MakerForm csrf={csrf} />, document.querySelector("#makeWatch")
        );
    
        ReactDOM.render(
            <MovieList watchlist={[]} />, document.querySelector("#watchlist")
        );
    
        loadMovieListFromServer();
    });
    
    //ALL BUTTON
    allButton.addEventListener("click", (e) => {
        ReactDOM.render(
            <MakerForm csrf={csrf} />, document.querySelector("#makeWatch")
        );
    
        ReactDOM.render(
            <WatchList watchlist={[]} />, document.querySelector("#watchlist")
        );
    
        loadWatchlistFromServer();
    });
    
    //DEFAULT
    ReactDOM.render(
        <MakerForm csrf={csrf} />, document.querySelector("#makeWatch")
    );
    
    ReactDOM.render(
        <WatchList watchlist={[]} />, document.querySelector("#watchlist")
    );
    
    loadWatchlistFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});