import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";
import { MCQ } from '../../types/MCQ';


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<MCQ[]>
) {
  const subject = req.query.subject;
  const difficulty = req.query.difficulty || 5;
  console.log(req)
  const prompt = `
Generate five multiple choice questions on the subject of "${subject}".
Return the questions and four answers in a JSON array of the following type:
  type MCQ = {
    "question": string
    "answers": string[]
    "correctAnswer": number (0 - 3)
  }
Let the difficulty be ${difficulty} on a scale of 1 to 10.
`
  console.log(prompt)
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 2048
    });
    console.log(completion.data.choices[0].text)
    res.status(200).json(JSON.parse(completion.data.choices[0].text));
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
}

// function generatePrompt(animal) {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
// }