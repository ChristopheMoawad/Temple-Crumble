let player;
let walls;
let gamestate;
let playbutton;
let howtoplaybutton;
let returnbutton;
let levelsbuttons;
let levelactive;
let doors;
let doorkeys;
let saws;
let steps;
let time;
let timego;
let times;
let tps;
let notp;
let jumpers;
let sizebuttons;
let transformations;
let wreckingballs;
let boosters;
let arrowthrowers;
let gravitydirection;
let gravitychangers;
let firethrowers;
let ropes;
let mummies;
let mummyHistory;

let translatedDistance;
let chaseState;                
let CHASE_SPEED;

//localStorage.setItem("highest level", 8); //testing purposes
let highestlevel = localStorage.getItem("highest level") | 0;

// Original canvas was 900x700. All values are scaled relative to these.
const OW = 900;
const OH = 700;

function px(x) { return x / OW * width; }
function py(y) { return y / OH * height; }

function setup() {
  createCanvas(windowWidth, windowHeight);

  player = [
    { x: px(50), y: py(30),  w: px(10), h: py(40), speed: { x: 0, y: 0 }, position: "falling", state: "alive", size: "normal" , coyote: 0, jumpbuffer: 0},
    { x: px(50), y: py(625), w: px(10), h: py(40), speed: { x: 0, y: 0 }, position: "falling", state: "alive", size: "normal" , coyote: 0, jumpbuffer: 0},
    { x: px(50), y: py(125), w: px(10), h: py(40), speed: { x: 0, y: 0 }, position: "falling", state: "alive", size: "normal" , coyote: 0, jumpbuffer: 0},
    { x: px(50), y: py(30),  w: px(10), h: py(40), speed: { x: 0, y: 0 }, position: "falling", state: "alive", size: "normal" , coyote: 0, jumpbuffer: 0},
    { x: px(50), y: py(30),  w: px(10), h: py(40), speed: { x: 0, y: 0 }, position: "falling", state: "alive", size: "normal" , coyote: 0, jumpbuffer: 0},
    { x: px(30), y: py(40),  w: px(10), h: py(40), speed: { x: 0, y: 0 }, position: "falling", state: "alive", size: "normal" , coyote: 0, jumpbuffer: 0},
    { x: px(30), y: py(600),  w: px(10), h: py(40), speed: { x: 0, y: 0 }, position: "falling", state: "alive", size: "normal" , coyote: 0, jumpbuffer: 0},
    { x: px(30), y: py(40),  w: px(10), h: py(40), speed: { x: 0, y: 0 }, position: "falling", state: "alive", size: "normal" , coyote: 0, jumpbuffer: 0},
    { x: px(100), y: py(560),  w: px(10), h: py(40), speed: { x: 0, y: 0 }, position: "falling", state: "alive", size: "normal" , coyote: 0, jumpbuffer: 0},


  ];
  for (let p of player) {
        p.platform = null;
        p.stucktoceil = false;
        p.ceilingwall = null;
}

  walls = [
    //level0
    [
      { x: px(0),   y: py(75),  w: px(200), h: py(50) },
      { x: px(300), y: py(75),  w: px(600), h: py(50) },
      { x: px(0),   y: py(175), w: px(700), h: py(50) },
      { x: px(800), y: py(175), w: px(100), h: py(50) },
      { x: px(0),   y: py(275), w: px(300), h: py(50) },
      { x: px(400), y: py(275), w: px(500), h: py(50) },
      { x: px(100), y: py(375), w: px(800), h: py(50) },
      { x: px(0),   y: py(475), w: px(800), h: py(50) },
      { x: px(0),   y: py(575), w: px(400), h: py(50) },
      { x: px(500), y: py(575), w: px(400), h: py(50) },
      { x: px(0),   y: py(25),  w: px(25),  h: height + py(20) }, //left wall
      { x: width - px(25), y: py(25), w: px(25), h: height + py(20) }, //right wall
      { x: px(-10), y: 0,       w: width + px(20), h: py(25) }, //up wall
      { x: px(-10), y: height - py(25), w: width + px(20), h: py(25) }, //down wall
    ],
    //level1
    [
      { x: px(0),   y: py(700), w: px(200), h: py(350) },
      { x: px(200), y: py(700), w: px(900), h: py(50) },
      { x: px(0),   y: py(-400),w: px(200), h: py(400) },
      { x: px(0),   y: py(25),  w: px(25),  h: height + py(20) }, //left wall
      { x: width - px(25), y: py(25), w: px(25), h: height + py(20) }, //right wall
      { x: px(-10), y: 0,       w: width + px(20), h: py(25) }, //up wall
      { x: px(-10), y: height - py(25), w: width + px(20), h: py(25) }, //down wall
    ],
    //level2
    [
      { x: px(0),   y: py(0),   w: px(100), h: py(100) },
      { x: px(0),   y: py(200), w: px(100), h: py(500) },
      { x: px(200), y: py(300), w: px(100), h: py(400) },
      { x: px(400), y: py(400), w: px(100), h: py(300) },
      { x: px(600), y: py(500), w: px(100), h: py(300) },
      { x: px(800), y: py(600), w: px(100), h: py(100) },
      { x: px(600), y: py(500), w: px(100), h: py(50) },
      { x: px(0),   y: py(25),  w: px(25),  h: height + py(20) }, //left wall
      { x: width - px(25), y: py(25), w: px(25), h: height + py(20) }, //right wall
      { x: px(-10), y: 0,       w: width + px(20), h: py(25) }, //up wall
    ],
    //level3
    [
      { x: px(0),   y: py(75),  w: px(600), h: py(50) },
      { x: px(700), y: py(75),  w: px(200), h: py(50) },
      { x: px(0),   y: py(225), w: px(300), h: py(50) },
      { x: px(400), y: py(225), w: px(500), h: py(50) },
      { x: px(0),   y: py(375), w: px(750), h: py(50) },
      { x: px(50),  y: py(475), w: px(50),  h: py(150) },
      { x: px(100), y: py(475), w: px(715), h: py(50) },
      { x: px(815), y: py(475), w: px(75),  h: py(50) },
      { x: px(100), y: py(575), w: px(700), h: py(50) },
      { x: px(0),   y: py(25),  w: px(25),  h: height + py(20) }, //left wall
      { x: width - px(25), y: py(25), w: px(25), h: height + py(20) }, //right wall
      { x: px(-10), y: 0,       w: width + px(20), h: py(25) }, //up wall
      { x: px(-10), y: height - py(25), w: width + px(20), h: py(25) }, //down wall
    ],
    //level4
    [
      { x: px(105), y: py(0),   w: px(50), h: py(200) },
      { x: px(105), y: py(200), w: px(50), h: py(50) },
      { x: px(265), y: py(0),   w: px(50), h: py(200) },
      { x: px(425), y: py(0),   w: px(50), h: py(200) },
      { x: px(585), y: py(0),   w: px(50), h: py(200) },
      { x: px(745), y: py(0),   w: px(50), h: py(75) },
      { x: px(745), y: py(175), w: px(50), h: py(25) },

      { x: px(-10), y: py(200), w: width + px(20), h: py(50) },

      { x: px(187.5), y: py(250), w: px(50), h: py(200) },
      { x: px(347.5), y: py(250), w: px(50), h: py(200) },
      { x: px(347.5), y: py(425), w: px(50), h: py(25) },
      { x: px(507.5), y: py(250), w: px(50), h: py(200) },
      { x: px(667.5), y: py(250), w: px(50), h: py(200) },

      { x: px(-10), y: py(425), w: width + px(20), h: py(50) },

      { x: px(105), y: py(475), w: px(50), h: py(200) },
      { x: px(265), y: py(475), w: px(50), h: py(200) },
      { x: px(425), y: py(475), w: px(50), h: py(200) },
      { x: px(585), y: py(475), w: px(50), h: py(200) },
      { x: px(745), y: py(475), w: px(50), h: py(200) },

      { x: px(-10), y: 0,       w: width + px(20), h: py(25) }, //up wall
      { x: px(-10), y: height - py(25), w: width + px(20), h: py(25) }, //down wall
    ],
    //level5
    [
      { x: 0, y: py(150), w: px(120), h: py(25) },
      { x: px(90),   y: 0, w: px(100), h: py(25) },
      { x: px(260),   y: 0, w: px(60), h: py(100) },
      { x: px(320),   y: 0, w: px(20), h: 0 },
      { x: px(380),   y: 0, w: px(50), h: py(25) },
      { x: px(490),   y: 0, w: px(120), h: py(25) },
      { x: px(610),   y: 0, w: 0, h: py(25) },
      { x: px(670),   y: 0, w: px(50), h: py(25) },

      { x: width - px(15),   y: py(60), w: px(15), h: py(150) },
      { x: px(760), y: py(370), w: px(15), h: py(100) },
      { x: px(710), y: py(510), w: px(65), h: py(60) },
      { x: width - px(15), y: height - py(115), w: px(15), h: py(115) },
      { x: width - px(60),   y: height - py(15), w: px(45), h: py(15) },
      { x: px(630), y: py(510), w: px(15), h: py(190) },


      { x: px(660), y: py(380), w: px(15), h: py(80) },
      { x: px(610), y: py(295), w: px(15), h: py(55) },
      { x: px(565), y: py(270), w: px(160), h: py(25) },
      { x: px(710), y: py(190), w: px(15), h: py(80) },
      { x: px(670), y: py(165), w: px(55), h: py(25) },

      { x: px(530), y: py(190), w: px(15), h: py(80) },
      { x: px(425), y: py(200), w: px(30), h: py(25) },
      { x: px(530), y: py(350), w: px(15), h: py(80) },

      { x: px(585),   y: height - py(15), w: px(45), h: py(15) },
      { x: px(170),   y: height, w: px(50), h: py(25) },
      { x: px(150),   y: height, w: px(50), h: py(25) },
      { x: px(0),   y: height, w: px(15), h: py(100) },
      { x: px(60),   y: height, w: px(15), h: py(80) },
      { x: px(120),   y: height, w: px(15), h: py(60) },
      { x: px(170),   y: height , w: px(80), h: py(25) },
    ],
    //level6
    [
      { x: px(0), y: height - py(25), w: px(400), h: py(25) }, 
      {x: px(500), y: height - py(100), w: px(50), h: py(100) },
      {x: px(600), y: height - py(200), w: px(50), h: py(200) },
      {x: px(290), y: py(400), w: px(310), h: py(25) },
      {x: px(320), y: py(347), w: px(260), h: py(25) },
      {x: px(580), y: py(322), w: px(320), h: py(25) },
      {x: px(725), y: py(250), w: px(125), h: py(25) },
      {x: px(260), y: py(200), w: px(100), h: px(51) },
      {x:px(120), y: py(340), w: px(50), h: py(25) },
      {x:px(170), y: py(180), w: px(15), h: py(185) },
      {x:px(600), y: py(70), w: px(275), h: py(25) },

      { x: px(0),   y: py(0),  w: px(25),  h: height + py(20) }, //left wall
      { x: width - px(25), y: py(0), w: px(25), h: height + py(20) }, //right wall
    ],
    //level7
    [
      { x: px(0), y: height - py(25), w: px(300), h: py(25) }, 
      { x: px(350), y: height - py(125), w: px(50), h: py(125) }, 
      { x: px(470), y: height - py(25), w: px(80), h: py(25) },
      { x: px(600), y: height + py(5), w: px(50), h: py(25) },
      { x: px(650), y: height - py(25), w: px(225), h: py(25) },
      { x: -px(135), y: py(450), w: px(125), h: py(25) },
      { x: px(500), y: py(275), w: px(100), h: py(25) },
      { x: width-px(125), y: py(440), w: px(125), h: py(25) },
      { x: px(125), y: py(200), w: px(50), h: py(25) },
      { x: px(100), y: py(0), w: px(90), h: py(25) },
      { x: px(250), y: py(75), w: px(50), h: py(25) },
      { x: px(350), y: py(150), w: px(50), h: py(25) },
      { x: px(490), y: py(0), w: px(120), h: py(25) },
      { x: px(650), y: py(75), w: px(50), h: py(25) },
      { x: px(740), y: py(0), w: px(135), h: py(25) },

      { x: px(0),   y: py(0),  w: px(25),  h: height + py(20) }, //left wall
      { x: width - px(25), y: py(0), w: px(25), h: height + py(20) }, //right wall
    ],
    //level8
    [
      { x: px(0), y: height - py(25), w: px(250), h: py(25) },
      { x: px(450), y: py(400), w: px(100), h:py(25)},
      { x: px(660), y: height - py(25), w: px(175), h:py(25)},
      {x: px(1100), y: py(100), w: px(175), h:py(25)},
      {x: px(1375), y: py(0), w: px(400), h: py(200)},
      {x: px(1350), y: py(225), w: px(485), h: py(25)},
      {x: px(1850), y: py(425), w: px(475), h: py(25)},
      {x: px(2075), y: py(0), w: px(50), h: py(25)},
      {x: px(2125), y: py(400), w: px(475), h: py(50)},
      {x: px(2800), y: py(150), w: px(150), h:py(25)},
      {x: px(2900), y: py(0), w: px(250), h:py(25)},
      {x: px(3250), y: py(100), w:px(350), h:py(25)},
      {x: px(3650), y: py(150), w:px(100), h:py(25)},
      {x: px(3800), y: py(0), w:px(200), h:py(25)},
      {x: px(4000), y: height - py(25), w:px(200), h:py(25)}, //last chase wall
      {x: px(4400), y: height - py(125), w:px(80), h:py(125)},
      {x: px(4750), y : py(375), w: px(175), h: py(325)}
      
    ],
  ];
  for (let level of walls) {
    for (let wall of level) {
        wall.speed = {
        x: 0,
        y: 0
        };
    }
}

  gamestate = 0;

  playbutton    = { x: px(350), y: py(450), w: px(200), h: py(100) };
  howtoplaybutton = { x: px(550), y: py(250), w: px(120), h: py(60) };
  returnbutton  = { x: px(10),  y: py(10),  w: px(75), h: py(25) };

  levelsbuttons = [
    { x: px(50),  y: py(70),  w: px(50), h: py(50), number: 0, accessibility: true },
    { x: px(110), y: py(190), w: px(50), h: py(50), number: 1, accessibility: false },
    { x: px(300), y: py(250), w: px(50), h: py(50), number: 2, accessibility: false },
    { x: px(580), y: py(280), w: px(50), h: py(50), number: 3, accessibility: false },
    { x: px(810), y: py(200), w: px(50), h: py(50), number: 4, accessibility: false },
    { x: px(780), y: py(360), w: px(50), h: py(50), number: 5, accessibility: false },
    { x: px(560), y: py(480), w: px(50), h: py(50), number: 6, accessibility: false },
    { x: px(310), y: py(430), w: px(50), h: py(50), number: 7, accessibility: false },
    { x: px(140), y: py(570), w: px(50), h: py(50), number: 8, accessibility: false },
  ];
  for (let i = 0; i <= highestlevel; i++) {
    if (levelsbuttons[i]) levelsbuttons[i].accessibility = true;
  }

  doors = [
    { x: px(700), y: py(35),         w: px(40), h: py(40) },
    { x: px(700), y: py(635),        w: px(40), h: py(40) },
    { x: px(830), y: height + py(50),w: px(40), h: py(40) },
    { x: px(830), y: height + py(50),w: px(40), h: py(40) },
    { x: px(690), y: height - py(65),w: px(40), h: py(40) },
    { x: px(210), y: height ,w: px(40), h: py(40) },
    { x: px(600), y: py(30),w: px(40), h: py(40) },
    { x: width - px(80), y: py(25),w: px(40), h: py(40) },
    { x: px(4850), y: py(335),w: px(40), h: py(40) },
  ];

  doorkeys = [
    { x: px(50),        y: py(635), w: px(20), h: py(30), state: "uncollected" },
    { x: width + px(50),y: py(315), w: px(20), h: py(30), state: "uncollected" },
    { x: px(830),       y: py(555), w: px(20), h: py(30), state: "uncollected" },
    { x: px(125),       y: py(535), w: px(20), h: py(30), state: "uncollected" },
    { x: px(675),       y: py(100), w: px(20), h: py(30), state: "uncollected" },
    { x: width - px(40),y: height - py(60), w: px(20), h: py(30), state: "uncollected" },
    { x: px(730),y: py(210), w: px(20), h: py(30), state: "uncollected" },
    { x: width - px(60),y: height-py(80), w: px(20), h: py(30), state: "uncollected" },
    { x: width + px(50),y: py(315), w: px(20), h: py(30), state: "uncollected" },
  ];

  saws = [
    //level 0
    [],
    //level1
    [
      { x: px(550), y: height + py(200), d: py(200), speed: { x: 0, y: 0 } },
      { x: px(400), y: height + py(300), d: py(400), speed: { x: 0, y: 0 } },
      { x: px(770), y: height + py(40),  d: py(60),  speed: { x: 0, y: 0 } },
      { x: px(570), y: height + py(300), d: py(60),  speed: { x: 0, y: 0 } },
      { x: px(370), y: height + py(300), d: py(60),  speed: { x: 0, y: 0 } },
    ],
    //level2
    [
      { x: px(450), y: py(400),    d: px(100), speed: { x: 0, y: 0 } },
      { x: px(650), y: height,     d: px(100), speed: { x: 0, y: 0 } },
    ],
    //level3
    [
      { x: px(-50), y: py(75),          d: py(95), speed: { x: 0, y: 0 } },
      { x: px(450), y: height + py(50), d: py(30), speed: { x: 0, y: 0 } },
      { x: px(650), y: height + py(50), d: py(30), speed: { x: 0, y: 0 } },
      { x: px(750), y: height + py(50), d: py(30), speed: { x: 0, y: 0 } },
      { x: px(850), y: height + py(50), d: py(30), speed: { x: 0, y: 0 } },
      { x: px(200), y: height + py(50), d: py(40), speed: { x: 0, y: 0 } },
      { x: px(300), y: height + py(50), d: py(40), speed: { x: 0, y: 0 } },
      { x: px(400), y: height + py(50), d: py(40), speed: { x: 0, y: 0 } },
      { x: px(500), y: height + py(50), d: py(40), speed: { x: 0, y: 0 } },
      { x: px(600), y: height + py(50), d: py(40), speed: { x: 0, y: 0 } },
      { x: px(150), y: height + py(50), d: py(10), speed: { x: 0, y: 0 } },
      { x: px(250), y: height + py(50), d: py(10), speed: { x: 0, y: 0 } },
      { x: px(350), y: height + py(50), d: py(10), speed: { x: 0, y: 0 } },
      { x: px(450), y: height + py(50), d: py(10), speed: { x: 0, y: 0 } },
      { x: px(550), y: height + py(50), d: py(10), speed: { x: 0, y: 0 } },
      { x: px(25),  y: height + py(50), d: py(12), speed: { x: 0, y: 0 } },
      { x: px(50),  y: height + py(50), d: py(12), speed: { x: 0, y: 0 } },
    ],
    //level4
    [
      { x: px(770),   y: py(175),        d: px(45), speed: { x: 0, y: 0 } },
      { x: px(35),    y: height + py(50),d: px(45), speed: { x: 0, y: 0 } },
      { x: px(130),   y: height + py(50),d: px(45), speed: { x: 0, y: 0 } },
      { x: px(290),   y: height + py(50),d: px(45), speed: { x: 0, y: 0 } },
      { x: px(372.5), y: height + py(50),d: px(45), speed: { x: 0, y: 0 } },
      { x: -100,   y: height - py(60),d: py(120), speed: { x: 0, y: 0 } },
    ],
    //level 5
    [{ x: px(340), y: height+py(80), d: py(65), speed: { x: 0, y: 0 } }],
    //level 6
    [
      { x: px(400), y: -py(20), d: py(40), speed: { x: 0, y: 0 } },
      { x: px(425), y: -py(20), d: py(40), speed: { x: 0, y: 0 } },
      { x: px(450), y: -py(20), d: py(40), speed: { x: 0, y: 0 } },
      { x: px(475), y: -py(20), d: py(40), speed: { x: 0, y: 0 } },
      { x: px(500), y: -py(20), d: py(40), speed: { x: 0, y: 0 } },
      { x: px(525), y: -py(20), d: py(40), speed: { x: 0, y: 0 } },
      { x: px(550), y: -py(20), d: py(40), speed: { x: 0, y: 0 } },
      { x: px(575), y: -py(20), d: py(40), speed: { x: 0, y: 0 } },
      { x: px(310), y: py(200), d: px(100), speed: { x: 0, y: 0 } },
      
    ],
    //level 7
    [
      {x: px(280), y: height -py(25), d: px(40), speed: { x: 0, y: 0 } },
      {x: width + px(10) + py(12.5), y: py(305), d: py(40), speed: { x: 0, y: 0 } },
      {x: px(550) , y: -py(25), d: px(40), speed: { x: 0, y: 0 } },
    ],
    //level 8
    [
      {x: px(540), y: py(400), d: px(0), speed: { x: 0, y: 0 } },
      {x: px(1400), y: py(200), d: px(5), speed: { x: 0, y: 0 } },
      {x: px(1475), y: py(225), d: px(5), speed: { x: 0, y: 0 } },
      {x: px(1550), y: py(200), d: px(5), speed: { x: 0, y: 0 } },
      {x: px(1625), y: py(225), d: px(5), speed: { x: 0, y: 0 } },
      {x: px(1700), y: py(200), d: px(5), speed: { x: 0, y: 0 } },
      {x: px(2300), y: py(400), d: px(10), speed: { x: 0, y: 0 } },
      {x: px(2400), y: py(400), d: px(10), speed: { x: 0, y: 0 } },
    ],
  ];

  steps = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  tps = [
    //level0
    [],
    //level1
    [
      { x: px(250), y: py(-20), w: px(40), h: py(40), able: true, couple: 1 },
      { x: px(750), y: py(-20), w: px(40), h: py(40), able: true, couple: 1 },
      { x: px(250), y: py(-20), w: px(40), h: py(40), able: true, couple: 2 },
      { x: px(600), y: py(-20), w: px(40), h: py(40), able: true, couple: 2 },
    ],
    //level2
    [
      { x: px(40), y: height, w: px(40), h: py(40), able: true, couple: 1 },
      { x: px(40), y: height, w: px(40), h: py(40), able: true, couple: 1 },
    ],
    //level3
    [],
    //level4
    [
      { x: px(80),    y: height, w: px(40), h: py(40), able: true, couple: 1 },
      { x: px(272.5), y: height, w: px(40), h: py(40), able: true, couple: 1 },
    ],
    //level5
    [
      { x: px(340), y: -py(100), w: px(40), h: py(40), able: true, couple: 1 },
      { x: px(270), y: height+py(100), w: px(40), h: py(40), able: true, couple: 1 },
    ],
    //level6
    [
      { x: px(70), y: py(240), w: px(40), h: py(40), able: true, couple: 1 },
      { x: px(820), y: py(20), w: px(40), h: py(40), able: true, couple: 1 },
    ],
    //level7
    [
      { x: -px(45), y: py(380), w: px(40), h: py(40), able: true, couple: 1 },
      { x: width, y: height-py(80), w: px(40), h: py(40), able: true, couple: 1 },
    ],
    //level8
    [
      { x: px(1100), y: py(650), w: px(40), h: py(40), able: true, couple: 1 },
      { x: px(1100), y: py(40), w: px(40), h: py(40), able: true, couple: 1 },
      { x: px(3000), y: py(650), w: px(40), h: py(40), able: true, couple: 2 },
      { x: px(2800), y: py(100), w: px(40), h: py(40), able: true, couple: 2 },
    ],
  ];

  notp = 0;

  jumpers = [
    //level0
    [],
    //level1
    [],
    //level2
    [
      { x: px(425), y: height, w: px(50), h: py(50) },
      { x: px(225), y: height, w: px(50), h: py(50) },
      { x: px(625), y: height, w: px(50), h: py(50) },
    ],
    //level3
    [],
    //level4
    [
      { x: px(190), y: height, w: px(40), h: py(40) },
      { x: px(350), y: height, w: px(40), h: py(40) },
    ],
    //level5
    [
      { x: px(800), y: py(300), w: px(40), h: py(40) },
      { x: px(600), y: py(110), w: px(40), h: py(40) },
    ],
    //level6
    [],
    //level7
    [{ x: px(400), y: py(375), w: px(40), h: py(40) },],
    //level8
    [
      { x: px(310), y: py(550), w: px(40), h: py(40) },
      { x: px(2650), y: py(600), w: px(40), h: py(40) },
      { x: px(2850), y: py(500), w: px(40), h: py(40) },
      { x: px(4600), y: py(475), w: px(40), h: py(40) }
    ],
  ];

  sizebuttons = [
    //level0
    [],
    //level1
    [],
    //level2
    [],
    //level3
    [
      { x: px(750), y: py(50),  w: px(60), h: py(23), type: "small" },
      { x: px(665), y: py(200), w: px(60), h: py(23), type: "big" },
      { x: px(50),  y: py(200), w: px(60), h: py(23), type: "normal" },
      { x: px(375), y: py(350), w: px(60), h: py(23), type: "big" },
      { x: px(815), y: py(450), w: px(60), h: py(23), type: "small" },
      { x: px(50),  y: py(650), w: px(60), h: py(23), type: "normal" },
      { x: px(200), y: py(550), w: px(60), h: py(23), type: "small" },
    ],
    //level4
    [],
    //level5
    [],
    //level6
    [
      { x: px(540), y: py(375),  w: px(60), h: py(23), type: "small" },
      { x: px(320), y: py(324),  w: px(60), h: py(23), type: "normal" },
    ],
    //level7
    [],
    //level8
    [
      { x: px(1210), y: py(75),  w: px(60), h: py(23), type: "small" },
      { x: px(1775), y: py(200),  w: px(60), h: py(23), type: "big" },
      { x: px(2500), y: py(375),  w: px(60), h: py(23), type: "normal" },
    ],
  ];

  transformations = [false, false, false, false, false];

 wreckingballs = [
  //level 0
  [],
  //level 1
  [],
  //level 2
  [],
  //level 3
  [
    {
      firstx: px(475), firsty: height,
      secondx: px(475), secondy: height + py(50), 
      d: py(75), state: "inactive",
      ropeLength: py(50),
      restAngle: Math.PI / 2,   
      amplitude: 1.2,           
      frequency: 0.03,
      time: 0,
    },
    {
      firstx: px(460), firsty: height,
      secondx: px(460), secondy: height + py(50),
      d: py(25), state: "inactive",
      ropeLength: py(50),
      restAngle: Math.PI / 2,
      amplitude: 0.8,
      frequency: 0.035,
      time: 0,
    },
    {
      firstx: px(560), firsty: height,
      secondx: px(560), secondy: height + py(50),
      d: py(25), state: "inactive",
      ropeLength: py(50),
      restAngle: Math.PI / 2,
      amplitude: 0.8,
      frequency: 0.035,
      time: Math.PI,           
    },
  ],
  //level 4
  [
    {
      firstx: px(640), firsty: height,
      secondx: px(640), secondy: height + py(50),
      d: py(50), state: "inactive",
      ropeLength: py(50),
      restAngle: Math.PI / 2,
      amplitude: 1.0,
      frequency: 0.030,
      time: 0,
    },
  ],
   //level 5
  [
    {
      firstx: px(440), firsty: py(225),
      secondx: px(440), secondy: py(350),
      d: py(65), state: "inactive",
      ropeLength: py(150),
      restAngle: Math.PI / 2,
      amplitude: 1.0,
      frequency: 0.030,
      time: 0,
    }
  ],
  //level 6
  [],
  //level 7
  [],
  //level 8
  [
    {
      firstx: px(2100), firsty: py(25),
      secondx: px(2100), secondy: py(350),
      d: py(100), state: "inactive",
      ropeLength: py(325),
      restAngle: Math.PI / 2,
      amplitude: 1.0,
      frequency: 0.04,
      time: 0,
    }
  ],
];

  timego = "untrue";

  boosters = [
    //level0
    [],
    //level1
    [],
    //level2
    [],
    //level3
    [],
    //level4
    [
      { x: px(835), y: height, w: px(60), h: py(25), type: "right" },
      { x: px(105), y: height, w: px(60), h: py(25), type: "right" },
      { x: px(265), y: height, w: px(60), h: py(25), type: "right" },
      { x: px(425), y: height, w: px(60), h: py(25), type: "right" },
      { x: px(585), y: height, w: px(60), h: py(25), type: "right" },
    ],
    //level5
    [],
    //level6
    [],
    //level7
    [
      { x: width + px(10), y: py(345), w: py(25), h: px(60), type: "up" },
      { x: px(125), y: py(225), w: px(60), h: py(25), type: "right" }
    ],
    //level8
    [
      { x: px(1150), y: py(75), w: px(60), h: py(25), type: "right" },
      { x: px(3690), y: py(175), w: px(60), h: py(25), type: "left" },
      { x: px(3840), y: py(25), w: px(60), h: py(25), type: "left" }
    ],
  ];

  arrowthrowers = [
    //level0
    [],
    //level1
    [],
    //level2
    [],
    //level3
    [],
    //level4
    [
      { x: px(177.5), y: py(380), w: px(10), h: py(10), arrowx: [], arrowy: [], arroww: [], arrowh: [], arrowdirection: [], arrowstate: [], type: "left",  state: "active",   countdown: 0 },
      { x: px(717.5), y: py(330), w: px(10), h: py(10), arrowx: [], arrowy: [], arroww: [], arrowh: [], arrowdirection: [], arrowstate: [], type: "right", state: "inactive", countdown: 0 },
      { x: px(75),    y: py(250), w: px(10), h: py(10), arrowx: [], arrowy: [], arroww: [], arrowh: [], arrowdirection: [], arrowstate: [], type: "down",  state: "inactive", countdown: 0 },
      { x: px(795),   y: py(415), w: px(10), h: py(10), arrowx: [], arrowy: [], arroww: [], arrowh: [], arrowdirection: [], arrowstate: [], type: "up",    state: "inactive", countdown: 0 },
    ],
    //level5 
    [{ x: width - px(10), y: py(40), w: px(10), h: py(10), arrowx: [], arrowy: [], arroww: [], arrowh: [], arrowdirection: [], arrowstate: [], type: "left",  state: "active",   countdown: 0 },],
    //level6
    [{ x: px(25), y: py(389), w: px(10), h: py(10), arrowx: [], arrowy: [], arroww: [], arrowh: [], arrowdirection: [], arrowstate: [], type: "right",  state: "inactive",   countdown: 0 }],
    //level7
    [],
    //level8
    [
      { x: px(3250), y: py(125), w: px(10), h: py(10), arrowx: [], arrowy: [], arroww: [], arrowh: [], arrowdirection: [], arrowstate: [], type: "right",  state: "inactive",   countdown: 0 }
    ],
  ];

  gravitydirection = "down";
  gravitychangers = [
    //level0
    [],
    //level1
    [],
    //level2
    [],
    //level3
    [],
    //level4
    [],
    //level5
    [
      { x: px(100), y: py(130), d: py(30), direction: "up" },
      { x: px(740), y: py(100), d: py(30), direction: "right" },
      { x: width - px(30), y: height - py(90), d: py(30), direction: "left" },
      { x: px(660), y: py(550), d: py(30), direction: "right" },
      { x: px(570), y: height + py(30), d: py(30), direction: "left" },
      { x: px(355), y:  -py(30), d: py(30), direction: "up" },
      { x: px(250), y:  height + py(50), d: py(30), direction: "left" },
      { x: px(190), y:  height + py(50), d: py(30), direction: "down" }
    ],
    //level6
    [],
    //level7
    [{ x: px(50), y: height + py(30), d: py(30), direction: "up" }],
    //level8
    [
      { x: px(2950), y: py(125), d: py(30), direction: "up" },
      { x: px(3150), y: py(50), d: py(30), direction: "left"},
      { x: px(3955), y: py(70), d: py(30), direction: "down"}
    ],
  ]

  firethrowers = [
    //level0
    [],
     //level1
    [],
     //level2
    [],
     //level3
    [],
    //level4
    [],
     //level5
    [],
    //level6
    [{ 
      x: px(100),      
      y: py(660),      
      thickness: px(30),  
      maxlength: py(100), 
      currentlength: 0,
      direction: "up",
      interval: 750,     
      timer: 40,
      countdown: 0,
      state: "active" 
    },
    { 
      x: px(150),      
      y: py(660),      
      thickness: px(30),  
      maxlength: py(100), 
      currentlength: 0,
      direction: "up",
      interval: 750,      
      timer: 30,
      countdown: 0,
      state: "active" 
    },
    { 
      x: px(200),      
      y: py(660),      
      thickness: px(30),  
      maxlength: py(100), 
      currentlength: 0,
      direction: "up",
      interval: 750,     
      timer: 20,
      countdown: 0,
      state: "active" 
    },
    { 
      x: px(250),      
      y: py(660),      
      thickness: px(30),  
      maxlength: py(100), 
      currentlength: 0,
      direction: "up",
      interval: 750,     
      timer: 10,
      countdown: 0,
      state: "active" 
    },
    { 
      x: px(300),      
      y: py(660),      
      thickness: px(30),  
      maxlength: py(100), 
      currentlength: 0,
      direction: "up",
      interval: 750,     
      timer: 0,
      countdown: 0,
      state: "active" 
    },
    { 
      x: px(340),      
      y: py(375),      
      thickness: px(10),  
      maxlength: py(20), 
      currentlength: 0,
      direction: "down",
      interval: 500,     
      timer: 0,
      countdown: 0,
      state: "active" 
    },
    { 
      x: px(380),      
      y: py(375),      
      thickness: px(10),  
      maxlength: py(20), 
      currentlength: 0,
      direction: "down",
      interval: 500,     
      timer: 0,
      countdown: 0,
      state: "active" 
    },
    { 
      x: px(420),      
      y: py(375),      
      thickness: px(10),  
      maxlength: py(20), 
      currentlength: 0,
      direction: "down",
      interval: 500,      
      timer: 0,
      countdown: 0,
      state: "active" 
    }],
    //level7
    [
      { 
      x: width-px(35),      
      y: height-py(100),      
      thickness: py(60),  
      maxlength: px(60), 
      currentlength: 0,
      direction: "left",
      interval: 1000,     
      timer: 0,
      countdown: 0,
      state: "active" 
    },
    ],
   //level8
    [
      { 
      x: px(680),      
      y: py(660),      
      thickness: px(30),  
      maxlength: py(100), 
      currentlength: 0,
      direction: "up",
      interval: 1000,     
      timer: 0,
      countdown: 0,
      state: "active" 
    },
    { 
      x: px(740),      
      y: py(660),      
      thickness: px(30),  
      maxlength: py(100), 
      currentlength: 0,
      direction: "up",
      interval: 1000,     
      timer: 0,
      countdown: 0,
      state: "active" 
    },
    { 
      x: px(3500),      
      y: py(135),      
      thickness: px(30),  
      maxlength: py(100), 
      currentlength: 0,
      direction: "down",
      interval: 1000,     
      timer: 0,
      countdown: 0,
      state: "active" 
    },
    ],
  ]

  ropes = [
    //level 0
    [],
    //level 1
    [],
    //level 2
    [],
    //level 3
    [],
    //level 4
    [],
    //level 5
    [],
    //level 6
    [
        {
            x: px(750),        
            y: py(425),         
            w: px(8),          
            length: py(150),   
            angle: Math.PI/2,  
            angularVel: 0.01,  
            state: "hanging"   
        },
        {
            x: px(475),        
            y: py(150),         
            w: px(8),          
            length: py(125),   
            angle: Math.PI/2,  
            angularVel: 0.01,  
            state: "hanging"   
        }
    ],
    //level 7
    [
      {
            x: px(225),        
            y: py(275),         
            w: px(8),          
            length: py(125),   
            angle: Math.PI/2,  
            angularVel: 0.01,  
            state: "hanging"   
        }
    ],
    //level 8
    [
      {
            x: px(925),        
            y: py(425),         
            w: px(8),          
            length: py(125),   
            angle: Math.PI/2,  
            angularVel: 0.01,  
            state: "hanging"   
        },
      {
            x: px(4300),        
            y: py(450),         
            w: px(8),          
            length: py(125),   
            angle: Math.PI/2,  
            angularVel: 0.01,  
            state: "hanging"   
        }
    ]
  ];

mummies = [
    //level0
    [],
    //level1
    [],
    //level2
    [],
    //level3
    [],
    //level4
    [],
    //level5
    [],
    //level6
    [],
    //level7
    [
      { x: width, y: height, w: px(10), h: py(40), delayFrames: 120, state: "active" },
      { x: width, y: height, w: px(10), h: py(40), delayFrames: 60, state: "inactive" },
      { x: width, y: height, w: px(10), h: py(40), delayFrames: 30, state: "inactive" },
      { x: width, y: height, w: px(10), h: py(40), delayFrames: 20, state: "inactive" },
      { x: width, y: height, w: px(10), h: py(40), delayFrames: 15, state: "inactive" },
      { x: width, y: height, w: px(10), h: py(40), delayFrames: 10, state: "inactive" }
    ],
    //level8
    [
      { x: width, y: height, w: px(10), h: py(40), delayFrames: 120, state: "inactive" },
      { x: width, y: height, w: px(10), h: py(40), delayFrames: 90, state: "inactive" },
      { x: width, y: height, w: px(10), h: py(40), delayFrames: 60, state: "inactive" },
      { x: width, y: height, w: px(10), h: py(40), delayFrames: 30, state: "inactive" },
    ],
  ];

  mummyHistory = [[], [], [], [], [], [], [], [], []];

  CHASE_SPEED = -px(4);
  translatedDistance = 0;
  chaseState = "running";
}

