# School of Code Dashboard Organisation App - Back End

## Brief
To create an app that will help with the organisational issues relating to the natioal scale-up of School of Code.

We narrowed this down to:

- Coach organisation

  - Daily energiser selection
  - Cohort grouping organisation
  - Ease of lecture recording access

- Bootcamper organisation

  - Reading list availability
  - Progress tracking
  - Ease of lecture recording access

## Back End Overview
This backend consists of 9 different REST API endpoints to hold all of the data required for the Dashboard app. The databases were deployed using Serverless which allowed for adaptability during project development.

## License
MIT

## Credits
- Valerio Romaniello
- Ayaan Hassan
- Yrral Galura
- Claire Doswell

## Available Endpoints

### Energisers Table


GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/energisers

GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/energisers/{id}

POST - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/energisers

PUT - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/energisers/{id}

DELETE - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/energisers/{id}



### Bootcamper Names Table


GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcampers

GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcampers/{id}

POST - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcampers

PUT - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcampers/{id}

DELETE - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcampers/{id}


### Bootcamper Pairs Table


GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-pairs

GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-pairs/{id}

POST - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-pairs

PUT - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-pairs/{id}

DELETE - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-pairs/{id}


### Bootcamper Fours Table


GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-fours

GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-fours/{id}

POST - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-fours

PUT - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-fours/{id}

DELETE - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-fours/{id}


### Bootcamper Eights Table


GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-eights

GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-eights/{id}

POST - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-eights


PUT - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-eights/{id}

DELETE - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-eights/{id}


### Resources Table


GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/resources

GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/resources/{id}

POST - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/resources

PUT - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/resources/{id}

DELETE - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/resources/{id}


### Recordings Table


GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/recordings

GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/recordings/{id}

POST - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/recordings

PUT - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/recordings/{id}

DELETE - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/recordings/{id}


### Weeks Table


GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/weeks

GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/weeks/{id}

POST - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/weeks

PUT - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/weeks/{id}

DELETE - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/weeks/{id}

 

### Events Table


GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/events

GET - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/events/{id}

POST - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/events

PUT - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/events/{id}

DELETE - https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/events/{id}
