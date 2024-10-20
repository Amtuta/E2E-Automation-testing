const {test, expect} = require("@playwright/test");

test("login", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    // await page.locator(".btn1").click();
    
    // await page.locator("#firstName").fill("riya");
    // await page.locator("#lastName").fill("kale");
    // await page.locator("#userEmail").fill("fyrabvgkwfasidhhiya12.gaik08@gmail.com");
    
    // await page.locator("#userMobile").fill("1234567890");
    // await page.locator("[value='Female']").click();
    // await page.locator("#userPassword").fill("Eiya@1234");
    // await page.locator("#confirmPassword").fill("Eiya@1234");
    // //const b = await page.locator("#confirmPassword").fill("Riya@1209");
    // await page.locator('[type="checkbox"]').click();
    // await page.locator("#login").click();
    // await page.locator(".btn.btn-primary").click();
    
    //login-
    await page.locator("#userEmail").fill("fyrabvgkwfasidhhiya12.gaik08@gmail.com");
    await page.locator("#userPassword").fill("Eiya@1234");
    await page.locator("#login").click();

    await page.waitForLoadState("networkidle"); //wait for page loading
    await page.locator(".card-body b").first().waitFor(); //if waitForLoadState() is not working for any reason then you can use alternatively this waitFor().
    const title = await page.locator(".card-body b").allTextContents();
    console.log(title); //all item name in the page
    
    await page.locator(".btn.btn-custom").nth(2).click();       //click on cart 

    
    //click buy button
    // await page.locator(".btn.btn-primary").click();
    // await page.locator(".btnn action__submit ng-star-inserted").click();
    // await expect(page.locator(".input.txt.text-validated")).toContainText("india");
    




    




})