function draw() {
  background(250, 240, 205);
  if (gamestate == 0 || gamestate == 1 || gamestate == 2) {
    menu();
  }
  if (gamestate == 3 || gamestate == 4) {
    if (gamestate == 3) {
      movement();
    }
    fill("#088F8F");
    stroke(6, 100, 100);
    strokeWeight(px(2));
    rect(doors[levelactive].x, doors[levelactive].y, doors[levelactive].w, doors[levelactive].h, px(3));
    noStroke();

    if (doorkeys[levelactive].state == "uncollected") {
      fill("#FFDB58");
      stroke(150, 120, 20);
      strokeWeight(px(1));
      rect(doorkeys[levelactive].x, doorkeys[levelactive].y, doorkeys[levelactive].w, doorkeys[levelactive].h, px(3));
      noStroke();
    }

    stroke(0);
    strokeWeight(1);
    fill("grey");
    for (let saw of saws[levelactive]) {
      circle(saw.x, saw.y, saw.d);
    }
    fill("blue");
    for (let tp of tps[levelactive]) {
      rect(tp.x, tp.y, tp.w, tp.h, px(3));
    }
    fill("red");
    for (let jumper of jumpers[levelactive]) {
      rect(jumper.x, jumper.y, jumper.w, jumper.h, px(3));
    }
    fill("black");
    for (let sizebutton of sizebuttons[levelactive]) {
      rect(sizebutton.x, sizebutton.y, sizebutton.w, sizebutton.h, px(3));
      fill("white");
      textAlign(CENTER, CENTER);
      textSize(py(20));
      let cx = sizebutton.x + sizebutton.w / 2;
      let cy = sizebutton.y + sizebutton.h / 2;
      if (sizebutton.type == "normal") { text("N", cx, cy); }
      if (sizebutton.type == "big")    { text("B", cx, cy); }
      if (sizebutton.type == "small")  { text("S", cx, cy); }
      fill("black");
    }
    fill("grey");
    for (let wreckingball of wreckingballs[levelactive]) {
      stroke("red");
      line(wreckingball.firstx, wreckingball.firsty, wreckingball.secondx, wreckingball.secondy);
      stroke(0);
      circle(wreckingball.secondx, wreckingball.secondy, wreckingball.d);
    }
    for (let booster of boosters[levelactive]) {
      fill("orange");
      rect(booster.x, booster.y, booster.w, booster.h, px(3));
      fill("white");
      textAlign(CENTER, CENTER);
      textSize(py(20));
      let bcx = booster.x + booster.w / 2;
      let bcy = booster.y + booster.h / 2;
      if (booster.type == "right") { text("→", bcx, bcy); }
      if (booster.type == "left")  { text("←", bcx, bcy); }
      if (booster.type == "up")    { text("↑", bcx, bcy); }
      if (booster.type == "down")  { text("↓", bcx, bcy); }
    }
    for (let arrowthrower of arrowthrowers[levelactive]) {
      fill("white");
      if (arrowthrower.type == "up") {
        circle(arrowthrower.x + arrowthrower.w / 2, arrowthrower.y, py(10));
      } else if (arrowthrower.type == "down") {
        circle(arrowthrower.x + arrowthrower.w / 2, arrowthrower.y + arrowthrower.h, py(10));
      } else if (arrowthrower.type == "left") {
        circle(arrowthrower.x, arrowthrower.y + arrowthrower.h / 2, py(10));
      } else if (arrowthrower.type == "right") {
        circle(arrowthrower.x + arrowthrower.w, arrowthrower.y + arrowthrower.h / 2, py(10));
      }
      fill("black");
      rect(arrowthrower.x, arrowthrower.y, arrowthrower.w, arrowthrower.h, px(3));
      fill("cyan");
      for (let i = 0; i < arrowthrower.arrowx.length; i++) {
        if (arrowthrower.arrowstate[i] == "good") {
          rect(arrowthrower.arrowx[i], arrowthrower.arrowy[i], arrowthrower.arroww[i], arrowthrower.arrowh[i], px(3));
        }
      }
    }
    for (let gravitychanger of gravitychangers[levelactive]) {
      fill("purple");
      circle(gravitychanger.x, gravitychanger.y, gravitychanger.d);
      fill("white");
      textAlign(CENTER, CENTER);
      textSize(py(20));
      if (gravitychanger.direction == "right") { text("→", gravitychanger.x, gravitychanger.y); }
      if (gravitychanger.direction == "left")  { text("←", gravitychanger.x, gravitychanger.y); }
      if (gravitychanger.direction == "up")    { text("↑", gravitychanger.x, gravitychanger.y); }
      if (gravitychanger.direction == "down")  { text("↓", gravitychanger.x, gravitychanger.y); }
    }
    for (let firethrower of firethrowers[levelactive]) {
      if (firethrower.direction == "up") {
        fill('black');
        rect(firethrower.x , firethrower.y , firethrower.thickness, px(10));
      }else if (firethrower.direction == "down") {
        fill('black');
        rect(firethrower.x , firethrower.y - px(10), firethrower.thickness, px(10));
      }else if (firethrower.direction == "left") {
        fill('black');
        rect(firethrower.x , firethrower.y, px(10), firethrower.thickness);
      }else if (firethrower.direction == "right") {
        fill('black');
        rect(firethrower.x - px(10) , firethrower.y, px(10), firethrower.thickness);
      }

    if (firethrower.state !== "active" || firethrower.currentlength <= 0) continue;
    fill(255, 80, 0);
    if (firethrower.direction == "up") {
        rect(firethrower.x, firethrower.y - firethrower.currentlength, firethrower.thickness, firethrower.currentlength);
        fill(255, 200, 0);
        rect(firethrower.x + firethrower.thickness * 0.25,firethrower.y - firethrower.currentlength * 1.2,firethrower.thickness * 0.5,firethrower.currentlength * 0.4);
    }
    else if (firethrower.direction == "down") {
        rect(firethrower.x, firethrower.y, firethrower.thickness, firethrower.currentlength);
        fill(255, 200, 0);
        rect(firethrower.x + firethrower.thickness * 0.25,firethrower.y + firethrower.currentlength * 0.8,firethrower.thickness * 0.5,firethrower.currentlength * 0.4);
    }
    else if (firethrower.direction == "left") {
        rect(firethrower.x - firethrower.currentlength, firethrower.y, firethrower.currentlength, firethrower.thickness);
        fill(255, 200, 0);
        rect(firethrower.x - firethrower.currentlength * 1.2,firethrower.y + firethrower.thickness * 0.25,firethrower.currentlength * 0.4,firethrower.thickness * 0.5);
    }
    else if (firethrower.direction == "right") {
        rect(firethrower.x, firethrower.y, firethrower.currentlength, firethrower.thickness);
        fill(255, 200, 0);
        rect(firethrower.x + firethrower.currentlength * 0.8,firethrower.y + firethrower.thickness * 0.25,firethrower.currentlength * 0.4,firethrower.thickness * 0.5);
    }
  }

  push(); //saves current drawing settings
  for (let rope of ropes[levelactive]) { //formulas based on geometry of the figure, using the angle 90 + angle between rope and the vertical axis (oriented clockwise)
      let tipX = rope.x + rope.w/2 + Math.cos(rope.angle) * rope.length;
      let tipY = rope.y            + Math.sin(rope.angle) * rope.length;

      stroke("brown");
      strokeWeight(rope.w);
      line(rope.x + rope.w/2, rope.y, tipX, tipY);  
      
      // anchor point
      fill("gray");
      noStroke();
      circle(rope.x + rope.w/2, rope.y, rope.w * 2);
  }
  pop(); //restores previous drawing settings

  push();
  stroke(90, 70, 40);
  strokeWeight(px(1));
  for (let mummy of mummies[levelactive]) {
    if (mummy.state == "active") {
      fill(200, 180, 140);
      rect(mummy.x, mummy.y, mummy.w, mummy.h, px(3));
      // bandage stripes
      stroke(140, 110, 80);
      strokeWeight(px(1));
      for (let s = 1; s < 4; s++) {
        let sy = mummy.y + (mummy.h / 4) * s;
        line(mummy.x, sy, mummy.x + mummy.w, sy);
      }
    }
  }
  pop();

    if (gamestate == 3) {
      fill("green");
      rect(player[levelactive].x, player[levelactive].y, player[levelactive].w, player[levelactive].h);
    }
    levels();
  }
  if (gamestate == 3 || gamestate == 4) { death(); }
  if (gamestate == 3 || gamestate == 5) { pause(); }
  if (gamestate == 3 || gamestate == 6) { win(); }
}

