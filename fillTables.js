const fetch = require("node-fetch");
const { weeksOf8 } = require("./tools/weeks-of-8");
const { weeksOf4 } = require("./tools/weeks-of-4");
const { weeksOf2 } = require("./tools/weeks-of-2");
const {
  energisers,
  recordings,
  journeyData,
  eventData,
  nameData,
} = require("./tools/data");

async function postBootcamper(bootcamperList) {
  for (i = 0; i < bootcamperList.length; i++) {
    const res = await fetch(
      "https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcampers",
      {
        method: "POST",
        body: JSON.stringify({
          firstName: bootcamperList[i].firstName,
          lastName: bootcamperList[i].lastName,
          bootcamperImage: bootcamperList[i].bootcamperImage,
          link: bootcamperList[i].link,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    console.log(`${bootcamperList[i].name} added`);
  }
}

async function postBootcamperEights(bootcamperEightsList) {
  for (i = 0; i < bootcamperEightsList.length; i++) {
    const res = await fetch(
      "https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-eights",
      {
        method: "POST",
        body: JSON.stringify({
          week: bootcamperEightsList[i].week,
          groups: bootcamperEightsList[i].groups,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    console.log(`${bootcamperEightsList[i].week} added`);
  }
}

async function postBootcamperFours(bootcamperFoursList) {
  for (i = 0; i < bootcamperFoursList.length; i++) {
    const res = await fetch(
      "https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-fours",
      {
        method: "POST",
        body: JSON.stringify({
          week: bootcamperFoursList[i].week,
          groups: bootcamperFoursList[i].groups,
        }),
      }
    );
    const data = await res.json();
    console.log(`${bootcamperFoursList[i].week} added`);
  }
}

async function postBootcamperPairs(bootcamperPairsList) {
  for (i = 0; i < bootcamperPairsList.length; i++) {
    const res = await fetch(
      "https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/bootcamper-pairs",
      {
        method: "POST",
        body: JSON.stringify({
          week: bootcamperPairsList[i].week,
          pairs: bootcamperPairsList[i].groups,
        }),
      }
    );
    const data = await res.json();
    console.log(`${bootcamperPairsList[i].week} added`);
  }
}
async function postEnergiser(energiserList) {
  for (i = 0; i < energiserList.length; i++) {
    const res = await fetch(
      "https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/energisers",
      {
        method: "POST",
        body: JSON.stringify({
          name: energiserList[i].name,
          description: energiserList[i].description,
          link: energiserList[i].link,
          logo: energiserList[i].logo,
          screenshot: energiserList[i].screenshot,
          color: energiserList[i].color,
          bootcamperImage: energiserList[i].bootcamperImage,
        }),
      }
    );
    const data = await res.json();
    console.log(`${energiserList[i].name} added`);
  }
}

async function postResources(resourcesList) {
  for (i = 0; i < resourcesList.length; i++) {
    const res = await fetch(
      "https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/resources",
      {
        method: "POST",
        body: JSON.stringify({
          topic: resourcesList[i].topic,
          resource: resourcesList[i].resource,
          week: resourcesList[i].week,
          color: resourcesList[i].color,
          link: resourcesList[i].link,
          thumbnail: resourcesList[i].thumbnail,
          description: resourcesList[i].description,
          topicIcon: resourcesList[i].topicIcon,
        }),
      }
    );
    const data = await res.json();
    console.log(`${resourcesList[i].topic} added`);
  }
}

async function postWeek(week) {
  const res = await fetch(
    "https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/weeks",
    {
      method: "POST",
      body: JSON.stringify({
        week: week,
      }),
    }
  );
  const data = await res.json();
  console.log(`${week} added`);
}

async function postRecordings(recordingsList) {
  for (i = 0; i < recordingsList.length; i++) {
    const res = await fetch(
      "https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/recordings",
      {
        method: "POST",
        body: JSON.stringify({
          date: recordingsList[i].date,
          title: recordingsList[i].title,
          link: recordingsList[i].link,
          thumbnail: recordingsList[i].thumbnail,
        }),
      }
    );
    const data = await res.json();
    console.log(`${recordingsList[i].date} added`);
  }
}

async function postEvents(eventsList) {
  for (i = 0; i < eventsList.length; i++) {
    const res = await fetch(
      "https://d27b2o3all.execute-api.eu-west-1.amazonaws.com/dev/events",
      {
        method: "POST",
        body: JSON.stringify({
          date: eventsList[i].date,
          event: eventsList[i].event,
        }),
      }
    );
    const data = await res.json();
    console.log(`${eventsList[i].date} added`);
  }
}

//console.log(nameData);
//postBootcamper(nameData);
//postBootcamperEights(weeksOf8);
//postBootcamperPairs(weeksOf2);
//postBootcamperFours(weeksOf4);
//postEnergiser(energisers);
//postRecordings(recordings);
//postWeek("6");
//postResources(journeyData);
//postEvents(eventData);
