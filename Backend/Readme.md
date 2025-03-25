# Blog Application Backend Deployment on PythonAnywhere

## Setup Steps

1. Create a PythonAnywhere Account
   - Sign up at https://www.pythonanywhere.com/
   - Choose a free or paid plan

2. Create a New Web App
   - Select "Web" tab
   - Click "Add a new web app"
   - Choose "Manual configuration"
   - Select Python 3.x version

3. Virtual Environment Setup
   ```bash
   mkvirtualenv myenv --python=/usr/bin/python3.x
   pip install -r requirements.txt
   ```

4. WSGI Configuration
   - Edit WSGI configuration file 
   - Add:
   ```python
   import sys
   import os

   path = '/home/yourusername/myproject'
   if path not in sys.path:
       sys.path.append(path)

   from app.main import app as application
   ```

5. Database Configuration
   - For SQLite: No additional steps
   - For MySQL: Create database in PythonAnywhere MySQL section

6. Environment Variables
   - Set any sensitive configurations in PythonAnywhere
   - Recommended: Use `.env` file or PythonAnywhere's environment variable settings

7. Static Files
   - Ensure your frontend is deployed on Vercel
   - Update CORS origins in `main.py` with Vercel URL

## Deployment Checklist
- ✅ Install dependencies
- ✅ Configure WSGI
- ✅ Set up database
- ✅ Configure CORS
- ✅ Test locally first
```