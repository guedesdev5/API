import express from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.get('/apiGerenciamento', (req, res) =>{
    res.send('Inicializado com sucesso...')
})

//post categorias
app.post('/apiGerenciamento/categorias', async (req, res) => {
    try {
        await prisma.Categorias.create({
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
        await prisma.Categorias.update({
            where: {
                id: req.params.id
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
        await prisma.Categorias.delete({
            where: {
                id: req.params.id
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

//get categorias
app.get('/apiGerenciamento/categorias', async (req, res) => {
    try{
        const categorias = await prisma.Categorias.findMany()
        res.status(200).json({message: 'Sucesso ao acessar dados',
            status: 0,
            data:categorias
        })
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao pegar dados das categoria.',
            status: 1
         });
    }
    
    
})


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

app.put('/apiGerenciamento/vendedores/:id', async (req, res) => { 
    try {
        await prisma.vendedores.update({
            where: {
                id: req.params.id
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

app.delete('/apiGerenciamento/vendedores/:id', async (req, res) => {
    
    try{
        await prisma.vendedores.delete({
            where: {
                id: req.params.id
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

//get categorias
app.get('/apiGerenciamento/vendedores', async (req, res) => {
    try{
        if(req.query) {
            const vendedores = await prisma.vendedores.findMany({
                where: {
                    id: req.query.id,
                    username: req.query.username
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
        res.status(500).json({ error: 'Erro ao pegar dados das categoria.',
            status: 1
         });
    }
    
    
})

app.listen(8500, () => console.log("API no ar........"))
