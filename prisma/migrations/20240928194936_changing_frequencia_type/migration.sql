/*
  Warnings:

  - Changed the type of `frequencia` on the `prescricao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `prescricao` DROP COLUMN `frequencia`,
    ADD COLUMN `frequencia` INTEGER NOT NULL;
