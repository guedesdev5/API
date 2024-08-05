-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fornecedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(20) NULL,
    `email` VARCHAR(100) NULL,
    `endereco` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(50) NOT NULL,
    `permissao` INTEGER NOT NULL,

    UNIQUE INDEX `Vendedor_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `preco` DOUBLE NULL,
    `quantidade` INTEGER NOT NULL,
    `id_categoria` INTEGER NULL,
    `id_fornecedor` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_venda` VARCHAR(255) NOT NULL,
    `quantidade_vendida` INTEGER NOT NULL,
    `id_produto` INTEGER NULL,
    `id_vendedor` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entradas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_entrada` VARCHAR(255) NOT NULL,
    `quantidade_entrada` INTEGER NOT NULL,
    `id_produto` INTEGER NULL,
    `id_fornecedor` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `entradas` ADD CONSTRAINT `entradas_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `produtos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `entradas` ADD CONSTRAINT `entradas_ibfk_2` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;


-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_id_fornecedor_fkey` FOREIGN KEY (`id_fornecedor`) REFERENCES `Fornecedor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venda` ADD CONSTRAINT `Venda_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `Produto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venda` ADD CONSTRAINT `Venda_id_vendedor_fkey` FOREIGN KEY (`id_vendedor`) REFERENCES `Vendedor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
