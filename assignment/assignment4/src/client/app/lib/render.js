export async function render(templateFn, data = {}) {
    return templateFn(data);
  }
  