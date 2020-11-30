const Page = require("./util/page");

let page;
beforeEach(async (done) => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
  done();
});

afterEach(async (done) => {
  await page.close();
  done();
});

describe("while logged in", () => {
  beforeEach(async (done) => {
    await page.login();
    await page.click("a.btn-floating");
    done();
  });

  it("should show blog-create-form", async (done) => {
    const label = await page.getContentsOf("form label");
    expect(label).toEqual("Blog Title");
    done();
  });

  describe("and using valid inputs", () => {
    beforeEach(async (done) => {
      await page.type(".title input", "My Title");
      await page.type(".content input", "My Content");
      await page.click("form button");
      done();
    });

    test("submitting takes user to review screen", async (done) => {
      const text = await page.getContentsOf("h5");
      expect(text).toEqual("Please confirm your entries");
      done();
    });

    test("submitting then saving adds blog to the index page", async (done) => {
      await page.click("button.green");
      await page.waitFor(".card");

      const title = await page.getContentsOf(".card-title");
      const content = await page.getContentsOf("p");

      expect(title).toEqual("My Title");
      expect(content).toEqual("My Content");

      done();
    });
  });

  describe("and using invalid inputs", () => {
    beforeEach(async (done) => {
      await page.click("form button");
      done();
    });

    test("the form shows error message.", async (done) => {
      const titleError = await page.getContentsOf(".title .red-text");
      const contentError = await page.getContentsOf(".content .red-text");

      expect(titleError).toEqual("You must provide a value");
      expect(contentError).toEqual("You must provide a value");
      done();
    });
  });
});

describe("while not logged in", () => {
  test("user can't create a blog post", async (done) => {
    const result = await page.httpPost("/api/blogs", {
      title: "My Title",
      content: "My Content",
    });

    expect(result).toEqual({ error: "You must log in!" });
    done();
  });

  test("user can't get a list of blog posts", async (done) => {
    const result = await page.httpGet("/api/blogs");

    expect(result).toEqual({ error: "You must log in!" });
    done();
  });
});
