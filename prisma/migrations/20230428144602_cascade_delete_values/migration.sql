-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Value" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Value_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Value" ("categoryId", "date", "id", "value") SELECT "categoryId", "date", "id", "value" FROM "Value";
DROP TABLE "Value";
ALTER TABLE "new_Value" RENAME TO "Value";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
