//get node webkit GUI - WIN
var gui = require('nw.gui');
// get the window object
var win = gui.Window.get();

//Keyboard shortcuts
document.onkeydown = function (pressed) {
    // //Check CTRL + F5 keys and hard refresh the page
    // if ( pressed.ctrlKey === true && pressed.keyCode === 116 ) {
    //     pressed.preventDefault();
    //     win.reloadDev();
    //     return false;
    // //Check Shift + F5 keys and refresh ignoring cache
    // } else if ( pressed.shiftKey === true && pressed.keyCode === 116 ) {
    //     pressed.preventDefault();
    //     win.reloadIgnoringCache();
    //     return false;
    // //Check F5 key and soft refresh
    // } else if ( pressed.keyCode === 116 ) {
    //     pressed.preventDefault();
    //     win.reload();
    //     return false;
    // //Check F12 or Ctrl+Shift+I and display Webkit Dev Tools
    // } else if ( pressed.keyCode === 123 || pressed.ctrlKey === true && pressed.shiftKey === true && pressed.keyCode === 73 ) {
    //     pressed.preventDefault();
    //     win.showDevTools();
    //     return false;
    // }
    //Check Ctrl + R keys and refresh ignoring cache
    if ( pressed.ctrlKey === true && pressed.keyCode === 82 ) {
        pressed.preventDefault();
        win.reloadIgnoringCache();
        return false;
    }
}