
import './styles/index.scss';

async function start() {
  return Promise.resolve('Async is working');
}

start().then((result) => result.toLowerCase()).catch((e) => console.log(e));
