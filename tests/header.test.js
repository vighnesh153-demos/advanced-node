const Page = require("./util/page");

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

it("should assert that the header has correct text", async (done) => {
  const text = await page.getContentsOf("a.brand-logo");
  expect(text).toEqual("Blogster");
  done();
});

it("should start OAuth flow by clicking log in.", async (done) => {
  await page.click(".right a");

  const url = await page.url();

  expect(url).toMatch(/^https\:\/\/accounts\.google\.com/);

  done();
});

it("should show logout buttons when signed in", async (done) => {
  await page.login();

  const text = await page.getContentsOf('a[href="/auth/logout"]');

  expect(text).toEqual("Logout");

  done();
});
