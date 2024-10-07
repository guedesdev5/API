import express from 'express'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;


const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.get('/apiGerenciamento', (req, res) =>{
    res.send('Inicializado com sucesso...')
})

//post Categorias
app.post('/apiGerenciamento/categorias', async (req, res) => {
    try {
        await prisma.categorias.create({
            data: {
                nome: req.body.nome,
                descricao: req.body.descricao,
            },
        });
        res.status(201).json({message: 'Dados inseridos corretamente',
            status: 0
        });
    } catch (error) {
        if (error.code === 'P2002' && error.meta.target === 'Categorias_nome_key') {
            res.status(400).json({ error: 'Nome da categoria já existe.' });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Erro ao inserir os dados.',
                status: 1
             });
        }
    }
});

//put categorias
app.put('/apiGerenciamento/categorias/:id', async (req, res) => { 
    try {
        await prisma.categorias.update({
            where: {
                id: parseInt(req.params.id, 10)
            },
            data: {
                nome: req.body.nome,
                descricao: req.body.descricao
            }
        })
        res.status(201).json({message: 'Dados atualizados!',
            status: 0
        })
    }catch (error){
        console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar os dados.',
                status: 1
             });
    }   
})

//delete categorias
app.delete('/apiGerenciamento/categorias/:id', async (req, res) => {
    
    try{
        await prisma.categorias.delete({
            where: {
                id: parseInt(req.params.id, 10)
            }
        })
        res.status(201).json({ message: "Usuário deletado com sucesso!",
            status: 0
        })
    } catch (error){
        console.error(error);
            res.status(500).json({ error: 'Erro ao deletar categoria.',
                status: 1
             });
    }
})

//get Categorias
app.get('/apiGerenciamento/categorias', async (req, res) => {
    try{
        if(req.query.id) {
            const categorias = await prisma.categorias.findMany({
                where: {
                    id: parseInt(req.query.id, 10)
                }
            })
            res.status(200).json({message: 'Sucesso ao acessar dados',
                status: 0,
                data:categorias
            })
        } else {
            const categorias = await prisma.categorias.findMany()
            res.status(200).json({message: 'Sucesso ao acessar dados',
                status: 0,
                data:categorias
            })
        }
        
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao pegar dados das categoria.', error,
            status: 1
         });
    }    
})

//#############################################

// post vendedores
app.post('/apiGerenciamento/vendedores', async (req, res) => {
    try {
        await prisma.vendedores.create({
            data: {
                nome: req.body.nome,
                username: req.body.username,
                email: req.body.email,
                senha: req.body.senha,
                permissao: req.body.permissao
            },
        });
        res.status(201).json({message: 'Dados inseridos corretamente',
            status: 0
        });
    } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao inserir os dados.',
                status: 1
             });
    }
});

//put vendedores
app.put('/apiGerenciamento/vendedores/:id', async (req, res) => { 
    try {
        await prisma.vendedores.update({
            where: {
                id: parseInt(req.params.id, 10)
            },
            data: {
                nome: req.body.nome,
                username: req.body.username,
                email: req.body.email,
                senha: req.body.senha,
                permissao: req.body.permissao
            }
        })
        res.status(201).json({message: 'Dados atualizados!',
            status: 0
        })
    }catch (error){
        console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar os dados.',
                status: 1
             });
    }   
})

//delete vendedores
app.delete('/apiGerenciamento/vendedores/:id', async (req, res) => {
    
    try{
        await prisma.vendedores.delete({
            where: {
                id: parseInt(req.params.id, 10)
            }
        })
        res.status(201).json({ message: "Usuário deletado com sucesso!",
            status: 0
        })
    } catch (error){
        console.error(error);
            res.status(500).json({ error: 'Erro ao deletar categoria.',
                status: 1
             });
    }
})


//get vendedores
app.get('/apiGerenciamento/vendedores', async (req, res) => {
    try{
        if(req.query.id) {
            const vendedores = await prisma.vendedores.findMany({
                where: {
                    id: parseInt(req.params.id, 10)
                }
            })
            res.status(200).json({message: 'Sucesso ao acessar dados',
                status: 0,
                data:vendedores
            })
        } else {
            const vendedores = await prisma.vendedores.findMany()
            res.status(200).json({message: 'Sucesso ao acessar dados',
                status: 0,
                data:vendedores
            })
        }
        
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao pegar dados dos vendedores.',
            status: 1
         });
    } 
})



//#############################################

//post fornecedores
app.post('/apiGerenciamento/fornecedores', async (req, res) => {
    try {
        await prisma.fornecedores.create({
            data: {
                nome: req.body.nome,
                telefone: req.body.telefone,
                email: req.body.email,
                endereco: req.body.endereco
            },
        });
        res.status(201).json({message: 'Dados inseridos corretamente',
            status: 0
        });
    } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao inserir os dados: ',
                status: 1
             });
    }
});

