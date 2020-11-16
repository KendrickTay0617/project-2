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

//const MakerForm = (props) => {
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

const loadWatchlistFromServer = () => {
    sendAjax('GET', '/getWatchlist', null, (data) => {
        ReactDOM.render(
            <WatchList watchlist={data.watchlist} />, document.querySelector("#watchlist")
        );
    });
};

const setup = function(csrf) {
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