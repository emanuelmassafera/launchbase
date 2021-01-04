const faker = require('faker');

const Instructor = require('./src/app/models/Instructor');
const Member = require('./src/app/models/Member');

const { age, date } = require('./src/lib/utils');

let instructorsIds = [];
let totalInstructors = 10;
let totalMembers = 5;

async function createInstructors() {
  const instructors = [];
  const services = ['Musculação', 'Corrida', 'Natação', 'Luta'];
  const gender = ['M', 'F'];

  while (instructors.length < totalInstructors) {
    instructors.push({
      name: faker.name.findName(),
      avatar_url: 'https://source.unsplash.com/collection/181462/500x500',
      gender: faker.random.arrayElement(gender),
      services: services[faker.random.number(3)],
      birth: date(faker.date.past()).iso,
      created_at: date(Date.now()).iso,
    });
  }

  const instructorsPromise = instructors.map((instructor) =>
    Instructor.create(instructor)
  );

  instructorsIds = await Promise.all(instructorsPromise);
}

async function createMembers() {
  const members = [];
  const blood = ['A0', 'A1', 'B0', 'B1', 'O0', 'O1', 'AB0', 'AB1'];
  const gender = ['M', 'F'];

  while (members.length < totalMembers) {
    members.push({
      name: faker.name.findName(),
      avatar_url: 'https://source.unsplash.com/collection/181462/500x500',
      gender: faker.random.arrayElement(gender),
      email: faker.internet.email(),
      birth: date(faker.date.past()).iso,
      blood: faker.random.arrayElement(blood),
      weight: faker.random.number(125),
      height: faker.random.number(200),
      instructor_id:
        instructorsIds[Math.floor(Math.random() * totalInstructors)],
    });
  }

  const membersPromise = members.map((member) => Member.create(member));

  await Promise.all(membersPromise);
}

async function init() {
  await createInstructors();
  await createMembers();
}

init();
