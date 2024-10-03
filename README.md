# Playwright Typescript Example

## Overview
This project contains automated test scenarios for verifying the functionalities of Suit supply web site by using Playwright Typescript.

## Project Structure
- `pages`: Contains page objects for the website
- `tests`: Contains created tests

## Running the Tests
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependecies via npm:
   ```bash
   npm install
4. Run the test with command below:
   ```bash
   npx playwright test --reporter=html
You can check the results under folder `playwright-report`

## Test Cases

### Use case 1
Navigate to suitsupply website and

i. Go to Shoes > Sneakers and sort listing based on price low to high
ii. Go to any clothing category and sort listing based on colour
iii. As tear down, remove all added items from cart and verify message "Your bag is still empty"

### Use case 2
Verify Suitsupply's Custom Made (CM) configurator that is available on website.

i. Automate one happy flow for Custom Made Jacket configurator
Website > CM Jacket configurator > Size Passport > Add to Bag > Cart
ii. Check CM Jacket configurator flow until customer cart. Document manual test cases and findings
Flow: Website > CM Jacket configurator > Size Passport > Add to Bag > Cart
