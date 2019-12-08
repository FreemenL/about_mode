/**
 * Heirarchical conversation example
 */

'use strict';
var inquirer = require('inquirer');

var directionsPrompt = {
  type: 'list',
  name: 'direction',
  message: '目标项目终端为?',
  choices: ['web', 'h5']
};

function main() {
  console.log('项目模版生成中...');
  exitHouse();
}

function exitHouse() {
  inquirer.prompt(directionsPrompt).then(answers => {
  	console.log(answers.direction)
    if (answers.direction === 'web') {
      console.log('web 端模板初始化...');
      console.log(
        'There is a wolf in front of you; a friendly looking dwarf to the right and an impasse to the left.'
      );
      // encounter1();
    } else {
      console.log('你不能这样,请再试一次...');
      exitHouse();
    }
  });
}

// function encounter1() {
//   inquirer.prompt(directionsPrompt).then(answers => {
//     var direction = answers.direction;
//     if (direction === 'Forward') {
//       console.log('You attempt to fight the wolf');
//       console.log(
//         'Theres a stick and some stones lying around you could use as a weapon'
//       );
//       encounter2b();
//     } else if (direction === 'Right') {
//       console.log('You befriend the dwarf');
//       console.log('He helps you kill the wolf. You can now move forward');
//       encounter2a();
//     } else {
//       console.log('You cannot go that way');
//       encounter1();
//     }
//   });
// }

// function encounter2a() {
//   inquirer.prompt(directionsPrompt).then(answers => {
//     var direction = answers.direction;
//     if (direction === 'Forward') {
//       var output = 'You find a painted wooden sign that says:';
//       output += ' \n';
//       output += ' ____  _____  ____  _____ \n';
//       output += '(_  _)(  _  )(  _ \\(  _  ) \n';
//       output += '  )(   )(_)(  )(_) ))(_)(  \n';
//       output += ' (__) (_____)(____/(_____) \n';
//       console.log(output);
//     } else {
//       console.log('You cannot go that way');
//       encounter2a();
//     }
//   });
// }

// function encounter2b() {
//   inquirer
//     .prompt({
//       type: 'list',
//       name: 'weapon',
//       message: 'Pick one',
//       choices: [
//         'Use the stick',
//         'Grab a large rock',
//         'Try and make a run for it',
//         'Attack the wolf unarmed'
//       ]
//     })
//     .then(() => {
//       console.log('The wolf mauls you. You die. The end.');
//     });
// }

main();

