-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fornecedores" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "endereco" TEXT,

    CONSTRAINT "fornecedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendedores" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT,
    "permissao" INTEGER NOT NULL,

    CONSTRAINT "vendedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "preco" DOUBLE PRECISION,
    "quantidade" INTEGER NOT NULL,
    "tipo_produto" TEXT,
    "nome_fornecedor" TEXT,
    "id_categoria" INTEGER,
    "id_fornecedor" INTEGER,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendas" (
    "id" SERIAL NOT NULL,
    "data_venda" TIMESTAMP(3) NOT NULL,
    "quantidade_vendida" INTEGER NOT NULL,
    "nome_produto" TEXT NOT NULL,
    "nome_vendedor" TEXT NOT NULL,
    "id_produto" INTEGER,
    "id_vendedor" INTEGER,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entradas" (
    "id" SERIAL NOT NULL,
    "data_entrada" TIMESTAMP(3) NOT NULL,
    "quantidade_entrada" INTEGER NOT NULL,
    "nome_produto" TEXT NOT NULL,
    "preco" DOUBLE PRECISION,
    "nome_fornecedor" TEXT NOT NULL,
    "id_produto" INTEGER,
    "id_fornecedor" INTEGER,

    CONSTRAINT "entradas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vendedores_email_key" ON "vendedores"("email");

-- CreateIndex
CREATE INDEX "produtos_id_categoria_idx" ON "produtos"("id_categoria");

-- CreateIndex
CREATE INDEX "produtos_id_fornecedor_idx" ON "produtos"("id_fornecedor");

-- CreateIndex
CREATE INDEX "vendas_id_produto_idx" ON "vendas"("id_produto");

-- CreateIndex
CREATE INDEX "vendas_id_vendedor_idx" ON "vendas"("id_vendedor");

-- CreateIndex
CREATE INDEX "entradas_id_produto_idx" ON "entradas"("id_produto");

-- CreateIndex
CREATE INDEX "entradas_id_fornecedor_idx" ON "entradas"("id_fornecedor");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "fornecedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_id_vendedor_fkey" FOREIGN KEY ("id_vendedor") REFERENCES "vendedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entradas" ADD CONSTRAINT "entradas_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entradas" ADD CONSTRAINT "entradas_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "fornecedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
