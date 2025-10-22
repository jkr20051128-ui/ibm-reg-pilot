import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(100, { message: "Full name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Full name can only contain letters and spaces" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username must be less than 30 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be less than 128 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string(),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, { message: "Phone number must be exactly 10 digits" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onTouched",
  });

  const password = watch("password");

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    const labels = ["Weak", "Fair", "Good", "Strong"];
    const colors = [
      "bg-destructive",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-[hsl(var(--success))]",
    ];

    return {
      strength,
      label: labels[strength - 1] || "",
      color: colors[strength - 1] || "",
    };
  };

  const passwordStrength = getPasswordStrength(password || "");

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Registration Successful!",
      description: "Your account has been created successfully.",
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      reset();
    }, 3000);
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto animate-bounce-in">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-[hsl(var(--success))] p-4">
              <CheckCircle2 className="h-16 w-16 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3 text-foreground">Registration Successful!</h2>
          <p className="text-muted-foreground text-lg">
            Your account has been created successfully. Welcome aboard!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto animate-slide-up">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Create Your Account</CardTitle>
        <CardDescription className="text-center">
          Join us today by filling out the form below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              {...register("fullName")}
              className={errors.fullName ? "border-destructive animate-shake" : ""}
              maxLength={100}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              {...register("email")}
              className={errors.email ? "border-destructive animate-shake" : ""}
              maxLength={255}
            />
            {errors.email && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe123"
              {...register("username")}
              className={errors.username ? "border-destructive animate-shake" : ""}
              maxLength={30}
            />
            {errors.username && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className={errors.password ? "border-destructive animate-shake pr-10" : "pr-10"}
                maxLength={128}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {password && password.length > 0 && (
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full transition-colors ${
                        level <= passwordStrength.strength
                          ? passwordStrength.color
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Password strength: <span className="font-semibold">{passwordStrength.label}</span>
                </p>
              </div>
            )}
            {errors.password && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                {...register("confirmPassword")}
                className={errors.confirmPassword ? "border-destructive animate-shake pr-10" : "pr-10"}
                maxLength={128}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="1234567890"
              {...register("phoneNumber")}
              className={errors.phoneNumber ? "border-destructive animate-shake" : ""}
              maxLength={10}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
