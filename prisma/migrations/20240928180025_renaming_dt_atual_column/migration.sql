/*
  Warnings:

  - You are about to drop the column `id_prescricao` on the `historico` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `historico` DROP FOREIGN KEY `Historico_id_prescricao_fkey`;

-- AlterTable
ALTER TABLE `historico` DROP COLUMN `id_prescricao`,
    ADD COLUMN `prescricaoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_prescricaoId_fkey` FOREIGN KEY (`prescricaoId`) REFERENCES `Prescricao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
