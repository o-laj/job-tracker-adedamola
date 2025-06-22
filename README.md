
## Contact

Built by Adedamola Olajuwon for an intern assessment at AppEasy. For feedback, reach out via GitHub or email.

# Job Tracker

A minimalist and functional job application tracker built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Users can add job listings, track their statuses, and even analyze job descriptions using OpenAI's API.

---

## Features

-  **Add Job**: Store job title, company name, link, and application status.
-  **View Jobs**: Displays a table of all saved job entries.
-  **Edit & Delete Jobs**: Easily update or remove existing jobs.
-  **Analyze Job Description**: AI-powered summary and skill extraction from job listings.
-  **Alerts** for success on adding, editing, or deleting jobs.
-  **Tab-based navigation** for clean user interaction.
-  Fully responsive and styled with Tailwind.
-  Custom fonts (`Walton` for header, `Montserrat` for general text)

---

##  Tech Stack

- **Frontend**: React (via Next.js)
- **Styling**: Tailwind CSS + custom CSS
- **Font**: Walton (Header), Montserrat (General)
- **Backend**: Next.js API Routes
- **AI**: OpenAI API (analyzes job descriptions)

---

##  Installation

```bash
git clone https://github.com/your-username/job-tracker.git
cd job-tracker
npm install
npm run dev
```

---

##  Environment Variables

Create a `.env.local` file in the root:

```env
OPENAI_API_KEY=your_openai_key_here
```

---

##  Development Notes

- All job actions (add, update, delete) are powered via `api/jobs` routes.
- Uses local state for basic success alerts.
- Textareas and inputs are styled with transitions for better UX.
- Success & error alerts fade after a few seconds.
- Mobile-friendly with horizontal scroll for overflowing tabs.

---

##  Project Structure

```
components/
  AddJobForm.tsx
  JobTable.tsx
  AnalyzeJob.tsx
pages/
  api/
    jobs/
      index.ts  // GET & POST
      [id].ts   // PUT & DELETE
  page.tsx      // Main app
styles/
  page.module.css
```

---

##  Deployment

This project is ready to be deployed to:

- [Vercel](https://vercel.com) (Recommended for Next.js)
- [Netlify](https://netlify.com)
- Or any server that supports Node.js

---

## Acknowledgements

- Font: [Walton](https://www.cdnfonts.com/walton.font)
- AI API: [OpenAI](https://openai.com/)
- CSS Framework: [Tailwind CSS](https://tailwindcss.com/)

---

