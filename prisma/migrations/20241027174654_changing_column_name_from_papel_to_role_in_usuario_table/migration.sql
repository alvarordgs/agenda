/*
  Warnings:

  - You are about to drop the column `papel` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `papel`,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';
