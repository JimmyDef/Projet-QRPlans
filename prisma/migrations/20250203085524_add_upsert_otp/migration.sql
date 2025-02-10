/*
  Warnings:

  - A unique constraint covering the columns `[userId,purpose]` on the table `UserOtp` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserOtp_userId_purpose_key` ON `UserOtp`(`userId`, `purpose`);
