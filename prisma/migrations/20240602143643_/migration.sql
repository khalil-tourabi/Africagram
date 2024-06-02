-- DropForeignKey
ALTER TABLE `aime` DROP FOREIGN KEY `Aime_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `commentaire` DROP FOREIGN KEY `Commentaire_post_id_fkey`;

-- AddForeignKey
ALTER TABLE `Aime` ADD CONSTRAINT `Aime_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commentaire` ADD CONSTRAINT `Commentaire_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
