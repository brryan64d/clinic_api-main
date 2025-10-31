// Path: tests/routes/usuarios.test.js

import request from 'supertest';
import { app } from '../../src/app';
import { prismaClient } from '../../prisma/prisma';

describe('Testes de Integração para /usuarios', () => {

    // limpar o banco na ordem correta
    beforeEach(async () => {
        // limpar as que dependem do usuário

        await prismaClient.prontuario.deleteMany({});
        await prismaClient.consulta.deleteMany({});
        await prismaClient.exame.deleteMany({});
        await prismaClient.paciente.deleteMany({});

        // 3. "pai"
        await prismaClient.usuario.deleteMany({});

        // seed pra test
        await prismaClient.usuario.create({
            data: {
                nome: 'Usuario de Teste Integrado',
                email: 'integrado@teste.com',
                senha: '123',
                cargo: 'medico',
            },
        });
    });

    // limpar tudo dps dos testes na mesma ordem
    afterAll(async () => {

        await prismaClient.prontuario.deleteMany({});
        await prismaClient.consulta.deleteMany({});
        await prismaClient.exame.deleteMany({});

        // 2. "intermediárias"
        await prismaClient.paciente.deleteMany({});

        // 3. "pai"
        await prismaClient.usuario.deleteMany({});

        await prismaClient.$disconnect();
    });


    test('GET /usuarios - Deve retornar a lista de usuários do banco', async () => {
        // O supertest req dados da app
        const response = await request(app).get('/usuarios');


        // deu boa?
        expect(response.status).toBe(200);

        // O corpo da resposta é um array?
        expect(Array.isArray(response.body)).toBe(true);

        // O array contém o usuário que criamos?
        expect(response.body.length).toBe(1);
        expect(response.body[0].nome).toBe('Usuario de Teste Integrado');
        expect(response.body[0].email).toBe('integrado@teste.com');
    });

    test('GET /usuarios - Deve retornar um array vazio se não houver usuários', async () => {

        await prismaClient.prontuario.deleteMany({});
        await prismaClient.consulta.deleteMany({});
        await prismaClient.exame.deleteMany({});

        // 2. intermediárias
        await prismaClient.paciente.deleteMany({});

        // 3. "pai"
        await prismaClient.usuario.deleteMany({});

        // acao
        const response = await request(app).get('/usuarios');

        // verificar assert
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
        expect(response.body).toEqual([]);
    });

    test('GET /usuarios:id - Deve retornar um usuário específico', async () => {


        const usuario = await prismaClient.usuario.create({
            data: {
                nome: 'Maria Luiza',
                email: 'malu@gmail.com',
                senha: '123',
                cargo: 'medica',
            },
        })

        const response = await request(app).get(`/usuarios/${usuario.id}`);


        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('id', usuario.id);
        expect(response.body.nome).toBe('Maria Luiza');
        expect(response.body.email).toBe('malu@gmail.com');
    });

    test('Post /usuarios - Deve criar usuários', async () => {
        const novoUsuario = {
            nome: 'Bryan Teste',
            email: 'bryanteste@gmail.com',
            senha: '123',
            cargo: 'medico',
        };

        const response = await request(app)
            .post('/usuarios')
            .send(novoUsuario);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nome).toBe('Bryan Teste');

        // salvar o usuário criado para os próximos testes
        usuarioCriado = response.body;

        // conferir se foi salvo no banco
        const usuarioNoBanco = await prismaClient.usuario.findUnique({
            where: { id: usuarioCriado.id },
        });
        expect(usuarioNoBanco).not.toBeNull();
        expect(usuarioNoBanco.email).toBe('bryanteste@gmail.com');
    });

    test('Put /usuarios - Deve atualizar usuários', async () => {

        const dadosAtualizados = {
            nome: 'Bryan Atualizado',
            email: 'bryan.atualizado@gmail.com',
            senha: '999',
            cargo: 'enfermeiro',
        };

        const response = await request(app)
            .put(`/usuarios/${usuarioCriado.id}`)
            .send(dadosAtualizados);

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Bryan Atualizado');
        expect(response.body.email).toBe('bryan.atualizado@gmail.com');

        const usuarioAtualizado = await prismaClient.usuario.findUnique({
            where: { id: usuarioCriado.id },
        });
        expect(usuarioAtualizado.nome).toBe('Bryan Atualizado');
    });

    test('Delete /usuarios - Deve deletar usuários', async () => {

        if (!usuarioCriado) {
            const usuario = await prismaClient.usuario.create({
                data: {
                    nome: 'Bryan Teste',
                    email: 'bryanteste@gmail.com',
                    senha: '123',
                    cargo: 'medico',
                },
            });
            usuarioCriado = usuario;
        }

        const response = await request(app).delete(`/usuarios/${usuarioCriado.id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Usuário deletado com sucesso');

        const usuarioDeletado = await prismaClient.usuario.findUnique({
            where: { id: usuarioCriado.id },
        });
        expect(usuarioDeletado).toBeNull();
    });
});

//blaaalal