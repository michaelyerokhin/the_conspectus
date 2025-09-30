<h1> 💡 The Conspectus (Reference Directory for Sections of ReadME--->) </h1>
<h3> 📄 Description </h3>
<p>A civic knowledge platform that creates structured, transparent profiles of influential figures to put them into context of each other, 
  the world and the reader. Each profile is built using AI from trusted journalistic sources, refined by human editors, 
  and mapped onto a worldview model showing where the figure stands on key global issues and values. 
  Users can take a quiz to map their own worldview on the same axes and compare their alignment to any profiled figure, 
  with the long-term goal of becoming a go-to resource for clear, 
  trustworthy context about people shaping the world and using the collected data to grow an elevated, high-value intelligence level.</p>


<h2> 🗓️⚙️ Technical Roadmap </h2>


 🛠️ **Part 1: Core Platform Rebuild (Expected: October 14)**
<p> Key Tasks: </p>
<ul>
  <li> Audit current stack (Supabase + Lovable + openAI API prompting + Github). -> Supabase + Typescript + Next.js + OpenAI Prompting  </li>
  <li> Stand up backend on Supabase with clean schema. (Focus on storing users; data normalization/structure will come later) </li>
  <li> Build API layer for reading/writing data </li>
  <li> Implement basic user authentication </li>
  <li> Backend administrator status, editor status, viewer (default) (Will be discussed) </li>
  <li> Deploy on reliable hosting (Vercel) </li>
</ul>


🔀 **Part 2: Data Ingestion & Processing Pipeline (Expected: November 7)**
<p> Key Tasks: </p>
<ul>
  <li> Prototype ingestion from trusted sources  </li>
  <li> Normalize into structured fields (leader, stance, issue, timestamp) </li>
  <li> Run a first-pass LLM workflow for tagging/profiling (quote vs policy stance vs bio fact)	</li>
</ul>


🏁 **Part 3: Feature Reconstruction (Profiles, Situation Rooms, Trending Topics) (Expected: Dec 3)**
<p> Key Tasks: </p>
<ul>
  <li> Profiles: Structured leader pages (bio, positions, metadata, sources)  </li>
  <li> Situation Rooms: Time-stamped, hyper-dynamic event feeds </li>
  <li> Trending Topics: Surface leaders/issues automatically based on content activity	</li>
</ul>


<h2> 🔑 Project Details </h2>

**Frontend:** Typescript, Nextjs
<p></p>

**Backend:** Typescript, Nodejs
<p></p>

**DB:** Supabase



<h2> 💯 Best Practices / PR Etiquette </h2>
<p> PR Etiquette: How to make a PR </p>
<p> If you working on an issue, you can remotely create a branch for the specific issue on the issue details page; choose the option to open it locally.</p>
<li> 1) In project terminal, type `git checkout main` to get onto the main branch and then `git pull` to pull all of the changes from the remote version: this updates your local version with the newest changes. Then, you can create a new branch via `git checkout -b branch-name` so that you are working on a branch that reflects the newest changes of the repo </li>
<p> After completing work on your branch, make sure you did these things first:</p>
<li> ⚠️ Safety first! Put all credentials into `.env` file and use them from there. Make sure `.env` is in the `.gitignore` </li>
<li> 📝 Testing! Reference Testing section below before continuing here! </li>
<p> Finally, type `npx cz' which will walk you through declaring the details of your PR (NEVER PUSH DIRECTLY TO MAIN)Make sure to then sync changes in source control or running `git push` to push remotely </p>

<p> You should always request someone to review your PR before it is merged. </p>





<h2> 🦺 Testing! </h2>
<p> In Progress....</p>

