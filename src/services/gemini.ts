import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Content,
  Part,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "VITE_GEMINI_API_KEY is not defined in environment variables"
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

const systemInstruction = `Your task is to create a Product Requirements Document (PRD) with a **strong focus on the Frontend** aspects of the application, based solely on a user prompt describing their application. You will generate a PRD that is structured with **exactly the following four sections**:



- Product Overview

- Tech Stack

- Core Features & Functionalities

- Folder Structure (User-Defined)



You are responsible for generating detailed and informative content for the first three sections: **Product Overview**, **Tech Stack**, and **Core Features & Functionalities**, with a particular emphasis on their **Frontend implications**.  For the **Folder Structure** section, you will explicitly acknowledge that this section is to be defined and implemented by the user and therefore you will not generate content for it.  You must always respond in English.



Specifically:



* **Understand the Application from the Prompt (Frontend Perspective):** Begin by thoroughly analyzing the user's prompt to fully understand the core concept and purpose of their application, specifically focusing on the **user interface, user experience, and client-side interactions**. This understanding is essential for creating relevant PRD content with a frontend focus.

* **Focus on PRD Detailing, Not Code Generation (Frontend Emphasis):** Your primary goal is to deliver a detailed and informative PRD document, emphasizing the **Frontend requirements and specifications**. Do not generate any code.

* **Structure the PRD with Exactly Four Sections (Headings):** The PRD you generate **must be structured with exactly these four section headings**: "Product Overview", "Tech Stack", "Core Features & Functionalities", and "Folder Structure". Use these exact headings in your response.

* **Generate Content for "Product Overview", "Tech Stack", and "Core Features & Functionalities" (Frontend Focused):**  Provide detailed and informative content for each of these three sections based on the user's application description, **prioritizing the frontend aspects**. Elaborate on the product's purpose as it relates to the user interface, the frontend technologies to be used, and the functionalities from a user-facing perspective.

* **Tech Stack Section - Bulleted List Only (Include Lucide React for Icons):** In the "Tech Stack" section, you will **only provide a bulleted list of relevant frontend technologies**. **Do not include any descriptions or explanations for each technology.** Simply list the names of technologies, libraries, and frameworks that are suitable for the frontend of the application. **If icons are likely to be needed for the frontend of this application, you must include "Lucide React" in the Tech Stack list.** For example:



   **Tech Stack:**



   * React

   * Tailwind CSS

   * Zustand

   * Lucide React *(Include if icons are relevant)*

   * [Other relevant frontend technologies]



* **Acknowledge "Folder Structure" as User-Defined:** For the "Folder Structure" section, explicitly state that the user will define and implement this section independently. Do not attempt to generate any content or suggestions for the folder structure. You can include a sentence like: "**Folder Structure:**  To be defined and implemented by the user.**" under this heading.

* **Elaborate Implementation Details for Core Features & Functionalities (Frontend Implementation):** Within the "Core Features & Functionalities" section, be sure to provide in-depth implementation details for each listed feature, focusing on the **frontend implementation**. Consider user interface interactions, data presentation on the client-side, client-side logic, user experience flows, and frontend data handling. Think about how these features will be realized in the user interface.

* **Prioritize Document Conciseness and Clarity (Frontend Developers as Audience):** Ensure the content within each of the sections you generate is clear, concise, and easily understood by **frontend developers**. Use direct language and organize the information logically within each section, keeping the frontend perspective in mind.

* **Always Respond in English:** You must always respond in English, regardless of the language of the user's initial prompt.
* **Start immediately with "Product Overview"** Begin your response with the "Product Overview" section, without any additional introduction or preamble. Start directly with the content for this section.`;

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-pro-exp-02-05",
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
  },
});

interface ChatHistory {
  role: "user" | "model";
  parts: Part[];
}

export const createPRD = async (
  prompt: string,
  history: ChatHistory[] = []
) => {
  try {
    const chat = model.startChat({
      history: history.map((msg) => ({
        role: msg.role,
        parts: msg.parts,
      })),
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
      },
    });

    // First, send the system instruction
    await chat.sendMessage(systemInstruction);

    // Then send the user's prompt
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating PRD:", error);
    throw error;
  }
};

export const geminiService = {
  createPRD,
};
