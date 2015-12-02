var mode = {
  'Note': '00h',
  'Drum': '01h',
  'Fader': '02h',
  'Programmer': '03h'
};

var type = {
  pad: {
    mode: 'Note',
    type: 144
  },
  btn:{
    mode: 'Note',
    type: 176
  }
}


var launchpadpro = {

};


function genSelectModeMsg(mode){
  return 'F0h 00h 20h 29h 02h 2Ch ' + mode + ' F7h';
}


module.exports = function(){
  return launchpadpro;
};