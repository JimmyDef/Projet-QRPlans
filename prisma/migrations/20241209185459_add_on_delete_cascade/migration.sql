-- DropForeignKey
ALTER TABLE `activatetoken` DROP FOREIGN KEY `ActivateToken_userId_fkey`;

-- AddForeignKey
ALTER TABLE `ActivateToken` ADD CONSTRAINT `ActivateToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
