const { context } = require('@cucumber/cucumber');
const {test, expect} = require('@playwright/test');
const { promises } = require('dns');

test('Browser context Playwright test', async({browser}) =>
{
    const context = await browser.newContext();   //create new instance/browserpage
    const page = await context.newPage();       //create new page instance
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    
});

test('Page Playwright test', async({page}) => 
{
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const psw = page.locator("#password");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await userName.type("riya");
    await page.locator("#password").type("1234@ri");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('IIncorrect');
    await page.locator("text='rahulshettyacademy'").textContent
    

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await psw.fill("learning");
    await signIn.click();

});


test("UI control", async({page})=>
{
    page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentlink = page.locator("[href*='documents-request']");
    await page.locator("#username").type("riya");
    await page.locator("#password").type("1234@ri");
    const dropdown = await page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".checkmark").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());   //it's return true/false
    await expect(page.locator(".radiotextsty").last()).toBeChecked();       // use for (check/uncheck) 
    await page.locator("#terms").click();
    console.log(await expect(page.locator("#terms")).toBeChecked());
    await page.locator("#terms").uncheck();
    expect( await page.locator("#terms").isChecked()).toBeFalsy(); 
    await expect(documentlink).toHaveAttribute("class","blinkingText");  //used to check if an element has a specific attribute with the expected value.



    //await page.pause();

})

test("Child window handling", async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentlink = page.locator("[href*='documents-request']");

    //create new page instance as a child window 
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),//use for create new page instance
        documentlink.click(),
    ])

    const text = await newPage.locator(".im-para.red").textContent();
    const arraytext = text.split('@');
    const email = arraytext[1].split(' ')[0];
    console.log(email);
    await page.locator('#username').type(email); //goto back parant window(page) and perform actions 

    //await page.pause();
    //console.log(await page.locator('#username').textContent());





})









