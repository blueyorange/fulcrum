const inputs = document.forms.answer.querySelectorAll('[type="radio"]');
console.log(inputs);

async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = { _id: formData.get("_id"), answer: formData.get("answer") };
  fetch("/api/answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(handleResponse)
    .catch((error) => {
      console.error("Error:", error);
    });
}

function handleResponse(response) {
  //   disable and uncheck all radio buttons
  Array.from(document.forms.answer.querySelectorAll('[type="radio"]')).map(
    (el) => {
      el.setAttribute("disabled", true);
      //   el.setAttribute("checked", false);
    }
  );
  document.forms.answer
    .querySelector(`[for$="${response.question.correct}"]`)
    .classList.add("correct");
  if (!response.isCorrect) {
    document.forms.answer
      .querySelector(`[for$="${response.answer}"]`)
      .classList.add("incorrect");
  }
}

document.forms.answer.addEventListener("submit", handleSubmit);