function menu() {
  if (gamestate == 0) {
    background("#FFDB58");

    noStroke();
    fill(60, 45, 10);
    textAlign(CENTER, CENTER);
    textFont('Georgia');
    textSize(py(60));
    text("Temple crumble", px(OW / 2), py(200));
    textSize(py(20));
    text("By Christophe Moawad", px(OW / 2), py(250))

    // play button
    let playHover = mouseX > playbutton.x && mouseX < playbutton.x + playbutton.w &&
                     mouseY > playbutton.y && mouseY < playbutton.y + playbutton.h;
    stroke(6, 100, 100);
    strokeWeight(px(3));
    fill(playHover ? "#0AA8A8" : "#088F8F");
    rect(playbutton.x, playbutton.y, playbutton.w, playbutton.h, px(12));
    noStroke();
    fill(255);
    textFont('Georgia');
    textSize(py(40));
    text("ENTER", playbutton.x + playbutton.w / 2, playbutton.y + playbutton.h / 2);

    if (playHover && mouseIsPressed) {
      gamestate = 1;
      levelactive = 0;
    }

    // how to play button
    let helpHover = mouseX > howtoplaybutton.x && mouseX < howtoplaybutton.x + howtoplaybutton.w && mouseY > howtoplaybutton.y && mouseY < howtoplaybutton.y + howtoplaybutton.h;
    stroke(6, 100, 100);
    strokeWeight(px(3));
    fill(helpHover ? "#0AA8A8" : "#088F8F");
    rect(howtoplaybutton.x, howtoplaybutton.y, howtoplaybutton.w, howtoplaybutton.h, px(12));
    noStroke();
    fill(255);
    textFont('Georgia');
    textSize(py(40));
    text("?", howtoplaybutton.x + howtoplaybutton.w / 2, howtoplaybutton.y + howtoplaybutton.h / 2);

    if (helpHover && mouseIsPressed) {
      gamestate = 2;
    }

    textFont('Helvetica');
  }

  if (gamestate == 1) {
    background("#FFDB58");

    // faint trail connecting the levels in play order
    noFill();
    stroke(8, 143, 143, 90);
    strokeWeight(px(3));
    beginShape();
    for (let i = 0; i < levelsbuttons.length; i++) {
      vertex(levelsbuttons[i].x + levelsbuttons[i].w / 2, levelsbuttons[i].y + levelsbuttons[i].h / 2);
    }
    endShape();
    noStroke();
    fill(60, 45, 10);
    textAlign(CENTER, CENTER);
    textFont('Georgia');
    textSize(py(36));
    text("Select a level", px(OW / 2), py(35));
    textAlign(LEFT, BASELINE);
    textFont('Helvetica');

    for (let i = 0; i < levelsbuttons.length; i++) {
      let b = levelsbuttons[i];
      let cx = b.x + b.w / 2;
      let cy = b.y + b.h / 2;
      let r = b.w;
      let hovering = mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h;
      strokeWeight(px(3));
      if (b.accessibility == true) {
        stroke(6, 100, 100);
        fill(hovering ? "#0AA8A8" : "#088F8F");
      } else {
        stroke(100, 100, 95);
        fill("grey");
      }
      circle(cx, cy, r);
      noStroke();
      if (b.accessibility == true) {
        fill(255);
        textAlign(CENTER, CENTER);
        textFont('Georgia');
        textSize(py(28));
        text(b.number, cx, cy);
        textAlign(LEFT, BASELINE);
        textFont('Helvetica');
        if (hovering && mouseIsPressed) {
          gamestate = 3;
          levelactive = i;
          for (let arrowthrower of arrowthrowers[levelactive]) {
            arrowthrower.countdown = millis();
          }
        }
      } else {
        // simple padlock icon for locked levels
        push();
        noFill();
        stroke(255);
        strokeWeight(px(3));
        arc(cx, cy - r * 0.12, r * 0.35, r * 0.35, PI, TWO_PI);
        noStroke();
        fill(255);
        rectMode(CENTER);
        rect(cx, cy + r * 0.08, r * 0.4, r * 0.28, px(2));
        rectMode(CORNER);
        pop();
      }
    }
  }

  if (gamestate == 2) {
    function drawTopicBox(x, y, w, h, topic) {
      const [r, g, b] = topic.accent;
      fill(255, 250, 235);
      stroke(r, g, b);
      strokeWeight(px(2));
      rect(px(x), py(y), px(w), py(h), px(10));

      noStroke();
      fill(r, g, b);
      rect(px(x), py(y), px(w), py(44), px(10), px(10), 0, 0);

      fill(255);
      textFont('Georgia');
      textAlign(LEFT, CENTER);
      textSize(py(22));
      text(topic.title, px(x + 20), py(y + 22));

      fill(60, 45, 10);
      textFont('Helvetica');
      textAlign(LEFT, TOP);
      textSize(py(12));
      let lineY = y + 62;
      for (const line of topic.lines) {
        text(line, px(x + 10), py(lineY));
        lineY += 26;
      }
    }

    const topics = [
      {
        title: "Objective",
        lines: [
          "Collect the keys on your path.",
          "Once all keys are collected (no more keys appear),",
          "reach the door to unlock the next level."
        ],
        accent: [8, 143, 143] // teal, matches your button color
      },
      {
        title: "Movement",
        lines: [
          "Use the LEFT and RIGHT arrow keys to move if gravity is up or down. ",
          "Use the UP and DOWN arrow keys to move if gravity is left or right. ",
          "Use the SPACEBAR to jump. "
        ],
        accent: [184, 148, 44] // gold, matches the yellow background family
      },
      {
        title: "Hazards",
        lines: [
          "Saws: they may seem like simple circular saws, but they are quite deadly.",
          "Wreckingballs: moving in a deadly pendulum fashion.",
          "Arrowthrowers: periodically shoot arrows in a specific direction.",
          "Firethrowers: periodically emit fire in a specific direction.",
          "Mummies: they copy your every move, and if you touch them... let's just say you need to not hesitate!"
        ],
        accent: [184, 90, 50] // rust
      },
      {
        title: "Items",
        lines: [
          "Teleporters: transport the explorer from one teleporter to another. Be careful where they take you!",
          "Jumpers: lets the explorer jump when it reaches it, but be careful to rime your jumps well!",
          "Size buttons: change your size to small, normal, or big. This may benefit the explorer, but also harm him...",
          "Boosters: pushes the explorer in a specific direction. Be careful where you're going though!",
          "Ropes: the explorer can grab onto it by holding SPACEBAR, and swing using LEFT and RIGHT arrow keys. \n Release the SPACEBAR to let go.",
        ],
        accent: [107, 142, 35] // olive
      }
    ];

    push();
    background("#FFDB58");

    noFill();
    stroke("#088F8F");
    strokeWeight(px(3));
    rect(px(20), py(20), px(OW - 40), py(OH - 40), px(12));

    noStroke();
    fill(60, 45, 10);
    textAlign(CENTER, CENTER);
    textFont('Georgia');
    textSize(py(42));
    text("How to play", px(OW / 2), py(85));

    textFont('Georgia');
    textSize(py(16));
    fill(90, 70, 20);
    text("Don't forget you're entering a temple — there might be booby traps...", px(OW / 2), py(125));

    const cols = 2, rows = 2;
    const marginX = 60, marginY = 170, gap = 30;
    const boxW = (OW - marginX * 2 - gap) / cols;
    const boxH = (OH - marginY - 60 - gap) / rows;

    textAlign(LEFT, TOP);
    for (let i = 0; i < topics.length; i++) {
      const t = topics[i];
      const col = i % cols, row = Math.floor(i / cols);
      const bx = marginX + col * (boxW + gap);
      const by = marginY + row * (boxH + gap);
      drawTopicBox(bx, by, boxW, boxH, t);
    }
    pop();
  }

  if (gamestate == 1 || gamestate == 2) {
    let backHover = mouseX > returnbutton.x && mouseX < returnbutton.x + returnbutton.w && mouseY > returnbutton.y && mouseY < returnbutton.y + returnbutton.h;

    stroke(6, 100, 100);
    strokeWeight(px(3));
    fill(backHover ? "#0AA8A8" : "#088F8F");
    rect(returnbutton.x, returnbutton.y, returnbutton.w, returnbutton.h, px(8));
    noStroke();

    fill(255);
    textAlign(CENTER, CENTER);
    textFont('Georgia');
    textSize(py(30));
    text("←", returnbutton.x + returnbutton.w / 2, returnbutton.y + returnbutton.h / 2);
    textAlign(LEFT, BASELINE);
    textFont('Helvetica');

    if (backHover && mouseIsPressed) {
      gamestate = 0;
    }
  }
}

