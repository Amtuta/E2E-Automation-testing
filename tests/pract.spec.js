const {test} = require("@playwright/test");

test("first test", async({browser})=>
{
    const context = await browser.newContext();
    const page = await browser.newPage();
    const userName = page.locator('#username');
    const psw = page.locator("#password");
    const signin = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-title a");
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.type("amruta");
    await page.locator("#password").fill("1234556");
    await page.locator("#signInBtn").click();
    

    console.log(await page.locator("[style*='block']").textContent()); // if you want get text then use textContent() method.

    await userName.fill("rahulshettyacademy");
    await psw.fill("learning");
    await signin.click();

    //console.log(await page.locator(".card-title a").nth(0).textContent()); // you want 1st element then use nth(0) of first() method.
    //console.log(await page.locator(".card-title a").first().textContent());
    //console.log(await cardTitle.last().textContent()); // you want last ele then use last() method.

    console.log(await cardTitle.allTextContents()); //it return list,all title grab/get using allTextContents() method.

})