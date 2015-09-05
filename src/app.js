/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */
 

// Initialization
var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var dataURL = 'http://10.59.72.195:8080/notes';
var Right = 'http://10.59.72.195:8090/?RightArrow';
var Left = 'http://10.59.72.195:8090/?LeftArrow';
var notes;
var cur = 0;

// get data set
ajax({ url: dataURL, type: 'json'},
        function(data) {
        console.log(data);
        data = JSON.parse(data);
        notes = data.notes;
        console.log(data.notes);
        console.log("Successfully downloaded info!");
        },
        function(error) {
        console.log('Failed to download info: ' + error);
    });

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/Presentebble.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

// setup windows
var wind = new UI.Window({
        fullscreen: true
    });

var textfield = new UI.Text({
  position: new Vector2(0, 65),
  size: new Vector2(144, 30),
  font: 'gothic-24-bold',
  text: "",
  textAlign: 'center'
});


// functions to change screens 
var next = function(e) {
  if (cur !== notes.length-1) {
    console.log('yolo');
    ajax({ url: Right, method: 'get'},
        function(data) {
        console.log("Successfully pressed RightArrow!");
        },
        function(error) {
        console.log('Failed to press RightArrow: ' + error);
    });
    wind.remove(textfield);
    cur++;
    textfield = new UI.Text({
      position: new Vector2(0, 65),
      size: new Vector2(28, 28),
      font: 'gothic-24-bold',
      text: notes[cur],
      textAlign: 'center'
    });
    wind.add(textfield);
  }
};

var back = function(e) {
  if (cur !== 0) {
    console.log('yolo');
    ajax({ url: Left, method: 'get'},
        function(data) {
        console.log("Successfully pressed LeftArrow!");
        },
        function(error) {
        console.log('Failed to press LeftArrow: ' + error);
    });
    wind.remove(textfield);
    cur--;
    textfield = new UI.Text({
      position: new Vector2(0, 65),
      size: new Vector2(144, 30),
      font: 'gothic-24-bold',
      text: notes[cur],
      textAlign: 'center'
    });
    wind.add(textfield);
  }
};

wind.on('click','down', next);
wind.on('click','up', back);
main.on('click', 'down', function(e) {
  textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: notes[cur],
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

// start of program
wind.add(textfield);
main.show();
 
//main.on('click', 'up', function(e) {
  //var menu = new UI.Menu({
    //sections: [{
      //items: [{
        //title: 'Pebble.js',
        //icon: 'images/menu_icon.png',
        //subtitle: 'Can do Menus'
      //}, {
        //title: 'Second Item',
        //subtitle: 'Subtitle Text'
      //}]
    //}]
  //});
  //menu.on('select', function(e) {
    //console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    //console.log('The item is titled "' + e.item.title + '"');
  //});
  //menu.show();
//});
 
//main.on('click', 'select', function(e) {
  //var wind = new UI.Window({
    //fullscreen: true,
  //});
  //var textfield = new UI.Text({
    //position: new Vector2(0, 65),
    //size: new Vector2(144, 30),
    //font: 'gothic-24-bold',
    //text: 'Text\nAnywhere!',
    //textAlign: 'center'
  //});
  //wind.add(textfield);
  //wind.show();
//});