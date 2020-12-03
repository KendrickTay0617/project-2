//handleWatch sends a POST request that allows user to create a watchlist object
const handleWatch = (e) => {
    e.preventDefault();
    
    $("#errMessage").animate({width:'hide'},350);
    
    if($("#watchTitle").val() == '') {
        handleError("Title is required");
        return false;
    }
    
    sendAjax('POST', $("#makerForm").attr("action"), $("#makerForm").serialize(), function() {
        loadWatchlistFromServer();
    });
    
    return false;
};

//handleChange sends a POST request that allows user to update their username and password information
const handleChange = (e) => {
    e.preventDefault();
    
    $("#errMessage").animate({width:'hide'},350);
    
    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }
    
    if($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }
    
    sendAjax('POST', $("#settingsForm").attr("action"), $("#settingsForm").serialize(), redirect);
    
    return false;
}

//html structure of settings window
const SettingsWindow = (props) => {
    return (
        <form id="settingsForm" name="settingsForm"
            onSubmit={handleChange}
            action="/updateAccount"
            method="POST"
            className="updateAccountForm"
        >
            <div id="div1">
                <label id="user1Label" htmlFor="username1">Username: </label>
                <input id="user1" type="text" name="username1" placeholder="username"/>
            </div>
            <div id="div2">
                <label id="pass1Label" htmlFor="pass1">Password: </label>
                <input id="pass1" type="password" name="pass1" placeholder="password"/>
            </div>
            <div id="div3">
                <label id="pass12Label" htmlFor="pass12">Password: </label>
                <input id="pass12" type="password" name="pass12" placeholder="re-type password"/>
            </div>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Save" />
        </form>
    );
};

//render the settings window
const createSettingsWindow = (csrf) => {
    ReactDOM.render(
        <SettingsWindow csrf={csrf} />, document.querySelector("#watchlist")
    );
};

//Form that lets user create watchlist object
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
            
            <label htmlFor="link">URL: </label>
            <input id="watchLink" type="text" name="link" placeholder="URL"/>
            
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeWatchSubmit" type="submit" value="Create" />
        </form>
    );
};

