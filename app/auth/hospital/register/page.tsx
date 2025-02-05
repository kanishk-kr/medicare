'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AuthNavbar from '@/components/AuthNavbar';

const formSchema = z.object({
  hospitalName: z.string().min(3),
  address: z.string().min(10),
  contactPerson: z.string().min(3),
  email: z.string().email(),
  phoneNumber: z.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/),
  licenseNumber: z.string().min(5),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function HospitalRegistrationPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log('Hospital Registration Data:', data);
  };

  return (
    <div className="min-h-screen">
      <AuthNavbar />

      {/*
        Wrapper with:
        - Top padding (pt-24) so content isn’t covered by the navbar on mobile.
        - Bottom padding (pb-24) to add extra blue space at the bottom.
        - On large screens (lg:pt-0 lg:pb-0) the padding and blue background are removed.
        - The blue gradient (bg-gradient-to-br from-blue-600 to-blue-500) is applied on mobile.
      */}
      <div className="pt-24 pb-24 lg:pt-0 lg:pb-0 bg-gradient-to-br from-blue-600 to-blue-500 lg:bg-transparent">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="min-h-screen flex flex-col lg:flex-row"
          >
            {/* Blue Section: Register Your Hospital (Info Panel) */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-500 flex flex-col justify-center items-center text-white px-8 order-1 lg:order-2">
              <motion.div className="text-center">
                <div className="p-4 bg-white/20 rounded-lg inline-block">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold mt-4">Register Your Hospital</h2>
                <p className="opacity-80 mt-1 text-sm">
                  Join MediConnect and improve healthcare services.
                </p>
                <br />
              </motion.div>
            </div>

            {/* White Section: Hospital Registration Form */}
            <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center px-8 order-2 lg:order-1">
              <div className="text-center mb-6 w-3/4">
                <br />
                <h2 className="text-2xl font-bold text-gray-900">
                  Hospital Registration
                </h2>
                <p className="text-gray-600 text-sm">
                  Register your healthcare facility with MediConnect
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-3/4">
                {/* Hospital Name */}
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    Hospital Name
                  </label>
                  <input
                    {...register('hospitalName')}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="General Hospital"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    Full Address
                  </label>
                  <input
                    {...register('address')}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="123 Medical Street, Health City"
                  />
                </div>

                {/* Contact Person & Phone Number */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">
                      Contact Person
                    </label>
                    <input
                      {...register('contactPerson')}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-1">
                      Phone Number
                    </label>
                    <input
                      {...register('phoneNumber')}
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                </div>

                {/* Email & License Number */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">
                      Email Address
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="admin@hospital.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-1">
                      License Number
                    </label>
                    <input
                      {...register('licenseNumber')}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="MED-123456"
                    />
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">
                      Password
                    </label>
                    <input
                      {...register('password')}
                      type="password"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-1">
                      Confirm Password
                    </label>
                    <input
                      {...register('confirmPassword')}
                      type="password"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.confirmPassword.message?.toString()}
                      </p>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Register Hospital
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm">
                  Already registered?{' '}
                  <Link href="/auth/hospital/login" className="text-blue-600 hover:underline">
                    Hospital Login
                  </Link>
                </p>
                <br></br>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}