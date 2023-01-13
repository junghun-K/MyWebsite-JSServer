async function clickUpdate() {
  try {
    let res = await fetch("/api/click", {method: "POST"});
    if (res.ok) {
      let json = await res.json();
      // console.log(json);
      let count = json.clickCount;
      document.getElementById('click').innerText = count;
    } else {
      console.log('res not ok');
    }
  } catch (error) {
    error;
  }
}

async function clickGet() {
  try {
    let res = await fetch("/api/click", {method: "GET"});
    if (res.ok) {
      let json = await res.json();
      // console.log(json);
      let count = json.clickCount;
      document.getElementById('click').innerText = count;
    } else {
      console.log('res not ok');
    }
  } catch (error) {
    error;
  }
}

setInterval(clickGet, 1000);

