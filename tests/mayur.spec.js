const {test,expect} = require("@playwright/test")

test('playwright testcase',async ({browser}) => {

    const context = await browser.newContext();
    const page = await browser.newPage();
    await page.goto("https://google.com");
    const pageTitle = await page.title();
    console.log(pageTitle);
    await expect(page).toHaveTitle("Google");
    await page.locator('#APjFqb').fill("Mayur");
})
test("login functionality", async({page:page1})=>{
    await page1.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page1.locator('#username').type("santhowe");
    await page1.locator('#password').type("santhowe");
    await page1.locator('[type="checkbox"]').click();
    await page1.locator('[name="signin"]').click();
    const pagetext = await page1.content();
    console.log(pagetext);
    console.log("1111111111");
    if (pagetext.includes("username/password.")){
        console.log("please enter correct creds");
    }
    
    else{
        console.log("user is able to login");
    }

})