/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "urls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "original_url" TEXT NOT NULL,
    "shortness_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_original_url_key" ON "urls"("original_url");

-- CreateIndex
CREATE UNIQUE INDEX "urls_shortness_url_key" ON "urls"("shortness_url");
