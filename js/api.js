async function api() {
  let data = form.data.value;
  let moedaBase = form.exDe.value;

  const response = await fetch(`https://api.exchangeratesapi.io/${data}?base=${moedaBase}`);
  const body = await response.json();

  return body;  
}