function clampPlayerToPlatform(p) {
    if (p.platform == null || p.position != "standing") return;

    if (gravitydirection == "down") {
        p.y = p.platform.y - p.h;
    } else if (gravitydirection == "up") {
        p.y = p.platform.y + p.platform.h;
    } else if (gravitydirection == "right") {
        p.x = p.platform.x - p.w;
    } else if (gravitydirection == "left") {
        p.x = p.platform.x + p.platform.w;
    }
}

function movement() {
  let p = player[levelactive];
  p.oldx = p.x;
  p.oldy = p.y;
  p.platform = null;

 // --- walking movement ---
if (gravitydirection == "down" || gravitydirection == "up") {
    if (keyIsDown(LEFT_ARROW))       { p.speed.x = -px(5); }
    else if (keyIsDown(RIGHT_ARROW)) { p.speed.x =  px(5); }
    else                             { p.speed.x = 0; }
  } else {
    if (keyIsDown(UP_ARROW))         { p.speed.y = -py(5); }
    else if (keyIsDown(DOWN_ARROW))  { p.speed.y =  py(5); }
    else                             { p.speed.y = 0; }
  }

// --- Ride moving platforms ---
if (p.platform != null) {
    p.x += p.platform.speed.x;
    p.y += p.platform.speed.y;
}

// --- Gravity ---
p.position = "falling";

for (let wall of walls[levelactive]) {
    const overlap_x = p.x + p.w > wall.x && p.x < wall.x + wall.w;
    const overlap_y = p.y + p.h > wall.y && p.y < wall.y + wall.h;
    let standingOn = false;
 
    if      (gravitydirection == "down")  { standingOn = overlap_x && abs((p.y + p.h) - wall.y)          < py(2); }
    else if (gravitydirection == "up")    { standingOn = overlap_x && abs(p.y          - (wall.y + wall.h)) < py(2); }
    else if (gravitydirection == "right") { standingOn = overlap_y && abs((p.x + p.w) - wall.x)          < px(2); }
    else if (gravitydirection == "left")  { standingOn = overlap_y && abs(p.x          - (wall.x + wall.w)) < px(2); }
 
    if (standingOn) {
      p.platform = wall;
      p.position = "standing";
    }
  }

let maxFall = p.size == "small" ? py(10) : py(20);
let gravity = py(1);

if      (gravitydirection == "down")  { if (p.speed.y <  maxFall) { p.speed.y += gravity; } }
  else if (gravitydirection == "up")    { if (p.speed.y > -maxFall) { p.speed.y -= gravity; } }
  else if (gravitydirection == "right") { if (p.speed.x <  maxFall) { p.speed.x += gravity; } }
  else if (gravitydirection == "left")  { if (p.speed.x > -maxFall) { p.speed.x -= gravity; } }

// --- Jump buffer (lets player jump when they click space slightly before landing) ---
if (keyIsDown(32)) {
    p.jumpbuffer = 4;
} else if (p.jumpbuffer > 0) {
    p.jumpbuffer--;
}

// --- walking axis movement & collisions ---

if (gravitydirection == "down" || gravitydirection == "up") {
    p.x += p.speed.x;
    for (let wall of walls[levelactive]) {
      if (p.x < wall.x + wall.w &&
          p.x + p.w > wall.x &&
          p.y < wall.y + wall.h &&
          p.y + p.h > wall.y) {
        //taking into account the speed of the wall, so that the player doesn't get stuck in it when it moves
        let wasLeft  = p.oldx + p.w <= wall.oldx;
        let wasRight = p.oldx >= wall.oldx + wall.w;
        if (wasLeft)       { p.x = wall.x - p.w;    p.speed.x = wall.speed.x; }
        else if (wasRight) { p.x = wall.x + wall.w; p.speed.x = wall.speed.x; }
      }
    }
  } else {
    p.y += p.speed.y;
    for (let wall of walls[levelactive]) {
      if (p.x < wall.x + wall.w &&
          p.x + p.w > wall.x &&
          p.y < wall.y + wall.h &&
          p.y + p.h > wall.y) {
        let wasAbove = p.oldy + p.h <= wall.oldy;
        let wasBelow = p.oldy >= wall.oldy + wall.h;
        if (wasAbove)      { p.y = wall.y - p.h;    p.speed.y = wall.speed.y; }
        else if (wasBelow) { p.y = wall.y + wall.h; p.speed.y = wall.speed.y; }
      }
    }
  }

// --- fall axis movement & collisions ---

// Ceiling stick
  if (p.stucktoceil) {
    const stillMovingIntoCeil =
      (gravitydirection == "down"  && p.speed.y < 0) ||
      (gravitydirection == "up"    && p.speed.y > 0) ||
      (gravitydirection == "right" && p.speed.x < 0) ||
      (gravitydirection == "left"  && p.speed.x > 0);
 
    if (stillMovingIntoCeil) {
      if      (gravitydirection == "down")  { p.y = p.ceilingwall.y + p.ceilingwall.h; }
      else if (gravitydirection == "up")    { p.y = p.ceilingwall.y - p.h; }
      else if (gravitydirection == "right") { p.x = p.ceilingwall.x + p.ceilingwall.w; }
      else if (gravitydirection == "left")  { p.x = p.ceilingwall.x - p.w; }
    } else {
      p.stucktoceil = false;
      p.ceilingwall = null;
    }
  }
 
  if (gravitydirection == "down" || gravitydirection == "up") {
    p.y += p.speed.y;
  } else {
    p.x += p.speed.x;
  }

  for (let wall of walls[levelactive]) {
    if (p.x < wall.x + wall.w &&
        p.x + p.w > wall.x &&
        p.y < wall.y + wall.h &&
        p.y + p.h > wall.y) {
 
      if (gravitydirection == "down") {
        let wasAbove = p.oldy + p.h <= wall.oldy;
        let wasBelow = p.oldy >= wall.oldy + wall.h;
        if (wasAbove)      { p.y = wall.y - p.h; p.speed.y = wall.speed.y; p.position = "standing"; p.platform = wall; }
        else if (wasBelow) { p.y = wall.y + wall.h; p.ceilingwall = wall; p.stucktoceil = true; }
 
      } else if (gravitydirection == "up") {
        let wasBelow = p.oldy >= wall.oldy + wall.h;
        let wasAbove = p.oldy + p.h <= wall.oldy;
        if (wasBelow)      { p.y = wall.y + wall.h; p.speed.y = wall.speed.y; p.position = "standing"; p.platform = wall; }
        else if (wasAbove) { p.y = wall.y - p.h; p.ceilingwall = wall; p.stucktoceil = true; }
 
      } else if (gravitydirection == "right") {
        let wasLeft  = p.oldx + p.w <= wall.oldx;
        let wasRight = p.oldx >= wall.oldx + wall.w;
        if (wasLeft)       { p.x = wall.x - p.w; p.speed.x = wall.speed.x; p.position = "standing"; p.platform = wall; }
        else if (wasRight) { p.x = wall.x + wall.w; p.ceilingwall = wall; p.stucktoceil = true; }
 
      } else if (gravitydirection == "left") {
        let wasRight = p.oldx >= wall.oldx + wall.w;
        let wasLeft  = p.oldx + p.w <= wall.oldx;
        if (wasRight)      { p.x = wall.x + wall.w; p.speed.x = wall.speed.x; p.position = "standing"; p.platform = wall; }
        else if (wasLeft)  { p.x = wall.x - p.w; p.ceilingwall = wall; p.stucktoceil = true; }
      }
    }
  }

// --- Coyote time (lets player jump slightly after leaving the ground) ---
if (p.position == "standing") {
p.coyote = 6;
} else if (p.coyote > 0) {
p.coyote--;
}

// --- Jumping ---
  if (p.jumpbuffer > 0 && p.coyote > 0) {
    let jv = gravitydirection == "down" || gravitydirection == "up" ? py : px;
    let jumpNormal = jv(15), jumpBig = jv(10), jumpSmall = jv(20);
 
    if (gravitydirection == "down") {
      if (p.size == "normal") p.speed.y = -jumpNormal;
      if (p.size == "big")    p.speed.y = -jumpBig;
      if (p.size == "small")  p.speed.y = -jumpSmall;
    } else if (gravitydirection == "up") {
      if (p.size == "normal") p.speed.y =  jumpNormal;
      if (p.size == "big")    p.speed.y =  jumpBig;
      if (p.size == "small")  p.speed.y =  jumpSmall;
    } else if (gravitydirection == "right") {
      if (p.size == "normal") p.speed.x = -jumpNormal/1.5;
      if (p.size == "big")    p.speed.x = -jumpBig/1.5;
      if (p.size == "small")  p.speed.x = -jumpSmall/2;
    } else if (gravitydirection == "left") {
      if (p.size == "normal") p.speed.x =  jumpNormal/1.5;
      if (p.size == "big")    p.speed.x =  jumpBig/1.5;
      if (p.size == "small")  p.speed.x =  jumpSmall/1.5;
    }
 
    p.position   = "falling";
    p.jumpbuffer = 0;
    p.coyote     = 0;
  }

  // --- Jumper pads ---
  for (let jumper of jumpers[levelactive]) {
    if (p.x + p.w > jumper.x &&
        p.x < jumper.x + jumper.w &&
        p.y + p.h > jumper.y &&
        p.y + p.h < jumper.y + jumper.h &&
        keyIsDown(32)) {
      if      (gravitydirection == "down")  { p.speed.y = -py(25); }
      else if (gravitydirection == "up")    { p.speed.y =  py(25); }
      else if (gravitydirection == "right") { p.speed.x = -px(12); }
      else if (gravitydirection == "left")  { p.speed.x =  px(12); }
      p.position = "falling";
    }
  }

  // --- Teleporters ---
  for (let i = 0; i < tps[levelactive].length; i++) {
    let tp = tps[levelactive][i];
    if (p.x + p.w >= tp.x &&
        p.x <= tp.x + tp.w &&
        tp.y + tp.h >= p.y &&
        tp.y + tp.h <= p.y + p.h) {
      if (millis() - notp > 400) {
        if (i % 2 == 0) {
          if (tp.able) {
            let dest = tps[levelactive][i + 1];
            p.x = dest.x;
            p.y = dest.y;
            p.speed.y = py(10);
            dest.able = false;
            notp = millis();
            if (levelactive == 2) {
              if (steps[levelactive] == 8) { steps[levelactive] = 9; }
              if (steps[levelactive] == 9) { tps[levelactive][1].x = px(225); }
            }
          }
        } else {
          if (tp.able) {
            let dest = tps[levelactive][i - 1];
            p.x = dest.x;
            p.y = dest.y;
            dest.able = false;
          }
        }
      }
    } else if (!tp.able) {
      tp.able = true;
    }
  }

  // --- Size buttons ---
  for (let sizebutton of sizebuttons[levelactive]) {
    if (p.x + p.w > sizebutton.x &&
        p.x < sizebutton.x + sizebutton.w &&
        sizebutton.y + sizebutton.h >= p.y &&
        sizebutton.y + sizebutton.h <= p.y + p.h) {
      if (sizebutton.type == "normal") {
        if (p.size == "big")   { transformations = [true,  false, false, false, false]; }
        if (p.size == "small") { transformations = [false, true,  false, false, false]; }
      }
      if (sizebutton.type == "big")   { transformations = [false, false, true,  false, false]; }
      if (sizebutton.type == "small") { transformations = [false, false, false, true,  false]; }
    }
  }

// Shrink to normal from big
if (transformations[0]) {
    if (p.w > px(10)) { p.w -= px(0.5); }
    if (p.h > py(40)) { p.h -= py(0.5); p.y += py(0.5); }
    if (p.w == px(10) && p.h == py(40)) { transformations[0] = false; }
    p.size = "normal";
    clampPlayerToPlatform(p);
}
// Grow to normal from small
if (transformations[1]) {
    if (p.w < px(10)) { p.w += px(0.5); }
    if (p.h < py(40)) { p.h += py(0.5); p.y -= py(0.5); }
    if (p.w == px(10) && p.h == py(40)) { transformations[1] = false; }
    p.size = "normal";
    clampPlayerToPlatform(p);
}
// Grow to big
if (transformations[2]) {
    if (p.w < px(100)) { p.w += px(0.5); }
    if (p.h < py(90))  { p.h += py(0.5); p.y -= py(0.5); }
    if (p.w == px(100) && p.h == py(90)) { transformations[2] = false; }
    p.size = "big";
    clampPlayerToPlatform(p);
}
// Shrink to small
if (transformations[3]) {
    if (p.w > px(5))  { p.w -= px(0.5); }
    if (p.h > py(10)) { p.h -= py(0.5); p.y += py(0.5); }
    if (p.w == px(5) && p.h == py(10)) { transformations[3] = false; }
    p.size = "small";
    clampPlayerToPlatform(p);
}

  // --- Wrecking balls ---
  for (let wb of wreckingballs[levelactive]) {
    if (wb.state !== "active") continue;
    wb.time += wb.frequency;
    // Angle swings between restAngle-amplitude and restAngle+amplitude
    const angle = wb.restAngle + Math.sin(wb.time) * wb.amplitude;
    wb.secondx = wb.firstx + Math.cos(angle) * wb.ropeLength;
    wb.secondy = wb.firsty + Math.sin(angle) * wb.ropeLength;
}

  // --- Boosters ---
  for (let booster of boosters[levelactive]) {
    if (p.x + p.w > booster.x && p.x < booster.x + booster.w &&
        p.y + p.h > booster.y && p.y < booster.y + booster.h) {
      if (booster.type == "right") { p.x += px(50); }
      if (booster.type == "left")  { p.x -= px(50); }
      if (booster.type == "up")    { p.y -= py(50); }
      if (booster.type == "down")  { p.y += py(50); }
    }
  }

  // --- Arrow throwers ---
  for (let at of arrowthrowers[levelactive]) {
    // Move existing arrows
    for (let i = 0; i < at.arrowx.length; i++) {
      if (at.arrowstate[i] != "good") continue;
      at.arrowx[i] += px(3) * cos(at.arrowdirection[i]);
      at.arrowy[i] += px(3) * sin(at.arrowdirection[i]);
      // Wrap horizontally
      if (at.arrowx[i] + at.arroww[i] < 0) { at.arrowx[i] = width - 1; }
      if (at.arrowx[i] > width)             { at.arrowx[i] = 1 - at.arroww[i]; }
      // Break on wall hit
      for (let wall of walls[levelactive]) {
        if (at.arrowx[i] < wall.x + wall.w &&
            at.arrowx[i] + at.arroww[i] > wall.x &&
            at.arrowy[i] + at.arrowh[i] > wall.y &&
            at.arrowy[i] < wall.y + wall.h) {
          at.arrowstate[i] = "broken";
        }
      }
    }
    // Spawn new arrow
    if (at.state == "active" && millis() - at.countdown > 2500) {
      at.arrowstate.push("good");
      at.countdown = millis();
      if (at.type == "up") {
        at.arrowx.push(at.x + at.w / 2 - px(5));
        at.arrowy.push(at.y - py(25));
        at.arroww.push(px(10)); at.arrowh.push(py(15));
        at.arrowdirection.push(-PI / 2);
      } else if (at.type == "down") {
        at.arrowx.push(at.x + at.w / 2 - px(5));
        at.arrowy.push(at.y + at.h + py(5));
        at.arroww.push(px(10)); at.arrowh.push(py(15));
        at.arrowdirection.push(PI / 2);
      } else if (at.type == "left") {
        at.arrowx.push(at.x - px(25));
        at.arrowy.push(at.y + at.h / 2 - py(5));
        at.arroww.push(px(15)); at.arrowh.push(py(10));
        at.arrowdirection.push(PI);
      } else if (at.type == "right") {
        at.arrowx.push(at.x + at.w + px(5));
        at.arrowy.push(at.y + at.h / 2 - py(5));
        at.arroww.push(px(15)); at.arrowh.push(py(10));
        at.arrowdirection.push(0);
      }
    }
  }

  //direction changers
  for (gravitychanger of gravitychangers[levelactive]) {
    const closestX = Math.max(p.x, Math.min(gravitychanger.x, p.x + p.w)); // called clamping method, which is generally this: if the value is between min and max, return the value; otherwise return the closest one to value.
    const closestY = Math.max(p.y, Math.min(gravitychanger.y, p.y + p.h));
    const dx = gravitychanger.x - closestX;
    const dy = gravitychanger.y - closestY;
    if (dx * dx + dy * dy < (gravitychanger.d / 2) * (gravitychanger.d / 2)) {
      gravitydirection = gravitychanger.direction;
      p.stucktoceil = false;
      p.ceilingwall = null;
    }
  }

  //fire throwers
  for (let firethrower of firethrowers[levelactive]) {
    if (firethrower.state !== "active") continue;

    if (millis() - firethrower.countdown > firethrower.interval) {
        firethrower.timer += 1;

        let growFrames = 5;   //emerge
        let holdFrames = 80;  //hold
        let shrinkFrames = 5; // retract

        if (firethrower.timer < growFrames) {
            firethrower.currentlength = (firethrower.timer / growFrames) * firethrower.maxlength;
        } else if (firethrower.timer < growFrames + holdFrames) {
            firethrower.currentlength = firethrower.maxlength;
        } else if (firethrower.timer < growFrames + holdFrames + shrinkFrames) {
            let shrinkProgress = firethrower.timer - growFrames - holdFrames;
            firethrower.currentlength = (1 - shrinkProgress / shrinkFrames) * firethrower.maxlength;
        } else {
            // reset and wait
            firethrower.currentlength = 0;
            firethrower.timer = 0;
            firethrower.countdown = millis();
        }
    }
  }

  // --- Ropes ---
  for (let rope of ropes[levelactive]) {
    if (rope.state == "hanging") {
        rope.angle = Math.PI / 2;
        if (keyIsDown(32) &&
            p.x + p.w > rope.x &&
            p.x < rope.x + rope.w &&
            p.y + p.h > rope.y &&
            p.y < rope.y + rope.length) {
            rope.state = "grabbed";
            rope.angularVel = 0;
        }
    }
    if (rope.state == "grabbed") {
        if (keyIsDown(LEFT_ARROW))  rope.angularVel += 0.003;
        if (keyIsDown(RIGHT_ARROW)) rope.angularVel -= 0.003;
        // Slight damping so speed doesn't increase forever
        rope.angularVel *= 0.995;
        // Clamp swing speed
        rope.angularVel = constrain(rope.angularVel, -0.062, 0.062);
        // Update angle
        rope.angle += rope.angularVel;
        // Swing limits
        const minAngle = Math.PI / 2 - 1.2;
        const maxAngle = Math.PI / 2 + 1.2;
        if (rope.angle < minAngle) {
            rope.angle = minAngle;
            rope.angularVel *= -0.4;
        }
        if (rope.angle > maxAngle) {
            rope.angle = maxAngle;
            rope.angularVel *= -0.4;
        }
        //  player at rope tip based on geometry of figure (just like in drawing)
        p.x = rope.x + rope.w / 2 +Math.cos(rope.angle) * rope.length - p.w / 2;
        p.y = rope.y + Math.sin(rope.angle) * rope.length - p.h;
        p.position = "falling";
        p.speed.x = 0;
        p.speed.y = 0;

        if (!keyIsDown(32)) {
            // Tangential velocity of rope tip, based on formula v = r * ω, where r is the length of the rope and ω is the angular velocity
            const releaseScale = 2;
            p.speed.x = -rope.length * rope.angularVel * Math.sin(rope.angle) * releaseScale;
            p.speed.y =  rope.length * rope.angularVel * Math.cos(rope.angle) * releaseScale;
            rope.state = "returning";
            rope.angularVel = 0;
        }
    }
    if (rope.state == "returning") {

    // Pull the rope back toward its natural hanging angle. The farther away it is, the stronger the pull. (Math.PI / 2 - rope.angle) shows the difference between current and target angle. The 0.01 is a scaling factor to make the pull not too strong.
    //we change velocity and not position to simulate effect of gravity on acceleration (change of velocity).
    rope.angularVel += (Math.PI / 2 - rope.angle) * 0.01;
    // Lose a little energy every frame so the swing slowly dies out.
    rope.angularVel *= 0.93;
    // Apply the current angular velocity to rotate the rope.
    rope.angle += rope.angularVel;
    // Once the rope is almost still and almost perfectly vertical, snap it into its exact resting position.
    if (abs(rope.angle - Math.PI / 2) < 0.01 &&
        abs(rope.angularVel) < 0.002) {
        rope.angle = Math.PI / 2;
        rope.angularVel = 0;
        rope.state = "hanging";
      }
    }
  }

  // --- Mummy history recording ---
  mummyHistory[levelactive].push({ x: p.x, y: p.y });

  //finds the mummy with the biggest delay, then restricts the history array to that size.
  let maxDelay = 0;
  for (let mummy of mummies[levelactive]) {
    if (mummy.delayFrames > maxDelay) maxDelay = mummy.delayFrames;
  }
  if (mummyHistory[levelactive].length > maxDelay + 1) {
    mummyHistory[levelactive].shift();
  }

  // --- Mummy playback ---
  for (let mummy of mummies[levelactive]) {
    if (mummy.state == "active") {
      let hist = mummyHistory[levelactive];
      if (hist.length > mummy.delayFrames) {
        let past = hist[hist.length - 1 - mummy.delayFrames];
        mummy.x = past.x;
        mummy.y = past.y;
      }
    }
  }

}