//html skeleton of watchlist
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
                    <h3 className="watchTitle"> {watch.title} </h3>
                    <h3 className="watchLink"><a href={watch.link}>Link</a></h3>
                </div>
            );
        } else if (watch.watchType === "show") {
            return (
                <div key={watch._id} className="watch">
                    <img src={showIcon} alt="show icon" className="icon" />
                    <h3 className="watchTitle"> {watch.title} </h3>
                    <h3 className="watchLink"><a href={watch.link}>Link</a></h3>
                </div>
            );
        } else {
            return (
                <div key={watch._id} className="watch">
                    <img src={videoIcon} alt="video icon" className="icon" />
                    <h3 className="watchTitle"> {watch.title} </h3>
                    <h3 className="watchLink"><a href={watch.link}>Link</a></h3>
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

//html skeleton of movieList
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
                    <h3 className="watchTitle"> {watch.title} </h3>
                    <h3 className="watchLink"><a href={watch.link}>Link</a></h3>
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

//html skeleton of ShowList
const ShowList = function(props) {
    if (props.watchlist.length === 0) {
        return (
            <div className="watchList">
                <h3 className="emptyWatch">There is nothing here...</h3>
            </div>
        );
    }
    
    const watchNodes = props.watchlist.map(function(watch) {
        let showIcon = "/assets/img/show.png";
        
        if (watch.watchType === "show") {
            return (
                <div key={watch._id} className="watch">
                    <img src={showIcon} alt="show icon" className="icon" />
                    <h3 className="watchTitle"> {watch.title} </h3>
                    <h3 className="watchLink"><a href={watch.link}>Link</a></h3>
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

//html skeleton of VideosList
const VideosList = function(props) {
    if (props.watchlist.length === 0) {
        return (
            <div className="watchList">
                <h3 className="emptyWatch">There is nothing here...</h3>
            </div>
        );
    }
    
    const watchNodes = props.watchlist.map(function(watch) {
        let videoIcon = "/assets/img/video.png";
        
        if (watch.watchType === "other") {
            return (
                <div key={watch._id} className="watch">
                    <img src={videoIcon} alt="video icon" className="icon" />
                    <h3 className="watchTitle"> {watch.title} </h3>
                    <h3 className="watchLink"><a href={watch.link}>Link</a></h3>
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

//GET request to get watchlist data
const loadWatchlistFromServer = () => {
    sendAjax('GET', '/getWatchlist', null, (data) => {
        ReactDOM.render(
            <WatchList watchlist={data.watchlist} />, document.querySelector("#watchlist")
        );
    });
};

//GET request to get movie list data
const loadMovieListFromServer = () => {
    sendAjax('GET', '/getWatchlist', null, (data) => {
        ReactDOM.render(
            <MovieList watchlist={data.watchlist} />, document.querySelector("#watchlist")
        );
    });
};

//GET request to get show list data
const loadShowListFromServer = () => {
    sendAjax('GET', '/getWatchlist', null, (data) => {
        ReactDOM.render(
            <ShowList watchlist={data.watchlist} />, document.querySelector("#watchlist")
        );
    });
};

//GET request to get video list data
const loadVideoListFromServer = () => {
    sendAjax('GET', '/getWatchlist', null, (data) => {
        ReactDOM.render(
            <VideosList watchlist={data.watchlist} />, document.querySelector("#watchlist")
        );
    });
};

//setup calls previous functions based on what tab the user clicks on
const setup = function(csrf) {
    const settingsButton = document.querySelector("#settingsButton");
    const moviesButton = document.querySelector("#moviesButton");
    const showsButton = document.querySelector("#showsButton");
    const videosButton = document.querySelector("#videosButton");
    const allButton = document.querySelector("#allButton");
    const subscribeButton = document.querySelector("#subscribeButton");
    const moviesSpan = document.querySelector("#moviesSpan");
    const showsSpan = document.querySelector("#showsSpan");
    const videosSpan = document.querySelector("#videosSpan");
    
    moviesSpan.style.display = "none";
    showsSpan.style.display = "none";
    videosSpan.style.display = "none";
    
    subscribeButton.addEventListener("click", (e) => {
        moviesSpan.style.display = "block";
        showsSpan.style.display = "block";
        videosSpan.style.display = "block";
        subscribeButton.disabled = true;
    });
    
    //SETTINGS BUTTON
    settingsButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSettingsWindow(csrf);
        return false;
        
        loadWatchlistFromServer();
    });
    
    //MOVIES BUTTON
    moviesButton.addEventListener("click", (e) => {
        e.preventDefault();
        ReactDOM.render(
            <MakerForm csrf={csrf} />, document.querySelector("#makeWatch")
        );
    
        ReactDOM.render(
            <MovieList watchlist={[]} />, document.querySelector("#watchlist")
        );
    
        loadMovieListFromServer();
        return false;
    });
    
    //SHOW BUTTON
    showsButton.addEventListener("click", (e) => {
        e.preventDefault();
        ReactDOM.render(
            <MakerForm csrf={csrf} />, document.querySelector("#makeWatch")
        );
    
        ReactDOM.render(
            <ShowList watchlist={[]} />, document.querySelector("#watchlist")
        );
        
        loadShowListFromServer();
        return false;
    });
    
    //VIDEOS BUTTON
    videosButton.addEventListener("click", (e) => {
        e.preventDefault();
        ReactDOM.render(
            <MakerForm csrf={csrf} />, document.querySelector("#makeWatch")
        );
    
        ReactDOM.render(
            <VideosList watchlist={[]} />, document.querySelector("#watchlist")
        );
        
        loadVideoListFromServer();
        return false;
    });
    
    //ALL BUTTON
    allButton.addEventListener("click", (e) => {
        e.preventDefault();
        ReactDOM.render(
            <MakerForm csrf={csrf} />, document.querySelector("#makeWatch")
        );
    
        ReactDOM.render(
            <WatchList watchlist={[]} />, document.querySelector("#watchlist")
        );
    
        loadWatchlistFromServer();
        return false;
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

//get csrf token
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});