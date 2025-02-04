// app/(auth)/hospital/register/page.tsx
'use client';

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building2, MapPin, User, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  hospitalName: z.string().min(3),
  address: z.string().min(10),
  contactPerson: z.string().min(3),
  email: z.string().email(),
  phoneNumber: z.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/),
  licenseNumber: z.string().min(5),
});

export default function HospitalRegistrationPage() {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: any) => {
    console.log('Hospital Registration Data:', data);
    // Add your registration logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* <Navbar /> */}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-24"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="text-center mb-8">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Hospital Registration
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Register your healthcare facility with MediConnect
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Hospital Name
                </label>
                <div className="relative">
                  <input
                    {...register('hospitalName')}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="General Hospital"
                  />
                  <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Full Address
                </label>
                <div className="relative">
                  <input
                    {...register('address')}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="123 Medical Street, Health City"
                  />
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Contact Person
                  </label>
                  <div className="relative">
                    <input
                      {...register('contactPerson')}
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="John Doe"
                    />
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      {...register('phoneNumber')}
                      type="tel"
                      className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="+1 234 567 890"
                    />
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="admin@hospital.com"
                    />
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    License Number
                  </label>
                  <div className="relative">
                    <input
                      {...register('licenseNumber')}
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="MED-123456"
                    />
                    <ShieldCheck className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Register Hospital
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already registered?{' '}
                <Link 
                  href="/hospital/login" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Hospital Login
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}