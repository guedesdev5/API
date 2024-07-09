import express from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.get('/login/:username/:senha', async (req, res) => {
    try {
        const todosVendedores = await prisma.vendedores.findMany();

       
            res.status(200).json({
                message: 'Login encontrado com sucesso!',
                status: 0
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Erro ao procurar login.',
            status: 1
        });
    }
});

//post categorias
app.post('/categorias', async (req, res) => {
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
app.put('/categorias/:id', async (req, res) => { 
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
app.delete('/categorias/:id', async (req, res) => {
    
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

app.get('/categorias', async (req, res) => {
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

app.listen(8500)
