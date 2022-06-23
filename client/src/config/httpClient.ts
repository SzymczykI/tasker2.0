const baseUrl = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:8080';

const get = async (path:string) => {
  const query = await fetch(`${baseUrl}${path}`);
  const json = await query.json();
  return json;
};

const post = async (path:string, body:object) => {
  const query = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const json = await query.json();
  return json;
};

const del = (path:string, body:object) => {
  fetch(`${baseUrl}${path}`, {
    method: 'DELETE',
    body: JSON.stringify(body),
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

export {
  get,
  post,
  del,
};