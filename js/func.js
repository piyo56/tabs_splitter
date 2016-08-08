var store_key = "temporarily_stored_tabs";

function openInNewWindow( init_tabId, append_tabIds ) {
    //var prev_window_id
    //chrome.windows.getLastFocused(function(current_window) {
    var size = getHalfDisplaySize();
    chrome.windows.create({
            "tabId":   init_tabId,
            "focused": true,
            "type":    "normal",
        }, function(window_info) {
            chrome.tabs.move(append_tabIds, {"windowId":window_info["id"], "index":-1});
        }
    );
}

/* not use yet */
function getHalfDisplaySize() {
    return {
        "width":  Math.floor(window.parent.screen.width / 2),
        "height": window.parent.screen.height
    };
}

//-------------------------------------------------------------
//  split機能
//  [説明] : 今開いているタブを基準に右側のタブを新しいウィン
//           ドウで開く
//-------------------------------------------------------------
document.getElementById("split").onclick = function() {
    chrome.tabs.query( {currentWindow: true}, function(tabArray){
        var active_tabId = -1,
            left_tabIds  = [],
            right_tabIds = [];

        //[タブのsplit処理]
        //  現在の開いている(=active)タブを含め、その右側
        //  にあるタブをまとめて、新しいウィンドウで開く
        for (var i=0; i<tabArray.length; i++) {
            var tabId = tabArray[i]["id"]
            if( tabArray[i]["active"] ){
                active_tabId = tabId;
            } else if( active_tabId === -1) {
                left_tabIds.push(tabId);
            } else {
                right_tabIds.push(tabId);
            }
        }
        console.info(tabArray);
        console.info("now: " + active_tabId);
        console.info("left: " + left_tabIds);
        console.info("right: " + right_tabIds);
        openInNewWindow( active_tabId, right_tabIds );
    });
};


//-------------------------------------------------------------
//  store機能
//  [説明] : 一時的にWebStorageを使ってデバイスにタブを保存
//  
//  [TO DO]: storeしたタブが後々不要になった時に削除する機能
//-------------------------------------------------------------
document.getElementById("store").onclick = function() {

};

document.getElementById("retreve").onclick = function() {
};

//-------------------------------------------------------------
//  bookmark機能
//  [説明] : 今開いている全てのタブをまとめてブックマークする
//-------------------------------------------------------------
document.getElementById("bookmark").onclick = function() {
    document.body.style.height = "300px";
    document.getElementById("bookmark_setting").style.display = "block";
    chrome.bookmarks.getTree(function(bookmark_tree) {
        console.info(bookmark_tree);
    });

};

/*
function getBookmarkDir(bookmark_tree){
    var bookmark_info = ["];
    for (var i=0; i<bookmark_tree.length; i++) {
        
}
*/
/*
   chrome.windows.create({
   "width":   300,
   "height":  300,
   "focused": true,
   "type":    "popup"
   }, function (window_info){
   });
*/