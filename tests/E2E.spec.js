const {test, expect} = require('@playwright/test');

test("E2E testing", async({page})=>
{
    const email = "fyrabvgkwfasidhhiya12.gaik08@gmail.com";
    const products = page.locator(".card-body");         //decl...loc...in 1 var..
    //const add_card = page.locator(".btn.w-10.rounded");
    const name = 'IPHONE 13 PRO';
    const search_item = 'India'
    await page.goto("https://rahulshettyacademy.com/client");

    //login 
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Eiya@1234");
    await page.locator("#login").click();

    await page.waitForLoadState("networkidle"); //wait for page loading
    //await page.locator(".card-body b").first().waitFor(); //if waitForLoadState() is not working for any reason then you can use alternatively this waitFor().
    const title = await page.locator(".card-body b").allTextContents();
    console.log(title); //all item name in the page

    //iphone 13 pro 
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
    const item = await page.locator("h3:has-text('iphone 13 pro')").isVisible();    //syntax tag_name:has-text("text")  //you can use "h3:has-text('iphone 13 pro')"also for locating text
    expect(item).toBeTruthy();  //it returns boolean value
    

    await page.locator("button:has-text('Checkout')").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("ind");    //pressSequentially we use this method for enter the text(letter-by-letter) because we didn't search direct thats why we are not using fill method
    const dropdown = page.locator(".ta-results");       //inspect and store whole suggestion list
    await dropdown.waitFor();           //wait for page loading
    const optioncount = await dropdown.locator("button").count();     //we are checking how many items is there(count) in our list(dropdown) and store in one vari
    for(let i=0; i<optioncount; i++)                  //iterate each and every options 
    {
        const text = await dropdown.locator("button").nth(i).textContent(); //in dropdown list nth item store in one var(text)
        if(text.includes('India'))   //compare out text_name and nth item_name  //for comparing we also use include(if extra spaces is there so no need to add space in our code)
        {
            await dropdown.locator("button").nth(i).click();    //if is true then click item name 
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator("a:has-text('Place Order')").click();     //inspect text througth 
    //console.log(await page.locator("h1:has-text(' Thankyou for the order. ')").textContent());
                //or
    await expect(page.locator(".hero-primary")).toHaveText(' Thankyou for the order. ');
    
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();//orderId
    console.log(orderId);
    await page.locator("button[routerlink='/dashboard/myorders']").click();

    const rows = await page.locator("tbody tr").count();
    for(let i=0; i<await rows.count; i++)
    {
        const text = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(text))
        {
            await rows.nth(i).locator(".btn.btn-primary").click();
            break;
        }
    }
    console.log(await page.locator("button").first().textContent());

    await page.pause();



})