//put fornecedores
app.put('/apiGerenciamento/fornecedores/:id', async (req, res) => { 
    try {
        await prisma.fornecedores.update({
            where: {
                id: parseInt(req.params.id, 10)
            },
            data: {
                nome: req.body.nome,
                telefone: req.body.telefone,
                email: req.body.email,
                endereco: req.body.endereco
            }
        })
        res.status(201).json({message: 'Dados atualizados!',
            status: 0
        })
    }catch (error){
        console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar os dados.',
                status: 1
             });
    }   
})

//delete fornecedores
app.delete('/apiGerenciamento/fornecedores/:id', async (req, res) => {
    
    try{
        await prisma.fornecedores.delete({
            where: {
                id: parseInt(req.params.id, 10)
            }
        })
        res.status(201).json({ message: "Usuário deletado com sucesso!",
            status: 0
        })
    } catch (error){
        console.error(error);
            res.status(500).json({ error: 'Erro ao deletar categoria.',
                status: 1
             });
    }
})

//get fornecedores
app.get('/apiGerenciamento/fornecedores', async (req, res) => {
    try{
        if(req.query.id) {
            const fornecedores = await prisma.fornecedores.findMany({
                where: {
                    id: parseInt(req.query.id, 10)
                }
            })
            res.status(200).json({message: 'Sucesso ao acessar dados',
                status: 0,
                data:fornecedores
            })
        } else {
            const fornecedores = await prisma.fornecedores.findMany()
            res.status(200).json({message: 'Sucesso ao acessar dados',
                status: 0,
                data:fornecedores
            })
        }
        
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao pegar dados das categoria.', error,
            status: 1
         });
    }    
})



//#############################################

//post produtos
app.post('/apiGerenciamento/produtos', async (req, res) => {
    try {
        const categoria = await prisma.categorias.findUnique({
            where: { id: req.body.id_categoria },
            select: { nome: true }
        });

        const fornecedor = await prisma.fornecedores.findUnique({
            where: { id: req.body.id_fornecedor },
            select: { nome: true }
        });

        if (!categoria || !fornecedor) {
            return res.status(404).json({ error: 'Categoria ou fornecedor não encontrados.' });
        }

        await prisma.produtos.create({
            data: {
                id: req.body.id,
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                tipo_produto: categoria.nome,
                nome_fornecedor: fornecedor.nome,
                id_categoria: req.body.id_categoria,
                id_fornecedor: req.body.id_fornecedor,
            },
        });

        res.status(201).json({
            message: 'Dados inseridos corretamente',
            status: 0
        });
    } catch (error) {
        
            console.error(error);
            res.status(500).json({
                error: error,
                status: 1
            });
        
    }
});

//put produtos
app.put('/apiGerenciamento/produtos/:id', async (req, res) => { 


        try {

            await prisma.produtos.update({
                where: {
                    id: parseInt(req.params.id, 10)
                },
                data: {
                    id: req.body.id,
                    nome: req.body.nome,
                    descricao: req.body.descricao,
                    preco: req.body.preco,
                    quantidade: req.body.quantidade
                }
            })
            res.status(201).json({message: 'Dados atualizassdos!',
                status: 0
            })
        }catch (error){
            console.error(error);
                res.status(500).json({ error: 'Erro ao atualizar os dados.',
                    status: 1
                 });
        }   
    
    
})






app.put('/apiGerenciamento/produtosEX/:id', async (req, res) => { 

    try{
        const produtoAtual = await prisma.produtos.findUnique({
            where: {
                id: parseInt(req.params.id, 10)
            },
        });
        const novaQuantidade = produtoAtual.quantidade + parseInt(req.body.quantidade_venda_excluida, 10);
        await prisma.produtos.update({
            where: {
                id: parseInt(req.params.id, 10)
            },
            data: {
                quantidade: novaQuantidade,
            }
        });
        res.status(201).json({message: 'Dados da exclusão excluidso!',
            status: 0
        })
    
    }catch (error){
        console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar os dados.d',
                status: 1
             });
    }


})



//delete produtos
app.delete('/apiGerenciamento/produtos/:id', async (req, res) => {
    
    try{
        await prisma.produtos.delete({
            where: {
                id: parseInt(req.params.id, 10)
            }
        })
        res.status(201).json({ message: "Usuário deletado com sucesso!",
            status: 0
        })
    } catch (error){
        console.error(error);
            res.status(500).json({ error: 'Erro ao deletar categoria.',
                status: 1
             });
    }
})

