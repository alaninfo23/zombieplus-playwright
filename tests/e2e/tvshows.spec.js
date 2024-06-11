const { test, expect } = require("../support");

const data = require("../support/fixtures/tvshows.json");
const { executeSQL } = require("../support/database");


test("deve poder cadastrar uma nova serie", async ({ page }) => {
  const tvshows = data.create;
  await executeSQL(`DELETE from tvshows WHERE title = '${tvshows.title}'`)

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.tvshows.create(tvshows);
  await page.popup.haveText(
    `A série '${tvshows.title}' foi adicionada ao catálogo.`
  );
});

test("deve poder remover uma nova serie", async ({ page, request }) => {
  const tvshows = data.to_remove;
  await executeSQL(`DELETE from tvshows WHERE title = '${tvshows.title}'`);
  
  await request.api.postTvShow(tvshows);

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.tvshows.remove(tvshows.title);
  await page.popup.haveText("Série removida com sucesso.");
});

test("não deve cadastrar quando o título é duplicado", async ({
  page,
  request,
}) => {
  const tvshows = data.duplicate;
  await executeSQL(`DELETE from tvshows WHERE title = '${tvshows.title}'`)

  await request.api.postTvShow(tvshows);

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.tvshows.create(tvshows);
  await page.popup.haveText(
    `O título '${tvshows.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
  );
});

test("não deve cadastrar os campos obrigatórios não são preenchidos", async ({
  page,
}) => {
  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.tvshows.goForm();
  await page.tvshows.submit();
  await page.tvshows.alertHaveText([
    "Campo obrigatório",
    "Campo obrigatório",
    "Campo obrigatório",
    "Campo obrigatório",
    "Campo obrigatório (apenas números)",
  ]);
});

test("deve realizar busca pelo termo zumbi", async ({ page, request }) => {
  const tvshows = data.search;
  
  tvshows.data.forEach(async (m) => {
    await executeSQL(`DELETE from tvshows WHERE title = '${m.title}'`);
    await request.api.postTvShow(m);
  });

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.tvshows.search(tvshows.input);
  await page.tvshows.tableHave(tvshows.outputs);
});
