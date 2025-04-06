/*
  Warnings:

  - You are about to alter the column `name` on the `Folder` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(23)`.
  - A unique constraint covering the columns `[folderId,name]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `File` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Folder` MODIFY `name` VARCHAR(23) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `File_folderId_name_key` ON `File`(`folderId`, `name`);
