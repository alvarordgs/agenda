/*
  Warnings:

  - You are about to drop the column `prescricaoId` on the `historico` table. All the data in the column will be lost.
  - Added the required column `id_prescricao` to the `Historico` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `historico` DROP FOREIGN KEY `Historico_prescricaoId_fkey`;

-- AlterTable
ALTER TABLE `historico` DROP COLUMN `prescricaoId`,
    ADD COLUMN `id_prescricao` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_id_prescricao_fkey` FOREIGN KEY (`id_prescricao`) REFERENCES `Prescricao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
