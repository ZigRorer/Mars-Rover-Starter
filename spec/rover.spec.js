const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
//Test 7 
  test("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(87382098);
    expect({position: rover.position, mode: rover.mode, generatorWatts: rover.generatorWatts}).toEqual({
      position: 87382098,
      mode: 'NORMAL',
      generatorWatts: 110
    });
  });
//Test 8
  test("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Status check command', commands);
    let rover = new Rover(87382098);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Status check command');
  });
//Test 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(87382098);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });
//Test 10
  test("responds correctly to the status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Status check command', commands);
    let rover = new Rover(87382098);
    let response = rover.receiveMessage(message);
    expect(response.results[0]).toEqual({
      completed: true,
      roverStatus: {
        mode: 'NORMAL',
        generatorWatts: 110,
        position: 87382098
      }
    });
  });
//Test 11
  test("responds correctly to the mode change command", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Mode change command', commands);
    let rover = new Rover(87382098);
    let response = rover.receiveMessage(message);
    expect({completed: response.results[0].completed, mode: rover.mode}).toEqual({
      completed: true,
      mode: 'LOW_POWER'
    });
  });
//Test 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1000)];
    let message = new Message('Move in low power mode', commands);
    let rover = new Rover(87382098);
    let response = rover.receiveMessage(message);
    expect({ completed: response.results[1].completed, position: rover.position}).toEqual({
      completed: false,
      position: 87382098
    });
  });
//Test 13
  test("responds with the position for the move command", function(){
    let commands = [new Command('MOVE', 1000)];
    let message = new Message('Position for move command', commands);
    let rover = new Rover(87382098);
    let response = rover.receiveMessage(message);
    expect({ completed: response.results[0].completed, position: rover.position}).toEqual({
      completed: true,
      position: 1000
    });
  });
});
