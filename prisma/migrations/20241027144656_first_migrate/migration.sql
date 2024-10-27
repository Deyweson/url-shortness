-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "original_url" TEXT NOT NULL,
    "shortness_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_original_url_key" ON "User"("original_url");

-- CreateIndex
CREATE UNIQUE INDEX "User_shortness_url_key" ON "User"("shortness_url");
