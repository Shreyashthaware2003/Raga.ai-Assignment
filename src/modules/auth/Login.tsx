import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CircleX, Eye, EyeClosed, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '@/services/firebase';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleContinue = async () => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        if (trimmedPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(
                auth,
                trimmedEmail,
                password
            );

            const user = userCredential.user;

            if (!user.displayName) {
                await updateProfile(user, {
                    displayName: "Demo User",
                });
            }

            const token = await user.getIdToken();

            const userData = {
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                token,
            };

            localStorage.setItem("healthcare_user", JSON.stringify(userData));
            toast.success("Logged in successfully");

            navigate('/dashboard/home');

            // 👉 later: redirect to dashboard
        } catch (error: any) {
            console.error(error);

            if (error.code === "auth/user-not-found") {
                setError("User not found");
            } else if (error.code === "auth/wrong-password") {
                setError("Incorrect password");
            } else if (error.code === "auth/invalid-email") {
                setError("Invalid email");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className='flex flex-col flex-nowrap items-center justify-center flex-1 min-h-screen max-w-lg mx-auto px-4 gap-4'>
                <div className='flex flex-col flex-nowrap items-center justify-center text-center mb-4'>
                    <span>Clinical OS</span>
                    <span className='text-xl font-bold'>Your Clinical Dashboard</span>
                    <span className='text-2xl font-bold tracking-wide text-gray-400'>Log in to your Clinical Account</span>
                </div>
                <Card className='p-6 sm:p-8 w-full  shadow-lg border border-gray-300 ring-0'>

                    <div className='bg-yellow-100 border border-yellow-600 text-yellow-800 w-full rounded-lg text-xs p-2 flex flex-col items-start justify-center gap-2'>
                        <span>Use the demo credentials provided to login.</span>
                        <div className='flex flex-col'>
                            <span>Email : demo@gmail.com</span>
                            <span>Password : demo123</span>
                        </div>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleContinue();
                    }} className='w-full space-y-4'>
                        <div className='relative'>
                            <Label htmlFor='email' className='text-gray-500 font-normal text-[12px] tracking-wide'>Email</Label>
                            <Input id='email' value={email} onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                                placeholder='Enter your email' className='h-10 rounded-lg border-gray-200' />
                            {
                                email.length > 0 &&
                                <>
                                    <Button type='button' onClick={() => {
                                        setEmail('');
                                        setError('');
                                        setPassword('');
                                    }} className='absolute right-0 top-1/2 inset-y-4.5 text-gray-500 hover:text-black bg-white h-10'><CircleX /></Button>
                                </>
                            }
                        </div>

                        <div className='relative '>
                            <Label htmlFor='password' className='text-gray-500 font-normal text-[12px] tracking-wide'>Password</Label>
                            <Input id='password' type={visible ? 'text' : 'password'} value={password} onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                                placeholder='Enter password' className='h-10 rounded-lg border-gray-200' />
                            <Button type='button' onClick={() => setVisible((prev) => !prev)} className='absolute right-1 inset-y-0 top-1/2 -translate-y-2 '>{visible ? <Eye /> : <EyeClosed />}</Button>
                        </div>
                        <Button type='submit' disabled={loading} variant={'default'} className='bg-black hover:bg-black/80 text-white w-full h-10 mt-4'>{loading ? <Loader2 className='animate-spin' /> : 'Continue'}
                        </Button>
                        {
                            error && <p className='text-xs text-center text-red-500'>{error}</p>
                        }
                    </form>
                </Card>
            </div >
        </>
    )
}
