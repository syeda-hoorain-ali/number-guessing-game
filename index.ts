#! /usr/bin/env node

import chalk from "chalk";
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner'


let number = Math.floor(Math.random() * 10) + 1; //* Generate a random number
let round = 1;
let lives = 3;

//* Function to display the welcome message
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Welcome to Number Guessing Game?');
    await new Promise((r) => setTimeout(r, 2000));

    rainbowTitle.stop();
    console.log(`
    ${chalk.bgCyanBright.whiteBright.bold('HOW TO PLAY')}
    Try to guess the mystery number between 1 and 10
    Be careful, you only have 3 lives! 💖💖💖`);
}

//* Function to handle displaying messages to the user
const messageHandler = async (message: string, win: boolean) => {
    const spinner = createSpinner('Checking your answer...').start();
    await new Promise((r) => setTimeout(r, 2000));

    if (win) {
        spinner.success({ text: chalk.greenBright(message) })
    } else {
        spinner.error({ text: chalk.redBright(message) })
    }
}

//* Function to handle the game flow
const playGame = async () => {
    console.log(`Round ${round}`);
    const answer = await inquirer.prompt([
        { message: "Ready to guess? What's your number?", type: "number", name: "userNumber" }
    ])

    // Check if the user's guess matches the number
    if (answer.userNumber === number) {
        // If the guess is correct
        round++;
        if (round > 3) {
            // End game if all rounds are completed
            console.clear();
            await messageHandler("Congratulations! You've won the game!🎉🎉🎉 Well done!\n See you next time\n", true);

            const rainbowTitle = chalkAnimation.rainbow(`Programming isn't about what you know; it's about making the command line look cool`);
            await new Promise((r) => setTimeout(r, 5000));
            rainbowTitle.stop();
            process.exit(0);
        }

        // If there are more rounds remaining
        await messageHandler('Congratulations! You guessed the correct number!\n', true);
        number = Math.floor(Math.random() * 10) + 1;
        await playGame();

    } else {
        // If the guess is incorrect
        lives--;

        if (lives == 0) {
            // If no lives remaining, end the game
            await messageHandler("Uh-oh! You've run out of lives. Better luck next time!\n", false);
            process.exit(1);
        }
        // If lives remaining, continue the game
        await messageHandler(`Oops! Wrong guess! You have ${lives} lives left. Keep trying!\n`, false);
        await playGame();
    }
}


await welcome();
await playGame();

