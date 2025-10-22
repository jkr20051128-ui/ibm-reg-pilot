import { RegistrationForm } from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            IBM Registration Portal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Secure user registration with comprehensive validation and modern design
          </p>
        </div>
        
        <RegistrationForm />
        
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>All fields are validated in real-time with secure client-side validation</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
