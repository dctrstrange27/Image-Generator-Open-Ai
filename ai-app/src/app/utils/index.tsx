"use client"
import {surpriseMePrompts} from '../Components/randomPromts';

type PromptFunction = (prompt: string) => string;

export const getRandomPrompt: PromptFunction = (prompt) => {
  // Assuming 'surpriseMePrompts' is defined somewhere
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
};


// export async function downloadImage(_id, photo) {
//   FileSaver.saveAs(photo, `download-${_id}.jpg`);
// }
