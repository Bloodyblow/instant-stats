/*
  Warnings:

  - You are about to drop the column `userId` on the `Category` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "icon" TEXT,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "units" TEXT NOT NULL
);
INSERT INTO "new_Category" ("icon", "id", "name", "units") SELECT "icon", "id", "name", "units" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
