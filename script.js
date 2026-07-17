let grafico = null;

function distribuicao(lados, dados, bonus) {
    let dist = { 0: 1 };

    for (let i = 0; i < dados; i++) {
        let nova = {};

        for (let soma in dist) {
            for (let face = 1; face <= lados; face++) {
                let valor = Number(soma) + face;

                nova[valor] = (nova[valor] || 0) + dist[soma] / lados;
            }
        }

        dist = nova;
    }

    let final = {};

    for (let soma in dist) {
        final[Number(soma) + bonus] = dist[soma];
    }

    return final;
}

function calcular() {
    const lados = parseInt(document.getElementById("dado").value);

    const dados = parseInt(document.getElementById("qtd").value);

    const b1 = parseInt(document.getElementById("b1").value);

    const b2 = parseInt(document.getElementById("b2").value);

    const j1 = distribuicao(lados, dados, b1);

    const j2 = distribuicao(lados, dados, b2);

    let v1 = 0;

    let emp = 0;

    let v2 = 0;

    for (let a in j1) {
        for (let b in j2) {
            const p = j1[a] * j2[b];

            if (Number(a) > Number(b)) v1 += p;
            else if (Number(a) < Number(b)) v2 += p;
            else emp += p;
        }
    }

    document.getElementById("resultado").innerHTML = `

    <h2>Resultado</h2>

    <p>Vitória J1: <b>${(v1 * 100).toFixed(2)}%</b></p>

    <p>Empate: <b>${(emp * 100).toFixed(2)}%</b></p>

    <p>Vitória J2: <b>${(v2 * 100).toFixed(2)}%</b></p>

    `;

    desenhar(v1, emp, v2);
}

function desenhar(j1, emp, j2) {
    const ctx = document.getElementById("grafico");

    if (grafico) grafico.destroy();

    grafico = new Chart(ctx, {
        type: "bar",

        data: {
            labels: ["Jogador 1", "Empate", "Jogador 2"],

            datasets: [
                {
                    label: "Chance (%)",

                    data: [(j1 * 100).toFixed(2), (emp * 100).toFixed(2), (j2 * 100).toFixed(2)],
                },
            ],
        },

        options: {
            responsive: true,

            scales: {
                y: {
                    beginAtZero: true,

                    max: 100,
                },
            },
        },
    });
}

window.onload = calcular;
