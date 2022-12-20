This file covers the thinking as I am about to create the test cases. Changes to the file will be made accordingly. The goal for this file is provide a map of the thought process.

## Expected: 

    - Test a service
    Given:
    - Service accepts a json 
    - Service output is a json

## Things to Test: 

    - Test input
        - correct input
            - square room - DONE
            - rectangular room - DONE
            - single directional move - row  - DONE
            - single directional move - columns - DONE
            - circular move  - DONE
        - maligned input
            - -ve input - DONE
            - malformed input (missing comma, brackets) 
            - missing keys - DONE
            - misspelt keys - DONE
            - unexpected input  - DONE
            - wrong brackets 
            - complete gibberish - DONE
            - starting coordinate outside of the rectangle - DONE
        - edge cases
            - max, min - DONE
            - single row room - DONE 
            - single column room  - DONE
            - 1x1 room  - DONE
    - Correctness of the output
        - error handling
            - Non-POST request  - DONE
        - correct garbage cleaned up

## Report:  

    The service to simulate a robot cleaning a given room was tested. A list of all the tests performed is listed above. There were some that were left out.

    Install: 
    
        Please follow instructions on https://codecept.io/api/#installation and follow along to install the required. 
    
    To run all tests:

        npx codeceptjs run  --debug 

        valid room input tests: npx codeceptjs run  --debug --grep '@validroom'
        non-post request tests: npx codeceptjs run  --debug --grep '@nonpost'
        malformed json tests  : npx codeceptjs run  --debug --grep '@malformed'
        invalid path tests    : npx codeceptjs run  --debug --grep '@invalidpath'
        edge case tests:      : npx codeceptjs run  --debug --grep '@edgecase'
        circular path test    : npx codeceptjs run  --debug --grep '@slow'

    Here are the tests that weren't done and why:
    
        I didn't have time to figure out the way to pass in json as a string in the data table. Plus, these seemed a P2 case since the schema not    matching
        has been tested:
            - malformed input (missing comma, brackets) 
            - wrong brackets 
        I am not sure what I was thinking when I wrote this. Perhaps checking the server state:
        - correct garbage cleaned up

    Some optimizations were made to be able to test easily: 
    
        The correctness of the cleanup and robot positioning was tested via a couple of manually computed patches and resting coords. This is an area 
        of improvement which could automate testing to figure out bugs in the service logic. 

        The API was tested for stability, not performance. I wasn't sure how to turn on performance testing in codeceptjs. 

        Thirdly, the code organization and BDD formatting was traded for completion and data-driven testing. I tried to organize the code into Given/Then but
        I couldn't figure out how to enable that with data_tables. The directory would also look a lot cleaner if the data tables were organized in one folder.
        This would be a V2 backlog item and can be fixed with better knowledge of the system. 

    Suggestions to the dev team:

        - Overall, the service looks quite stable despite the bugs. Congratulations!
        - The "roomsize" key needs to be guarded since it seems to result in server error. Please check server logs. 
        - The "patches" key accepts negative coordinates and computes which needs to be looked into.
        - Please consider returning useful error messages

    Next steps:
        - Cleanup the test dir and organize better
        - Enable performance testing
        - Enable automatic validation of service correctness
## BUGS: 

    - Single row/column room doesn't move the robot despite giving valid move instructions
        - Consequently, the patches aren't cleaned 
        - repro: 
            run: npx codeceptjs run  --debug --grep '@validroom'
    - reports 200 when move instructions are empty
        - repro: 
            run: npx codeceptjs run  --debug --grep '@invalidpath' 
    - reports 500 when:
        - the "roomsize" is misspelt in input json; should report 4xx;
        - the "roomsize" key is missing
        - repro:
            run: npx codeceptjs run  --debug --grep '@malformed'
    - reports 200 when roomsize is -ve coords
    - when patches coordinates are -ve, service returns 200 and computes patch cleaned
        - repro:
            run: npx codeceptjs run  --debug --grep '@edgecase' 
