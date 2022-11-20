const INFO_URL = "https://jsonplaceholder.typicode.com/todos";

const btn = document.querySelector("#btn");
const main = document.querySelector(".main");

const fun = async () => {
  const res = await fetch(INFO_URL);
  const data = await res.json();
  try {
    data.forEach((element) => {
      
      const div = document.querySelector(".info");
      const text = document.createElement("div");
      const parent = document.createElement("div");
      const check = document.createElement("input");
      const but = document.createElement("button");
      
      text.classList.add("text");
      parent.classList.add("parent");
      but.classList.add("delete");

      check.setAttribute("type", "checkbox");
      but.setAttribute("type", "button");

      but.textContent = "Удалить";
      check.checked = element.completed.false;
      text.textContent = element.title;

      parent.append(check, text, but);
      div.append(parent);

      but.addEventListener("click", (e) => {
        e.preventDefault();
        deleteItem(element.id, parent);
      });

      if (element.completed === true) {
        parent.classList.toggle("update");
        check.checked = true;
      } else {
        check.checked = false;
      }

      check.addEventListener("click", () => {
        parent.classList.toggle("update");
        createItem(element.id, element.completed);
      });
    });

    const form = document.querySelector(".inputs");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inp = document.querySelector("#inp");
      addItem(inp.value);
      inp.value = "";

    });
  } catch (error) {
    return error.message;
  }
};
fun();

const deleteItem = async (id, node) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    if (response.ok) {
      node.remove();
      console.log("Удален");
    }
  } catch (error) {
    const title = document.querySelector(".title");
    const err = document.createElement("h1");
    err.classList.add("error");
    err.textContent = e;
    title.replaceWith(err);
  }
};

const addItem = async (value) => {
  try {
    const response = await fetch(INFO_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset = UTF-8",
      },
      body: JSON.stringify({ title: value, completed: false }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

const createItem = async (id, completed) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset = UTF-8",
        },
        body: JSON.stringify({ completed: !completed }),
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
