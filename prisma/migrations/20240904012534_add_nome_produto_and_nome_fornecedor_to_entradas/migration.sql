-- CreateTable
CREATE TABLE `categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fornecedores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(20) NULL,
    `email` VARCHAR(100) NULL,
    `endereco` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendedores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(50) NULL,
    `permissao` INTEGER NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtos` (
    `id` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `preco` FLOAT NULL,
    `quantidade` INTEGER NOT NULL,
    `tipo_produto` VARCHAR(100) NULL,
    `nome_fornecedor` VARCHAR(100) NULL,
    `id_categoria` INTEGER NULL,
    `id_fornecedor` INTEGER NULL,

    INDEX `id_categoria`(`id_categoria`),
    INDEX `id_fornecedor`(`id_fornecedor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_venda` VARCHAR(255) NOT NULL,
    `quantidade_vendida` INTEGER NOT NULL,
    `nome_produto` VARCHAR(255) NOT NULL,
    `nome_vendedor` VARCHAR(255) NOT NULL,
    `id_produto` INTEGER NULL,
    `id_vendedor` INTEGER NULL,

    INDEX `id_produto`(`id_produto`),
    INDEX `id_vendedor`(`id_vendedor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entradas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_entrada` VARCHAR(255) NOT NULL,
    `quantidade_entrada` INTEGER NOT NULL,
    `nome_produto` VARCHAR(255) NOT NULL,
    `nome_fornecedor` VARCHAR(255) NOT NULL,
    `id_produto` INTEGER NULL,
    `id_fornecedor` INTEGER NULL,

    INDEX `id_produto`(`id_produto`),
    INDEX `id_fornecedor`(`id_fornecedor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `produtos_ibfk_2` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vendas` ADD CONSTRAINT `vendas_ibfk_1` FOREIGN KEY (`id_vendedor`) REFERENCES `vendedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vendas` ADD CONSTRAINT `vendas_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produtos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `entradas` ADD CONSTRAINT `entradas_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `produtos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `entradas` ADD CONSTRAINT `entradas_ibfk_2` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
