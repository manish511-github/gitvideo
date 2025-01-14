/*
  Warnings:

  - A unique constraint covering the columns `[fileName]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Video_fileName_key" ON "Video"("fileName");