function moveWall(level, index, dx, dy) {
  let wall = walls[level][index];

  wall.speed.x = dx;
  wall.speed.y = dy;

  wall.x += dx;
  wall.y += dy;
}

function resetWallSpeeds() {
  for (let wall of walls[levelactive]) {
    wall.oldx = wall.x;
    wall.oldy = wall.y;

    wall.speed.x = 0;
    wall.speed.y = 0;
  }
}

function levels() {

    resetWallSpeeds();

  if (player[levelactive].x + player[levelactive].w > doorkeys[levelactive].x &&
      player[levelactive].x < doorkeys[levelactive].x + doorkeys[levelactive].w &&
      doorkeys[levelactive].y + doorkeys[levelactive].h > player[levelactive].y &&
      doorkeys[levelactive].y + doorkeys[levelactive].h < player[levelactive].y + player[levelactive].h) {
    doorkeys[levelactive].state = "collected";
    if (levelactive == 0) {
      doors[levelactive].x = px(175);
      steps[levelactive] = 1;
    }
    if (levelactive == 1) {
      if (steps[levelactive] == 3) { time = millis(); steps[levelactive] = 4; }
    }
    if (levelactive == 2) { doorkeys[levelactive].x = px(40); }
    if (levelactive == 3) {
      if (steps[levelactive] == 4) { steps[levelactive] = 5; doors[levelactive].x = px(50); doors[levelactive].y = py(35); }
    }
    if (levelactive == 4) {
      if (steps[levelactive] == 0)  { doorkeys[levelactive].x = px(200); }
      if (steps[levelactive] == 2)  { doorkeys[levelactive].x = px(515); steps[levelactive] = 3; }
      if (steps[levelactive] == 4)  { doorkeys[levelactive].x = px(355); steps[levelactive] = 5; }
      if (steps[levelactive] == 6)  { doorkeys[levelactive].x = px(730); doorkeys[levelactive].y = py(390); steps[levelactive] = 7; }
      if (steps[levelactive] == 8)  { doorkeys[levelactive].x = px(280); doorkeys[levelactive].y = py(325); tps[levelactive][0].y = py(320); tps[levelactive][1].y = py(280); steps[levelactive] = 9; }
      if (steps[levelactive] == 10) { doorkeys[levelactive].x = px(440); doorkeys[levelactive].y = py(325); steps[levelactive] = 11; }
      if (steps[levelactive] == 11) { doorkeys[levelactive].x = px(600); doorkeys[levelactive].y = py(325);  }
      if (steps[levelactive] == 12) { doorkeys[levelactive].x = px(470); doorkeys[levelactive].y = py(325);  }
      if (steps[levelactive] == 13) { doorkeys[levelactive].x = px(205); doorkeys[levelactive].y = py(530); }
      if (steps[levelactive] == 15) { doorkeys[levelactive].x = px(365); doorkeys[levelactive].y = py(530); }
      if (steps[levelactive] == 16) { doorkeys[levelactive].x = px(525); doorkeys[levelactive].y = py(530);}
      if (steps[levelactive] != 17) { doorkeys[levelactive].state = "uncollected"; }
    }
    if(levelactive == 5) {
      if(steps[levelactive] == 2) { doorkeys[levelactive].x = px(680); doorkeys[levelactive].y = py(225); doorkeys[levelactive].state = "uncollected"; steps[levelactive] = 3; }
      if(steps[levelactive] == 4) { doorkeys[levelactive].x = px(600); doorkeys[levelactive].y = height - py(60); doorkeys[levelactive].state = "uncollected"; steps[levelactive] = 5; }
      if(steps[levelactive] == 6) { doorkeys[levelactive].x = px(20); doorkeys[levelactive].y = py(180); doorkeys[levelactive].state = "uncollected"; time = millis(); steps[levelactive] = 7; }
    }
    if(levelactive == 6) {
      if(steps[levelactive] == 5) { doorkeys[levelactive].x = px(145); doorkeys[levelactive].y = py(295); doorkeys[levelactive].state = "uncollected"; }
    }
    if(levelactive == 7) {
      if(steps[levelactive] == 1) { doorkeys[levelactive].x = px(35); doorkeys[levelactive].y = height - py(75); doorkeys[levelactive].state = "uncollected"; steps[levelactive] = 2; }
      if(steps[levelactive] == 3) { doorkeys[levelactive].x = width -px(80); doorkeys[levelactive].y = py(390); doorkeys[levelactive].state = "uncollected"; steps[levelactive] = 4; }
      if(steps[levelactive] == 5) { mummies[levelactive][1].state = "active"; steps[levelactive] = 6; }
    }
  }

  if (doorkeys[levelactive].state == "collected") {
    if (
        player[levelactive].x + player[levelactive].w > doors[levelactive].x &&
        player[levelactive].x < doors[levelactive].x + doors[levelactive].w &&
        player[levelactive].y + player[levelactive].h > doors[levelactive].y &&
        player[levelactive].y < doors[levelactive].y + doors[levelactive].h
    ) {
        gamestate = 6;
    }
  }

  if (levelactive == 0) {
    fill("white");
    for (let wall of walls[0]) {
      rect(wall.x, wall.y, wall.w, wall.h);
      if (player[levelactive].x + player[levelactive].w > width - px(30)) { player[levelactive].x = width - px(30) - player[levelactive].w; }
      if (player[levelactive].x < px(30)) { player[levelactive].x = px(30); }
    }
    if(steps[levelactive] == 1) {
      if (walls[0][0].w < px(600)){walls[0][0].w += px(5);} 
      if(walls[0][1].x < px(700)){moveWall(0, 1, px(5), 0);}
      if(walls[0][2].w > px(200)){walls[0][2].w -= px(5);}
      if(walls[0][3].x > px(300)){moveWall(0, 3, -px(5), 0);}
      if(walls[0][3].w < px(600)){walls[0][3].w += px(5);}
      if(walls[0][4].w < px(500)){walls[0][4].w += px(5);}
      if(walls[0][5].x < px(600)){moveWall(0, 5, px(5), 0);}
      if(walls[0][6].x > 0){moveWall(0, 6, -px(5), 0);}
      if(walls[0][7].x < px(100)){moveWall(0, 7, px(5), 0);}
    }
  }
  if (levelactive == 1) {
    fill("white");
    for (let wall of walls[1]) {
      rect(wall.x, wall.y, wall.w, wall.h);
    }
      saws[levelactive][0].x += saws[levelactive][0].speed.x;
      saws[levelactive][0].y += saws[levelactive][0].speed.y;
      if (steps[levelactive] == 0) {
        if (player[levelactive].x > px(300)) { saws[levelactive][0].y = py(675); saws[levelactive][0].speed.x = -px(5); steps[levelactive] = 1; }
      }
      if (steps[levelactive] == 1) {
        if (player[levelactive].x < px(200)) { steps[levelactive] = 2; }
      }
      if (steps[levelactive] == 2) {
        if (walls[1][0].y > py(350)) { moveWall(1, 0, 0, -py(5)); moveWall(1, 1, 0, -py(5)); } else { steps[levelactive] = 3; }
      }
      if (steps[levelactive] == 3) { doorkeys[levelactive].x = px(750); }
      if (steps[levelactive] == 4) {
        if (millis() - time < 2500) { saws[levelactive][1].y = py(350); } else { saws[levelactive][1].y = height + py(300); }
        if (player[levelactive].x + player[levelactive].w < px(300)) { steps[levelactive] = 5; }
      }
      if (steps[levelactive] == 5) {
        if (walls[1][1].x < px(250)) { moveWall(1, 1, px(5), 0); }
        if (player[levelactive].x + player[levelactive].w < px(200)) { steps[levelactive] = 6; }
      }
      if (steps[levelactive] == 6) {
        if (walls[1][0].y < py(450)) { moveWall(1, 0, 0, py(5)); if (walls[1][1].x > px(200)) { moveWall(1, 1, -px(5), 0); } }
        else if (walls[1][2].y + walls[1][2].h < py(390)) { moveWall(1, 2, 0, py(5)); }
        else { steps[levelactive] = 7; }
      }
      if (steps[levelactive] == 7) {
        if (player[levelactive].x > px(200)) {
          tps[levelactive][0].y = py(635); tps[levelactive][1].y = py(125);
          tps[levelactive][2].y = py(305); tps[levelactive][3].y = py(635);
          saws[levelactive][2].y = py(350); saws[levelactive][3].y = py(350); saws[levelactive][4].y = py(350);
        }
      }
      if (steps[levelactive] == 5 || steps[levelactive] == 6 || steps[levelactive] == 7) {
        if (walls[levelactive][6].x < px(400)) { moveWall(levelactive, 6, px(5), 0); }
      }
  }
  if (levelactive == 2) {
    noStroke()
    fill(150, 0, 0, 150);
    rect(px(-10), height - py(5), width + px(20), py(5), px(2));
    stroke("black")
    fill("white");
    for (let wall of walls[2]) {
      rect(wall.x, wall.y, wall.w, wall.h);
    }
    if (steps[levelactive] == 0) { if (player[levelactive].x > px(350)) { steps[levelactive] = 1; } }
    if (steps[levelactive] == 1) {
      if (saws[levelactive][0].y < height) { saws[levelactive][0].y += py(5); }
      if (saws[levelactive][1].y > py(500)) { saws[levelactive][1].y -= py(10); } else { steps[levelactive] = 2; }
    }
    if (steps[levelactive] == 2) { if (player[levelactive].x >= px(500)) { steps[levelactive] = 3; } }
    if (steps[levelactive] == 3) {
      if (walls[levelactive][4].y > 0) {
        moveWall(levelactive, 4, 0, -py(10));;
        if (saws[levelactive][1].y > py(300)) { saws[levelactive][1].y -= py(10); }
        if (walls[levelactive][4].x > px(550)) { moveWall(levelactive, 4, -px(1), 0); saws[levelactive][1].x -= px(1); }
        if (walls[levelactive][6].x > px(510)) { moveWall(levelactive, 6, -px(10), 0); }
        if (walls[levelactive][5].x > px(780)) { moveWall(levelactive, 5, -px(5), px(5)); }
        time = millis();
      } else { steps[levelactive] = 4; }
    }
    if (steps[levelactive] == 4) {
      if (millis() - time > 1500) {
        if (walls[levelactive][4].y < py(450)) {moveWall(levelactive, 4, 0, py(10));}
        if (saws[levelactive][1].y < py(450)) { saws[levelactive][1].y += py(10); }
        if (walls[levelactive][4].x < px(600)) { moveWall(levelactive, 4, px(1), 0); saws[levelactive][1].x += px(1); }
        
        if (walls[levelactive][6].y < height + py(50)) { moveWall(levelactive, 6, 0, py(2)); }
        else if (doorkeys[levelactive].state == "collected") { steps[levelactive] = 5; }
      }
    }
    if (steps[levelactive] == 5) {
      if (walls[levelactive][5].y > py(200)) { moveWall(levelactive, 5, 0, -py(10)); if (walls[levelactive][5].x < px(800)) { moveWall(levelactive, 5, px(1), 0); } }
      if (walls[levelactive][0].x < px(800)) { moveWall(levelactive, 0, px(10), 0); } else { steps[levelactive] = 6; }
      if (walls[levelactive][4].y > py(300)) { moveWall(levelactive, 4, 0, -py(10)); walls[levelactive][4].h += py(10); if (saws[levelactive][1].y < height + saws[levelactive][1].d) { saws[levelactive][1].y += py(25); } }
      if (walls[levelactive][2].y < py(500)) { moveWall(levelactive, 2, 0, py(10)); }
      if (walls[levelactive][1].y < py(600)) { moveWall(levelactive, 1, 0, py(10)); }
    }
    if (steps[levelactive] == 6) {
      doorkeys[levelactive].state = "uncollected";
      doors[levelactive].y = py(150);
      if (player[levelactive].x < px(570)) { steps[levelactive] = 7; }
    }
    if (steps[levelactive] == 7) {
      if (walls[levelactive][3].y < height + py(50)) { moveWall(levelactive, 3, 0, py(10)); saws[levelactive][0].y = height + saws[levelactive][0].d; jumpers[levelactive][0].y = py(400); }
      else if (player[levelactive].x < px(170)) { steps[levelactive] = 8; }
    }
    if (steps[levelactive] == 8) {
      if (walls[levelactive][1].y < height + py(50)) { moveWall(levelactive, 1, 0, py(10)); tps[levelactive][0].y = py(600); tps[levelactive][1].y = py(60); }
    }
    if (steps[levelactive] == 9) {
      if (walls[levelactive][2].y < height + py(50)) { moveWall(levelactive, 2, 0, py(10)); }
      if (walls[levelactive][4].y < height + py(50)) { moveWall(levelactive, 4, 0, py(10)); }
      jumpers[levelactive][1].y = py(450); jumpers[levelactive][2].y = py(150);
      if (player[levelactive].speed.y < 0) { steps[levelactive] = 10; }
    }
    if (steps[levelactive] == 10) {
      if (player[levelactive].speed.y < 0) { jumpers[levelactive][0].y = py(250); steps[levelactive] = 11; }
    }
    if (steps[levelactive] == 11) {
      if (player[levelactive].speed.y < 0) { jumpers[levelactive][2].y = py(350); }
    }
  }
  if (levelactive == 3) {
    fill("white");
    for (let wall of walls[3]) {
      rect(wall.x, wall.y, wall.w, wall.h);
    }
    saws[levelactive][0].x += saws[levelactive][0].speed.x;
    saws[levelactive][0].y += saws[levelactive][0].speed.y;
    if (saws[levelactive][0].x > width + px(50)) { saws[levelactive][0].speed.x = 0; }
    if (steps[levelactive] == 0) {
      if (player[levelactive].x + player[levelactive].w > px(550)) {
        saws[levelactive][0].speed.x = px(1.5);
        if (walls[levelactive][0].w < px(690)) { walls[levelactive][0].w += px(4); } else { steps[levelactive] = 1; }
      }
    }
    if (steps[levelactive] == 1) {
      if (player[levelactive].x < px(475) && player[levelactive].y > py(75)) {
        if (walls[levelactive][2].w < px(350)) { walls[levelactive][2].w += px(4); } else { steps[levelactive] = 2; }
      }
    }
    if (steps[levelactive] == 2) {
      if (player[levelactive].x + player[levelactive].w > px(400) && player[levelactive].y > py(275)) {
        saws[levelactive][1].y = py(275); saws[levelactive][2].y = py(275); saws[levelactive][3].y = py(275); saws[levelactive][4].y = py(275);
        steps[levelactive] = 3;
      }
    }
    if (steps[levelactive] == 3) {
      if (player[levelactive].x < px(750) && player[levelactive].y + player[levelactive].h > py(400)) {
        saws[levelactive][5].y = py(475); saws[levelactive][6].y = py(475); saws[levelactive][7].y = py(475);
        saws[levelactive][8].y = py(475); saws[levelactive][9].y = py(475); saws[levelactive][14].y = py(425);
        steps[levelactive] = 4;
      }
    }
    if (steps[levelactive] == 4) {
      if (player[levelactive].x < px(525)) { saws[levelactive][10].y = py(425); saws[levelactive][11].y = py(425); saws[levelactive][12].y = py(425); saws[levelactive][13].y = py(425); }
      if (player[levelactive].x < px(50))  { saws[levelactive][15].y = py(525); saws[levelactive][16].y = py(600); }
    }
    if (steps[levelactive] == 5) { if (player[levelactive].x > px(800)) { steps[levelactive] = 6; } }
    if (steps[levelactive] == 6) {
      if (sizebuttons[levelactive][6].y < height) {moveWall(levelactive, 8, 0, py(5)); sizebuttons[levelactive][6].y += py(5); }
      else {
        wreckingballs[levelactive][0].firsty = py(525);
        wreckingballs[levelactive][0].ropeLength = py(110);
        wreckingballs[levelactive][0].time = 0;
        wreckingballs[levelactive][0].state = "active";
        steps[levelactive] = 7;
      }
    }
    if (steps[levelactive] == 7) { if (player[levelactive].x < px(100)) { steps[levelactive] = 8; } }
    if (steps[levelactive] == 8) {
      if (walls[levelactive][5].y > py(435)) { moveWall(levelactive, 5, 0, -py(5)); }
      if (walls[levelactive][5].h > py(140)) { walls[levelactive][5].h -= py(5); }
      if (sizebuttons[levelactive][6].x > px(90)) { sizebuttons[levelactive][6].x -= px(5); }
      if (walls[levelactive][5].x < px(140)) {
        moveWall(levelactive, 5, px(5), 0); moveWall(levelactive, 6, px(5), 0);
        saws[levelactive][15].x -= px(5); saws[levelactive][16].x -= px(5); saws[levelactive][6].x = px(350); saws[levelactive][8].x = px(550); 
        saws[levelactive][9].x = px(-50); saws[levelactive][5].x = px(-50); saws[levelactive][7].x = px(-50);
        saws[levelactive][10].y = height + py(5); saws[levelactive][11].y = height + py(5); saws[levelactive][12].y = height + py(5); saws[levelactive][13].y = height + py(5); saws[levelactive][14].y = height + py(5);
        saws[levelactive][6].d = py(10); saws[levelactive][8].d = py(10); saws[levelactive][11].d = py(5); saws[levelactive][13].d = py(5);
        sizebuttons[levelactive][3].x = px(250); sizebuttons[levelactive][3].y = py(450);
      }
      if (walls[levelactive][8].y > py(575)) { moveWall(levelactive, 8, 0, -py(5)); sizebuttons[levelactive][6].y -= py(5); }
      if (walls[levelactive][8].x > px(90))  { moveWall(levelactive, 8, -px(5), 0); }
      if (walls[levelactive][8].w > px(110)) { walls[levelactive][8].w -= px(10); } else { steps[levelactive] = 9; }
    }
    if (steps[levelactive] == 9) {
      if (player[levelactive].x + player[levelactive].w > px(200) && player[levelactive].y < py(575)) {
        steps[levelactive] = 10; sizebuttons[levelactive][4].x = px(50); sizebuttons[levelactive][4].y = py(300);
      }
    }
    if (steps[levelactive] == 10) {
      if (walls[levelactive][4].y > py(325)) { moveWall(levelactive, 4, 0, -py(5)); moveWall(levelactive, 5, 0, -py(5)); walls[levelactive][5].h += py(5); saws[levelactive][6].d = py(10); saws[levelactive][8].d = py(10); }
      if (walls[levelactive][7].x > px(755)) { walls[levelactive][6].width -= px(5); moveWall(levelactive, 7, -px(5), 0); walls[levelactive][7].w += px(5); }
      if (sizebuttons[levelactive][3].y < py(450)) { sizebuttons[levelactive][3].y -= py(5); }
      if (player[levelactive].y + player[levelactive].h < py(473)) {
        if (player[levelactive].x + player[levelactive].w * 0.75 > px(320)) { saws[levelactive][6].y = py(485); }
        if (player[levelactive].x + player[levelactive].w * 0.75 > px(520)) { saws[levelactive][8].y = py(485); }
      }
      if (player[levelactive].x > px(750)) { steps[levelactive] = 11; }
    }
    if (steps[levelactive] == 11) {
      sizebuttons[levelactive][1].y = py(height); sizebuttons[levelactive][2].x = px(width);
      if (walls[levelactive][7].y > py(330)) { moveWall(levelactive, 7, 0, -py(5)); walls[levelactive][7].h += py(5); }
      else { steps[levelactive] = 12; times = 4; }
      if (walls[levelactive][2].y > py(175)) {
        walls[levelactive][2].y -= py(5); walls[levelactive][3].y -= py(5);
        saws[levelactive][1].y = height + py(50); saws[levelactive][2].y = height + py(50);
        saws[levelactive][3].y = height + py(50); saws[levelactive][4].y = height + py(50);
      }
    }
    if (steps[levelactive] == 12) {
      if (player[levelactive].x < px(175)) {
        if (timego == "untrue" && times == 0) { time = millis(); }
        if (millis() - time < 1000) { timego = "true"; saws[levelactive][10].y = py(225); saws[levelactive][10].x = px(125); saws[levelactive][10].d = py(20); }
        else { saws[levelactive][10].y = height + py(20); times = "none"; }
      } else if (player[levelactive].x < px(275)) {
        if (timego == "untrue" && times == 1) { time = millis(); }
        if (millis() - time < 1000) { timego = "true"; saws[levelactive][11].y = py(225); saws[levelactive][11].x = px(225); saws[levelactive][11].d = py(20); }
        else { timego = "untrue"; saws[levelactive][11].y = height + py(20); times = 0; }
      } else if (player[levelactive].x < px(375)) {
        if (timego == "untrue" && times == 2) { time = millis(); }
        if (millis() - time < 1000) { timego = "true"; saws[levelactive][12].y = py(225); saws[levelactive][12].x = px(325); saws[levelactive][12].d = py(20); }
        else { timego = "untrue"; saws[levelactive][12].y = height + py(20); times = 1; }
      } else if (player[levelactive].x < px(500)) {
        if (timego == "untrue" && times == 3) { time = millis(); }
        if (millis() - time < 1000) { timego = "true"; saws[levelactive][13].y = py(225); saws[levelactive][13].d = py(20); }
        else { timego = "untrue"; saws[levelactive][13].y = height + py(20); times = 2; }
      } else if (player[levelactive].x < px(600)) {
        if (timego == "untrue" && times == 4) { time = millis(); }
        if (millis() - time < 1000) { timego = "true"; saws[levelactive][14].y = py(225); saws[levelactive][14].d = py(20); }
        else { timego = "untrue"; saws[levelactive][14].y = height + py(20); times = 3; }
      }
      if (times == "none") {
        steps[levelactive] = 13;
        saws[levelactive][0].x = width + px(25);
        wreckingballs[levelactive][1].firsty = py(125);
        wreckingballs[levelactive][1].ropeLength = py(25);
        wreckingballs[levelactive][1].time = 0;
        wreckingballs[levelactive][1].state = "active";

        wreckingballs[levelactive][2].firsty = py(125);
        wreckingballs[levelactive][2].ropeLength = py(25);
        wreckingballs[levelactive][2].time = Math.PI; // opposite phase
        wreckingballs[levelactive][2].state = "active";

        if(walls[levelactive][1].x<px(710)){ moveWall(levelactive, 1, px(5), 0); walls[levelactive][1].w -= px(5); }
      }
    }
    if (steps[levelactive] == 13) {
      if (player[levelactive].y < py(75) && player[levelactive].x < px(675)) { saws[levelactive][0].speed.x = -px(5); }
    }
  }
  if (levelactive == 4) {
    fill("white");
    if (millis() - arrowthrowers[levelactive][1].countdown > 3000 && arrowthrowers[levelactive][1].state == "inactive") { arrowthrowers[levelactive][1].state = "active"; }
    if (millis() - arrowthrowers[levelactive][2].countdown > 3500 && arrowthrowers[levelactive][2].state == "inactive") { arrowthrowers[levelactive][2].state = "active"; }
    if (millis() - arrowthrowers[levelactive][3].countdown > 4000 && arrowthrowers[levelactive][3].state == "inactive") { arrowthrowers[levelactive][3].state = "active"; }
    for (let wall of walls[4]) {
      rect(wall.x, wall.y, wall.w, wall.h);
    }
    if (player[levelactive].x < 0) { player[levelactive].x = width - player[levelactive].w; }
    if (player[levelactive].x + player[levelactive].w > width) {
      if (steps[levelactive] > 0 && player[levelactive].y < py(200)) { player[levelactive].x = px(30); }
      else { player[levelactive].x = 0; }
    }
    saws[levelactive][5].x += saws[levelactive][5].speed.x;
    saws[levelactive][5].y += saws[levelactive][5].speed.y;
    if (steps[levelactive] == 0) {
      if (player[levelactive].x > px(755) && doorkeys[levelactive].x == px(200)) { boosters[levelactive][0].y = py(173); steps[levelactive] = 1; time = millis(); }
    }
    if (steps[levelactive] == 1) {
      if (millis() - time < 2000) { saws[levelactive][1].y = py(175); } else { saws[levelactive][1].y = height + py(50); steps[levelactive] = 2; }
      if (walls[levelactive][0].h > py(50)) { walls[levelactive][0].h -= py(2); saws[levelactive][2].y = py(150); }
      if (walls[levelactive][1].y > py(150)) { moveWall(levelactive, 1, 0, -py(1)); walls[levelactive][1].h += py(1); }
    }
    if (steps[levelactive] == 3) {
      doorkeys[levelactive].state = "uncollected";
      if (walls[levelactive][4].h > py(25)) { walls[levelactive][4].h-=5; }
      else {
        wreckingballs[levelactive][0].firsty = py(25);
        wreckingballs[levelactive][0].ropeLength = py(150);
        wreckingballs[levelactive][0].time = 0;
        wreckingballs[levelactive][0].state = "active";
        steps[levelactive] = 4;
      }
    }
    if (steps[levelactive] == 5) {
      doorkeys[levelactive].state = "uncollected";
      if (walls[levelactive][2].y < py(125)) { moveWall(levelactive, 2, 0, py(5)); walls[levelactive][2].h-=5; saws[levelactive][3].y = py(125); jumpers[levelactive][0].y = py(140); jumpers[levelactive][1].y = py(140); }
      else { steps[levelactive] = 6; }
    }
    if (steps[levelactive] == 7) {
      doorkeys[levelactive].state = "uncollected";
      if (walls[levelactive][7].x < px(50)) { moveWall(levelactive, 7, py(5), 0); } else { steps[levelactive] = 8; }
    }
    if (steps[levelactive] == 9) {
      if (walls[levelactive][9].h > py(65)) { walls[levelactive][9].h-=5; saws[levelactive][4].y = py(315); } else { steps[levelactive] = 10; }
      if (walls[levelactive][10].y > py(400)) { moveWall(levelactive, 10, 0, -py(5)); }
    }
    if (steps[levelactive] == 11) {
      if (walls[levelactive][12].h > py(130)) { walls[levelactive][12].h-=5; }
      if (player[levelactive].x > px(700)) { steps[levelactive] = 12; }
    }

    if (steps[levelactive] == 12) {
      if (player[levelactive].x < px(400)) { steps[levelactive] = 13; }
    }

    if (steps[levelactive] == 13) {
      if(player[levelactive].x > px(460) && doorkeys[levelactive].x == px(205)) { steps[levelactive] = 14; }
    }
  

    if(steps[levelactive] == 14) {
      boosters[levelactive][1].y = height - py(50); boosters[levelactive][2].y = height - py(50); boosters[levelactive][3].y = height - py(50); boosters[levelactive][4].y = height - py(50);
      if (walls[levelactive][13].w > px(850)) { walls[levelactive][13].w -= px(5); }
      if (walls[levelactive][11].h > py(130)) { walls[levelactive][11].h -= py(5); }
      if (walls[levelactive][14].h > py(130)) { walls[levelactive][14].h -= py(5);  walls[levelactive][15].h -= py(5); walls[levelactive][16].h -= py(5); walls[levelactive][17].h -= py(5); }
      if (player[levelactive].y > py(500) && player[levelactive].x < px(745)) { saws[levelactive][5].speed.x = py(4); steps[levelactive] = 15;}
    }

    if (steps[levelactive] == 15) {
      if(player[levelactive].x > px(250)) { steps[levelactive] = 16; }
    }

    if (steps[levelactive] == 16) {
      if(player[levelactive].x > px(425)) { steps[levelactive] = 17; }
    }
  }

  if (levelactive == 5) { 
    noStroke()
    fill(150, 0, 0, 150);
    rect(px(0),py(0),py(5),height+py(20),px(2));
    rect(width - py(5),py(0),py(5),height+py(20),px(2));
    rect(px(-10), 0, width + px(20), py(5), px(2));
    rect(px(-10), height - py(5), width + px(20), py(5), px(2));
    stroke("black")
    fill("white"); for (let wall of walls[5]) { rect(wall.x, wall.y, wall.w, wall.h); } 

    if (steps[levelactive] == 0) {
      if (player[levelactive].x > px(260)) { 
        time = millis();
        steps[levelactive] = 1;
      }
    }
    if (steps[levelactive] == 1) {
      if(millis() - time > 500){
        if (walls[levelactive][3].h < height) { walls[levelactive][3].h += py(15); }
      }
      if (player[levelactive].x > px(530)) { steps[levelactive] = 2; }
    }

    if(steps[levelactive] == 2) {
        if(walls[levelactive][5].w > px(60)) { walls[levelactive][5].w -= px(5); }
        if(walls[levelactive][6].w < px(60)) { walls[levelactive][6].w += px(5); }
    }

    if(steps[levelactive] == 3) {
      if (player[levelactive].x < px(550)) { 
        wreckingballs[levelactive][0].state = "active";
        steps[levelactive] = 4; 
      }
    }

    if(steps[levelactive] == 5) {
      if(player[levelactive].y > py(550) && player[levelactive].x < px(550)) {
        steps[levelactive] = 6;
      }
    }

    if(steps[levelactive] == 7) {
      if(millis() - time > 500) {
        if(gravitychangers[levelactive][4].y > height-py(150)) { gravitychangers[levelactive][4].y -= py(5); }
        if(gravitychangers[levelactive][5].y < py(80)) { gravitychangers[levelactive][5].y += py(5); }
        if(tps[levelactive][0].y < py(20)) { tps[levelactive][0].y += py(5); }
        if(tps[levelactive][1].y > height-py(120)) { tps[levelactive][1].y -= py(5); }
        if(saws[levelactive][0].y > height-py(80)) { saws[levelactive][0].y -= py(5); }
        if(gravitychangers[levelactive][6].y > py(330)) { gravitychangers[levelactive][6].y -= py(5); }
        if(gravitychangers[levelactive][7].y > height-py(100)) { gravitychangers[levelactive][7].y -= py(5); }
        if(walls[levelactive][23].y > py(150)) { walls[levelactive][23].y -= py(5); }
        if(walls[levelactive][24].y > py(250)) { walls[levelactive][24].y -= py(5); }
        if(walls[levelactive][25].y > py(320)) { walls[levelactive][25].y -= py(5); }
        if(walls[levelactive][26].y > py(460)) { walls[levelactive][26].y -= py(5); }
        if(walls[levelactive][27].y > py(570)) { walls[levelactive][27].y -= py(5); }
        if(walls[levelactive][28].y > height - py(25)) { walls[levelactive][28].y -= py(5); }
        if(doors[levelactive].y > height - py(65)) { doors[levelactive].y -= py(5); }
        if(player[levelactive].x < px(460)) { 
          if(saws[levelactive][0].y > height-py(120)) { saws[levelactive][0].y -= py(10); }
        }
      }
    }
  }

  if (levelactive == 6) { 
    noStroke()
    fill(150, 0, 0, 150);
    rect(px(-10), 0, width + px(20), py(5), px(2));
    rect(px(-10), height - py(5), width + px(20), py(5), px(2));
    stroke("black")
    fill("white"); for (let wall of walls[6]) { rect(wall.x, wall.y, wall.w, wall.h); } 
    for (let saw of saws[levelactive]) { 
      saw.x += saw.speed.x;
      saw.y += saw.speed.y;
     }

    if (steps[levelactive] == 0){
      if(player[levelactive].x > px(540)) {
      steps[levelactive] = 2
    }
  }
    
    if(steps[levelactive] == 2){
      if(walls[levelactive][2].y<height+py(40)){
        moveWall(levelactive, 2, 0, py(5));
      }
      if(player[levelactive].y<py(400) && player[levelactive].position == "standing"){
        steps[levelactive] = 3;
      }
    }

    if(steps[levelactive] == 3){
      arrowthrowers[levelactive][0].state = "active";
      if(walls[levelactive][5].y<py(347)){
        moveWall(levelactive, 5, 0, py(5));
      }
      if(saws[levelactive][0].y<py(345)){
        for (let i = 0; i < 8; i++) {
          saws[levelactive][i].y+= py(5);
        }
      }
      if(player[levelactive].x>px(500) && player[levelactive].y<py(347) && ropes[levelactive][1].state == "returning"){
        steps[levelactive] = 4;
      }
    }

    if(steps[levelactive] == 4){
      for (let i = 0; i < 8; i++) {
        saws[levelactive][i].speed.x = px(3);
      }
      steps[levelactive] = 5;
    }

    if(steps[levelactive] == 5){
      if(player[levelactive].x<px(400) && player[levelactive].y < py(150) && ropes[levelactive][1].state == "returning"){
        steps[levelactive] = 6;
      }
    }

    if(steps[levelactive] == 6){
      if (saws[levelactive][8].d >px(10)) {
        saws[levelactive][8].d -= px(10);
      }else {
      time = millis();
      steps[levelactive]=7;
      }
    }

    if(steps[levelactive] == 7){
      if(millis()-time>1500){
        if (saws[levelactive][8].d < px(100)) {
          saws[levelactive][8].d += px(5);
        } else {
          steps[levelactive] = 8;
        }
    }
  }
  }

  if (levelactive == 7) { 
    noStroke()
    fill(150, 0, 0, 150);
    rect(px(-10), 0, width + px(20), py(5), px(2));
    rect(px(-10), height - py(5), width + px(20), py(5), px(2));
    stroke("black")
    fill("white"); for (let wall of walls[7]) { rect(wall.x, wall.y, wall.w, wall.h); } 

    if(steps[levelactive] == 0) {
      if(player[levelactive].x > px(400)) {
        steps[levelactive] = 1;
      }
    }

    if(steps[levelactive] == 1) {
      if(walls[levelactive][2].x > px(405)) {
        moveWall(levelactive, 2, -px(5), 0);
      }
      if(walls[levelactive][3].y > height - py(25)) {
        moveWall(levelactive, 3, 0, -py(5));
      }
    }

    if(steps[levelactive] == 2) {
      if(player[levelactive].x < px(330)) {
        steps[levelactive] = 3;
      }
    }

    if(steps[levelactive] == 3) {
      if(saws[levelactive][0].x > px(225)) {
        saws[levelactive][0].x -= px(5);
        saws[levelactive][0].d += px(2);
      }
    }

    if(steps[levelactive] == 4) {
      if(tps[levelactive][0].x < px(35)) {
        tps[levelactive][0].x += px(5);
      }
      if(tps[levelactive][1].x > width-px(70)) {
        tps[levelactive][1].x -= px(5);
      }
      if(walls[levelactive][5].x < px(0)) {
        moveWall(levelactive, 5, px(5), 0);
      }
      if(tps[levelactive][0].x >= px(35) && tps[levelactive][1].x <= width-px(70) && walls[levelactive][5].x >= px(0)) {
        steps[levelactive] = 5;
      }
    }

    if(steps[levelactive] == 6) {
      if(gravitychangers[levelactive][0].y > height - py(65)) {
        gravitychangers[levelactive][0].y -= py(5);
      }
      if(boosters[levelactive][0].x > width - px(120)) {
        boosters[levelactive][0].x -= px(5);
        saws[levelactive][1].x -= px(5);
      }
      if(player[levelactive].x > px(250) && player[levelactive].y < py(200)) {
        steps[levelactive] = 7;
        time = millis();
        nextMummy = 2;
      }
    }

    if(steps[levelactive] == 7) {
      if(saws[levelactive][2].y < py(25)) {
        saws[levelactive][2].y += py(5);
      }
      if (millis() - time > 750) {
          if (nextMummy < mummies[levelactive].length) {
              mummies[levelactive][nextMummy].state = "active";
              nextMummy++;
          }
          time = millis();
      }
    }
  }

  if (levelactive == 8) { 
    fill("white"); for (let wall of walls[8]) { rect(wall.x, wall.y, wall.w, wall.h); } 

    if (chaseState !== "finished" && player[levelactive].state != "dead") {
    translatedDistance -= CHASE_SPEED;
    player[levelactive].x += CHASE_SPEED;
 
    for (let i = 0; i < walls[8].length; i++) {
      moveWall(8, i, CHASE_SPEED, 0);
    }
    for (let saw of saws[8]) {
      saw.x += CHASE_SPEED;
    }
    for (let tp of tps[8]){
      tp.x += CHASE_SPEED
    }
    for (let jumper of jumpers[8]){
      jumper.x += CHASE_SPEED
    }
    for (let sb of sizebuttons[8]) {
      sb.x += CHASE_SPEED;
    }
    for (let wreckingball of wreckingballs[8]){
      wreckingball.firstx += CHASE_SPEED;
      wreckingball.secondx += CHASE_SPEED;
    }
    for (let booster of boosters[8]){
      booster.x += CHASE_SPEED;
    }
    for (let at of arrowthrowers[8]) {
      at.x += CHASE_SPEED;
      for (let i = 0; i < at.arrowx.length; i++) {
      if (at.arrowstate[i] != "good") continue;
      at.arrowx[i] += CHASE_SPEED;
      }
    }
    for (let gravitychanger of gravitychangers[8]){
      gravitychanger.x += CHASE_SPEED;
    }
    for (let firethrower of firethrowers[8]) {
      firethrower.x += CHASE_SPEED;
    }
    for (let rope of ropes[8]){
      rope.x += CHASE_SPEED;
    }

    if(translatedDistance > px(300)){
      if (saws[levelactive][0].d < px(20)){
        saws[levelactive][0].d += 5;
      }
    }

    doors[levelactive].x += CHASE_SPEED;

    if(translatedDistance > px(1600)){
      wreckingballs[levelactive][0].state = "active";
    }

    if(abs(saws[levelactive][6].x - player[levelactive].x) < player[levelactive].w - px(10)){
      if(saws[levelactive][6].y<py(410)){
        saws[levelactive][6].y += py(5);
      }
    }

    if(abs(saws[levelactive][7].x - player[levelactive].x) < player[levelactive].w - px(10)){
      if(saws[levelactive][7].y<py(410)){
        saws[levelactive][7].y += py(5);
      }
    }

    if(translatedDistance > px(2800)){
      gravitychangers[levelactive][1].x -= px(5)
      arrowthrowers[levelactive][0].state = "active";
    }

    if(walls[levelactive][14].x > width){
      doorkeys[levelactive].x = player[levelactive].x + px(120);
      doorkeys[levelactive].y = player[levelactive].y;
    }else {
      doorkeys[levelactive].x = walls[levelactive][14].x + walls[levelactive][14].w - px(50);
      doorkeys[levelactive].y = walls[levelactive][14].y - py(60);
    }

    if (translatedDistance > px(4000)) {
      chaseState = "finished";
      arrowthrowers[levelactive][0].state = "inactive"
      for (let mummy of mummies[levelactive]){
        mummy.state = "active";
      }
      for (let i = 1; i < walls[8].length; i++) { walls[8][i].speed = { x: 0, y: 0 }; }
    }
  }

  
  textSize(px(20))
  text(floor(translatedDistance * OW / width), px(50), py(100));

  }

}

