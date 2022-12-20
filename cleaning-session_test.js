Feature('cleaning-session');

// Define data table inside a test or load from another module
let accounts = new DataTable(['robot_input']); //

    // regular input
    accounts.add([{ 
    "roomSize" : [5, 5], 
    "coords" : [1, 2], 
    "patches" : [ [1, 0], [2, 2], [2, 3] ], 
    "instructions" : "NNESEESWNWW" 
    }]); // adding records to a table

    // room has one row
    accounts.add([{ 
        "roomSize" : [1, 5], 
        "coords" : [0, 0], 
        "patches" : [ [1, 0], [2, 2], [2, 3], [0, 3] ], 
        "instructions" : "EEEEE" 
        }]); // adding records to a table

Data(accounts).Scenario('Clean the room', ({ I, current }) => {
    const response = I.sendPostRequest('/v1/cleaning-sessions',current.robot_input);

    // check that response code is 2xx
    I.seeResponseCodeIsSuccessful();
    
    // check that response contains keys
    I.seeResponseContainsKeys(['coords', 'patches']);
  });