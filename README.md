# GrowthPath Landing Page

This is the landing page and integrated chatbot system for GrowthPath. It provides a conversational interface for lead generation, budget selection, and meeting scheduling, backed by an automated n8n workflow.

## Project Structure

- `html/` - Contains HTML files for the landing page and other subpages (e.g., Partners page).
- `css/` - Contains the styling files to ensure a modern and responsive user interface.
- `js/` - Contains JavaScript files, including the core logic and chatbot scripts.
- `backend/` - Contains backend code (e.g., `server.js`) for handling form submissions and server-side operations.

## Features

- **Interactive UI:** Modern, responsive, and visually appealing frontend.
- **n8n Chatbot Integration:** An engaging AI agent that converses with visitors, gathers details regarding requested services (e.g., lead generation), and records budget preferences.
- **Automated Workflows:** Automatically captures lead data, sends targeted confirmation and drip/nudge emails via Gmail, logs data into Google Sheets, and updates internal teams using Slack alerts.
- **Meeting Scheduling:** Integrated calendar options within the chat that allow visitors to directly book strategy calls.

## Setup & Running Locally

1. Open `index.html` in your web browser to view the main landing page.
2. If testing backend functionality, start the local server by navigating to the `backend/` directory, installing dependencies, and running:
   ```bash
   node server.js
   ```

## Key Technologies & Integrations
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Node.js / Express
- Workflow Automation: [n8n](https://n8n.io/) (integrating Gmail, Google Sheets, Slack, and Zapier)