function win() {
  if (gamestate == 6) {
    if (levelactive != 8){
      background("#3FA34D");

      push();
      noStroke();
      fill(255, 255, 255, 235);
      rectMode(CENTER);
      rect(width / 2, height / 2, px(420), py(220), px(14));
      rectMode(CORNER);

      fill(20, 70, 30);
      textAlign(CENTER, CENTER);
      textFont('Georgia');
      textSize(py(28));
      text("Level complete!", width / 2, height / 2 - py(60));

      textFont('Helvetica');
      textSize(py(18));
      fill(60, 60, 60);
      text("Press C to go to the next level", width / 2, height / 2 - py(10));
      text("Press R to go back to level selection", width / 2, height / 2 + py(25));
      pop();

      if (keyIsDown(82) || keyIsDown(67)) {
        if (levelactive == highestlevel) {
          highestlevel = highestlevel + 1;
          localStorage.setItem("highest level", highestlevel);
        }
        if (keyIsDown(82)) { setup(); gamestate = 1; }
        if (keyIsDown(67)) { levelactive = levelactive + 1; setup(); gamestate = 3; }
      }
    } else {
      background("#3FA34D");

      push();
      noStroke();
      fill(255, 255, 255, 235);
      rectMode(CENTER);
      rect(width / 2, height / 2, px(420), py(220), px(14));
      rectMode(CORNER);

      fill(20, 70, 30);
      textAlign(CENTER, CENTER);
      textFont('Georgia');
      textSize(py(28));
      text("You escaped the temple!", width / 2, height / 2 - py(60));

      textFont('Helvetica');
      textSize(py(18));
      fill(60, 60, 60);
      text("Congratulations, you completed all levels!", width / 2, height / 2 - py(10));
      text("Press R to go back to level selection", width / 2, height / 2 + py(25));
      pop();

      if (keyIsDown(82)) {
        if (levelactive == highestlevel) {
          highestlevel = highestlevel + 1;
          localStorage.setItem("highest level", highestlevel);
        }
        setup();
        gamestate = 1;
      }
    }
  }
}

