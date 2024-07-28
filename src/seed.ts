import { db } from "./server/db";
import { classes, gradeLevels, materials, readingMaterials, units } from "./server/db/schema";

try {
  const orgId = process.argv[2];

  const GRADE_LEVELS_DATA: (typeof gradeLevels.$inferInsert)[] = [
    {
      name: "L1",
    },
    {
      name: "L2",
    },
    {
      name: "L3",
    },
    {
      name: "L4",
    },
  ];

  const gradeLevelsResults = await db
    .insert(gradeLevels)
    .values(GRADE_LEVELS_DATA)
    .returning();

  const CLASSES_DATA: (typeof classes.$inferInsert)[] = [
    {
      gradeLevelId: gradeLevelsResults[0]!.id,
      name: "Intro to Islamic history",
      orgId,
    },
    {
      gradeLevelId: gradeLevelsResults[1]!.id,
      name: "Intro to Islamic history 2",
      orgId,
    },
    {
      gradeLevelId: gradeLevelsResults[1]!.id,
      name: "Language",
      orgId,
    },
  ];

  const classesResults = await db
    .insert(classes)
    .values(CLASSES_DATA)
    .returning();

  const UNITS_DATA: { [key: string]: (typeof units.$inferInsert)[] } = {
    class1: [
      {
        classId: classesResults[0]!.id,
        name: "Unit 1",
      },
      {
        classId: classesResults[0]!.id,
        name: "Unit 2",
      },
      {
        classId: classesResults[0]!.id,
        name: "Unit 3",
      },
      {
        classId: classesResults[0]!.id,
        name: "Unit 4",
      },
    ],
    class2: [
      {
        classId: classesResults[1]!.id,
        name: "Unit 1",
      },
      {
        classId: classesResults[1]!.id,
        name: "Unit 2",
      },
      {
        classId: classesResults[1]!.id,
        name: "Unit 3",
      },
    ],
    class3: [
      {
        classId: classesResults[2]!.id,
        name: "Unit 1",
      },
      {
        classId: classesResults[2]!.id,
        name: "Unit 2",
      },
    ],
  };

  const class1Units = await db.insert(units).values(UNITS_DATA.class1!);
  const class2Units = await db.insert(units).values(UNITS_DATA.class2!);
  const class3Units = await db.insert(units).values(UNITS_DATA.class3!);

  const createdMaterials = await db.insert(materials).values([
    {
      "activeAt": new Date(),
      "dueAt": new Date(),
      "unitId": "A",
      "id": "test-reading"
    }
  ])
  await db.insert(readingMaterials).values([
    {
      id: "test-reading",
      title: "Al-Fatihah",
      materialId: "test-reading",
      content: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      holyBook: "Quran",
      chapter: "Al-Fatihah",
      startVerse: "1",
      endVerse: "7",
    },
  ]);

  console.log("Database seeding completed successfully.");
} catch (error) {
  console.error("An error occurred while seeding the database.", error);
}
