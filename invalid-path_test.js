// Define data table inside a test or load from another module
let valid_room_invalid_path = new DataTable(['robot_input', 'final_coords', 'patches_cleaned']); //

    // invalid move instructions
    valid_room_invalid_path.add([{ 
    "roomSize" : [5, 5], 
    "coords" : [1, 2], 
    "patches" : [[1, 0], [2, 2], [2, 3]], 
    "instructions" : "SDRDSS" 
    },
    [1,3],
    1]);

    // empty move instructions
    valid_room_invalid_path.add([{ 
        "roomSize" : [5, 5], 
        "coords" : [1, 2], 
        "patches" : [[1, 0], [2, 2], [2, 3]], 
        "instructions" : "" 
        },
        [1,3],
        1]);

Feature('invalid-path');

Data(valid_room_invalid_path).Scenario('Check when path is invalid', ({ I, current }) => {
    const response = I.sendPostRequest('/v1/cleaning-sessions',current.robot_input);

    // check that response code is 4xx
    I.seeResponseCodeIsClientError();
  }).tag('@invalidpath');