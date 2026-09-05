let input = document.getElementById("question-box");
let askButton = document.getElementById("ask-button");
let topQuestionButton = document.getElementById("top-question-button");
async function askChat(question) {
  let response = await fetch("https://tammy-data-api.lestertammy1977.workers.dev/api/v1/datasets/viral-50-usa/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question })
  });
  let data = await response.json();
  
document.getElementById("answer-model").textContent = "Answered by " + data.model;
  return data.response;
}
askButton.addEventListener("click", async function () {
  document.getElementById("answer").textContent = "Thinking…";
  document.getElementById("asked").textContent = "You asked: " + input.value;
  let answer = await askChat(input.value);

  document.getElementById("answer").textContent = answer;
});
topQuestionButton.addEventListener("click", async function () {
  input.value = "Which artist appears most often on this chart?";
  document.getElementById("asked").textContent = "You asked: " + input.value;
  document.getElementById("answer").textContent = "Thinking…";

  let answer = await askChat(input.value);

  document.getElementById("answer").textContent = answer;
});

