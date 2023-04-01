-- CreateTable
CREATE TABLE "Value" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Value_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
