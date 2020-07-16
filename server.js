const express = require("express");

const server = express();

const db = require("./db");
// const ideias = [
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//     titulo: "Cursos de Programação",
//     categoria: "Estudo",
//     descricao: " Lorem ipsum dolor sit amet consectetur adipisicing elit",
//     url: "https://rocktseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//     titulo: "Exercicio",
//     categoria: "Saúde",
//     descricao: " Lorem ipsum dolor sit amet consectetur adipisicing elit",
//     url: "https://rocktseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//     titulo: "Meditação",
//     categoria: "Estudo",
//     descricao: " Lorem ipsum dolor sit amet consectetur adipisicing elit",
//     url: "https://rocktseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2708/2708719.svg",
//     titulo: "Projeto",
//     categoria: "Carreira",
//     descricao: " Lorem ipsum dolor sit amet consectetur adipisicing elit",
//     url: "https://rocktseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
//     titulo: "Pintura",
//     categoria: "Criatividade",
//     descricao: " Lorem ipsum dolor sit amet consectetur adipisicing elit",
//     url: "https://rocktseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729046.svg",
//     titulo: "Plantar",
//     categoria: "Orta",
//     descricao: " Lorem ipsum dolor sit amet consectetur adipisicing elit",
//     url: "https://rocktseat.com.br"
//   }
// ];

//configurar arquivos estaticos
server.use(express.static("public"));
//habilitando o uso do req body
server.use(express.urlencoded({ extended: true }));

//configuração do nunjucks templeites energer
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true
});

server.get("/", (req, res) => {
  db.all(`SELECT * FROM ideias`, function(err, rows) {
    if (err) return console.log(err);
    const ideiasReversas = [...rows].reverse();

    let ultimasIdeias = [];
    for (ideia of ideiasReversas) {
      if (ultimasIdeias.length < 2) {
        ultimasIdeias.push(ideia);
      }
    }

    return res.render("index.html", { ideias: ultimasIdeias });
  });
});

server.get("/ideias", (req, res) => {
  db.all(`SELECT * FROM ideias`, function(err, rows) {
    if (err) {
      console.log(err);
      return res.send("erro no banco");
    }
    const ideiasReversas = [...rows].reverse();
    return res.render("ideias.html", { ideias: ideiasReversas });
  });
});

server.post("/", function(req, res) {
  const query = `
      INSERT INTO ideias(
        imagem,
        titulo,
        categoria,
        descricao,
        link

      ) VALUES(?,?,?,?,?);
  `;
  const values = [
    req.body.imagem,
    req.body.titulo,
    req.body.categoria,
    req.body.descricao,
    req.body.link
  ];

  db.run(query, values, function(err) {
    if (err) {
      console.log(err);
      return res.send("erro no banco");
    }
    return res.redirect("/ideias");
  });
});

server.listen(3000);
