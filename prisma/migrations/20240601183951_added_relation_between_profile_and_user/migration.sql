-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_id_utilisateur_fkey` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