//get produtos
app.get('/apiGerenciamento/produtos', async (req, res) => {
    try{
        if(req.query.id) {
            const fornecedores = await prisma.produtos.findMany({
                where: {
                    id: parseInt(req.query.id, 10)
                }
            })
            res.status(200).json({message: 'Sucesso ao acessar dados',
                status: 0,
                data:fornecedores
            })
        } else {
            const fornecedores = await prisma.produtos.findMany()
            res.status(200).json({message: 'Sucesso ao acessar dados',
                status: 0,
                data:fornecedores
            })
        }
        
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao pegar dados das categoria.', error,
            status: 1
         });
    }    
})




//#############################################

//post vendas
app.post('/apiGerenciamento/vendas', async (req, res) => {
    try {
        const produto = await prisma.produtos.findUnique({
            where: { id: req.body.id_produto },
            select: { nome: true }
        });

        const vendedor = await prisma.vendedores.findUnique({
            where: { id: req.body.id_vendedor },
            select: { nome: true }
        });

        if (!produto || !vendedor) {
            return res.status(404).json({ error: 'Produto ou vendedor não encontrados.' });
        }
        await prisma.vendas.create({
            data: {
                data_venda: req.body.data_venda,
                quantidade_vendida: req.body.quantidade_vendida,
                id_produto: req.body.id_produto,
                id_vendedor: req.body.id_vendedor,
                nome_produto: produto.nome,
                nome_vendedor: vendedor.nome
            },
        });


        //Atualização quantidade de produtos
        try{
            const produtoAtual = await prisma.produtos.findUnique({
                where: {
                    id: req.body.id_produto
                },
            });
            const novaQuantidade = produtoAtual.quantidade - req.body.quantidade_vendida;
            await prisma.produtos.update({
                where: {
                    id: produtoAtual.id
                },
                data: {
                    quantidade: novaQuantidade,
                }
            });

        
        }catch (error){
            console.error(error);
                res.status(500).json({ error: 'Erro ao atualizar quantidade do produto',
                    status: 1
                });
        }


        res.status(201).json({message: 'Dados inseridos corretamente',
            status: 0
        });
    } catch (error) {
        
            console.error(error);
            res.status(500).json({ error: 'Erro ao inserir os dados.',
                status: 1,
                erro: error
             });
        
    }
});

// put vendas
app.put('/apiGerenciamento/vendas/:id/:id_produto', async (req, res) => { 
    
    
    try {
        
        const venda = await prisma.vendas.findMany({
            where: {
                id: parseInt(req.params.id, 10)
                },
                select: {
                    quantidade_vendida: true
                }
            });


        await prisma.vendas.update({
            where: {
                id: parseInt(req.params.id, 10)
            },
            data: {
                quantidade_vendida: req.body.quantidade_vendida,
            }
        })


          //Atualização quantidade de produtos
          try{
            const produtoAtual = await prisma.produtos.findUnique({
                where: {
                    id: parseInt(req.params.id_produto, 10)
                },
            });
            const novaQuantidade = (produtoAtual.quantidade +  venda[0].quantidade_vendida) - req.body.quantidade_vendida;
            await prisma.produtos.update({
                where: {
                    id: produtoAtual.id
                },
                data: {
                    quantidade: novaQuantidade
                }
            });

        
        }catch (error){
            console.error(error);
                res.status(500).json({ error: 'Erro ao atualizar quantidade do produto',
                    status: 1
                });
        }


        res.status(201).json({message: 'Dados atualizados!',
            status: 0
        })
    }catch (error){
        console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar os dados.',
                status: 1
             });
    }   
})


//delete vendas
app.delete('/apiGerenciamento/vendas/:id/:id_produto/:quantidade', async (req, res) => {
    const { id, id_produto, quantidade } = req.params;

    try {
        await prisma.$transaction(async (prisma) => {
            // Deletar venda
            await prisma.vendas.delete({
                where: { id: parseInt(id, 10) }
            });

            // Atualizar a quantidade do produto
            const produtoAtual = await prisma.produtos.findUnique({
                where: { id: parseInt(id_produto, 10) }
            });

            const novaQuantidade = produtoAtual.quantidade + parseInt(quantidade, 10);

            await prisma.produtos.update({
                where: { id: produtoAtual.id },
                data: { quantidade: novaQuantidade }
            });
        });

        res.status(200).json({ message: 'Venda deletada e quantidade do produto atualizada com sucesso',
            status: 0
         });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar a venda ou atualizar o produto.', status: 1 });
    }
});



//get vendas
app.get('/apiGerenciamento/vendas', async (req, res) => {
    try{
        if(req.query.id) {
            const vendas = await prisma.vendas.findMany({
                where: {
                    id: parseInt(req.query.id, 10)
                }
            })
            res.status(200).json({message: 'Sucesso ao acessar dados',
                status: 0,
                data:vendas
            })
        } else {
            const vendas = await prisma.vendas.findMany()
            res.status(200).json({message: 'Sucesso ao acessar dados',
                status: 0,
                data:vendas
            })
        }
        
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao pegar dados da venda.', error,
            status: 1
         });
    }    
})

