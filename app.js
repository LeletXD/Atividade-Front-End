
// Os dados ficam apenas na memória.
// Se a página for atualizada, eles serão apagados.

const alunos = [];

const app = document.querySelector("#app");

const botoesMenu = document.querySelectorAll("nav button");

function marcarMenuAtivo(rota) {
    botoesMenu.forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.rota === rota);
    });
}

function irPara(rota) {
    marcarMenuAtivo(rota);

    if (rota === "inicio") mostrarInicio();
    if (rota === "cadastro") mostrarCadastro();
    if (rota === "lista") mostrarLista();
    if (rota === "sobre") mostrarSobre();
}

function mostrarInicio() {
    app.innerHTML = `
        <h1>Bem-vindo(a) ao CineLet</h1>

        <p>
            Aqui você pode conhecer mais sobre o nosso cinema e conferir todos os filmes disponíveis para compra de ingressos.
        </p>

        <p>
            Escolha um filme, crie sua conta e informe seus dados para receber o ingresso por email.
        </p>

        <h2>Filmes disponíveis</h2>

        <p>🎬 Fiona e suas virtudes</p>
        <p>🎬 Duda e seu país das maravilhas</p>
        <p>🎬 O conto de Mary Jane e Pancinha</p>

        <div class="contador">
            Quantidade de ingressos comprados:
            <strong>${alunos.length}</strong>
        </div>

        <div class="acoes">
            <button class="botao" id="btnCadastrar">Comprar Ingresso</button>
            <button class="botao secundario" id="btnVerAlunos">Ver a sua conta</button>
        </div>
    `;

    document.querySelector("#btnCadastrar")
        .addEventListener("click", () => irPara("cadastro"));

    document.querySelector("#btnVerAlunos")
        .addEventListener("click", () => irPara("lista"));
}

function mostrarCadastro() {
    app.innerHTML = `
        <h1>Comprar Ingresso</h1>

        <p>Preencha seus dados para receber o ingresso por email.</p>

        <form id="formAluno">

            <div class="campo">
                <label for="nome">Nome</label>

                <input
                    id="nome"
                    type="text"
                    placeholder="Digite o nome do comprador"
                    required
                />
            </div>

            <div class="campo">
                <label for="curso">Telefone</label>

                <input
                    id="curso"
                    type="text"
                    placeholder="Digite o seu telefone"
                    required
                />
            </div>

            <div class="campo">
                <label for="matricula">Email</label>

                <input
                    id="matricula"
                    type="email"
                    placeholder="Digite o email para resgatar o ingresso"
                    required
                />
            </div>

            <div class="campo">
                <label for="filme">Filme</label>

                <select
                    id="filme"
                    required
                    style="width: 100%; padding: 10px; border: 1px solid #bbb; border-radius: 6px; font-size: 15px;"
                >
                    <option value="">Selecione um filme</option>

                    <option value="Fiona e suas virtudes">
                        Fiona e suas virtudes
                    </option>

                    <option value="Duda e seu país das maravilhas">
                        Duda e seu país das maravilhas
                    </option>

                    <option value="O conto de Mary Jane e Pancinha">
                        O conto de Mary Jane e Pancinha
                    </option>
                </select>
            </div>

            <button class="botao" type="submit">
                Comprar ingresso
            </button>

            <div id="mensagem"></div>

        </form>
    `;

    document.querySelector("#formAluno")
        .addEventListener("submit", function(evento) {

            evento.preventDefault();

            const nome = document.querySelector("#nome").value.trim();
            const curso = document.querySelector("#curso").value.trim();
            const matricula = document.querySelector("#matricula").value.trim();
            const filme = document.querySelector("#filme").value;

            alunos.push({
                nome,
                curso,
                matricula,
                filme
            });

            document.querySelector("#mensagem").innerHTML = `
                <div class="mensagem">
                    Ingresso comprado com sucesso.
                </div>
            `;

            evento.target.reset();
        });
}

function mostrarLista() {
    app.innerHTML = `
        <h1>Minha Conta</h1>

        <p>
            Aqui estão os ingressos comprados nesta sessão.
        </p>

        <div id="conteudoLista"></div>
    `;

    renderizarTabela();
}

function renderizarTabela() {

    const conteudo = document.querySelector("#conteudoLista");

    if (alunos.length === 0) {

        conteudo.innerHTML = `
            <div class="vazio">
                Nenhum ingresso comprado ainda.
            </div>
        `;

        return;
    }

    let linhas = "";

    alunos.forEach((aluno, indice) => {

        linhas += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.matricula}</td>
                <td>${aluno.filme}</td>

                <td>
                    <button
                        class="excluir"
                        data-indice="${indice}"
                    >
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

    conteudo.innerHTML = `
        <table>

            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Filme</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody>
                ${linhas}
            </tbody>

        </table>
    `;

    document.querySelectorAll(".excluir").forEach(botao => {

        botao.addEventListener("click", function() {

            const indice = Number(this.dataset.indice);

            alunos.splice(indice, 1);

            renderizarTabela();
        });
    });
}

function mostrarSobre() {

    app.innerHTML = `
        <h1>Sobre o CineLet</h1>

        <p>
            🍿 Encontre seus filmes favoritos, escolha sua sessão, cadastre seus dados e tenha seus ingressos sempre à mão — tudo de forma simples, rápida e intuitiva.
        </p>

        <p>
            🎟️ Mais do que um sistema de ingressos, o CineLet representa uma experiência digital criada para deixar cada etapa da sua ida ao cinema mais prática.
        </p>

        <p>
            🎟️ No CineLet, você encontra tudo o que precisa para planejar sua próxima sessão. Escolha o filme, confira a sessão e prepare-se para curtir cada minuto.
        </p>

        <p>
            ✨ O cinema está esperando por você! Escolha seu próximo filme, compre seu ingresso e venha viver uma experiência inesquecível com muita diversão, emoção e pipoca.
        </p>
    `;
}

botoesMenu.forEach(botao => {

    botao.addEventListener("click", () => {
        irPara(botao.dataset.rota);
    });

});

mostrarInicio();