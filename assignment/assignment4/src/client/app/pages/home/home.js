import template from './home.ejs';

export default async function home(route) {
  const data = await onInit(route);
  const html = template(data);
  document.getElementById('content').innerHTML = html;
  onRender();
}

async function onInit(route) {
  // Fetch or prepare data
  return { title: 'Welcome Home!' };
}

function onRender() {
  // Set up buttons, animations, etc.
}
