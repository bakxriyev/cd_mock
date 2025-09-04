# IELTS Exam Management System

A comprehensive NestJS application for managing IELTS exams with Sequelize ORM, JWT authentication, file uploads, and email notifications.

## Features

- **User Management**: Admin and Student roles with JWT authentication
- **Exam Management**: Create and manage different types of IELTS exams
- **Question Types**: Support for all IELTS question types (Listening, Reading, Writing, Speaking)
- **File Uploads**: Audio files for listening, images for questions
- **Results Management**: Score tracking and email notifications
- **Email System**: Automated result notifications to users

## Installation

1. Clone the repository
2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Copy environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Configure your environment variables in `.env`

5. Start the application:
\`\`\`bash
npm run start:dev
\`\`\`

## Environment Variables

\`\`\`env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=ielts_exam_system

# JWT Configuration
JWT_ACCESS_SECRET=your-super-secret-access-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
MAIL_FROM=noreply@ieltsexam.com

# App Configuration
PORT=3000
NODE_ENV=development

# Upload Configuration
UPLOAD_DEST=./uploads
MAX_FILE_SIZE=10485760
\`\`\`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

### Users
- `GET /users` - Get all users (Admin only)
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user (Admin only)
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user (Admin only)

### Exams
- `GET /exams` - Get all exams
- `GET /exams/:id` - Get exam by ID
- `POST /exams` - Create exam (Admin only)
- `PATCH /exams/:id` - Update exam (Admin only)
- `DELETE /exams/:id` - Delete exam (Admin only)

### Listening
- `GET /listening` - Get all listening sections
- `GET /listening/:id` - Get listening section by ID
- `POST /listening` - Create listening section with audio upload (Admin only)
- `POST /listening/questions` - Create listening question (Admin only)

### Results
- `GET /results` - Get all results (Admin only)
- `GET /results/:id` - Get result by ID
- `GET /results/user/:userId` - Get results by user
- `POST /results` - Create result (Admin only)
- `POST /results/:id/send-email` - Send result email (Admin only)

## File Structure

\`\`\`
src/
├── config/
│   ├── app.config.ts
│   └── database.config.ts
├── modules/
│   ├── auth/
│   │   ├── decorators/
│   │   ├── dto/
│   │   ├── guards/
│   │   ├── strategies/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── index.ts
│   ├── user/
│   │   ├── dto/
│   │   ├── user.controller.ts
│   │   ├── user.model.ts
│   │   ├── user.module.ts
│   │   ├── user.service.ts
│   │   └── index.ts
│   └── [other modules...]
├── templates/
│   └── result-notification.hbs
├── app.module.ts
└── main.ts
\`\`\`

## Database Models

- **User**: User management with roles
- **Exam**: Exam information and types
- **Listening**: Listening sections with audio files
- **ListeningQuestion**: Questions for listening sections
- **Reading**: Reading passages
- **ReadingQuestion**: Questions for reading passages
- **Writing**: Writing tasks
- **Speaking**: Speaking questions
- **Result**: Exam results and scores

## Technologies Used

- **NestJS**: Progressive Node.js framework
- **Sequelize**: Promise-based ORM for Node.js
- **MySQL**: Database
- **JWT**: Authentication
- **Multer**: File uploads
- **Nodemailer**: Email sending
- **Handlebars**: Email templates
- **bcryptjs**: Password hashing
- **class-validator**: Validation decorators

## License

This project is licensed under the UNLICENSED License.
