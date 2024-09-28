/*
  Warnings:

  - You are about to drop the column `dt_atual` on the `historico` table. All the data in the column will be lost.
  - Added the required column `data_atual` to the `Historico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `historico` DROP COLUMN `dt_atual`,
    ADD COLUMN `data_atual` DATETIME(3) NOT NULL;
