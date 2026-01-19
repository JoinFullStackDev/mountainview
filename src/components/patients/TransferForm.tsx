"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const transferSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(255, "Email is too long"),
  currentPharmacy: z
    .string()
    .trim()
    .min(2, "Please enter your current pharmacy name")
    .max(200, "Pharmacy name is too long"),
  rxNumbers: z.string().max(500, "Too many characters").optional(),
  notes: z.string().max(1000, "Notes must be less than 1000 characters").optional(),
});

type TransferFormData = z.infer<typeof transferSchema>;

export function TransferForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
      phone: "",
      email: "",
      currentPharmacy: "",
      rxNumbers: "",
      notes: "",
    },
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call - in production this would submit to backend
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-8"
          >
            <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Transfer Request Received!
            </h3>
            <p className="text-muted-foreground mb-6">
              We&apos;ll contact your current pharmacy and notify you when your
              prescriptions are ready. This typically takes 24-48 hours.
            </p>
            <Button variant="outline" onClick={() => setIsSuccess(false)}>
              Submit Another Request
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Transfer Your Prescriptions
              </h3>
              <p className="text-muted-foreground text-sm">
                Fill out the form below and we&apos;ll handle the rest. We&apos;ll
                contact your current pharmacy directly.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(801) 555-1234"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="currentPharmacy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Pharmacy Name & Location *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., CVS on Main Street, Bountiful"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rxNumbers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prescription Numbers (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="If you have specific Rx numbers, list them here. Otherwise, we'll transfer all active prescriptions."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special instructions or questions?"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 space-y-4">
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Transfer Request"
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Prefer to call?
                    </p>
                    <a
                      href="tel:+18012953439"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      801-295-3439
                    </a>
                  </div>
                </div>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
