import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-http";

import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "Italian",
        imageSrc: "/it.svg",
      },
      {
        id: 3,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 4,
        title: "Croatian",
        imageSrc: "/hr.svg",
      },
      {
        id: 5,
        title: "Japanese",
        imageSrc: "/jp.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        courseId: 1,
        order: 1,
      },
      {
        id: 2,
        title: "Unit 2",
        description: "Unit 2 description",
        courseId: 1,
        order: 2,
      },
      {
        id: 3,
        title: "Unit 3",
        description: "Unit 3 description",
        courseId: 1,
        order: 3,
      },
      {
        id: 4,
        title: "Unit 1",
        description: "Unit 1 description",
        courseId: 2,
        order: 1,
      },
      {
        id: 5,
        title: "Unit 2",
        description: "Unit 2 description",
        courseId: 2,
        order: 2,
      },
      {
        id: 6,
        title: "Unit 3",
        description: "Unit 3 description",
        courseId: 2,
        order: 3,
      },
      {
        id: 7,
        title: "Unit 1",
        description: "Unit 1 description",
        courseId: 3,
        order: 1,
      },
      {
        id: 8,
        title: "Unit 2",
        description: "Unit 2 description",
        courseId: 3,
        order: 2,
      },
      {
        id: 9,
        title: "Unit 3",
        description: "Unit 3 description",
        courseId: 3,
        order: 3,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        title: "Nouns",
        description: "Learn the nouns in Spanish",
        unitId: 1,
        order: 1,
      },
      {
        id: 2,
        title: "Verbs",
        description: "Learn the verbs in Spanish",
        unitId: 1,
        order: 2,
      },
      {
        id: 3,
        title: "Adjectives",
        description: "Learn the adjectives in Spanish",
        unitId: 1,
        order: 3,
      },
      {
        id: 4,
        title: "Nouns",
        description: "Learn the adjectives in Spanish",
        unitId: 1,
        order: 4,
      },
      {
        id: 5,
        title: "Verbs",
        description: "Learn the verbs in Spanish",
        unitId: 1,
        order: 5,
      },
      {
        id: 6,
        title: "Adjectives",
        description: "Learn the adjectives in Spanish",
        unitId: 1,
        order: 6,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: "Which one of these is the 'the man'?",
      },
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        order: 2,
        question: "'the man'",
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: "Which one of these is the 'the robot' ",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: "/man.png",
        correct: true,
        text: "El hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/woman.png",
        correct: false,
        text: "La mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/robot.png",
        correct: false,
        text: "El robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        correct: true,
        text: "El hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "La mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "El robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        imageSrc: "/man.png",
        correct: false,
        text: "El hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/woman.png",
        correct: false,
        text: "La mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/robot.png",
        correct: true,
        text: "El robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2,
        type: "SELECT",
        order: 1,
        question: "Which one of these is the 'the man'?",
      },
      {
        id: 5,
        lessonId: 2,
        type: "ASSIST",
        order: 2,
        question: "'the man'",
      },
      {
        id: 6,
        lessonId: 2,
        type: "SELECT",
        order: 3,
        question: "Which one of these is the 'the robot' ",
      },
    ]);

    console.log("Seed complete");
  } catch (error) {
    console.log(error);
    throw new Error("Error seeding database");
  }
};

main();
