var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var host = 'http://10.59.72.195';
var dataURL = host + ':8080/notes';
var Right = host + ':8090/?RightArrow';
var Left = host + ':8090/?LeftArrow';
var FullScreen = host + ':8090/?Refresh';
var timerbool = false;
var notes;
var cur = 0;
var font = 'gothic-28-bold';
var secs;
var mins;
var curtimer = '00:00';

// get data set -----------------------------------------------
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

// setup windows -----------------------------------------------
var wind = new UI.Window({
    fullscreen: true
});

var main = new UI.Window({
  fullscreen: false
});

// setup elements ----------------------------------------------
var icon = new UI.Image({
  position: new Vector2(10,10),
  size: new Vector2(28,28),
  image: 'images/Presentebble.png'
});

var title = new UI.Text({
  position: new Vector2(40, 10),
  size: new Vector2(100, 10),
  text: 'Presentebble',
  font: 'gothic-24-bold',
  textAlign: 'center'
});

var timeElapsed = new UI.Text({
  position: new Vector2(0, 50),
  size: new Vector2(144, 10),
  text: 'Time Elapsed:',
  font: 'gothic-24-bold',
  textAlign: 'center'
});

var timer = new UI.Text({
  position: new Vector2(10, 80),
  size: new Vector2(124, 40),
  text: curtimer,
  font: 'bitham-34-medium-numbers',
  textAlign: 'center'
});



var textfield = new UI.Text({
  position: new Vector2(0, 65),
  size: new Vector2(144, 30),
  font: font,
  text: "",
  textAlign: 'center'
});

var slideNum = new UI.Text({
  position: new Vector2(10, 10),
  size: new Vector2(124, 30),
  font: font,
  text: "",
  textAlign: 'center'
});


// functions to change screens -------------------------------------
var next = function(e) {
  if (cur !== notes.length-1) {
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
      size: new Vector2(144, 30),
      font: font,
      text: notes[cur],
      textAlign: 'center'
    });
    wind.remove(slideNum);
    slideNum = new UI.Text({
      position: new Vector2(10, 10),
      size: new Vector2(124, 30),
      font: font,
      text: (cur + 1) + "/" + notes.length,
      textAlign: 'center'
    });
    wind.add(slideNum);
    wind.add(textfield);
  }
};

var back = function(e) {
  if (cur !== 0) {
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
      font: font,
      text: notes[cur],
      textAlign: 'center'
    });
    wind.remove(slideNum);
    slideNum = new UI.Text({
      position: new Vector2(10, 10),
      size: new Vector2(124, 30),
      font: font,
      text: (cur + 1) + "/" + notes.length,
      textAlign: 'center'
    });
    wind.add(slideNum);
    wind.add(textfield);
  }
};

wind.on('click','down', next);
wind.on('click','up', back);

main.on('click', 'down', function(e) {
  if (timerbool === false) {
    secs = 0;
    mins = 0;
    setInterval(function() {
      secs += 1;
      if (secs > 59) {
        mins += 1;
        secs = 0;
      }
      var secout;
      if (secs < 10) secout = '0' + secs;
      else secout = secs;
      var minout;
      if (mins < 10) minout = '0' + mins;
      else minout = mins;
      curtimer = minout+':'+secout;
      main.remove(timer);
      timer = new UI.Text({
        position: new Vector2(10, 80),
        size: new Vector2(124, 40),
        text: curtimer,
        font: 'bitham-34-medium-numbers',
        textAlign: 'center'
      });
      main.add(timer);
    }, 1000);
    timerbool = true;
  }
  wind.remove(textfield);
  textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: font,
    text: notes[cur],
    textAlign: 'center'
  });
  wind.remove(slideNum);
  slideNum = new UI.Text({
    position: new Vector2(10, 10),
    size: new Vector2(124, 30),
    font: font,
    text: (cur + 1) + "/" + notes.length,
    textAlign: 'center'
  });
  wind.add(slideNum);
  wind.add(textfield);
  wind.show();
});

main.on('click', 'up', function(e) {
  ajax({ url: FullScreen, method: 'get'},
        function(data) {
        console.log("Successfully pressed F5!");
        },
        function(error) {
        console.log('Failed to press F5: ' + error);
    });
})
// start of program -----------------------------------
wind.add(textfield);
wind.add(slideNum);
main.add(icon);
main.add(title);
main.add(timeElapsed);
main.add(timer);
main.show();
