
# 💡 The Conspectus

_A civic knowledge platform for structured, transparent profiles of influential figures._

---

### 📄 Description

The Conspectus is a civic knowledge platform that creates structured, transparent profiles of influential figures to place them in context with each other, the world, and the reader.  

Each profile is:
- Built using AI from trusted journalistic sources  
- Refined by human editors  
- Mapped onto a worldview model showing where the figure stands on key global issues and values  

Users can also take a quiz to map their own worldview on the same axes and compare their alignment to any profiled figure.  

**Long-term goal:** Become a go-to resource for clear, trustworthy context about people shaping the world, while using collected data to build elevated, high-value intelligence.

---

Here is the original Lovable [demo](https://lovable.dev/projects/ddfcee68-4795-48c6-96c9-0655448ede7a?joinedViaInviteLink=true). DM Michael if you lack permissions.

# 🗓️⚙️ Technical Roadmap
<img width="569" height="838" alt="image" src="https://github.com/user-attachments/assets/d0aa7e40-4a53-4cb9-996d-34dbfdc5c3cd" />

👉👉 View/comment on the design decisions [here](https://www.notion.so/Technical-Design-Decision-Document-28b250e4573880e7bf67dc5d701b48cf?source=copy_link).

---


# 💯 Best Practices / PR Etiquette

### Creating a PR
If you’re working on an issue, create a branch from the issue page (open it locally). In your terminal:
```bash
   git checkout main
   git pull
   git checkout -b branch-name
```

### Testing  
📝 Testing! Reference Testing section below before continuing here!

### Final Steps
⚠️ Safety first! Put all credentials into `.env.local` file and use them from there. Make sure `.env.local` is not in the staging area so that it is not visible in the remote repository.

### Committing
Finally, type `npx cz` in your terminal, which will prompt you to declare the details of your PR (**NEVER PUSH DIRECTLY TO MAIN**). Make sure to then sync changes in source control or by running `git push` to push remotely.

**You should always request someone to review your PR before it is merged.**


# 🧠 Useful Commands
- **Booting up: `git pull && npm run build`**
- **Testing: `cd <directory> && npm run test`**
- **Committing: `git add` (either `.` for everything or type the files you want to add to your commit) `&& npx cz`** 
- **Updating: `npm install && npm run build`**
- **Everything sucks: `close editor and go for a walk`**