//##############################################

//post entradas
app.post('/apiGerenciamento/entradas', async (req, res) => {
    try {
        const produto = await prisma.produtos.findUnique({
            where: { id: req.body.id_produto },
            select: { nome: true }
        });

        const fornecedor = await prisma.fornecedores.findUnique({
            where: { id: req.body.id_fornecedor },
            select: { nome: true }
        });

        if (!produto || !fornecedor) {
            return res.status(404).json({ error: 'Produto ou fornecedores não encontrados.' });
        }
        await prisma.entradas.create({
            data: {
                data_entrada: req.body.data_entrada,
                quantidade_entrada: req.body.quantidade_entrada,
                id_produto: req.body.id_produto,
                id_fornecedor: req.body.id_fornecedor,
                nome_produto: produto.nome,
                nome_fornecedor: fornecedor.nome
            },
        });

        //Atualização quantidade de produtos
        try{
            const produtoAtual = await prisma.produtos.findUnique({
                where: {
                    id: req.body.id_produto
                },
            });
            const novaQuantidade = produtoAtual.quantidade + req.body.quantidade_entrada;
            await prisma.produtos.update({
                where: {
                    id: produtoAtual.id
                },
                data: {
                    quantidade: novaQuantidade,
                }
            });

        
        }catch (error){
            console.error(error);
                res.status(500).json({ error: 'Erro ao atualizar quantidade do produto',
                    status: 1
                });
        }


        res.status(201).json({message: 'Dados inseridos corretamente',
            status: 0
        }); 

    } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao inserir os dados.',
                status: 1,
                erro: error
             });
    }
});

//get entradas
app.get('/apiGerenciamento/entradas', async (req, res) => {
    try{
        if(req.query.id) {
            const entrada = await prisma.entradas.findMany({
                where: {
                    id: parseInt(req.query.id, 10)
                }
            })
            res.status(200).json({message: 'Sucesso ao acessar dados',
                status: 0,
                data:entrada
            })
        } else {
            const entrada = await prisma.entradas.findMany()
            res.status(200).json({message: 'Sucesso ao acessar dados',
                status: 0,
                data:entrada
            })
        }
        
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao pegar dados da venda.', error,
            status: 1
         });
    }    
})

//delete vendas
app.delete('/apiGerenciamento/entradas/:id/:id_produto/:quantidade_entrada', async (req, res) => {
    
    try{
        await prisma.entradas.delete({
            where: {
                id: parseInt(req.params.id, 10)
            }
        })

          //Atualização quantidade de produtos
          try{
            const produtoAtual = await prisma.produtos.findUnique({
                where: {
                    id: parseInt(req.params.id_produto, 10)
                },
            });
            const novaQuantidade = produtoAtual.quantidade - req.params.quantidade_entrada;
            await prisma.produtos.update({
                where: {
                    id: produtoAtual.id
                },
                data: {
                    quantidade: novaQuantidade
                }
            });

        
        }catch (error){
            console.error(error);
                res.status(500).json({ error: 'Erro ao atualizar quantidade do produto',
                    status: 1
                });
        }

        res.status(201).json({ message: "Entrada deletada com sucesso!",
            status: 0
        })
    } catch (error){
        console.error(error);
            res.status(500).json({ error: 'Erro ao deletar categoria.',
                status: 1
             });
    }
})


// put entrdas
app.put('/apiGerenciamento/entradas/:id/:id_produto', async (req, res) => { 
    try {
        const entrada = await prisma.entradas.findMany({
            where: {
                id: parseInt(req.params.id, 10)
            },
            select: {
                quantidade_entrada: true
            }
        });

        await prisma.entradas.update({
            where: {
                id: parseInt(req.params.id, 10)
            },
            data: {
                quantidade_entrada: req.body.quantidade_entrada,
            }
        })

         //Atualização quantidade de produtos
         try{
            const produtoAtual = await prisma.produtos.findUnique({
                where: {
                    id: parseInt(req.params.id_produto, 10)
                },
            });
            const novaQuantidade = (produtoAtual.quantidade -  entrada[0].quantidade_entrada) + req.body.quantidade_entrada;
            await prisma.produtos.update({
                where: {
                    id: produtoAtual.id
                },
                data: {
                    quantidade: novaQuantidade
                }
            });

        
        }catch (error){
            console.error(error);
                res.status(500).json({ error: 'Erro ao atualizar quantidade do produto',
                    status: 1
                });
        }


        res.status(201).json({message: 'Dados atualizados!',
            status: 0
        })
    }catch (error){
        console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar os dados.',
                status: 1
             });
    }   
})

app.listen(8500, () => console.log("API no ar........"))
