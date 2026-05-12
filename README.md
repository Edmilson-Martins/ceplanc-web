# CEPLANC Web

📋 Sobre o projeto
A CEPLANC opera com 5 equipes (ALFA, BRAVO, CHARLIE, DELTA e ECHO) que se revezam no atendimento de ocorrências. O sistema resolve a falta de organização na distribuição dos flagrantes, oferecendo uma interface centralizada e atualizada em tempo real..

🔗 **Repositório:** [Edmilson-Martins/ceplanc-web](https://github.com/Edmilson-Martins/ceplanc-web)  
🌐 **Site online:** [edmilson-martins.github.io/ceplanc-web](https://edmilson-martins.github.io/ceplanc-web)

---

## Funcionalidades

- Fila circular visível com destaque da equipe em atendimento
- Botão "Passar a Vez" para avançar na fila
- Registro de novas ocorrências com formulário
- Histórico completo com filtro por equipe e busca por texto
- Observações de cada ocorrência acessíveis via accordion
- Persistência de dados via localStorage
- Interface responsiva (mobile-friendly)

---

## Tecnologias

- HTML5
- CSS3 (Flexbox, Grid, responsividade)
- JavaScript puro
- Git / GitHub
- GitHub Pages
- Figma
---

## Estrutura

ceplanc-web/
├── index.html          # Fila de plantão (página inicial)
├── equipes.html        # Status detalhado das equipes
├── historico.html      # Histórico de ocorrências
├── nova-ocorrencia.html # Registro de novo flagrante
├── sobre.html          # Sobre o projeto e a equipe
├── css/
│   └── style.css
└── js/
    └── app.js
    
# Equipe

* **José Edmilson (líder)** – HTML e integração
* **Thomás Cauã** – CSS e responsividade
* **Mateus Willis** – JavaScript e lógica da fila
* **Michel Maciel** – Wireframes e testes
* **Fabiano** – Testes e documentação
---

ESUDA — Recife, PE · ADS 3º Período · 2026

---

## Como testar localmente

```bash
git clone https://github.com/Edmilson-Martins/ceplanc-web.git
cd ceplanc-web
