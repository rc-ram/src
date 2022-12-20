// Define data table inside a test or load from another module
let malformed_json = new DataTable(['robot_input']); //


    // roomsize misspelt
    malformed_json.add([{ 
        "roSize" : [5, 5], 
        "coords" : [1, 2], 
        "patches" : [[1, 0], [2, 2], [2, 3]], 
        "instructions" : "NEWS" 
        }]);

    // coords misspelt
    malformed_json.add([{ 
    "roomSize" : [5, 5], 
    "cords" : [1, 2], 
    "patches" : [[1, 0], [2, 2], [2, 3]], 
    "instructions" : "NEWS" 
    }]);

    // patches misspelt
    malformed_json.add([{ 
        "roomSize" : [5, 5], 
        "coords" : [1, 2], 
        "pches" : [[1, 0], [2, 2], [2, 3]], 
        "instructions" : "NEWS" 
        }]);

    // instructions misspelt
    malformed_json.add([{ 
        "roomSize" : [5, 5], 
        "coords" : [1, 2], 
        "patches" : [[1, 0], [2, 2], [2, 3]], 
        "insuctions" : "NEWS" 
        }]);

    // missing roomsize key
    malformed_json.add([{ 
        "coords" : [1, 2], 
        "patches" : [[1, 0], [2, 2], [2, 3]], 
        "instructions" : "NEWS" 
        }]);

    // missing coords key
    malformed_json.add([{ 
        "roomSize" : [5, 5],
        "patches" : [[1, 0], [2, 2], [2, 3]], 
        "instructions" : "NEWS" 
        }]);

    // missing patches key
    malformed_json.add([{ 
        "roomSize" : [5, 5], 
        "coords" : [1, 2], 
        "instructions" : "NEWS" 
        }]);

    // missing instructions key
    malformed_json.add([{ 
        "roomSize" : [5, 5], 
        "coords" : [1, 2], 
        "patches" : [[1, 0], [2, 2], [2, 3]]
        }]);

    // missing every
    malformed_json.add([{ 
        "sdsfdf" : [5, 5], 
        "sdfsd" : [1, 2], 
        "sdfsdf" : [[1, 0], [2, 2], [2, 3]]
        }]);

Feature('malformed-json');

Data(malformed_json).Scenario('Check malformed input json', ({ I, current }) => {
    const response = I.sendPostRequest('/v1/cleaning-sessions',current.robot_input);

    // check that response code is 4xx
    I.seeResponseCodeIsClientError();
  }).tag('@malformed');