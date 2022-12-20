// Define data table inside a test or load from another module
let edge_case = new DataTable(['robot_input']); //
    
    // 10^10 is not supported; 10^9 is.
    edge_case.add([{ 
    "roomSize" : [10000000000,10000000000], 
    "coords" : [1, 2], 
    "patches" : [[1, 0], [2, 2], [2, 3]], 
    "instructions" : "NEWS" 
    }]);

    // -ve coords for room
    edge_case.add([{ 
        "roomSize" : [-100,-100], 
        "coords" : [1, 2], 
        "patches" : [[1, 0], [2, 2], [2, 3]], 
        "instructions" : "NEWS" 
        }]);

    // negative coords for robot position
    edge_case.add([{ 
        "roomSize" : [5,6], 
        "coords" : [-1, -1], 
        "patches" : [[1, 0], [2, 2], [2, 3]], 
        "instructions" : "NEWS" 
        }]);

    // negative coords for patches position
    edge_case.add([{ 
        "roomSize" : [5,6], 
        "coords" : [1, 1], 
        "patches" : [[-1, -3], [-2, -2], [-2, -3]], 
        "instructions" : "NEWS" 
        }]);

    Data(edge_case).Scenario('Check edge values', ({ I, current }) => {
        const response = I.sendPostRequest('/v1/cleaning-sessions',current.robot_input);
    
        // check that response code is 4xx
        I.seeResponseCodeIsClientError();
      }).tag('@edgecase');

// Define data table inside a test or load from another module
let edge_case_success = new DataTable(['robot_input']); //

    // 1x1 room
    edge_case_success.add([{ 
        "roomSize" : [1,1], 
        "coords" : [0, 0], 
        "patches" : [[1, 0], [2, 2], [2, 3]], 
        "instructions" : "NEWS" 
        }]);
    
    // room size maxes out at 999999999 x 999999999
    edge_case_success.add([{ 
        "roomSize" : [999999999,999999999], 
        "coords" : [0, 0], 
        "patches" : [[1, 0], [2, 2], [2, 3]], 
        "instructions" : "NEWS" 
        }]);

    Data(edge_case_success).Scenario('Check edge values - success', ({ I, current }) => {
        const response = I.sendPostRequest('/v1/cleaning-sessions',current.robot_input);
    
        // check that response code is 2xx
        I.seeResponseCodeIsSuccessful();
        }).tag('@edgecase');