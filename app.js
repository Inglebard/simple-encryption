#!/usr/bin/env node

let fs = require('fs');

let rotationEncryption = require("./includes/RotationEncryption.js");
let positionEncryption = require("./includes/PositionEncryption.js");

let algo = {
  rotationEncryption: rotationEncryption,
  positionEncryption: positionEncryption
}
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')

const optionDefinitions = [{
    name: 'text',
    alias: 't',
    type: String,
    defaultOption: true
  },
  {
    name: 'file',
    alias: 'f',
    type: String
  },
  {
    name: 'algo',
    alias: 'a',
    type: String,
    defaultValue: "rotationEncryption"
  },
  {
    name: 'offset',
    alias: 'o',
    type: Number,
    defaultValue: 1
  },
  {
    name: 'key',
    alias: 'k',
    type: String,
  },
  {
    name: 'encrypt',
    alias: 'e',
    type: Boolean,
    defaultValue: true
  },
  {
    name: 'decrypt',
    alias: 'd',
    type: Boolean,
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean
  }
];

const sections = [{
    header: 'Simple encryption',
    content: 'Simple encryption script. Mainly create as an example of Ceasar code.'
  },
  {
    header: 'Options',
    optionList: [{
        name: 'text',
        alias: 't',
        typeLabel: '{underline String}',
        description: 'Input text to encrypt/decrypt.',
        defaultOption: true,
      },
      {
        name: 'file',
        alias: 'f',
        typeLabel: '{underline String}',
        description: 'Input file to encrypt/decrypt.'
      },
      {
        name: 'algo',
        alias: 'a',
        typeLabel: '{underline string}',
        description: 'Algo use to encrypt/decrypt.'
      },
      {
        name: 'offset',
        alias: 'o',
        typeLabel: '{underline number}',
        description: 'Offset.'
      },
      {
        name: 'key',
        alias: 'k',
        typeLabel: '{underline string}',
        description: 'Key use to encrypt/decrypt.'
      },
      {
        name: 'encrypt',
        alias: 'e',
        description: 'Encrypt data.'
      },
      {
        name: 'decrypt',
        alias: 'd',
        description: 'Decrypt data.'
      },
      {
        name: 'help',
        description: 'Print this usage guide.'
      }
    ]
  }
]
const usage = commandLineUsage(sections);
let command_param = commandLineArgs(optionDefinitions);

if (command_param.help || (!command_param.text && !command_param.file)) {
  console.log(usage);
  process.exit(0);
}

const default_unordered_key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const default_shuffle_key = shuffle(default_unordered_key);

function shuffle(str) {
  return str.split('').sort(function() {
    return 0.5 - Math.random()
  }).join('');
}

function removeDoubles(str) {
  return str.split("").sort().join("").replace(/(.)(?=.*\1)/g, "");
}



if (!algo[command_param.algo]) {
  console.log("Available 'rotationEncryption' and 'positionEncryption'.");
  console.log(usage);
  process.exit(0);
}
let param = {
  offset: command_param.offset
};
let key = command_param.key ? command_param.key : default_shuffle_key;

if (command_param.file) {
  fs.readFile(command_param.file, 'utf8', function(err, contents) {
    let lines = contents.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] != "") {
        let line = lines[i].split("::::");
        if (command_param.decrypt) {
          console.log(line[0] + '::::' + algo[command_param.algo].decrypt(line[0], line[1], param));
        } else {

          let key = line[1] ? line[0] : default_shuffle_key;
          let text = line[1] ? line[1] : line[0];
          console.log(key + '::::' + algo[command_param.algo].encrypt(key, text, param));
        }
      }
    }
  });

} else {
  if (command_param.decrypt) {
    if (!command_param.key) {
      console.log("Require a key.");
      console.log(usage);
      process.exit(0);
    }
    console.log(command_param.key + '::::' + algo[command_param.algo].decrypt(command_param.key, command_param.text, param));
  } else {
    let key = command_param.key ? command_param.key : default_shuffle_key;
    console.log(key + '::::' + algo[command_param.algo].encrypt(key, command_param.text, param));
  }
}
