// gemini.cjs (for ES modules)

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAU_L-RdtNXN8KmmfB_ZfNfkXFN1CCMDsI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateContent = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text()); // You can remove this line if not needed
    return result.response.text(); // Return the actual text content
  } catch (error) {
    console.error("Error generating content:", error);
  }
};

export { generateContent };