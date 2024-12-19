-- DropForeignKey
ALTER TABLE `passwordresettoken` DROP FOREIGN KEY `PasswordResetToken_userId_fkey`;

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
