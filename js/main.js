const $ = document.querySelector.bind(document);
const form = $('form');

const value = $('#valor');
const date = $('#data');
const baseCurrency = $('#exDe');
const targetCurrency = $('#exPara');

const btn = $('form button');

let dd = new Date().getUTCDate();
let mm = ((new Date().getUTCMonth() + 1) < 10 ? '0' : '') + (new Date().getUTCMonth() + 1);
let yyyy = new Date().getUTCFullYear();
let hoje = `${yyyy}-${mm}-${dd}`;
form.data.value = hoje;

converte();

btn.addEventListener('click', function(e){
    e.preventDefault();
    
    let temp;
    
    temp = form.exDe.value;
    form.exDe.value = form.exPara.value;
    form.exPara.value = temp;
    
    converte();
    createChart();
});

form.addEventListener('change', () => converte());
targetCurrency.addEventListener('change', () => createChart());

function converte() {
    let valor = form.valor.value || 100;
    let moedaBase = form.exDe.value;
    let moedaAlvo = form.exPara.value;
    
    api().then(body => {
        let base = body.rates[moedaBase];
        let alvo = body.rates[moedaAlvo];
        
        /* Resultado */
        let total = valor * base;
        $('.de').textContent = total.toLocaleString('pt-BR', { style : 'currency', currency: moedaBase });
        
        $('.de-cod').textContent = moedaBase;
        
        let totalConvertido = ((valor * base) * alvo);
        $('.para').textContent = totalConvertido.toLocaleString('pt-BR', { style: 'currency', currency: moedaAlvo });
        
        $('.para-cod').textContent = moedaAlvo;
        $('.info .para-cod').textContent = moedaAlvo;
        
        /* Info */
        $('.data').textContent = new Date(body.date).toUTCString();
        $('.taxa').textContent = alvo.toFixed(5);   
    });
}


/* 
 * TAREFA
 * É necessário mudar o placeholder da tag Resultado 
 * Criar o gráfico
 * Editar a barra lateral
 */