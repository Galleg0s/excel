import "./styles/index.scss";
import "./index.js";

async function start() {
	return await Promise.resolve("Async is working");
}

start().then(result => console.log(result));
