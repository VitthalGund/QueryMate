# QUERYMATE

## 👩🏻‍💻 Mentor :

- Prof. Dr. Rupali M. Komatwar, Faculty, Computer Engineering, GPM.

## 👥 Developer Team :

- [Vitthal Gund](https://github.com/VitthalGund)
- [Sarvesh Yadav](https://github.com/sarveshpyadav)
- [Justin Fernandes](https://github.com/FernandesJustin)
- [Ramkrushna Sahu](https://github.com/Ramkrushna-Sahu)

## 📑 Project Synopsis :

#### BACKGROUND :

In a world overwhelmed with information, finding precise and accurate answers efficiently is crucial. While doing research work, we often use resources like documents containing an abundance of lengthy information, official documentations, technical blogs, e-books, etc. to get a relevant answer for the questions from a particular data source. We, as learners, are usually recommended to read reference books for our academic subjects, which is good. However, there are times when we want quick and accurate answers. Even for that purpose, we have to thoroughly analyze the entire book which contains a bit of lengthy content. This work is very time-consuming, and it drains our energy in reading irrelevant information.

---

#### ABSTRACT :

QueryMate is a tool that centers on developing an intelligent Question and Answering (Q&A) System that draws strength from custom dataset, revolutionizing the way users access and comprehend information. By training our model on carefully curated data, we aim to develop a solution that can understand context, extract relevant information, and accurate responses to user queries. The motivation behind this project stems from the ever-growing challenge of efficiently navigating to find information quickly in the huge amount of data. In a world where information is abundant but not always easily accessible, our tool can streamline the process of finding accurate and relevant answers to queries. Traditional keyword-based searches often fall short when it comes to understanding delicate queries or providing concise and relevant answers. We are doing this project because it’s getting harder to find what we’re looking for in all the information available. Regular searches don’t always understand our questions well or give us the right answers. So, we’re creating a sophisticated yet smart Q&A Tool using a special set of data to help fix this problem. Our project aims to bridge this gap by embracing the latest advancements in AI and NLP. Students and Learners can utilize this tool to get technical answers from their reference books. General users can save time by just doing a simple copy-paste and getting their query resolved. This will also help the Analysts and Researchers to get their insights from their data.

---


## 🚀 Getting Started

### Prerequisites

#### Frontend
1. **Clone Frontend Repository:**
   - Clone the frontend repository using the following command:
     ```sh
     git clone https://github.com/VitthalGund/QueryMate.git
     ```
   - Navigate to the frontend directory:
     ```sh
     cd QueryMate-main
     cd client 
     ```
   
2. **Install Dependencies:**
   ```sh
   npm install
   ```

#### Backend
1. **Clone Backend Repository:**
   - Clone the backend repository using the following command:
     ```sh
     git clone https://github.com/VitthalGund/QueryMate.git
     ```
   - Navigate to the backend directory:
     ```sh
     cd QueryMate-main
     cd server
     ```

2. **Node.js:**
   - Ensure you have Node.js version 18.15.0 installed.
   - Download from [Node.js v18.15.0](https://nodejs.org/dist/v18.15.0/node-v18.15.0-x64.msi).

3. **Visual Studio:**
   - Install the latest version of Visual Studio.
   - Make sure to include the "Desktop development with C++" workload.

4. **Windows Build Tools:**
   - Download and install Windows Build Tools:
     - Visit [windows-build-tools GitHub](https://github.com/felixrieseberg/windows-build-tools) or run the following command:
       ```sh
       npm install --global --production windows-build-tools
       ```

5. **node-gyp:**
   - Download and install node-gyp:
     - Visit [node-gyp GitHub](https://github.com/nodejs/node-gyp#on-windows).

6. **Install Backend Dependencies:**
   ```sh
   npm install
   ```

### Environment Variables

Create a `.env` file in the root of the backend directory with the following structure:

```plaintext
PORT=2000
CLIENT_DOMAIN="http://localhost:3000"
DATABASE_URI="mongodb://0.0.0.0:27017/DefenceShorts"
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
emailApi=<your_email_api>
emailBrevo=<your_email_brevo>
email=<your_email>
smtpKey=<your_smtp_key>

DATABASE_URI="mongodb://0.0.0.0:27017/QueryMate"

passworsd=<your_password>
passwordBrevo=<your_password_brevo>
password=<your_password>
```

Replace `<your_access_token_secret>`, `<your_refresh_token_secret>`, `<your_email_api>`, `<your_email_brevo>`, `<your_email>`, `<your_smtp_key>`, `<your_password>`, `<your_password_brevo>` with your actual values.

### Running the Project

#### Frontend
1. **Start the Frontend Server:**
   ```sh
   npm start
   ```

#### Backend
1. **Start the Backend Server:**
   ```sh
   npm run server
   ```

### Notes
- Ensure all the above steps are followed correctly to avoid any setup issues.
- Check the documentation for each dependency if you encounter any errors during installation.



## 🕘 Project Timeline :

<details>
<summary><b>Week 01</b> : [31.07.2023 - 06.08.2023]</summary>

---
🚀 TEAM FORMATION AND MENTOR SELECTION

  + Formation of our team, carefully assembling a group of dedicated members.
  + After a series of collaborative meetings with the team, we carefully pinpoint our field and technology of interest.
  + Selecting the mentor whose expertise aligns seamlessly with the chosen technology, ensuring the provision of the best guidance and support.
</details>
<details>
<summary><b>Week 02</b> : [07.08.2023 - 13.08.2023]</summary>

---
💬 PROJECT IDEA DISCUSSION AND DRAFTING OF SYNOPSIS

  + Every team member has explored and actively contributed in examining and suggesting different project ideas.
  + We settled on five project ideas before presenting them to our project mentor, Rupali ma'am.
  + In a meeting, we presented our ideas to Rupali ma'am. She approved three out of the five ideas, providing us with explanations for selecting these three and her reasons for disapproving the other two.
  + In the end, we opted for QueryMate because we deemed it more practical, useful and valuable.
</details>
<details>
<summary><b>Week 03</b> : [07.08.2023 - 13.08.2023]</summary>

---
🔍 EXPLORING PROJECT REQUIREMENTS

+ We conducted a thorough review of prior work in this related field, if any has been undertaken.
+ We began identifying and selecting further objectives that have the potential to greatly enhance the existing project's overall value and impact.
+ We found it imperative to acquire datasets for training our models, enabling us to accurately predict the desired outputs.
+ We agreed on utilizing ``Google BERT (Bidirectional Encoder Representations from Transformers)`` and ```Google USE (Universal Sentence Encoder)```, while also considering the need for ``Facebook RoBERTa (Robustly Optimized BERT Pre-Training Approach)`` if any challenges arise with ``Google BERT``
+ Taking into account the team's proficiency, we selected the following deep learning technologies:
    + ``NLP (Natural Language Processing)`` techniques, including ``RNN (Recurrent Neural Networks)`` and ``LSTM (Long Short Term Memory)``
    + ``TensorFlow`` framework for robust model training.
+  Overall, we chosed the technology stack for both the frontend and the backend of the project, with the committment to concurrently learn and master these technologies during the developmental phase:
    + Frontend: ``ReactJS``
    + Backend: ``NodeJS``
</details>
<details>
<summary><b>Week 04</b> : [14.08.2023 - 20.08.2023]</summary>

---
🔐 FINALIZING PROJECT PLAN

+ We reviewed and confirmed the project requirements gathered during the previous week.
+ We ensured that we had a comprehensive understanding of what needs to be accomplished.
+ Alongside, we crafted a detailed project plan including milestones, deadlines and resource allocation.
+ We organized regular team meetings to discuss progress, address any questions or concerns, and make any necessary adjustments to the project plan.
+ Established the GitHub Repository for [QueryMate](https://github.com/VitthalGund/QueryMate) on 15th August, 2023! ⭐
</details>
<details>
<summary><b>Week 05</b> : [21.08.2023 - 27.08.2023]</summary>

---
🛠️ SET UP THE DEVELOPMENT ENVIRONMENT

+ We began by configuring our development environment, which involves setting up necessary software tools, version control systems, and ensuring that all team members have access to the required resources.
+ Documenting our project is essential. Thus, we created a comprehensive initial project documentation that will encompass everything from project scope and requirements to technical specifications.
</details>
<details>
<summary><b>Week 06</b> : [28.08.2023 - 03.09.2023]</summary>

---
🎨 DEVELOPMENT KICK-OFF BY DESIGNING USER INTERFACE AND WIREFRAMES

+ We dedicated our time for designing the system architecture, user interface (UI) and creating wireframes that outline the visual structure and flow of application.
+ This included crafting visually appealing and user-friendly layouts, color schemes, and interactive elements that enhance the overall user experience.
+ Additionally, we meticukously created wireframes, which are detailed blueprints of the user interface. These wireframes will serve as the visual foundation for our application, helping us plan the arrangement of elements and userflow.
+ Throughout this week, we encouraged iterative design and feedback from team members to ensure that the UI aligns with project goals and user expectations.
+ Now, we have a well-thought-out design before we start coding.
</details>
<details>
<summary><b>Week 07</b> : [04.09.2023 - 10.09.2023]</summary>

---
🧪 DEVELOPMENT AND TESTING

+ With the project plan in place, we were ready to start the development process by implementing core project features.
+ We began by setting up our development environment as planned during Week 5.
+ Alongside development, we established a robust testing strategy to focus on thorough testing, including unit tests, integration tests, and user testing.
+ Monitored development progress against the project plan, ensuring that we're on track and making necessary adjustments.
</details>

<details>
<summary><b>Week 11</b> : [06.11.2023 - 12.11.2023]</summary>

+ 📅 **November 6, 2023**
  - Project Kickoff and Initial Setup.
+ 🔧 **November 10, 2023**
  - Set up development environment and initial repository structure.
</details>
<details>
<summary><b>Week 12</b> : [13.11.2023 - 19.11.2023]</summary>

+ 📜 **November 13, 2023**
  - LICENSE.md Created by Vitthal Popat Gund.
+ 🔄 **November 16, 2023**
  - Merge Branch 'main' of Repository by VitthalGund.
  - 🛠️ Dependency updates and bug fixes.
  - 🐛 Fixed an issue where the register route was checking the username twice instead of checking both username and email.
+ 🎨 **November 19, 2023**
  - Home Page UI Redesigned by VitthalGund.
  - Major redesigns and UI updates for the home page and other sections.
</details>
<details>
<summary><b>Week 13</b> : [20.11.2023 - 26.11.2023]</summary>

+ 🚀 **November 21, 2023**
  - Dynamic Imports and NPM Updates by VitthalGund.
  - Added dynamic imports to optimize the application.
  - Updated npm packages to the latest versions.
+ 🌟 **November 22, 2023**
  - UI Improvements and New Components by VitthalGund.
  - Added multiple UI improvements, such as dynamic loading for the features section, hover effects, and alignment changes for small screens.
  - Introduced new components like OfferSection and FeaturesItem.
+ 🔍 **November 23, 2023**
  - Chat Search Functionality by VitthalGund.
  - Implemented and enhanced the chat search functionality.
  - Made several UI updates, including changes to colors, fonts, and the integration of the footer component.
+ 🛠️ **November 24, 2023**
  - UI and Functional Enhancements by VitthalGund.
  - Updated axios to the latest version and removed email notification alerts.
  - Added the compareSync function to compare hash values.
</details>
<details>
<summary><b>Week 14</b> : [27.11.2023 - 03.12.2023]</summary>

+ 🧩 **November 27, 2023**
  - Custom Sider Bar and Logout Functionality by VitthalGund.
  - Integrated a custom sider bar into the chat page and added logout functionality.
</details>
<details>
<summary><b>Week 19</b> : [25.12.2023 - 31.12.2023]</summary>

+ 🔑 **December 30, 2023**
  - Client ID Added to Env File by VitthalGund.
  - Added client ID configuration to the environment file for better security and configuration management.
</details>
<details>
<summary><b>Week 29</b> : [18.03.2024 - 24.03.2024]</summary>

+ 🗺️ **March 23, 2024**
  - Architecture Diagram and UI Changes by VitthalGund.
  - Added an architecture diagram and made minor UI changes.
</details>




