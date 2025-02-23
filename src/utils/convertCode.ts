import OpenAI from 'openai';

export async function convertCode(
  sourceCode: string,
  fromLanguage: string,
  toLanguage: string,
  apiKey: string
): Promise<string> {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const prompt = `Convert the following ${fromLanguage} code to ${toLanguage}. Only return the converted code without any explanations or markdown:

${sourceCode}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    throw new Error('Failed to convert code. Please check your API key and try again.');
  }
}