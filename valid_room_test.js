Feature('Check valid inputs');

// Define data table inside a test or load from another module
let valid_room_and_patches = new DataTable(['robot_input', 'final_coords', 'patches_cleaned']); //

    // sample input given
    valid_room_and_patches.add([{ 
    "roomSize" : [5, 5], 
    "coords" : [1, 2], 
    "patches" : [[1, 0], [2, 2], [2, 3]], 
    "instructions" : "NNESEESWNWW" 
    },
    [1,3],
    1]);

    // room has one row
    valid_room_and_patches.add([{ 
        "roomSize" : [1, 5], 
        "coords" : [0, 0], 
        "patches" : [[1, 0], [2, 2], [2, 3], [0, 3]], 
        "instructions" : "EEEEE" 
        },
        [0, 4],
        1]);

    // room has one column
    valid_room_and_patches.add([{ 
        "roomSize" : [5, 1], 
        "coords" : [0, 0], 
        "patches" : [[1, 0], [2, 2], [2, 3]], 
        "instructions" : "NNNNN" 
        },
        [4,0],
        1]);

    // rectangular room
    valid_room_and_patches.add([{ 
        "roomSize" : [5, 3], 
        "coords" : [0, 0], 
        "patches" : [[1, 0], [2, 2], [2, 1]], 
        "instructions" : "NNN" 
        },
        [0, 2],
        1]);

Data(valid_room_and_patches).Scenario('Check valid room coordinates', ({ I, current }) => {
    const response = I.sendPostRequest('/v1/cleaning-sessions',current.robot_input);

    // check that response code is 2xx
    I.seeResponseCodeIsSuccessful();
    
    // check that response contains keys
    I.seeResponseContainsKeys(['coords', 'patches']);

    I.seeResponseValidByCallback(({ data, status, expect }) => {
        // Verify the final resting coordinates for the robot
        expect(data.coords[0]).to.equal(current.final_coords[0]);
        expect(data.coords[1]).to.equal(current.final_coords[1]);

        // Verify the number of patches cleaned
        expect(data.patches).to.equal(current.patches_cleaned)
      })
  }).tag('@validroom');