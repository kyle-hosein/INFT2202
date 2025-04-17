import template from './about.ejs';

export default async function about(route) {
  const data = await onInit(route);
  const html = template(data);
  document.getElementById('content').innerHTML = html;
  onRender();
}

async function onInit(route) {
  return {
    name: 'Kyle Hosein',
    location: 'Toronto',
    field: 'Database Development',
    email: 'kyle.hosein@dcmail.ca',
    photo: '/images/profile.jpg' // Make sure this image is in your dist or public folder
  };
}

function onRender() {
  
  console.log('About page rendered');
}
