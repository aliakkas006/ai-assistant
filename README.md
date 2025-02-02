# AI Assistant - NLP-Based Search System with OpenAI API Integration

## 🚀 Overview
AI Assistant is an advanced **NLP-based search system** designed to extract keywords, recognize named entities, classify user queries, and find the best matching professionals. The system is built using **Nest.js, TypeScript, PostgreSQL, and industry-standard NLP techniques** using OpenAI's API.

---

## 🏗️ Features
- **User end** - Accepts voice and text input.
- **Keyword Extraction** – Analyze and extracts important key words from user queries.
- **Named Entity Recognition (NER)** – Identifies entities like doctors, hospitals, and locations.
- **Text Classification** – Categorizes user queries to match relevant professionals.
- **Semantic Search** – Utilizes OpenAI's API for advanced vector-based search to find the best match.
- **Scalable and Modular Architecture** – Built using **Nest.js** and **TypeScript**.

---

## 🛠️ Tech Stack
- **Monorepo Setup:** Use **Turborepo** for managing a monorepo
- **Backend:** Nest.js (TypeScript)
- **Database:** PostgreSQL (Neon DB)
- **NLP Libraries:** `OpenAI` `langchain` `natural`
- **Frontend:** Next.js (TypeScript)

---

## 📦 Installation
### **1️⃣ Clone the Repository**
```sh
  git clone https://github.com/aliakkas006/ai-assistant.git
  cd ai-assistant
```

### **2️⃣ Install Dependencies**
```sh
  pnpm install
```

### **3️⃣ Set Up Environment Variables**
Follow the .env.example file for the proper environment variable setup.

### **4️⃣ Run Database Migrations**
```sh
  pnpm db:migrate
```

### **5️⃣ Start the Server**
```sh
  pnpm start:dev
```

The server should now be running at `http://localhost:3000/` 🚀

---

## 🧩 Folder Structure
```
📦 ai-assistant
 ┣ 📂 apps                  # Application code
 ┃ ┣ 📂 nest-app            # Nest.js backend application        
 ┃ ┃ ┣ 📂 src
 ┃ ┃ ┃ ┣ 📂 search         
 ┃ ┃ ┃ ┣ 📂 utils          
 ┃ ┃ ┃ ┗ 📂 test       
 ┃ ┃ ┗ 📂 tests            
 ┃ ┣ 📂 web                 # Next.js Frontend application  
 ┃ ┃ ┣ ┣ 📂 app 
 ┃ ┃ ┃ ┣ 📂 components         
 ┃ ┃ ┃ ┣ 📂 lib          
 ┃ ┃ ┃ ┗ 📂 config     
 ┣ 📂 packages              # Package code
 ┃ ┣ 📂 core            
 ┃ ┣ 📂 db            
 ┃ ┣ 📂 ui                 
 ┣ 📂 tooling               # Shared configurations
 ┃ ┣ 📂 eslint                 
 ┃ ┣ 📂 prettier         
 ┃ ┣ 📂 tailwind             
 ┃ ┣ 📂 typescript             
 ┣ 📜 .turbo                
 ┣ 📜 turbo.json          
 ┣ 📜 .github                
 ┣ 📜 package.json         
 ┗ 📜 README.md     

```

---

## Available Commands

- `pnpm i`: Install dependencies and prepare the development environment
- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications and packages
- `pnpm start`: Start all applications in production mode
- `pnpm test`: Run tests across all packages
- `pnpm lint`: Run linting across all packages
- `pnpm lint:fix`: Fix linting issues across all packages
- `pnpm format`: Format all files using Prettier
- `pnpm clean`: Clean build artifacts and cache

## Project Structure

The monorepo is organized into three main directories:

### `/apps`
Contains all the standalone applications. Each application is independent and can be deployed separately. These are typically end-user facing applications like web frontends, APIs, or services.

### `/packages`
Houses shared libraries and utilities that are used across multiple applications. These packages are internal dependencies that provide:
- Common UI components
- Shared business logic
- Utility functions
- Type definitions
- Configuration presets

### `/tooling`
Contains development and build tools, configurations, and scripts that are used across the monorepo. This includes:
- Build configurations
- ESLint configs
- TypeScript configs
- Testing setups
- Other development utilities

---

## Apps and Packages
- `nest-app`: A [Nest.js](https://nestjs.com/) app
- `web`: A [Next.js](https://nextjs.org/) app
- `@repo/core`: Core logic of the workspace
- `@repo/db`: Core Database setup
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

---

## Utilities

This Turborepo has some additional tools already setup:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

---

## Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans which is Get started at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling to share build caches with team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching will need an account with Vercel. If you don't have an account [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd ai-assistant
npx turbo login
```

This will authenticate the Turborepo CLI with [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, this link of Turborepo for Remote Cache by running the following command from the root of Turborepo:

```
npx turbo link
```

---

## ⚙️ API Endpoints
### **🔍 Search Professionals**
**Request:**
```http
GET /search?query=Find me the best doctor in Uttara Dhaka
```

**Response:**
```json
{
  id: 1,
  type: 'Organization',
  orgOrPracId: '1234567',
  usernameOrBusinessUrl: 'user1',
  name: 'Hospital 1',
  ranking: 10,
  photo: 'https://example.com/photo1.jpg',
  category: 'Healthcare',
  subCategory: ['Medicine', 'Eye'],
  rating: '4.7',
  totalAppointments: 1000,
  zone: ['Cal', 'Nev', 'NY'],
  branch: ['branch 1', 'branch 2'],
  areaOfPractice: 'local'
}
```

---

## 🧪 Running Tests
Run unit tests using Jest:
```sh
pnpm test
```

---

## 📌 Future Improvements
- Implement **BERT-based embeddings** for improved search accuracy.
- Add **multi-language support**.
- Enhance **caching for better performance**.

---

## 📝 License
This project is **open-source** under the MIT License.

📌 **Maintainer:** [Ali Akkas](https://github.com/aliakkas006)

