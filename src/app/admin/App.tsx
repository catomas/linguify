"use client";

import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseList } from "./course/List";
import { CourseCreate } from "./course/Create";
import { CourseEdit } from "./course/Edit";
import { UnitList } from "./units/List";
import { UnitCreate } from "./units/Create";
import { UnitEdit } from "./units/Edit";
import { LessonList } from "./lesson/List";
import { LessonCreate } from "./lesson/Create";
import { LessonEdit } from "./lesson/Edit";
import { ChallengeList } from "./challenges/List";
import { ChallengesCreate } from "./challenges/Create";
import { ChallengesEdit } from "./challenges/Edit";
import { ChallengeOptionsList } from "./challengeOptions/List";
import { ChallengeOptionsEdit } from "./challengeOptions/Edit";
import { ChallengeOptionsCreate } from "./challengeOptions/Create";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        recordRepresentation="title"
      />
      <Resource
        name="units"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
        recordRepresentation="title"
      />
      <Resource
        name="lessons"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        recordRepresentation="title"
      />
      <Resource
        name="challenges"
        list={ChallengeList}
        create={ChallengesCreate}
        edit={ChallengesEdit}
        recordRepresentation="question"
      />
      <Resource
        name="challengeOptions"
        list={ChallengeOptionsList}
        create={ChallengeOptionsCreate}
        edit={ChallengeOptionsEdit}
        recordRepresentation="text"
        options={{ label: "Challenge Options" }}
      />
    </Admin>
  );
};

export default App;
