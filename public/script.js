function onOff() {
  document.querySelector("#modal").classList.toggle("hide");

  document.querySelector("body").classList.toggle("hideScroll");
  document.querySelector("#modal").classList.toggle("addScroll");
}

function checkFields(event) {
  const valuesToCheck = ["titulo", "categoria", "imagem", "descricao", "link"];

  const isEmpty = valuesToCheck.find(function(value) {
    const checkIfIsString = typeof event.target[value].value === "string";
    const checarIsEmpty = !event.target[value].value.trim();
    if (checkIfIsString && checarIsEmpty) {
      return true;
    }
  });

  if (isEmpty) {
    event.preventDefault();
    alert("por favor preencha todos os dado");
  }
}
