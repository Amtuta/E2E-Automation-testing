const {test, expect} = require('@playwright/test');

test("E2E testing", async({page})=>
{
    const products = page.locator(".card-body");         //decl...loc...in 1 var..
    //const add_card = page.locator(".btn.w-10.rounded");
    const name = 'IPHONE 13 PRO';
    await page.goto("https://rahulshettyacademy.com/client");

    //login 
    await page.locator("#userEmail").fill("fyrabvgkwfasidhhiya12.gaik08@gmail.com");
    await page.locator("#userPassword").fill("Eiya@1234");
    await page.locator("#login").click();

    await page.waitForLoadState("networkidle"); //wait for page loading
    //await page.locator(".card-body b").first().waitFor(); //if waitForLoadState() is not working for any reason then you can use alternatively this waitFor().
    const title = await page.locator(".card-body b").allTextContents();
    console.log(title); //all item name in the page

    //ZARA coat 3
    const count = await products.count();
    for (let i=0; i<count; i++)
    {
        if(await products.nth(i).locator("b").textContent() === name)       
        {
            //add card
            await products.nth(i).locator(".btn.w-10.rounded").click();         //click on add cart
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();     //click on cart
    await page.locator("div li").first().waitFor();     //wait for page load and click on 1st product
    const item = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(item).toBeTruthy();
    await page.pause();



})