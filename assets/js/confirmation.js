document.addEventListener('DOMContentLoaded', () => {
  const dados = JSON.parse(sessionStorage.getItem('registroDados'));
  const div = document.getElementById('dados');

  if (dados) {
    div.innerHTML = `
      <p><strong>Nome:</strong> ${dados.nome}</p>
      <p><strong>Sobrenome:</strong> ${dados.sobrenome}</p>
      <p><strong>Email:</strong> ${dados.email}</p>
      <p><strong>Idade:</strong> ${dados.idade}</p>
    `;
  } else {
    div.innerHTML = '<p>Nenhum dado encontrado.</p>';
  }

  document.getElementById('btnIndex').addEventListener('click', () => {
    window.location.href = "./index.html";
    alert("Enviado com Sucesso")
  });

  document.getElementById('btnEditar').addEventListener('click', () => {
    window.location.href = "./form.html";
  });

  document.getElementById('btnBaixar').addEventListener('click', () => {
    if (!dados) return;
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.json';
    a.click();
    alert("Arquivo Salvo")
  });
});
