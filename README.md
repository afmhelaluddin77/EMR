# 🏥 EMR Monorepo - Future-Proof Electronic Medical Records System

A comprehensive, scalable Electronic Medical Records (EMR) system built with modern technologies and best practices. This monorepo contains both frontend and backend applications with shared packages for type safety and component reusability.

## 🚀 Architecture Overview

### **Monorepo Structure**
```
emr-monorepo/
├── apps/
│   ├── emr-frontend/     # React + Vite + TypeScript Frontend
│   └── emr-backend/      # NestJS + TypeScript Backend
├── packages/
│   ├── ui/              # Shared React Components
│   ├── fhir-types/      # FHIR-compliant TypeScript Types
│   └── eslint-config-custom/ # Shared ESLint Configuration
└── docs/                # Project Documentation
```

### **Technology Stack**

#### Frontend (`emr-frontend`)
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Material-UI (MUI) v7** for UI components
- **TanStack Query** for server state management
- **React Router** for navigation
- **Redux Toolkit** for client state (optional)

#### Backend (`emr-backend`)
- **NestJS** with TypeScript
- **Prisma ORM** with PostgreSQL
- **JWT Authentication** with refresh tokens
- **FHIR R4** compliant API endpoints
- **Audit logging** for compliance
- **Role-based access control**

#### Shared Packages
- **TypeScript** for type safety across the stack
- **FHIR-compliant types** for healthcare data
- **Reusable UI components** for consistency
- **Shared ESLint config** for code quality

## 📋 Features

### **Core EMR Features**
- ✅ **Patient Management** - Registration, history, search
- ✅ **Appointment Scheduling** - Booking, management, reminders
- ✅ **Clinical Examinations** - Multi-system examination forms
- ✅ **Vital Signs Tracking** - Real-time monitoring and trends
- ✅ **Medicine Database** - Comprehensive drug information
- ✅ **Prescription Management** - Writing, dispensing, tracking
- ✅ **User Management** - Role-based access control
- ✅ **Audit Trail** - Complete action logging for compliance

### **Advanced Features**
- 🔒 **Security** - JWT authentication, encryption, RBAC
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **Touch Interface** - Gesture support for tablets
- 🤖 **AI Integration Ready** - Prepared for AI assistants
- 📊 **Reporting** - Comprehensive data analytics
- 🔄 **Real-time Updates** - Live data synchronization
- 📋 **Clinical Tools** - Assessment scales and calculators

### **Healthcare Standards**
- 🏥 **FHIR R4 Compliant** - Healthcare interoperability
- 📋 **HIPAA Ready** - Privacy and security compliance
- 🔍 **Audit Logging** - Complete action tracking
- 🛡️ **Data Encryption** - End-to-end security

## 🛠️ Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- PostgreSQL 14+
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd emr-monorepo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment templates
   cp apps/emr-backend/.env.example apps/emr-backend/.env
   cp apps/emr-frontend/.env.example apps/emr-frontend/.env
   ```

4. **Configure database**
   ```bash
   # Update DATABASE_URL in apps/emr-backend/.env
   DATABASE_URL="postgresql://username:password@localhost:5432/emr_db"
   ```

5. **Run database migrations**
   ```bash
   cd apps/emr-backend
   npx prisma migrate dev
   npx prisma generate
   ```

6. **Start development servers**
   ```bash
   # Start backend (NestJS)
   nx serve emr-backend
   
   # Start frontend (React)
   nx serve emr-frontend
   ```

### **Default Credentials**
- **Username**: `dr.helal`
- **Password**: `Helal@2025`

## 📁 Project Structure

### **Frontend Structure** (`apps/emr-frontend/src/`)
```
src/
├── api/                 # TanStack Query hooks
├── components/          # Generic UI components
│   ├── layout/         # Layout components
│   └── common/         # Common components
├── features/           # Feature-based modules
│   ├── auth/          # Authentication
│   ├── dashboard/     # Role-specific dashboards
│   ├── patient/       # Patient management
│   ├── examinations/  # Clinical examinations
│   ├── prescriptions/ # Prescription management
│   └── admin/         # Administration
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
├── providers/         # Context providers
├── routes/            # Routing configuration
└── store/             # Redux store (optional)
```

### **Backend Structure** (`apps/emr-backend/src/`)
```
src/
├── auth/              # Authentication module
├── fhir/              # FHIR-compliant resources
│   ├── patient/       # Patient resource
│   ├── appointment/   # Appointment resource
│   ├── observation/   # Vitals and lab results
│   └── medication/    # Medicine database
├── users/             # User management
├── audit/             # Audit trail
├── ai/                # AI integration
└── core/              # Core modules
```

### **Shared Packages**
- **`@emr/ui`** - Reusable UI components
- **`@emr/fhir-types`** - FHIR-compliant TypeScript types
- **`@emr/eslint-config-custom`** - Shared ESLint configuration

## 🔧 Development Commands

### **Nx Commands**
```bash
# Serve applications
nx serve emr-frontend
nx serve emr-backend

# Build applications
nx build emr-frontend
nx build emr-backend

# Run tests
nx test emr-frontend
nx test emr-backend

# Lint code
nx lint emr-frontend
nx lint emr-backend

# Generate components
nx g @nx/react:component MyComponent --project=emr-frontend
nx g @nx/nest:resource Patient --project=emr-backend
```

### **Database Commands**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

## 🏗️ Deployment

### **Development**
```bash
# Start both frontend and backend
nx run-many --target=serve --projects=emr-frontend,emr-backend
```

### **Production**
```bash
# Build for production
nx build emr-frontend --prod
nx build emr-backend --prod

# Start production servers
nx serve emr-backend --prod
```

## 📊 Database Schema

The system uses PostgreSQL with Prisma ORM and includes:

- **Users & Authentication** - User management and sessions
- **Patients** - Patient records and demographics
- **Appointments** - Scheduling and management
- **Clinical Examinations** - Examination findings
- **Vital Signs** - Patient vitals tracking
- **Medicines** - Comprehensive drug database
- **Prescriptions** - Medication orders
- **Audit Logs** - Complete action tracking
- **System Settings** - Configuration management

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Role-based Access Control** (RBAC)
- **Data Encryption** at rest and in transit
- **Audit Logging** for compliance
- **Input Validation** and sanitization
- **CORS Configuration** for API security
- **Rate Limiting** to prevent abuse

## 🧪 Testing

```bash
# Run all tests
nx run-many --target=test --all

# Run specific project tests
nx test emr-frontend
nx test emr-backend

# Run e2e tests
nx e2e emr-frontend-e2e
```

## 📈 Performance

- **Frontend**: Vite for fast development and optimized builds
- **Backend**: NestJS with efficient dependency injection
- **Database**: Prisma with optimized queries
- **Caching**: TanStack Query for intelligent caching
- **Bundle Size**: Tree-shaking and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `docs/` folder
- Review the API documentation

## 🚀 Roadmap

### **Phase 1** ✅
- [x] Basic EMR functionality
- [x] Patient management
- [x] Appointment scheduling
- [x] Clinical examinations
- [x] Medicine database

### **Phase 2** 🔄
- [ ] AI-powered diagnosis assistance
- [ ] Advanced reporting and analytics
- [ ] Mobile app development
- [ ] Integration with lab systems
- [ ] Telemedicine features

### **Phase 3** 📋
- [ ] Machine learning for predictive analytics
- [ ] Blockchain for data integrity
- [ ] IoT device integration
- [ ] Advanced security features
- [ ] Multi-tenant architecture

---

**Built with ❤️ for modern healthcare**
# EMR
