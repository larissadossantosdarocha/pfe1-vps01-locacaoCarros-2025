const carros = [
    {
        id: 1,
        nome: "Onix LT 1.0",
        descricao: "Modelo compacto e econômico da Chevrolet, ideal para o dia a dia.",
        preco: 120.00,
        peso: 1.0,
        imagem: "onix.png"
    },
    {
        id: 2,
        nome: "HB20 Vision",
        descricao: "O modelo Vision da Hyundai, com tecnologia e conforto.",
        preco: 150.00,
        peso: 1.2,
        imagem: "hb20.png"
    },
    {
        id: 3,
        nome: "Renegade Longitude",
        descricao: "SUV robusto da Jeep, ideal para aventuras.",
        preco: 210.00,
        peso: 1.5,
        imagem: "renegade.png"
    },
    {
        id: 4,
        nome: "Corolla XEi",
        descricao: "Sedan confortável e confiável da Toyota, perfeito para viagens.",
        preco: 250.00,
        peso: 1.3,
        imagem: "corolla.png"
    },
    {
        id: 5,
        nome: "Civic Touring",
        descricao: "Sedan esportivo e elegante da Honda, ideal para quem busca performance.",
        preco: 230.00,
        peso: 1.4,
        imagem: "civic.png"
    },
    {
        id: 6,
        nome: "Fiat Mobi Like",
        descricao: "Carro compacto e econômico da Fiat, ideal para cidade.",
        preco: 90.00,
        peso: 0.8,
        imagem: "mobi.png"
    },
    {
        id: 7,
        nome: "Kwid Zen",
        descricao: "Carro compacto da Renault, perfeito para o dia a dia.",
        preco: 95.00,
        peso: 0.9,
        imagem: "kwid.png"
    },
    {
        id: 8,
        nome: "Gol Trendline",
        descricao: "Carro popular da Volkswagen, conhecido pela sua confiabilidade.",
        preco: 100.00,
        peso: 1.0,
        imagem: "gol.png"
    },
    {
        id: 9,
        nome: "Compass Limited",
        descricao: "SUV robusto da Jeep, para quem busca conforto e segurança.",
        preco: 270.00,
        peso: 1.6,
        imagem: "compass.png"
    },
    {
        id: 10,
        nome: "Tracker Premier",
        descricao: "SUV compacto da Chevrolet, com excelente desempenho e design moderno.",
        preco: 220.00,
        peso: 1.4,
        imagem: "tracker.png"
    }
];

function exibirCarros() {
    const produtosContainer = document.querySelector('.produtos');
    produtosContainer.innerHTML = '';

    carros.forEach(carro => {
        const produtoCard = document.createElement('div');
        produtoCard.classList.add('card');
        produtoCard.innerHTML = `
            <img src="${carro.imagem}" alt="${carro.nome}">
            <h2>${carro.nome}</h2>
            <p>${carro.descricao}</p>
            <p class="preco">R$ ${carro.preco.toFixed(2)} / dia</p>
            <button onclick="mostrarDetalhes(${carro.id})">Detalhes</button>
            <button onclick="adicionarLocacao(${carro.id})">Cadastrar Locação</button>
        `;
        produtosContainer.appendChild(produtoCard);
    });
}

function mostrarDetalhes(id) {
    const carro = carros.find(c => c.id === id);
    const modal = document.getElementById('modalDetalhes');
    const detalhesProduto = document.getElementById('detalhesProduto');

    detalhesProduto.innerHTML = `
        <h2>${carro.nome}</h2>
        <img src="${carro.imagem}" alt="${carro.nome}">
        <p>${carro.descricao}</p>
        <p>Preço por dia: R$ ${carro.preco.toFixed(2)}</p>
        <p>Peso: ${carro.peso} kg</p>
    `;

    modal.classList.remove('oculto');
}

function fecharModal() {
    document.getElementById('modalDetalhes').classList.add('oculto');
}

function adicionarLocacao(id) {
    const carro = carros.find(c => c.id === id);
    let locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];

    const locacaoExistente = locacoes.find(l => l.id === carro.id);
    if (!locacaoExistente) {
        carro.quantidade = 1;
        locacoes.push(carro);
        localStorage.setItem('locacoes', JSON.stringify(locacoes));
        alert('Carro cadastrado para locação!');
    } else {
        alert('Este carro já foi adicionado ao cadastro!');
    }
}

function carregarLocacoes() {
    const locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
    const locacoesContainer = document.getElementById('carro');
    locacoesContainer.innerHTML = '';

    let totalLocacao = 0;

    locacoes.forEach(carro => {
        const itemLocacao = document.createElement('div');
        itemLocacao.classList.add('itemCarro');
        itemLocacao.innerHTML = `
            <img src="${carro.imagem}" alt="${carro.nome}">
            <div>
                <h3>${carro.nome}</h3>
                <p>Preço por dia: R$ ${carro.preco.toFixed(2)}</p>
                <p>Total por dias: R$ ${(carro.preco * carro.quantidade).toFixed(2)}</p>
            </div>
        `;
        locacoesContainer.appendChild(itemLocacao);
        totalLocacao += carro.preco * carro.quantidade;
    });

    document.getElementById('totalCarro').innerHTML = `
        <h3>Total da Locação: R$ ${totalLocacao.toFixed(2)}</h3>
    `;
}

function finalizarLocacao(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;

    alert(`Locação confirmada! Nome: ${nome}, E-mail: ${email}, Período: ${dataInicio} a ${dataFim}`);

    localStorage.removeItem('locacoes');
    window.location.href = 'index.html';
}

if (window.location.pathname.includes('index.html')) {
    exibirCarros();
} else if (window.location.pathname.includes('carro.html')) {
    carregarLocacoes();
}




