const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./ws.db");

db.serialize(function() {
  //Criar a tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS ideias(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      imagem TEXT,
      titulo TEXT,
      categoria TEXT,
      descricao TEXT,
      link TEXT
    );
  `);

  //Inserir na tabela
  // const query = `
  //     INSERT INTO ideias(
  //       imagem,
  //       titulo,
  //       categoria,
  //       descricao,
  //       link

  //     ) VALUES(?,?,?,?,?);
  // `;
  // const values = [
  //   "https://image.flaticon.com/icons/svg/2708/2708719.svg",
  //   "Projeto",
  //   "Carreira",
  //   "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //   "https://rocktseat.com.br"
  // ];

  // db.run(query, values, function(err) {
  //   if (err) return console.log(err);
  // });

  //Deletar um dado da tabela
  // db.run(`DELETE FROM ideias WHERE id=?`, [1], function(err) {
  //   if (err) return console.log(err);

  //   console.log("DELETEI", this);
  // });

  //Consultar dados na tabela
  //   db.all(`SELECT * FROM ideias`, function(err, rows) {
  //     if (err) return console.log(err);
  //     console.log(rows);
  //   });
});

module.exports = db;