function death() {
  for (let saw of saws[levelactive]) {
  const p = player[levelactive];

  // Circle vs rectangle (same method as wrecking ball)
  const closestX = Math.max(p.x, Math.min(saw.x, p.x + p.w)); // called clamping method, which is generally this: if the value is between min and max, return the value; otherwise return the closest one to value.
  const closestY = Math.max(p.y, Math.min(saw.y, p.y + p.h));
  const dx = saw.x - closestX;
  const dy = saw.y - closestY;
  if (dx * dx + dy * dy < (saw.d / 2) * (saw.d / 2)) {
    p.state = "dead";
  }
}

  for (let wb of wreckingballs[levelactive]) {
  const p = player[levelactive];

  // --- Ball: circle vs rectangle ---
  const closestX = Math.max(p.x, Math.min(wb.secondx, p.x + p.w));
  const closestY = Math.max(p.y, Math.min(wb.secondy, p.y + p.h));
  const dx = wb.secondx - closestX;
  const dy = wb.secondy - closestY;
  if (dx * dx + dy * dy < (wb.d / 2) * (wb.d / 2)) {
    p.state = "dead";
  }

  // --- Chain: thin segment from anchor to ball ---
  const chainThickness = py(0.5); // px, tweak to taste
  const chainMinX = Math.min(wb.firstx, wb.secondx);
  const chainMaxX = Math.max(wb.firstx, wb.secondx);
  const chainMinY = Math.min(wb.firsty, wb.secondy);
  const chainMaxY = Math.max(wb.firsty, wb.secondy);

  if (p.x         < chainMaxX + chainThickness / 2 &&
      p.x + p.w   > chainMinX - chainThickness / 2 &&
      p.y         < chainMaxY &&
      p.y + p.h   > chainMinY) {
    p.state = "dead";
  }
}

  for (let arrowthrower of arrowthrowers[levelactive]) {
    for (let i = 0; i < arrowthrower.arrowx.length; i++) {
      if (arrowthrower.arrowx[i] < player[levelactive].x + player[levelactive].w &&
          arrowthrower.arrowx[i] + arrowthrower.arroww[i] > player[levelactive].x &&
          arrowthrower.arrowy[i] + arrowthrower.arrowh[i] > player[levelactive].y &&
          arrowthrower.arrowy[i] < player[levelactive].y + player[levelactive].h &&
          arrowthrower.arrowstate[i] == "good") {
        arrowthrower.arrowstate[i] = "broken";
        player[levelactive].state = "dead";
      }
    }
  }

  for (let ft of firethrowers[levelactive]) {
    const p = player[levelactive];
    if (ft.state !== "active" || ft.currentlength <= 0) continue;
    let fx, fy, fw, fh;
    if (ft.direction == "up") {
        fx = ft.x;
        fy = ft.y - ft.currentlength;
        fw = ft.thickness;
        fh = ft.currentlength;
    }
    else if (ft.direction == "down") {
        fx = ft.x;
        fy = ft.y;
        fw = ft.thickness;
        fh = ft.currentlength;
    }
    else if (ft.direction == "left") {
        fx = ft.x - ft.currentlength;
        fy = ft.y;
        fw = ft.currentlength;
        fh = ft.thickness;
    }
    else if (ft.direction == "right") {
        fx = ft.x;
        fy = ft.y;
        fw = ft.currentlength;
        fh = ft.thickness;
    }
    if (
        p.x < fx + fw &&
        p.x + p.w > fx &&
        p.y < fy + fh &&
        p.y + p.h > fy
    ) {
        p.state = "dead";
    }
  }

  for (let mummy of mummies[levelactive]) {
    if (mummy.state != "active") continue;
    const p = player[levelactive];
    if (p.x < mummy.x + mummy.w && p.x + p.w > mummy.x && p.y < mummy.y + mummy.h && p.y + p.h > mummy.y) {
      p.state = "dead";
    }
  }

  if (player[levelactive].y + player[levelactive].h > height || player[levelactive].y < 0) { player[levelactive].state = "dead"; }
  if (levelactive != 4) { if(player[levelactive].x<0 || player[levelactive].x + player[levelactive].w > width){player[levelactive].state = "dead"; }}
  if (player[levelactive].state == "dead") { gamestate = 4; }
  if (gamestate == 4) {
    fill(255, 0, 0, 150);
    rect(0, 0, width, height);

    push();
    noStroke();
    fill(255, 255, 255, 235);
    rectMode(CENTER);
    rect(width / 2, height / 2, px(420), py(220), px(14));
    rectMode(CORNER);

    fill(120, 20, 20);
    textAlign(CENTER, CENTER);
    textFont('Georgia');
    textSize(py(28));
    text("You died!", width / 2, height / 2 - py(60));

    textFont('Helvetica');
    textSize(py(18));
    fill(60, 60, 60);
    text("Press C to retry", width / 2, height / 2 - py(10));
    text("Press R to go back to level selection", width / 2, height / 2 + py(25));
    pop();
    if (keyIsDown(82) || keyIsDown(67)) {
      setup();
      if (keyIsDown(82)) { gamestate = 1; }
      if (keyIsDown(67)) { gamestate = 3; }
    }
  }
}

function pause() {
  if (keyIsDown(27)) { gamestate = 5; }
  if (gamestate == 5) {
    push();
    noStroke();
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);

    fill(255, 255, 255, 235);
    rectMode(CENTER);
    rect(width / 2, height / 2, px(380), py(180), px(14));
    rectMode(CORNER);

    fill(50, 50, 50);
    textAlign(CENTER, CENTER);
    textFont('Georgia');
    textSize(py(26));
    text("Paused", width / 2, height / 2 - py(45));

    textFont('Helvetica');
    textSize(py(18));
    fill(70, 70, 70);
    text("Press C to continue", width / 2, height / 2);
    text("Press R to go back to level selection", width / 2, height / 2 + py(30));
    pop();
    if (keyIsDown(67)) { gamestate = 3; }
    if (keyIsDown(82)) {
      setup();
      gamestate = 1;
    }
  }
}