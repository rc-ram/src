Feature('non-post requests');

// Define data table inside a test or load from another module
let valid_room_and_patches = new DataTable(['robot_input']); //

    // sample input given
    valid_room_and_patches.add([{ 
    "roomSize" : [5, 5], 
    "coords" : [1, 2], 
    "patches" : [[1, 0], [2, 2], [2, 3]], 
    "instructions" : "NNESEESWNWW" 
    }]);

Data(valid_room_and_patches).Scenario('Check get request', ({ I, current }) => {
    const response = I.sendGetRequest('/v1/cleaning-sessions');

    // check that response code is 405
    I.seeResponseCodeIs(405);

  }).tag('@nonpost');

Data(valid_room_and_patches).Scenario('Check delete request', ({ I, current }) => {
    const response = I.sendDeleteRequest('/v1/cleaning-sessions');

    // check that response code is 405
    I.seeResponseCodeIs(405);

  }).tag('@nonpost');

  Data(valid_room_and_patches).Scenario('Check put request', ({ I, current }) => {
    const response = I.sendPutRequest('/v1/cleaning-sessions', current.robot_input);

    // check that response code is 405
    I.seeResponseCodeIs(405);

  }).tag('@nonpost');