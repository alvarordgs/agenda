/*
  Warnings:

  - You are about to drop the column `data_nascimento` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `usuario` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Usuario_email_key` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `data_nascimento`,
    DROP COLUMN `email`,
    ADD COLUMN `dt_nascimento` DATETIME(3) NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Prescricao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `observacao` VARCHAR(191) NULL,
    `id_remedio` INTEGER NOT NULL,
    `frequencia` DATETIME(3) NOT NULL,
    `dt_inicio` DATETIME(3) NOT NULL,
    `dt_fim` DATETIME(3) NULL,
    `status` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Historico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prescricao` INTEGER NOT NULL,
    `dt_atual` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Historico_id_prescricao_key`(`id_prescricao`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Remedio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `funcao` VARCHAR(191) NOT NULL,
    `dosagem` DOUBLE NOT NULL,
    `status` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prescricao` ADD CONSTRAINT `Prescricao_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prescricao` ADD CONSTRAINT `Prescricao_id_remedio_fkey` FOREIGN KEY (`id_remedio`) REFERENCES `Remedio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_id_prescricao_fkey` FOREIGN KEY (`id_prescricao`) REFERENCES `Prescricao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
